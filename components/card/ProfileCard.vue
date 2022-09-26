<script setup lang="ts">
	import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';

	const props = defineProps<{
		data: any;
	}>();

	const emits = defineEmits(['delete']);
</script>

<template>
	<v-card>
		<img src="@/assets/images/user-info.jpg" class="w-100" />
		<div class="d-flex justify-center mt-n15">
			<v-avatar size="100">
				<img src="@/assets/images/1.jpg" width="100" alt="user" />
			</v-avatar>
		</div>
		<v-card-text>
			<div class="p-4 text-center justify-center">
				<h2 class="mb-0 mt-4 font-weight-regular">{{ data?.firstName }} {{ data?.lastName }}</h2>
				<small>{{ data?.email }}</small>
			</div>
		</v-card-text>
		<v-card-actions class="d-flex justify-center">
			<v-btn :to="data.path" icon="mdi-account-edit" color="primary" />
			<ConfirmDialog @confirm="$event && emits('delete', data)">
				<template v-slot:btn>
					<v-btn icon="mdi-delete" color="error" />
				</template>
				<template v-slot:title>
					{{ $t('method.delete') }}
				</template>
				<template v-slot:text>
					{{ $t('query.delete', { name: data?.firstName + '&nbsp;' + data?.lastName }) }}
				</template>
			</ConfirmDialog>
		</v-card-actions>
	</v-card>
</template>
