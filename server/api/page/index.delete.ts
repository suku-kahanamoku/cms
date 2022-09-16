import { DELETE_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			status: 'OK',
			result: await DELETE_DOC('page', body.id),
			msgs: [{ type: 'success', message: 'message.page_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
