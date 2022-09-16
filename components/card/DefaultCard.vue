<script setup lang="ts">
	import ConfirmDialog from '@/core/dialog/ConfirmDialog.vue';

	const props = defineProps<{
		data: any;
	}>();

	const emits = defineEmits(['delete']);
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
				<h2 class="mb-0 mt-4 font-weight-regular">
					{{ data?.title ? $t(data?.title) : $t(data?.name || 'empty') }}
				</h2>
				<small>{{ data?.syscode }}</small
				><br />
				<v-row>
					<v-col cols="6">
						<v-btn :to="data?.path" icon="mdi-account-edit" color="primary" />
					</v-col>
					<v-col cols="6">
						<ConfirmDialog @confirm="$event && emits('delete', data)">
							<template v-slot:btn>
								<v-btn icon="mdi-delete" color="error" />
							</template>
							<template v-slot:title>
								{{ $t('method.delete') }}
							</template>
							<template v-slot:text>
								{{
									$t('query.delete', {
										name: data?.title ? $t(data?.title) : $t(data?.name || 'empty'),
									})
								}}
							</template>
						</ConfirmDialog>
					</v-col>
				</v-row>
			</div>
		</v-card-text>
	</v-card>
</template>
