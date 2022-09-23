import { IS_NUMERIC, IS_DEFINED, IS_OBJECT } from '@/utils/check.functions';
import { ITERATE } from '@/utils/modify-object.function';
import { GET_MARK, RESOLVE_MARKS, TRIM } from '@/utils/modify-string.functions';
import { IFormField } from '@/components/form/field/field.interface';

export default class FormController {
	/**
	 * Aktualni routa
	 *
	 * @memberof FormController
	 */
	public route = useRoute();

	/**
	 * Nactena data
	 *
	 * @memberof FormController
	 */
	public items = ref();

	/**
	 * Vybrany item
	 *
	 * @memberof FormController
	 */
	public item = ref();

	/**
	 * Priznak zda formular stahuje/odesila data
	 *
	 * @memberof FormController
	 */
	public loading = ref();

	/**
	 * Creates an instance of Form.
	 *
	 * @param {*} config
	 * @memberof FormController
	 */
	constructor(public config) {
		onMounted(this.process.bind(this));
		watch(this.route, this.process.bind(this));
	}

	/**
	 * Zrpacuje
	 *
	 * @memberof FormController
	 */
	public process(): void {
		this.resolveUrl();
		this.load(RESOLVE_MARKS(this.config.restUrl, this));
	}

	/**
	 * Zkontroluje a zpracuje url => zjisti zda v nem neni config pro danou form komponentu
	 *
	 * @memberof FormController
	 */
	public resolveUrl(): void {
		try {
			const params = this.route.query[this.config?.syscode] as string;
			if (params) {
				ITERATE(JSON.parse(params), (param, name) => {
					if (name === 'fields') {
						ITERATE(param, (item, key) => {
							const field = this.config.fields.find((field) => field.name === key);
							if (field) {
								field.value = item.value;
							}
						});
					} else if (name === 'restUrl') {
						this.config[name] = atob(param);
					} else {
						this.config[name] = param;
					}
				});
			}
		} catch (error) {
			console.error(error);
		}
	}

	/**
	 * Nacte data a ulozi je do items
	 *
	 * @param {string} [url]
	 * @param {*} [data]
	 * @returns {*}  {Promise<void>}
	 * @memberof FormController
	 */
	public async load(url?: string, data?: any): Promise<void> {
		this.loading.value = true;
		try {
			if (url) {
				data = await useApi(url);
			}
			//
			if (data) {
				// pokud je to pole, ulozi prichozi data do items
				if (Array.isArray(data)) {
					this.items.value = data;
				}
				// pokud je to objekt, vytvori z nej pole a ulozi prichozi data do items
				else if (IS_OBJECT(data)) {
					this.items.value = [data];
				}
				// pokud je definovan, ze se ma vybrat objekt s danym id, ulozi do item
				if (this.route.params.id?.length) {
					this.item.value = this.items.value.find((item) => item?.id === this.route.params.id[0]);
				}
			}
		} catch (error) {
			console.error(error);
			useToast({ type: 'error', message: 'message.load_error' });
		}
		setTimeout(() => {
			this.loading.value = false;
		}, 400);
	}

	/**
	 * Odesle formular
	 *
	 * @param {*} form
	 * @param {string} method
	 * @returns {*}  {Promise<any>}
	 * @memberof FormController
	 */
	public async onSubmit(form, method: string): Promise<any> {
		return await this._submit(RESOLVE_MARKS(this.config.submitUrl, this), form, this.config.fields, method);
	}

	/**
	 * Odesle formular a vrati data
	 *
	 * @protected
	 * @param {string} url
	 * @param {*} [vForm]
	 * @param {*} [fields]
	 * @param {*} [loading]
	 * @param {string} [method='POST']
	 * @returns {*}  {Promise<any>}
	 * @memberof FormController
	 */
	protected async _submit(url: string, vForm?, fields?, method = 'POST'): Promise<any> {
		let result;
		try {
			const validation = vForm?.value?.validate ? await vForm?.value?.validate() : null;
			const options: any = { method: method };
			// pokud je to validni formular => odesle
			if (validation?.valid) {
				method = method.toUpperCase();
				if (method === 'GET') {
					result = this._getUrlParams(url, vForm, fields);
				} else {
					options.body = this._getRestFields(vForm, fields);
					this.loading.value = true;
					result = await useApi(url, options).catch((error) => {
						throw new Error(error);
					});
				}
			}
			// pokud je to delete => smaze
			else if (method === 'DELETE') {
				options.body = vForm;
				options.all = true;
				this.loading.value = true;
				result = await useApi(url, options).catch((error) => {
					throw new Error(error);
				});
			}
		} catch (error) {
			console.error(error);
			useToast({ type: 'error', message: `form.${method.toLocaleLowerCase()}_error` });
		}
		setTimeout(() => {
			this.loading.value = false;
		}, 400);
		return result;
	}

	/**
	 * Vrati fields pro patch a post
	 *
	 * @protected
	 * @param {*} vForm
	 * @param {IFormField[]} fields
	 * @returns {*}  {*}
	 * @memberof FormController
	 */
	protected _getRestFields(vForm, fields: IFormField[]): any {
		const result = {};
		ITERATE(vForm?.value?.elements, (input, key) => {
			// projede jen pojmenovane fieldy, ne ocislovane
			if (!IS_NUMERIC(key) && typeof input.value !== undefined) {
				if (input.length) {
					input = input.item((item) => item.name);
				}
				const field = fields?.find((field) => field.name === key);
				const value = this._getValue(input.value, field);
				if (!field?.ignore && field?.value !== value) {
					result[key] = value !== null && (value as unknown).toString().length ? value : null;
				}
			}
		});
		return result;
	}

	/**
	 * Vrati string config pro url
	 *
	 * @protected
	 * @param {string} url
	 * @param {*} vForm
	 * @param {IFormField[]} fields
	 * @returns {*}  {string}
	 * @memberof FormController
	 */
	protected _getUrlParams(url: string, vForm, fields: IFormField[]): string {
		let result = this._getUrlFields(vForm, fields);
		url = btoa(`${url + GET_MARK(url)}where={${result}}`);
		result = `{"fields":{${result}},"restUrl":"${url}"}`;
		return result;
	}

	/**
	 * Vrati fields pro url
	 *
	 * @protected
	 * @param {*} vForm
	 * @param {IFormField[]} fields
	 * @returns {*}  {string}
	 * @memberof FormController
	 */
	protected _getUrlFields(vForm, fields: IFormField[]): string {
		let result = '';
		ITERATE(vForm?.value?.elements, (input, key) => {
			// projede jen pojmenovane fieldy, ne ocislovane
			if (!IS_NUMERIC(key) && IS_DEFINED(input.value) && input.value.toString().length) {
				if (input.length) {
					input = input.item((item) => item.name);
				}
				const field = fields?.find((field) => field.name === key);
				let value = this._getValue(input.value, field);
				value = typeof value === 'string' ? `"${value}"` : value;
				result += `"${key}":{"value":${value}},`;
			}
		});
		result = TRIM(result, ',');
		return result;
	}

	/**
	 * Vrati hodnotu ve spravnem typu
	 *
	 * @protected
	 * @param {*} value
	 * @param {*} [field]
	 * @returns {*}  {*}
	 * @memberof FormController
	 */
	protected _getValue(value, field?: IFormField): any {
		let result = value;
		try {
			if (field.multiple && !Array.isArray(result)) {
				result = IS_DEFINED(result)
					? (result as string)
							.toString()
							.split(',')
							.map((item) => TRIM(item))
					: [];
			}
			switch (field?.db_type) {
				case 'boolean':
					result = Array.isArray(result) ? result.map((item) => !!JSON.parse(item)) : !!JSON.parse(result);
					break;

				case 'number':
				case 'decimal':
					result = Array.isArray(result) ? result.map((item) => JSON.parse(item)) : JSON.parse(result);
					break;

				case 'text':
					result = Array.isArray(result) ? result.map((item) => item.toString()) : result.toString();
					break;

				default:
					if (IS_NUMERIC(result)) {
						result = Array.isArray(result) ? result.map((item) => JSON.parse(item)) : JSON.parse(result);
					}
					break;
			}
			return result;
		} catch (error) {
			return result;
		}
	}
}
