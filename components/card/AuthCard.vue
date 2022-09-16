<script setup lang="ts">
	const props = defineProps<{
		data: any;
	}>();

	const emits = defineEmits(['delete']);

	const pages = useState('pages') as any;
</script>

<template>
	<v-card>
		<img src="@/assets/images/background/login-register.jpg" class="w-100" />
		<div class="d-flex justify-center mt-n15">
			<v-avatar size="100">
				<img src="@/assets/images/users/1.jpg" width="100" alt="user" />
			</v-avatar>
		</div>
		<v-card-text>
			<div class="p-4 text-center justify-center">
				<h2 class="mb-0 mt-4 font-weight-regular">{{ data?.name }}</h2>
				<small>{{ data?.syscode }}</small
				><br />
				<v-btn :to="pages?.auth?.path + '/' + data?.id" icon="mdi-account-edit" color="primary" />
				<v-btn icon="mdi-delete" color="error" @click="emits('delete', data)" />
			</div>
		</v-card-text>
	</v-card>
</template>
