import { DELETE_PROFILE } from '@/server/lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		return {
			status: 'OK',
			result: await DELETE_PROFILE(event, event.context.params.id),
			msgs: [{ type: 'success', message: 'message.profile_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
