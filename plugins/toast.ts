import { createI18n } from 'vue-i18n';
import Toast from 'vue-toastification';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(Toast);
});
