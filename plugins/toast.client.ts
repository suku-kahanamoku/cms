import Toast from 'vue-toastification';

import 'vue-toastification/dist/index.css';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(Toast);
});
