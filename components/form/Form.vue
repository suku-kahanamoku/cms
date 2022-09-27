<script setup lang="ts">
	import Field from '@/components/form/field/Field.vue';
	import { RESOLVE_MARKS, RTRIM } from '@/utils/modify-string.functions';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['load', 'select', 'submit']);
	const route = useRoute();
	const form = ref();
	const loading = ref();
	const panels = ref([0]);
	const item = ref();

	onMounted(process);

	watch(route, process);

	watch(
		() => props.data,
		(value) => (item.value = value)
	);

	async function process(): Promise<void> {
		useResolveUrl(route, props.config);
		load();
	}

	async function load(): Promise<void> {
		loading.value = true;
		const url = RTRIM(RESOLVE_MARKS(props.config.restUrl, { route: route }), '/');
		const result = await useLoad(url);
		emits('load', result);
		if (route.params.id?.length) {
			item.value = result?.find((item) => item?.id === route.params.id[0]);
			emits('select', item);
		}
		loading.value = false;
	}

	async function submit(): Promise<void> {
		loading.value = true;
		const url = RTRIM(RESOLVE_MARKS(props.config.submitUrl, { route: route }), '/');
		const result = await useSubmit(url, form, props.config.fields, props.config.method);
		emits('submit', result);
		loading.value = false;
	}
</script>
<template>
	<v-progress-linear v-if="loading" indeterminate></v-progress-linear>

	<v-form ref="form" @submit.prevent="submit">
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
							<Field :field="field" :value="field.value" />
						</v-col>
					</v-row>
					<v-row>
						<v-spacer />
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
						<Field :field="field" :value="item && item[field.name]" />
					</v-col>
				</v-row>
			</v-card-text>
			<v-card-actions>
				<v-spacer />
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
				<Field :field="field" :value="loading === false && field.value" />
			</v-col>
		</v-row>
	</v-form>
</template>
