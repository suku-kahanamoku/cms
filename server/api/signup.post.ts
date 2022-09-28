import { SIGNUP } from '@/server/lib/keycloak/account';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const result = await SIGNUP(event, body);
		return {
			result: result,
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
