<script setup lang="ts">
	import List from '@/components/list/List.vue';
	import config from '@/assets/data/configs/profile_list.json';

	definePageMeta({
		syscode: 'profile',
		title: 'route.profile',
		icon: {
			value: 'mdi-account',
		},
	});

	const route = useRoute();
	const data = ref([]);
	const loading = ref();

	onMounted(() => {
		load(config.restUrl);
	});

	async function load(url: string) {
		loading.value = true;
		const result = await useApi(url);
		result.forEach((item) => {
			item.name = item.username;
			item.path = `${route.path}/${item.id}`;
		});
		data.value = result;
		loading.value = false;
	}

	async function onDelete(item) {
		const result = await useApi(`${config.restUrl}/${item.id}`, { method: 'DELETE' });
		if (result?.status === 'OK') {
			load(config.restUrl);
		}
	}
</script>

<template>
	<div>
		<v-progress-linear v-if="loading" indeterminate></v-progress-linear>

		<List v-if="loading === false" :config="config" :data="data" @delete="onDelete" />
	</div>
</template>
