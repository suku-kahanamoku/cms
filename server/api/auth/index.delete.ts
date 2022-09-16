import { DELETE_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			status: 'OK',
			result: await DELETE_DOC('auth', body.id),
			msgs: [{ type: 'success', message: 'message.auth_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
