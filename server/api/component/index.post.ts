import { CREATE_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			result: await CREATE_DOC('component', body),
			msgs: [{ type: 'success', message: 'message.cmp_success_created' }],
		};
	} catch (error) {
		return error;
	}
});
