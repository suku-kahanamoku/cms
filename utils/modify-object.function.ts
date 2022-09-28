import { IS_DEFINED, IS_OBJECT } from '@/utils/check.functions';
import { TRIM } from '@/utils/modify-string.functions';

/**
 * Naklonuje dany objekt
 *
 * @export
 * @param {*} object
 * @returns
 */
export function CLONE(object: any): any {
	return JSON.parse(JSON.stringify(object) || '{}');
}

/**
 * Dane pole zamicha
 *
 * @export
 * @param {[any]} value
 */
export function SHUFFLE(value: any[]): void {
	for (let i = value.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[value[i], value[j]] = [value[j], value[i]];
	}
}

/**
 * Z daneho pole vybere nahodnou hodnotu
 *
 * @export
 * @param {any[]} value
 * @returns {*}
 */
export function RANDOM(value: any[]): any {
	return value[Math.floor(Math.random() * value.length)];
}

/**
 * Podle zadanych parametru vyfiltruje zadane pole a vrati nove vyfiltrovane pole
 *
 * @export
 * @param {any[]} items
 * @param {string[]} args
 * @param {string} [additional='_id']
 * @returns {(any[] | undefined)}
 */
export function FILTER(items: any[], args: string[], additional: string = '_id'): any[] | undefined {
	if (IS_OBJECT(items)) {
		const resultArray = [];

		if (args?.length) {
			// projede pole objektu
			for (const item of items) {
				// atribut objektu
				const itemProperty = item[additional];
				// pokud atribut je objekt
				if (IS_OBJECT(itemProperty)) {
					// prevede objekt na string a porovna zda v nem neni hledany vyraz
					if (JSON.stringify(itemProperty).match(new RegExp('' + args, 'i'))) {
						resultArray.push(item);
					}
				} else {
					if (IS_DEFINED(item[additional]) && item[additional].match(new RegExp('' + args, 'i'))) {
						resultArray.push(item);
					}
				}
			}
			return resultArray;
		} else {
			return items;
		}
	}
	return undefined;
}

/**
 * Seradi vlastnosti objektu
 *
 * @export
 * @param {*} obj
 * @param {*} sortedBy
 * @param {boolean} [isNumericSort]
 * @param {boolean} [reverse]
 * @param {string} [subParamName]
 * @returns {any[]}
 */
export function SORT(
	obj: any,
	sortedBy: string | number,
	isNumericSort?: boolean,
	reverse?: boolean,
	subParamName?: string
): any[] {
	sortedBy = sortedBy || 1; // by default first key
	isNumericSort = isNumericSort || false; // by default text sort

	const reversed = reverse ? -1 : 1;

	const sortable: any = [];
	ITERATE(obj, (value, key) => sortable.push([key, value]));

	if (isNumericSort) {
		if (subParamName) {
			sortable.sort((a: any, b: any) => {
				if (a[1].hasOwnProperty(subParamName) && b[1].hasOwnProperty(subParamName)) {
					return reversed * (a[1][subParamName][sortedBy] - b[1][subParamName][sortedBy]);
				}
			});
		} else {
			sortable.sort((a: any, b: any) => reversed * (a[1][sortedBy] - b[1][sortedBy]));
		}
	} else {
		if (subParamName) {
			sortable.sort((a: any, b: any) => {
				if (a[1].hasOwnProperty(subParamName) && b[1].hasOwnProperty(subParamName)) {
					if (a[1][subParamName][sortedBy] && b[1][subParamName][sortedBy]) {
						const x = a[1][subParamName][sortedBy].toLowerCase(),
							y = b[1][subParamName][sortedBy].toLowerCase();
						return x < y ? reversed * -1 : x > y ? reversed : 0;
					}
				}
			});
		} else {
			sortable.sort((a: any, b: any) => {
				if (a[1][sortedBy] && b[1][sortedBy]) {
					const x = a[1][sortedBy].toLowerCase(),
						y = b[1][sortedBy].toLowerCase();
					return x < y ? reversed * -1 : x > y ? reversed : 0;
				}
			});
		}
	}

	return sortable;
}

/**
 * Nalezne prunik
 *
 * @export
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {string[]}
 */
export function INTERSECTION(arr1: string[], arr2: string[]): string[] {
	return arr1.filter((value) => arr2.indexOf(value) >= 0);
}

/**
 * Nalezne rozdil
 *
 * @export
 * @param {string[]} arr1
 * @param {string[]} arr2
 * @returns {string[]}
 */
export function DIFFERENCE(arr1: string[], arr2: string[]): string[] {
	return arr1.filter((value) => arr2.indexOf(value) < 0);
}

/**
 * Iteruje objekt
 *
 * @export
 * @param {*} obj
 * @param {(value: any, key: string, index?: number) => void} callback
 */
export function ITERATE(obj: any, callback: (value: any, key: string, index?: number) => void): void {
	if (obj && (IS_OBJECT(obj) || Array.isArray(obj))) {
		let index = 0;
		for (const key in obj) {
			if (obj.hasOwnProperty(key)) {
				callback(obj[key], key);
				index++;
			}
		}
	}
}

/**
 * Vrati hodnotu z viceurovnoveho objektu
 * data: {
 *  params: {
 *   fields: {
 *    firstname: 'Jan'
 *   }
 *  }
 * }
 * GET_VALUE(data, 'firstname', 'params#fields', '#')
 *
 * @export
 * @param {*} data
 * @param {string} name
 * @param {string} [path]
 * @param {string} [delimiter='.']
 * @returns {*}
 */
export function GET_VALUE(data: any, name: string, path?: string, delimiter: string = '.'): any {
	let value;
	if (data && IS_DEFINED(name)) {
		if (path) {
			value = path.split(delimiter).reduce((accum, curr) => (accum && accum[curr]) || accum, data) || {};
			value = value[name];
		} else {
			if (IS_DEFINED(data[name])) {
				value = data[name];
			}
		}
	}
	return IS_DEFINED(value) && TRIM(value.toString()).length ? value : undefined;
}

/**
 * Mergne dva objekty a vrati jeden
 *
 * @export
 * @param {*} target
 * @param {*} source
 * @returns {*}
 */
export function MERGE(target: any, source: any): any {
	// Iterate through `source` properties and if an `Object` set property to merge of `target` and `source` properties
	for (const key of Object.keys(source))
		if (target && source[key] instanceof Object) {
			Object.assign(source[key], MERGE(target[key], source[key]));
		}
	// Join `target` and modified `source`
	Object.assign(target || {}, source);
	return target;
}
