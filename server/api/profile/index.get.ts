import { AUTH_USE_PROJECTION, AUTH_CHECK, GET_ENCODED_ROLES, GET_PROFILES } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const roles = await GET_ENCODED_ROLES(event);
		if (!AUTH_CHECK(event, roles)) {
			throw createError({ statusCode: 403, statusMessage: 'message.permission_error' });
		}
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		let result = await GET_PROFILES(where);
		result = result.filter((item) => AUTH_CHECK(event, roles, item.syscode));
		return {
			result: AUTH_USE_PROJECTION(event, roles, result),
		};
	} catch (error) {
		const data =
			error.statusCode === 500
				? { statusCode: 404, statusMessage: 'message.not_found', message: 'message.not_found', error: error }
				: error;
		event.res.statusCode = data.statusCode;
		return data;
	}
});
