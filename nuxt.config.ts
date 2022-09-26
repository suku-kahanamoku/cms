import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
	/*ssr: false,*/
	build: {
		extractCSS: true,
		transpile: ['vuetify', 'ol', 'vue-toastification'],
	},
	css: ['@/assets/scss/main.scss', 'vuetify/styles'],
	vite: {
		define: {
			'process.env.DEBUG': false,
			'process.env.KEYCLOAK': process.env.KEYCLOAK,
		},
	},
});
