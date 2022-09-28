import { CREATE_GROUP } from '@/server/lib/keycloak/group';

export default defineEventHandler(async (event) => {
	try {
		const body = await useBody(event);
		return {
			result: await CREATE_GROUP(event, body),
			msgs: [{ type: 'success', message: 'message.profile_success_created' }],
		};
	} catch (error) {
		return error;
	}
});
