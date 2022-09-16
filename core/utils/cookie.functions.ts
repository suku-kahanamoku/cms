/**
 * Nastavi cookie
 *
 * @export
 * @param {string} cname
 * @param {*} cvalue
 * @param {number} [exdays=1]
 * @param {string} [path='/']
 * @param {boolean} [secure]
 * @param {string} [site]
 */
export function SET_COOKIE(
	cname: string,
	cvalue: any,
	exdays: number = 1,
	path: string = '/',
	secure?: boolean,
	site?: string
): void {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	const expires = `expires=${d.toUTCString()}`;
	const secureStr = secure ? `;Secure=${secure}` : '';
	const siteStr = site ? `;SameSite=${site}` : '';
	document.cookie = `${cname}=${cvalue};${expires};path=${path}${secureStr}${siteStr}`;
}

/**
 * Vrati cookie
 *
 * @export
 * @param {string} cname
 * @return {*}  {*}
 */
export function GET_COOKIE(cname: string): any {
	const name = `${cname}=`;
	const ca = document.cookie.split(';');
	for (let i = 0; i < ca.length; i++) {
		let c = ca[i];
		while (c.charAt(0) == ' ') {
			c = c.substring(1);
		}
		if (c.indexOf(name) == 0) {
			return c.substring(name.length, c.length);
		}
	}
	return '';
}

/**
 * Vrati vsechny cookies
 *
 * @export
 * @return {*}  {*}
 */
export function GET_COOKIES(): any {
	const pairs = document.cookie.split(';');
	const cookies = {};
	for (let i = 0; i < pairs.length; i++) {
		const pair = pairs[i].split('=');
		/* cookies[(pair[0] + '').trim()] = unescape(pair.slice(1).join('=')); */
	}
	return cookies;
}
