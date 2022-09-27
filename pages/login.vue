<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import loginConfig from '@/assets/data/configs/login.json';
	import { CLONE } from '@/utils/modify-object.function';

	definePageMeta({
		title: 'route.login',
		visible: false,
		icon: {
			value: 'mdi-login',
		},
	});

	const config = CLONE(loginConfig);

	function onSubmit(e): void {
		if (e?.userId) {
			setStore('profile', e);
			navigateTo(useState('redirect')?.value || '/pz');
		}
	}
</script>
<template>
	<div>
		<Form :config="config" @submit="onSubmit" />
	</div>
</template>
