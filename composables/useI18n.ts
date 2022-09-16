import { createI18n } from 'vue-i18n';

import en from '@/assets/locales/en.json';
import cs from '@/assets/locales/cs.json';

export default function () {
	return createI18n({
		legacy: false,
		globalInjection: true,
		locale: 'en',
		messages: {
			en: en,
			cs: cs,
		},
	});
}
