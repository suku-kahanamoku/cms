import { IFormField } from '@/components/form/field/field.interface';
import { IS_DEFINED, IS_NUMERIC, IS_OBJECT } from '@/utils/check.functions';
import { ITERATE } from '@/utils/modify-object.function';
import { GET_MARK, RESOLVE_MARKS, TRIM } from '@/utils/modify-string.functions';

export function useResolveUrl(route, config): void {
	try {
		const params = route.query[config?.syscode] as string;
		if (params) {
			ITERATE(JSON.parse(params), (param, name) => {
				if (name === 'fields') {
					ITERATE(param, (item, key) => {
						const field = config.fields.find((field) => field.name === key);
						if (field) {
							field.value = item.value;
						}
					});
				} else if (name === 'restUrl') {
					config[name] = atob(param);
				} else {
					config[name] = param;
				}
			});
		}
	} catch (error) {
		console.error(error);
	}
}

export async function useLoad(url: string): Promise<any[]> {
	let result;
	try {
		const data = await useApi(url);
		//
		if (data) {
			// pokud je to pole, ulozi prichozi data do items
			if (Array.isArray(data)) {
				result = data;
			}
			// pokud je to objekt, vytvori z nej pole a ulozi prichozi data do items
			else if (IS_OBJECT(data)) {
				result = [data];
			}
		}
	} catch (error) {
		console.error(error);
		useToast({ type: 'error', message: 'message.load_error' });
	}
	return result;
}

export async function useSubmit(url: string, vForm?, fields?, method = 'POST'): Promise<any> {
	let result;
	try {
		const validation = vForm?.value?.validate ? await vForm?.value?.validate() : null;
		const options: any = { method: method };
		// pokud je to validni formular => odesle
		if (validation?.valid) {
			method = method.toUpperCase();
			if (method === 'GET') {
				result = _getUrlParams(url, vForm, fields);
			} else {
				options.body = _getRestFields(vForm, fields);
				result = await useApi(url, options);
			}
		}
		// pokud je to delete => smaze
		else if (method === 'DELETE') {
			result = await useApi(url, options);
		}
	} catch (error) {
		console.error(error);
		useToast({ type: 'error', message: `form.${method.toLocaleLowerCase()}_error` });
	}
	return result;
}

function _getRestFields(vForm, fields: IFormField[]): any {
	const result = {};
	ITERATE(vForm?.value?.elements, (input, key) => {
		// projede jen pojmenovane fieldy, ne ocislovane
		if (!IS_NUMERIC(key) && typeof input.value !== undefined) {
			if (input.length) {
				input = input.item((item) => item.name);
			}
			const field = fields?.find((field) => field.name === key);
			const value = _getValue(input.value, field);
			if (!field?.ignore && field?.value !== value) {
				result[key] = value !== null && (value as unknown).toString().length ? value : null;
			}
		}
	});
	return result;
}

function _getUrlParams(url: string, vForm, fields: IFormField[]): string {
	let result = _getUrlFields(vForm, fields);
	url = btoa(`${url + GET_MARK(url)}where={${result}}`);
	result = `{"fields":{${result}},"restUrl":"${url}"}`;
	return result;
}

function _getUrlFields(vForm, fields: IFormField[]): string {
	let result = '';
	ITERATE(vForm?.value?.elements, (input, key) => {
		// projede jen pojmenovane fieldy, ne ocislovane
		if (!IS_NUMERIC(key) && IS_DEFINED(input.value) && input.value.toString().length) {
			if (input.length) {
				input = input.item((item) => item.name);
			}
			const field = fields?.find((field) => field.name === key);
			let value = _getValue(input.value, field);
			value = typeof value === 'string' ? `"${value}"` : value;
			result += `"${key}":{"value":${value}},`;
		}
	});
	result = TRIM(result, ',');
	return result;
}

function _getValue(value, field?: IFormField): any {
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
