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
		const subGroupIds = params.subGroups;
		delete params.subGroups;
		// upravi se atributy
		await keycloak.groups.update({ id: params.id }, params);
		await removeFromGroup(event, params.id, subGroupIds);
		// vytvori se potomci
		const subGroups = await Promise.all(subGroupIds.map(async (groupId) => await GET_GROUP(event, groupId)));
		await Promise.all(subGroups.map(async (group) => await ADD_CHILD_GROUP(event, params.id, group)));
		return await GET_GROUP(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

async function removeFromGroup(event, id: string, subGroupIds: string[]) {
	// nejdriv se odstrani z hlavni skupiny
	const oldGroup = await GET_GROUP(event, id);
	const removedGroups = oldGroup?.subGroups?.filter((group) => subGroupIds?.indexOf(group.id) < 0);
	await Promise.all(removedGroups?.map(async (group) => await DELETE_GROUP(event, group.id)));
	// pak se vytvori nove v root skupine
	await Promise.all(
		removedGroups?.map(async (group) => {
			delete group.id;
			delete group.path;
			return await CREATE_GROUP(event, group);
		})
	);
}

export async function CREATE_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		const { id } = await keycloak.groups.create(params);
		return await GET_GROUP(event, id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function ADD_CHILD_GROUP(event, id: string, params): Promise<void> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		try {
			await keycloak.groups.setOrCreateChild({ id: id }, params);
		} catch (error) {}
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function ADD_ROLE_TO_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.addRealmRoleMappings(params);
		return await GET_GROUP(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}

export async function REMOVE_ROLE_FROM_GROUP(event, params): Promise<any> {
	if (AUTH_CHECK(event, 'realm-management', 'query-groups')) {
		await keycloak.groups.delRealmRoleMappings(params);
		return await GET_GROUP(event, params.id);
	} else {
		throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
	}
}
