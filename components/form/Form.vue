<script setup lang="ts">
	import Field from '@/components/form/field/Field.vue';
	import FormController from '@/components/form/formController';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['load', 'select', 'submit']);
	const formController = new FormController(props.config);
	const form = ref();
	const panels = ref([0]);

	watch(
		() => props.data,
		(data) => formController.load(null, data)
	);
	watch(formController.items, (items) => emits('load', items));
	watch(formController.item, (item) => {
		props.config?.fields?.forEach((field) => (field.value = item[field.name]));
		emits('select', item);
	});

	async function onSubmit() {
		const result = await formController.onSubmit(form, props.config.method);
		if (props.config.method === 'GET') {
			emits('submit', props.config?.syscode + '=' + result);
		} else {
			emits('submit', result);
		}
	}
</script>
<template>
	<v-progress-linear v-if="formController.loading.value" indeterminate></v-progress-linear>

	<v-form ref="form" @submit.prevent="onSubmit">
		<v-expansion-panels v-if="config?.theme === 'accordion'" v-model="panels">
			<v-expansion-panel>
				<v-expansion-panel-title v-if="config?.title" dark :color="config?.color">
					{{ $t(config?.title) }}
				</v-expansion-panel-title>
				<v-expansion-panel-text class="py-5">
					<v-row>
						<v-col
							v-for="field in config?.fields"
							:cols="field.cols?.xs"
							:sm="field.cols?.sm"
							:md="field.cols?.md"
							:lg="field.cols?.lg"
						>
							<Field :field="field" :value="formController.loading.value === false && field.value" />
						</v-col>
					</v-row>
					<v-row>
						<v-spacer></v-spacer>
						<v-btn
							color="primary"
							type="submit"
							:loading="formController.loading.value"
							:disabled="!config?.submitUrl"
						>
							{{ $t('btn.send') }}
						</v-btn>
					</v-row>
				</v-expansion-panel-text>
			</v-expansion-panel>
		</v-expansion-panels>

		<v-card v-else-if="config?.theme === 'card'">
			<v-toolbar v-if="config?.title" dark :color="config?.color">
				<v-toolbar-title>{{ $t(config?.title) }}</v-toolbar-title>
			</v-toolbar>
			<v-card-text>
				<v-row>
					<v-col
						v-for="field in config?.fields"
						:cols="field.cols?.xs"
						:sm="field.cols?.sm"
						:md="field.cols?.md"
						:lg="field.cols?.lg"
					>
						<Field :field="field" :value="formController.loading.value === false && field.value" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn
					color="primary"
					type="submit"
					:loading="formController.loading.value"
					:disabled="!config?.submitUrl"
				>
					{{ $t('btn.send') }}
				</v-btn>
			</v-card-actions>
		</v-card>

		<v-row v-else>
			<v-col
				v-for="field in config?.fields"
				:cols="field.cols?.xs"
				:sm="field.cols?.sm"
				:md="field.cols?.md"
				:lg="field.cols?.lg"
			>
				<Field :field="field" :value="formController.loading.value === false && field.value" />
			</v-col>
		</v-row>
	</v-form>
</template>
