<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import JsonForm from '@/components/form/JsonForm.vue';
	import config from '@/assets/data/configs/profile.json';
	import configJson from '@/assets/data/configs/profile_json.json';

	definePageMeta({
		title: 'route.profile_detail',
		visible: false,
		icon: {
			value: 'mdi-cog',
		},
	});

	const data = ref();
	const tab = ref();
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab value="form">{{ $t('') }}</v-tab>
			<v-tab value="json">{{ $t('') }}</v-tab>
		</v-tabs>

		<v-window v-model="tab">
			<v-window-item value="form">
				<Form :config="config" :data="data" @load="data = $event" @submit="data = [$event]" />
			</v-window-item>
			<v-window-item value="form">
				<JsonForm :config="configJson" :data="data[0]" @submit="data = [$event]" />
			</v-window-item>
		</v-window>
	</div>
</template>
