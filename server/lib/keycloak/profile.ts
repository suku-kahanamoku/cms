import { keycloak } from '@/server/lib/keycloak/init';
import { AUTH_CHECK } from '@/server/lib/keycloak/account';
import UserRepresentation from '@keycloak/keycloak-admin-client/lib/defs/userRepresentation';
import GroupRepresentation from '@keycloak/keycloak-admin-client/lib/defs/groupRepresentation';

export async function GET_PROFILES(event, where): Promise<UserRepresentation[]> {
	if (AUTH_CHECK(event, 'realm-management', 'view-users')) {
		return await keycloak.users.find();
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function GET_PROFILE(event, id: string): Promise<UserRepresentation> {
	if (AUTH_CHECK(event, 'realm-management', 'view-users')) {
		const profile = await keycloak.users.findOne({ id: id });
		const groups = await GET_PROFILE_GROUPS(event, id);
		profile.groups = groups.map((group) => group.name);
		return profile;
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

export async function UPDATE_PROFILE(event, params): Promise<UserRepresentation> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		await keycloak.users.update({ id: params.id }, params);
		return await GET_PROFILE(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function CREATE_PROFILE(event, params): Promise<UserRepresentation> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		params.enabled = true;
		const { id } = await keycloak.users.create(params);
		return await GET_PROFILE(event, id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function GET_PROFILE_GROUPS(event, id: string): Promise<GroupRepresentation[]> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		return await keycloak.users.listGroups({ id: id });
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function ADD_GROUP_TO_PROFILE(event, params): Promise<UserRepresentation> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		await keycloak.users.addToGroup(params);
		return await GET_PROFILE(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function REMOVE_PROFILE_FROM_GROUP(event, params): Promise<UserRepresentation> {
	if (AUTH_CHECK(event, 'realm-management', 'manage-users')) {
		await keycloak.users.delFromGroup(params);
		return await GET_PROFILE(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}
