<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import JsonForm from '@/components/form/JsonForm.vue';
	import profileConfig from '@/assets/data/configs/profile/profile.json';
	import jsonConfig from '@/assets/data/configs/profile/profile_json.json';
	import { CLONE } from '@/utils/modify-object.function';

	definePageMeta({
		title: 'route.profile_detail',
		visible: false,
		icon: {
			value: 'mdi-cog',
		},
	});

	const config = CLONE(profileConfig);
	const configJson = CLONE(jsonConfig);
	const item = ref();
	const tab = ref();
</script>

<template>
	<div>
		<v-tabs v-model="tab" background-color="primary">
			<v-tab value="form">{{ $t('info.form') }}</v-tab>
			<v-tab value="json">{{ $t('info.json') }}</v-tab>
		</v-tabs>

		<v-window v-model="tab" class="pa-1">
			<v-window-item value="form">
				<Form :config="config" :data="item" @submit="item = $event" @select="item = $event" />
			</v-window-item>
			<v-window-item value="json">
				<JsonForm :config="configJson" :data="item" @submit="item = $event" />
			</v-window-item>
		</v-window>
	</div>
</template>
