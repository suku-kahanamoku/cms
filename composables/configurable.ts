export async function loadConfigs(syscodes: string[], loading): Promise<any> {
	let result;
	if (syscodes?.length) {
		loading.value = false;
		try {
			result = await useApi(
				`/api/component?where={"syscode":{"value":["${syscodes?.join('","')}"],"operator":{"value":"in"}}}`
			);
		} catch (error) {
			console.error;
		}
		loading.value = true;
	}
	return result;
}
