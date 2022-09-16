<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import { GET_MARK } from '@/core/utils/modify-string.functions';
	import { IS_OBJECT } from '@/core/utils/check.functions';

	definePageMeta({
		syscode: 'cmp',
	});

	const pageConfig = useState('pageConfig').value as any;
	const configs = reactive({} as any);
	const loading = ref(false);
	const tab = ref(pageConfig?.configs[0]);

	onMounted(async () => {
		// nacte a inicializuje konfigurace pro vnitrni komponenty
		const result = await loadConfigs(pageConfig?.configs, loading);
		result?.forEach((tmpConfig) => (configs[tmpConfig.syscode] = tmpConfig));
	});

	function onLoad(e): void {
		e?.forEach((item) => (item.path = `${pageConfig?.path}/${item.id}`));
	}

	function onSubmit(e): void {
		if (e) {
			if (IS_OBJECT(e)) {
				navigateTo(`${pageConfig?.path}/${e.id}`);
			} else {
				navigateTo(pageConfig?.path + GET_MARK(pageConfig?.path) + e);
			}
		}
	}
</script>

<template>
	<div>
		<template v-if="Object.keys(configs).length">
			<v-tabs v-model="tab" background-color="primary">
				<v-tab v-for="syscode in pageConfig?.configs" :value="syscode">{{
					$t(configs[syscode]?.title || 'empty')
				}}</v-tab>
			</v-tabs>

			<v-window v-model="tab">
				<v-window-item v-for="syscode in pageConfig?.configs" :value="syscode">
					<Form v-if="configs[syscode]" :config="configs[syscode]" @load="onLoad" @submit="onSubmit" />
				</v-window-item>
			</v-window>
		</template>

		<v-alert v-else-if="loading" type="error">{{ $t('message.not_found') }}</v-alert>
	</div>
</template>
