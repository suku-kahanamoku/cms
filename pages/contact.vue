<script setup lang="ts">
	import Form from '@/core/form/Form.vue';

	definePageMeta({
		title: 'route.contact',
		pos: 3,
	});
</script>
<template>
	<div>
		{{ $kc?.hasResourceRole('client-test-role') }}
	</div>
</template>
