<script setup lang="ts">
	import Form from '@/core/form/Form.vue';
	import config from '@/assets/data/configs/signup.json';

	definePageMeta({
		title: 'route.signup',
		visible: false,
	});

	function onSubmit(e): void {}
</script>
<template>
	<div>
		<Form :config="config" @submit="onSubmit" />
	</div>
</template>
