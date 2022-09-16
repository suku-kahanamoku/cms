import Keycloak from 'keycloak-backend';
import serviceKeycloak from '../serviceKeycloak.json';

export async function INIT_KEYCLOAK() {
	const token = Keycloak(serviceKeycloak);
	return await token;
}
