<script setup lang="ts">
	import Form from '@/components/form/Form.vue';

	definePageMeta({
		title: 'route.contact',
		pos: 3,
		icon: {
			value: 'mdi-email',
		},
	});
</script>
<template>
	<div>
		{{ $kc?.hasResourceRole('client-test-role') }}
	</div>
</template>
