import { UPDATE_GROUP } from '@/server/lib/keycloak/group';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		body.id = event.context.params.id;
		return {
			result: await UPDATE_GROUP(event, body),
			msgs: [{ type: 'success', message: 'message.profile_success_updated' }],
		};
	} catch (error) {
		return error;
	}
});
