<script setup lang="ts">
	import Form from '@/components/form/Form.vue';
	import { GET_MARK } from '@/utils/modify-string.functions';
	import { IS_OBJECT } from '@/utils/check.functions';

	definePageMeta({
		syscode: 'profile',
		title: 'route.profile',
		icon: {
			value: 'mdi-account',
		},
	});
</script>

<template>
	<div>profile</div>
</template>
