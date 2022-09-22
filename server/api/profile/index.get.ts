import { GET_PROFILES } from '@/server/lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		const result = await GET_PROFILES(event, where);
		return {
			result: result,
		};
	} catch (error) {
		const data = { statusCode: 404, message: 'message.not_found', error: error };
		event.res.statusCode = data.statusCode;
		return data;
	}
});
