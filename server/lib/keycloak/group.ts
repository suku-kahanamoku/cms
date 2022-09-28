import { keycloak } from '@/server/lib/keycloak/init';
import { AUTH_CHECK } from '@/server/lib/keycloak/account';

export async function GET_GROUPS(event, where): Promise<any[]> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		return await keycloak.groups.find();
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function GET_GROUP(event, id: string): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		return await keycloak.groups.findOne({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function DELETE_GROUP(event, id: string): Promise<void> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.del({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function UPDATE_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.update({ id: params.id }, params);
		return await keycloak.groups.findOne({ id: params.id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function CREATE_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		const { id } = await keycloak.groups.create(params);
		return await keycloak.groups.findOne({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function ADD_CHILD_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.setOrCreateChild({ id: params.parentId }, params);
		return await keycloak.groups.findOne({ id: params.parentId });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function ADD_ROLE_TO_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.addRealmRoleMappings(params);
		return await keycloak.groups.findOne({ id: params.id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function REMOVE_ROLE_FROM_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.delRealmRoleMappings(params);
		return await keycloak.groups.findOne({ id: params.id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}
