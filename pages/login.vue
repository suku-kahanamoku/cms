<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		syscode: 'login',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);
	const loading = ref(false);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		const result = await loadConfigs(pageConfig?.configs, loading);
		result?.forEach((tmpConfig) => (configs[tmpConfig.syscode] = tmpConfig));
	});

	function onSubmit(e): void {
		if (e?.uid) {
			setStore('profile', e);
			navigateTo(useState('redirect')?.value || '/pz');
		}
	}
</script>
<template>
	<div>
		<template v-if="Object.keys(configs).length">
			<Form v-for="config in configs" :config="config" @submit="onSubmit" />
		</template>

		<v-alert v-else-if="loading" type="error">{{ $t('message.not_found') }}</v-alert>
	</div>
</template>
