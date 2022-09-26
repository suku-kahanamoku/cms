import useToast from '@/composables/useToast';

export default async function (url: string, options?: any): Promise<any> {
	if (url) {
		return await $fetch(url, options)
			.then((data: any) => {
				if (data?.msgs?.length) {
					useToast(data?.msgs);
				}
				return data.result || data;
			})
			.catch((error) => {
				if (error?.data?.msgs?.length) {
					useToast(error?.data?.msgs);
				} else {
					useToast({ type: 'error', message: error?.data?.message || error.message });
				}
				throw new Error(error);
			});
	}
}
