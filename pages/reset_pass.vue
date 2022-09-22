<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import config from '@/assets/data/configs/reset_pass.json';

	definePageMeta({
		title: 'route.reset_pass',
		visible: false,
		icon: {
			value: 'mdi-key',
		},
	});

	function onSubmit(e): void {}
</script>
<template>
	<div>
		<Form :config="config" @submit="onSubmit" />
	</div>
</template>
