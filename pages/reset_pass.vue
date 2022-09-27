<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import resetConfig from '@/assets/data/configs/reset_pass.json';
	import { CLONE } from '@/utils/modify-object.function';

	definePageMeta({
		title: 'route.reset_pass',
		visible: false,
		icon: {
			value: 'mdi-key',
		},
	});

	const config = CLONE(resetConfig);

	function onSubmit(e): void {}
</script>
<template>
	<div>
		<Form :config="config" @submit="onSubmit" />
	</div>
</template>
