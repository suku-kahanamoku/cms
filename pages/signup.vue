<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import signupConfig from '@/assets/data/configs/signup.json';
	import { CLONE } from '@/utils/modify-object.function';

	definePageMeta({
		title: 'route.signup',
		visible: false,
		icon: {
			value: 'mdi-account',
		},
	});

	const config = CLONE(signupConfig);

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
