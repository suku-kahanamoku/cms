import { DELETE_GROUP } from '@/server/lib/keycloak/group';

export default defineEventHandler(async (event) => {
	try {
		return {
			status: 'OK',
			result: await DELETE_GROUP(event, event.context.params.id),
			msgs: [{ type: 'success', message: 'message.profile_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
