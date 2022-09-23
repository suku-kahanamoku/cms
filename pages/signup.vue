<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import config from '@/assets/data/configs/signup.json';

	definePageMeta({
		title: 'route.signup',
		visible: false,
		icon: {
			value: 'mdi-account',
		},
	});

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
