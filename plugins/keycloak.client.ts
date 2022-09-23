import Keycloak from 'keycloak-js';

export default defineNuxtPlugin(async (nuxtApp) => {
	return {
		provide: {
			kc: new Keycloak(process.env.KEYCLOAK),
		},
	};
});
