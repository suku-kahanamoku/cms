import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	/*ssr: false,*/
	build: {
		extractCSS: false,
		transpile: ['vuetify', 'ol', 'vue-toastification'],
	},
	css: ['@/assets/scss/style.scss'],
	vite: {
		define: {
			'process.env.DEBUG': false,
			'process.env.KEYCLOAK': process.env.KEYCLOAK,
		},
	},
});
