import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import jwt_decode from 'jwt-decode';

const kcInit = JSON.parse(process.env.KEYCLOAK);

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
	await keycloak.auth({
		username: username,
		password: password,
		grantType: 'password',
		clientId: kcInit.clientId,
	});
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
	params.enabled = true;
	return await keycloak.users.create(params);
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

export async function LOGOUT(event): Promise<void> {
	const userId = getCookie(event, 'user-id');
	if (userId) {
		keycloak.users.logout({ id: userId });
	}
	SET_TOKEN(event, null);
}

export async function GET_PROFILES(event, where): Promise<any[]> {
	return await keycloak.users.find();
	if (AUTH_CHECK(event, 'realm-management', 'view-users')) {
		return await keycloak.users.find();
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
