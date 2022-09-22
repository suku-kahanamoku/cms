import { useToast } from 'vue-toastification';
import useI18n from '@/composables/useI18n';

function callToast(toast, item): void {
	const $t = useI18n().global.t;
	switch (item?.type) {
		case 'success':
			toast.success($t(item.message || 'empty'), item.options);
			break;
		case 'error':
			toast.error($t(item.message || 'empty'), item.options);
			break;
		case 'warning':
			toast.warning($t(item.message || 'empty'), item.options);
			break;
		default:
			toast.info($t(item.message || 'empty'), item.options);
			break;
	}
}

export default function (data?: any) {
	const toast = useToast();
	// pokud je to pole, projede jednotlive itemy a zavola na kazdem toast
	if (Array.isArray(data)) {
		if (data?.length) {
			data.forEach((item) => callToast(toast, item));
		}
	}
	// zavola 1 toast
	else if (data) {
		callToast(toast, data);
	}
	return toast;
}
