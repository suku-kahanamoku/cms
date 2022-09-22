/**
 * Kontrola zda dana hodnota obsahuje jenom cislo
 * napr. 0-9
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_NUMERIC(value: any): boolean {
	return !isNaN(value);
}

/**
 * Kontrola zda dana hodnota obsahuje jenom abecedu
 * je zohlednena i 1x mezera mezi kazdymi slovy
 * napr. a-z
 *
 * @export
 * @param {string} value
 * @returns {boolean}
 */
export function IS_ALPHABET(value: string): boolean {
	return /^([A-Za-z\u00C0-\u024F\u1E00-\u1EFF\s]*)$/.test(value);
}

/**
 * Kontrola zda je hodnota definovana
 *
 * @export
 * @param {*} value
 * @returns {boolean}
 */
export function IS_DEFINED(value: any): boolean {
	return typeof value !== 'undefined' && value !== null;
}

/**
 * Kontrola zda je hodnota objekt
 *
 * @export
 * @param {*} item
 * @returns {boolean}
 */
export function IS_OBJECT(item: any): boolean {
	return IS_DEFINED(item) && typeof item === 'object' && !Array.isArray(item);
}

/**
 * Kontrola zda zada hodnota je mezi min a max
 *
 * @export
 * @param {number} value
 * @param {number} min
 * @param {number} max
 * @returns {boolean}
 */
export function IS_IN_RANGE(value: number, min: number, max: number): boolean {
	return min >= value && value < max;
}

/**
 * Kontrola zda build je prerender
 *
 * @export
 * @returns {boolean}
 */
export function IS_PRERENDER(): boolean {
	return (
		window.navigator.userAgent.indexOf('Prerender|') >= 0 ||
		window.navigator.userAgent.indexOf('HeadlessChrome') >= 0
	);
}

/**
 * Kontrola zda se jedna o id
 *
 * @export
 * @param {*} objectid
 * @returns
 */
export function IS_OBJECT_ID(objectid: string) {
	return !objectid ||
		(typeof objectid !== 'string' &&
			(typeof objectid !== 'object' || Array.isArray(objectid) || typeof objectid !== 'function'))
		? false
		: /^[0-9A-F]{24}$/i.test(objectid.toString());
}

/**
 * Kontrola, zda field byl doplnen automaticky prohlizecem
 *
 * @export
 * @param {HTMLElement} field
 * @return {*}  {boolean}
 */
export function DETECT_AUTOFILL(field: HTMLElement): boolean {
	return window.getComputedStyle(field, null).getPropertyValue('appearance') === 'menulist-button';
}
