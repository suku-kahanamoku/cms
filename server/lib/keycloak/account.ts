import { kcAdmin, kcInit, keycloak } from '@/server/lib/keycloak/init';
import jwt_decode from 'jwt-decode';

export async function IS_LOGGED(event): Promise<boolean> {
	let result = false;
	const token = getCookie(event, 'x-acc-token');
	if (token) {
		try {
			const data = await keycloak.whoAmI.find();
			if (data.userId) {
				result = true;
			}
		} catch (error) {}
	}
	return result;
}

export async function LOGIN(event, username: string, password: string): Promise<any> {
	await login(username, password);
	const data = await keycloak.whoAmI.find();
	if (data.userId && keycloak.accessToken) {
		SET_TOKEN(event, keycloak.accessToken, keycloak.refreshToken, data.userId);
	}
	return {
		...data,
		accessToken: keycloak.accessToken,
		refresToken: keycloak.refreshToken,
	};
}

export async function SIGNUP(event, params): Promise<any> {
	// prihlasi se jako admin
	await login(kcAdmin.username, kcAdmin.password);
	const password = params.password;
	params.enabled = true;
	delete params.password;
	delete params.repeat_pass;
	// vytvori uzivatele
	const { id } = await keycloak.users.create(params);
	// nastavi mu heslo
	await keycloak.users.resetPassword({
		id: id,
		credential: { temporary: false, type: 'password', value: password },
	});
	// prihlasi a vrati prihlaseneho uzivatele
	return await LOGIN(event, params.username, password);
}

export async function LOGOUT(event): Promise<void> {
	const userId = getCookie(event, 'user-id');
	if (userId) {
		keycloak.users.logout({ id: userId });
	}
	SET_TOKEN(event, null);
}

export async function SET_TOKEN(event, accToken: string, refToken?: string, userId?: string) {
	if (accToken) {
		setCookie(event, 'x-acc-token', accToken);
		setCookie(event, 'x-ref-token', refToken);
		setCookie(event, 'user-id', userId);
	} else {
		deleteCookie(event, 'x-acc-token');
		deleteCookie(event, 'x-ref-token');
		deleteCookie(event, 'user-id');
	}
}

export async function AUTH_CHECK(event, roleGroup: string, role: string): Promise<boolean> {
	let result = false;
	if (IS_LOGGED(event)) {
		const token = getCookie(event, 'x-acc-token');
		if (token) {
			const jwt = jwt_decode(token) as any;
			if (jwt) {
				result = jwt.resource_access[roleGroup]?.roles?.indexOf(role) >= 0;
			}
		}
	}
	return result;
}

async function login(username: string, password: string) {
	await keycloak.auth({
		username: username,
		password: password,
		grantType: 'password',
		clientId: kcInit.clientId,
	});
}
