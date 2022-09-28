import { LOGOUT } from '@/server/lib/keycloak/account';

export default defineEventHandler(async (event) => {
	try {
		await LOGOUT(event);
		return { status: 'OK', msgs: [{ type: 'success', message: 'message.success_logout' }] };
	} catch (error) {
		const data = { statusCode: 404, message: 'message.not_found', error: error };
		event.res.statusCode = data.statusCode;
		return data;
	}
});
