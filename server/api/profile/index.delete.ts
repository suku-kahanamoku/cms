import { DELETE_PROFILE } from '~~/server/lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			status: 'OK',
			result: await DELETE_PROFILE(event, body.id),
			msgs: [{ type: 'success', message: 'message.profile_success_deleted' }],
		};
	} catch (error) {
		return error;
	}
});
