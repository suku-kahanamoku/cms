import { UPDATE_DOC, UPDATE_PROFILE } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const body = await useBody(event);
		const where = query.where ? JSON.parse(query.where as any) : null;
		return {
			result: await UPDATE_PROFILE(where.id, body),
			msgs: [{ type: 'success', message: 'message.profile_success_updated' }],
		};
	} catch (error) {
		return error;
	}
});
