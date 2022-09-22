import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

const config: KeycloakConfig = {
	url: 'http://localhost:8080',
	realm: 'test',
	clientId: 'client-test',
};

export default defineNuxtPlugin(async (nuxtApp) => {
	const kc = new Keycloak(config);
	// vrati plugin
	return {
		provide: {
			kc: kc,
		},
	};
});
