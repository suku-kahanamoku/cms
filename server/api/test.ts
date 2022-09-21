import { GET_PROFILES } from '../lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		const result = await GET_PROFILES(event, {});
		return {
			result: result,
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
