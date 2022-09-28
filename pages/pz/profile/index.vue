<script setup lang="ts">
	import List from '@/components/list/List.vue';
	import listConfig from '@/assets/data/configs/profile/profile_list.json';
	import formConfig from '@/assets/data/configs/profile/profile_create.json';
	import { CLONE } from '@/utils/modify-object.function';

	definePageMeta({
		syscode: 'profile',
		title: 'route.profile',
		icon: {
			value: 'mdi-account',
		},
	});

	const config = CLONE(listConfig);
	const configForm = CLONE(formConfig);
	const route = useRoute();
	const data = ref([]);
	const loading = ref();
	const tab = ref();

	onMounted(() => {
		load(config.restUrl);
	});

	async function load(url: string) {
		loading.value = true;
		const result = await useApi(url);
		result?.forEach((item) => {
			item.name = item.username;
			item.url = `${route.path}/${item.id}`;
		});
		data.value = result;
		loading.value = false;
	}

	async function onDelete(item) {
		if (item?.id) {
			const result = await useSubmit(`${config.restUrl}/${item.id}`, null, null, 'DELETE');
			if (result?.status === 'OK') {
				load(config.restUrl);
			}
		}
	}

	function onSubmit(item) {
		if (item?.id) {
			navigateTo(`${route.path}/${item.id}`);
		}
	}
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab value="list">{{ $t('info.list') }}</v-tab>
			<v-tab value="create">{{ $t('btn.create') }}</v-tab>
		</v-tabs>

		<v-window v-model="tab" class="pa-1">
			<v-window-item value="list">
				<v-progress-linear v-if="loading" indeterminate></v-progress-linear>
				<List v-if="loading === false" :config="config" :data="data" @delete="onDelete" />
			</v-window-item>
			<v-window-item value="create">
				<Form :config="configForm" @submit="onSubmit" />
			</v-window-item>
		</v-window>
	</div>
</template>
