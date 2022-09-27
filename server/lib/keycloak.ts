import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import jwt_decode from 'jwt-decode';

const kcInit = JSON.parse(process.env.KEYCLOAK || '{}');
const kcAdmin = JSON.parse(process.env.KEYCLOAK_ADMIN || '{}');

export const keycloak = new KeycloakAdminClient({
	baseUrl: kcInit.url,
	realmName: kcInit.realm,
});

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

export async function GET_PROFILES(event, where): Promise<any[]> {
	if (AUTH_CHECK(event, 'realm-management', 'view-users')) {
		return await keycloak.users.find();
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function GET_PROFILE(event, where, id: string): Promise<any[]> {
	if (AUTH_CHECK(event, 'realm-management', 'view-users')) {
		const users = await GET_PROFILES(event, where);
		return users.find((user) => user.id === id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function DELETE_PROFILE(event, id: string): Promise<void> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		await keycloak.users.del({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function UPDATE_PROFILE(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		await keycloak.users.update({ id: params.id }, params);
		return await keycloak.users.findOne({ id: params.id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function CREATE_PROFILE(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		params.enabled = true;
		delete params.id;
		const { id } = await keycloak.users.create(params);
		return await keycloak.users.findOne({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
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

async function login(username: string, password: string) {
	await keycloak.auth({
		username: username,
		password: password,
		grantType: 'password',
		clientId: kcInit.clientId,
	});
}
