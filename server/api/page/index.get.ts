import { GET_DOCS, GET_PAGES } from '@/server/lib/firestore';

export default defineEventHandler(async (event) => {
	try {
		const query = useQuery(event.req);
		const where = query.where ? JSON.parse(query.where as any) : null;
		let result;
		if (query.tree) {
			result = await GET_PAGES(event, 'page', where);
		} else {
			result = await GET_DOCS('page', where);
		}
		return {
			result: result,
		};
	} catch (error) {
		const data =
			error.statusCode === 500
				? { statusCode: 404, statusMessage: 'message.not_found', message: 'message.not_found', error: error }
				: error;
		event.res.statusCode = data.statusCode;
		return data;
	}
});
