import { VERIFY } from '../lib/firestore';
import Keycloak from 'keycloak-connect';
import session from 'express-session';
import express from 'express';
import serviceKeycloak from '../serviceKeycloak.json';

export default defineEventHandler(async (event) => {
	const app = express();

	const memory = new session.MemoryStore();
	const neco = { store: memory };
	app.use(session(neco));
	const keycloak = new Keycloak(neco, serviceKeycloak as any);

	app.get('/', keycloak.checkSso(), function (e) {
		console.log('aaaaaaaaaaaaaa',e,'bbbbbbbbbbbbbb');
	});

	if (event.req.url.indexOf('/pz') >= 0) {
		const state = await VERIFY(event);
		if (!state) {
			event.res.writeHead(301, { Location: '/login' });
		}
	}
});
