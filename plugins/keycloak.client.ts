import Keycloak, { KeycloakConfig, KeycloakInitOptions } from 'keycloak-js';

const config: KeycloakConfig = {
	url: 'http://localhost:8080',
	realm: 'test',
	clientId: 'client-test',
};

const options: KeycloakInitOptions = {
	onLoad: 'check-sso',
	silentCheckSsoRedirectUri: window.location.origin + '/silent-check-sso.html',
	checkLoginIframe: false,
	token: useCookie('x-ref-token').value,
};

export default defineNuxtPlugin(async (nuxtApp) => {
	const kc = new Keycloak(config);
	// zavola init
	await kc
		.init(options)
		.then((auth) => {
			if (!auth) {
				/*kc.login();*/
				
			}
		})
		.catch(() => {
			console.error('Authenticated Failed');
		});
	// vrati plugin
	return {
		provide: {
			kc: kc,
		},
	};
});
