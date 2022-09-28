import { keycloak } from '../lib/keycloak/init';
import { IS_LOGGED, LOGOUT } from '@/server/lib/keycloak/account';

export default defineEventHandler(async (event) => {
	const token = getCookie(event, 'x-acc-token');
	if (token) {
		keycloak.setAccessToken(token);
	}
	if (event.req.url.indexOf('/pz') >= 0) {
		const isLogged = await IS_LOGGED(event);
		if (!isLogged) {
			await LOGOUT(event);
			event.res.writeHead(302, { Location: '/login' });
		}
	}
});
