import useI18n from '@/composables/useI18n';

export default defineNuxtPlugin(({ vueApp }) => {
	vueApp.use(useI18n());
});
