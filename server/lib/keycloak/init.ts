import KeycloakAdminClient from '@keycloak/keycloak-admin-client';

export const kcInit = JSON.parse(process.env.KEYCLOAK || '{}');
export const kcAdmin = JSON.parse(process.env.KEYCLOAK_ADMIN || '{}');

export const keycloak = new KeycloakAdminClient({
	baseUrl: kcInit.url,
	realmName: kcInit.realm,
});
