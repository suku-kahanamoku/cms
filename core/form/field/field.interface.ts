/**
 * Rozhrani definujici jake atributy by mel mit formField objekt
 *
 * @export
 * @interface IFormField
 */
export interface IFormField {
	/**
	 * Nazev
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	name: string;

	/**
	 * Typ (text, textarea, select, radio, adt.)
	 *
	 * @type {('text' | 'number' | 'email' | 'datetime' | 'password' | 'select' | 'textarea'
	 *   | 'checkbox' | 'radio' | 'file' | 'url' | 'image' | 'search' | 'url' | 'hidden' | 'range' | 'group')}
	 * @memberof IFormField
	 */
	type?:
		| 'text'
		| 'number'
		| 'email'
		| 'datetime'
		| 'password'
		| 'select'
		| 'textarea'
		| 'checkbox'
		| 'radio'
		| 'file'
		| 'url'
		| 'image'
		| 'search'
		| 'url'
		| 'hidden'
		| 'range'
		| 'group';

	/**
	 * Label
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	label: string;

	/**
	 * Placeholder
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	placeholder?: string;

	/**
	 * Povinny
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	required?: boolean;

	/**
	 * Poradi
	 *
	 * @type {number}
	 * @memberof IFormField
	 */
	order?: number;

	/**
	 * Maximalni pocet pismen
	 *
	 * @type {number}
	 * @memberof IFormField
	 */
	maxlength?: number;

	/**
	 * Minimalni pocet pismen
	 *
	 * @type {number}
	 * @memberof IFormField
	 */
	minlength?: number;

	/**
	 * Defaultni hodnota
	 *
	 * @type {*}
	 * @memberof IFormField
	 */
	value?: any;

	/**
	 * Validace
	 *
	 * @type {{ pattern?: string; msg: string }}
	 * @memberof IFormField
	 */
	validation?: { pattern?: string; msg: string };

	/**
	 * Ikona
	 *
	 * @type {({ position: 'prepend' | 'append'; variant: 'default' | 'inner'; value: string })}
	 * @memberof IFormField
	 */
	icon?: { position: 'prepend' | 'append'; variant: 'default' | 'inner'; value: string };

	/**
	 * Priznak zda hodnoty budou v poli
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	multiple?: boolean;

	/**
	 * Disabled
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	disabled?: boolean;

	/**
	 * Readonly
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	readonly?: boolean;

	/**
	 * Ignorovane fieldy se neodesilaji na backend
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	ignore?: boolean;

	/**
	 * Nazev nadrazene skupiny
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	group?: string;

	/**
	 * Browser naseptavac
	 *
	 * @type {('on' | 'off' | 'honorific-prefix' | 'given-name' | 'additional-name' | 'family-name' | 'honorific-suffix'
	 *     | 'nickname' | 'email' | 'username' | 'new-password' | 'current-password' | 'organization'
	 *     | 'street-address' | 'address-line1' | 'address-line2' | 'address-line3'
	 *     | 'country' | 'postal-code' | 'sex' | 'tel' | 'tel-country-code' | 'tel-local' | 'url' | 'photo'
	 *     | 'bday' | 'bday-day' | 'bday-month' | 'bday-year'
	 *     | 'cc-name' | 'cc-given-name' | 'cc-additional-name' | 'cc-family-name' | 'cc-number'
	 *     | 'cc-exp' | 'cc-exp-month' | 'cc-exp-year' | 'cc-csc' | 'cc-type'
	 *     | 'transaction-currency' | 'transaction-amount')}
	 * @memberof IFormField
	 */
	autocomplete?:
		| 'on'
		| 'off'
		| 'honorific-prefix'
		| 'given-name'
		| 'additional-name'
		| 'family-name'
		| 'honorific-suffix'
		| 'nickname'
		| 'email'
		| 'username'
		| 'new-password'
		| 'current-password'
		| 'organization'
		| 'street-address'
		| 'address-line1'
		| 'address-line2'
		| 'address-line3'
		| 'country'
		| 'postal-code'
		| 'sex'
		| 'tel'
		| 'tel-country-code'
		| 'tel-local'
		| 'url'
		| 'photo'
		| 'bday'
		| 'bday-day'
		| 'bday-month'
		| 'bday-year'
		| 'cc-name'
		| 'cc-given-name'
		| 'cc-additional-name'
		| 'cc-family-name'
		| 'cc-number'
		| 'cc-exp'
		| 'cc-exp-month'
		| 'cc-exp-year'
		| 'cc-csc'
		| 'cc-type'
		| 'transaction-currency'
		| 'transaction-amount';

	/**
	 * Zpusob, jakym se bude dynamicky upravovat jine fieldy na zaklade nastaveni
	 *
	 * @type {any[]}
	 * @memberof IFormField
	 */
	definition?: any[];

	/**
	 * Cela cesta stromem vcetne nazvu
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	path?: string;

	/**
	 * Operator
	 *
	 * @type {{ value: string, display: boolean, options: any }}
	 * @memberof IFormField
	 */
	operator?: { value: string; display: boolean; options: any };

	/**
	 * Smartform
	 *
	 * @type {{ value: string, disabled: boolean }}
	 * @memberof IFormField
	 */
	smartform?: { value: string; disabled: boolean };

	/**
	 * Pomocne tridy
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	class?: string;

	/**
	 * Auto. focus
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	autofocus?: boolean;

	/**
	 * Pomocny text pod fieldem
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	hint?: string;

	/**
	 * Velikost mezer
	 *
	 * @type {('default | comfortable | compact')}
	 * @memberof IFormField
	 */
	density?: 'default | comfortable | compact';

	/**
	 * Varianta, druh zobrazeni fieldu
	 *
	 * @type {('default | filled | solo | underline | plain | outlined')}
	 * @memberof IFormField
	 */
	variant?: 'default | filled | solo | underline | plain | outlined';

	/**
	 * Zobrazi se ikona a smaze se vse co je ve field
	 *
	 * @type {boolean}
	 * @memberof IFormField
	 */
	clearable?: boolean;

	/**
	 * Typ v databazi
	 *
	 * @type {string}
	 * @memberof IFormField
	 */
	db_type?: string;
}

/**
 *
 *
 * @export
 * @interface IFormFieldNumber
 * @extends {IFormField}
 */
export interface IFormFieldNumber extends IFormField {
	/**
	 * Maximalni pocet cisel
	 * Pro number field
	 *
	 * @type {number}
	 * @memberof IFormField
	 */
	max?: number;

	/**
	 * Minimalni pocet cisel
	 * Pro number field
	 *
	 * @type {number}
	 * @memberof IFormField
	 */
	min?: number;
}

/**
 *
 *
 * @export
 * @interface IFormFieldTextarea
 * @extends {IFormField}
 */
export interface IFormFieldTextarea extends IFormField {
	/**
	 * Pocet radku
	 *
	 * @type {number}
	 * @memberof IFormFieldTextarea
	 */
	rows: number;
}

/**
 *
 *
 * @export
 * @interface IFormFieldSelect
 * @extends {IFormField}
 */
export interface IFormFieldSelect extends IFormField {
	/**
	 * Seznam listu (<option></option>)
	 * Pro select, search, radio fieldy
	 *
	 * @type {IFormfieldOption[]}
	 * @memberof IFormFieldSelect
	 */
	options?: IFormfieldOption[];

	/**
	 * Vybrany option
	 *
	 * @type {IFormfieldOption}
	 * @memberof IFormFieldSelect
	 */
	option: IFormfieldOption;

	/**
	 * Zpusob jakym se bude nacitat option (<option></option>)
	 * Pro select, search, radio fieldy
	 *
	 * @type {{ url: string, value: string, label: string, valueUrl?: string }}
	 * @memberof IFormFieldSelect
	 */
	restOptions?: { url: string; value: string; label: string; valueUrl?: string };

	chips?: boolean;
}

/**
 *
 *
 * @export
 * @interface IFormfieldOption
 */
export interface IFormfieldOption {
	/**
	 * Hodnota napr. true/false, ano/ne, ...
	 *
	 * @type {string}
	 * @memberof IFormfieldOption
	 */
	value: any;

	/**
	 * Label
	 *
	 * @type {string}
	 * @memberof IFormfieldOption
	 */
	label: string;

	/**
	 * Cely objekt, pokud je treba potreba ukladat dalsi dodatecne veci napr. syscode
	 *
	 * @type {*}
	 * @memberof IFormfieldOption
	 */
	item: any;
}

/**
 *
 *
 * @export
 * @interface IFormFieldRadio
 * @extends {IFormFieldSelect}
 */
export interface IFormFieldRadio extends IFormFieldSelect {
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof IFormFieldRadio
	 */
	inline: boolean;
}

/**
 *
 *
 * @export
 * @interface IFormFieldDatetime
 * @extends {IFormField}
 */
export interface IFormFieldDatetime extends IFormField {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof IFormFieldDatetime
	 */
	maxDate?: string;

	/**
	 *
	 *
	 * @type {string}
	 * @memberof IFormFieldDatetime
	 */
	minDate?: string;

	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof IFormFieldDatetime
	 */
	enableNative?: boolean;
}

/**
 * Interface pro definition field
 * Definition field upravuje jine fieldy na zaklade nastaveni
 *
 * @export
 * @interface IDefinitionField
 */
export interface IDefinitionField {
	/**
	 * Hodnota pro match
	 * napr. 18
	 *
	 * @type {(any | any[])}
	 * @memberof IDefinitionField
	 */
	value: any | any[];

	/**
	 * Operation pro match
	 * napr. $gte
	 *
	 * @type {string}
	 * @memberof IDefinitionField
	 */
	operation: string;

	/**
	 * Atribut pro match napr. formControl[attribute] nebo defaultne formControl.value
	 *
	 * @type {string}
	 * @memberof IDefinitionField
	 */
	attribute?: string;

	/**
	 * Setter meni hodnoty, atributy, adt. zadanych fieldu
	 *
	 * @type {ISetter}
	 * @memberof IDefinitionField
	 */
	set?: ISetter;

	/**
	 * Loader meni endpointy zadanych fieldu
	 *
	 * @type {ISetter}
	 * @memberof IDefinitionField
	 */
	reload?: ISetter;
}

/**
 * Setter interface
 * Rika, co bude upraveno, v jakou hodnotu
 *
 * @export
 * @interface ISetter
 */
export interface ISetter {
	/**
	 * Co se bude menit, upravovat
	 * napr. type, value, adt.
	 *
	 * @type {string}
	 * @memberof ISetter
	 */
	type: string;

	/**
	 * V jakou hodnotu se bude menit
	 * napr. 18, ${formControl.value}, adt.
	 *
	 * @type {*}
	 * @memberof ISetter
	 */
	value: any;

	/**
	 * Nazvy fieldu, ktere se maji upravit
	 * Fieldy muzou byt nastavene jen u multiple verze
	 *
	 * @type {string[]}
	 * @memberof ISetter
	 */
	fields?: string[];

	/**
	 * Dodatecna podminka
	 * Napr. porovnani s dalsim jinym fieldem
	 *
	 * @type {({ value: any | any[], operation: string, fields?: string[] })}
	 * @memberof ISetter
	 */
	condition?: { value: any | any[]; operation: string; fields?: string[] };
}
