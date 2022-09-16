import { CREATE_PROFILE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			result: await CREATE_PROFILE(body),
			msgs: [{ type: 'success', message: 'message.profile_success_created' }],
		};
	} catch (error) {
		return error;
	}
});
