import { UPDATE_DOC } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const body = await useBody(event);
		const where = query.where ? JSON.parse(query.where as any) : null;
		return {
			result: await UPDATE_DOC('component', where.id, body),
			msgs: [{ type: 'success', message: 'message.cmp_success_updated' }],
		};
	} catch (error) {
		return error;
	}
});
