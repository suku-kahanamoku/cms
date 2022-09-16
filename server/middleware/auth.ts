import { VERIFY } from '../lib/firestore';

export default defineEventHandler(async (event) => {
	if (event.req.url.indexOf('/pz') >= 0) {
		const state = await VERIFY(event);
		if (!state) {
			event.res.writeHead(301, { Location: '/login' });
		}
	}
});
