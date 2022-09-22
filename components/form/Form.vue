<script setup lang="ts">
	import Field from '@/components/form/field/Field.vue';
	import Form from '@/components/form/Form';
	import List from '@/components/list/List.vue';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['load', 'select', 'submit']);
	const FormControler = new Form(props.config);
	const form = ref();
	const loading = ref(false);
	const panels = ref([0]);

	watch(
		() => props.data,
		(data) => FormControler.load(null, data)
	);
	watch(FormControler.items, (items) => emits('load', items));
	watch(FormControler.item, (item) => {
		props.config?.fields?.forEach((field) => (field.value = item[field.name]));
		emits('select', item);
	});

	async function onSubmit() {
		const result = await FormControler.onSubmit(form, loading, props.config.method);
		if (props.config.method === 'GET') {
			emits('submit', props.config?.syscode + '=' + result);
		} else {
			emits('submit', result);
		}
	}

	async function onDelete(e) {
		const result = await FormControler.onSubmit(e, loading, 'DELETE');
		if (result?.status === 'OK') {
			FormControler.process();
		}
	}
</script>
<template>
	<v-progress-linear v-if="loading" indeterminate></v-progress-linear>

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
							<Field :config="field" :value="field.value" />
						</v-col>
					</v-row>
					<v-row>
						<v-spacer></v-spacer>
						<v-btn color="primary" type="submit" :loading="loading" :disabled="!config?.submitUrl">
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
						<Field :config="field" :value="field.value" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn color="primary" type="submit" :loading="loading" :disabled="!config?.submitUrl">
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
				<Field :config="field" :value="field.value" />
			</v-col>
		</v-row>
	</v-form>

	<div class="mt-9">
		<List
			v-if="!FormControler.route.params.id?.length && FormControler?.items?.value"
			:config="config"
			:data="FormControler.items.value"
			@delete="onDelete"
		/>
	</div>
</template>
