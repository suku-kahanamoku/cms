import { LOGIN, SET_TOKEN, GET_ROLES_WITH_AUTHS, ENCODE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const result = await LOGIN(body.email, body.password);
		const roles = await GET_ROLES_WITH_AUTHS(result.role);
		SET_TOKEN(event, result.idToken, null, ENCODE(roles));
		return {
			result: result,
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
