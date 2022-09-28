import { GET_GROUP } from '@/server/lib/keycloak/group';

export default defineEventHandler(async (event) => {
	try {
		const result = await GET_GROUP(event, event.context.params.id);
		return {
			result: result,
		};
	} catch (error) {
		const data = { statusCode: 404, message: 'message.not_found', error: error };
		event.res.statusCode = data.statusCode;
		return data;
	}
});
