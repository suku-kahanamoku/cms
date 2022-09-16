import { LOGOUT } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		LOGOUT(event);
		return { status: 'OK', msgs: [{ type: 'success', message: 'message.success_logout' }] };
	} catch (error) {
		const data =
			error.statusCode === 500
				? { statusCode: 404, statusMessage: 'message.not_found', message: 'message.not_found', error: error }
				: error;
		event.res.statusCode = data.statusCode;
		return data;
	}
});
