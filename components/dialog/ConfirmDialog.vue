<script setup lang="ts">
	const dialog = ref(false);

	const emits = defineEmits(['confirm']);

	function onConfirm(e: boolean) {
		emits('confirm', e);
		dialog.value = false;
	}
</script>

<template>
	<v-dialog v-model="dialog" width="400" persistent>
		<template v-slot:activator="{ props }">
			<span v-bind="props">
				<slot name="btn" />
			</span>
		</template>

		<v-card>
			<v-toolbar dark color="primary">
				<v-toolbar-title>
					<slot name="title" />
				</v-toolbar-title>
			</v-toolbar>

			<v-card-text>
				<slot name="text" />
			</v-card-text>

			<v-divider></v-divider>

			<v-card-actions class="pb-3">
				<v-btn color="primary" text @click="onConfirm(true)">
					{{ $t('btn.yes') }}
				</v-btn>
				<v-spacer></v-spacer>
				<v-btn color="primary" text @click="onConfirm(false)">
					{{ $t('btn.no') }}
				</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>
