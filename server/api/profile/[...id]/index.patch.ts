import { UPDATE_PROFILE } from '@/server/lib/keycloak';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		body.id = event.context.params.id;
		return {
			result: await UPDATE_PROFILE(event, body),
			msgs: [{ type: 'success', message: 'message.profile_success_updated' }],
		};
	} catch (error) {
		return error;
	}
});
