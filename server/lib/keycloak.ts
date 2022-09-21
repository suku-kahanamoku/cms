import KeycloakAdminClient from '@keycloak/keycloak-admin-client';
import jwt_decode from 'jwt-decode';

import init from '../keycloak.json';
import { SET_TOKEN } from './firestore';

export const keycloak = new KeycloakAdminClient(init);

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
		grantType: init.grantType as any,
		clientId: init.clientId,
	});
	const data = await keycloak.whoAmI.find();
	if (data.userId && keycloak.accessToken) {
		SET_TOKEN(event, keycloak.accessToken, data.userId);
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
