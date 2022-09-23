import Keycloak from 'keycloak-js';

export default defineNuxtPlugin(async (nuxtApp) => {
	const kc = new Keycloak(process.env.KEYCLOAK);
	// vrati plugin
	return {
		provide: {
			kc: kc,
		},
	};
});
