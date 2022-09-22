<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import config from '@/assets/data/configs/login.json';

	definePageMeta({
		title: 'route.login',
		visible: false,
		icon: {
			value: 'mdi-login',
		},
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
		<Form :config="config" @submit="onSubmit" />
	</div>
</template>
