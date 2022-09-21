import { LOGIN } from '../lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		const result = await LOGIN(event, body.email, body.password);
		return {
			result: result,
			msgs: [{ type: 'success', message: 'message.success_login' }],
		};
	} catch (error) {
		return error;
	}
});
