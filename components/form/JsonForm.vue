<script setup lang="ts">
	import FormController from '@/components/form/Form';
	import { CLONE, ITERATE } from '@/utils/modify-object.function';
	import VueJsoneditor from 'vue3-ts-jsoneditor';

	const props = defineProps<{
		config: any;
		data?: any;
	}>();

	const emits = defineEmits(['submit']);
	const FormControler = new FormController(props.config);
	const changedData = ref('');
	const loading = ref(false);

	const onError = (e) => {
		console.log(e);
	};

	const onFocus = (e) => {
		console.log(e);
	};

	const onBlur = (e) => {
		console.log(e);
	};

	const onSubmit = async () => {
		try {
			// prevede data do json
			const tmpData = CLONE(changedData.value ? JSON.parse(changedData.value) : props.data || {});
			// simulace form struktury
			ITERATE(tmpData, (value, key) => (tmpData[key] = { value: value }));
			const form = {
				value: {
					elements: tmpData,
					// je to valid, pac to nespadlo pri JSON.parse
					validate: () => ({ valid: true }),
				},
			};
			const result = await FormControler.onSubmit(form, loading, props.config.method);
			emits('submit', result);
		} catch (error) {
			console.error(error);
			useToast({ type: 'error', message: 'form.msg.wrong_json' });
		}
	};
</script>

<template>
	<v-card>
		<v-toolbar v-if="config?.title" dark :color="config?.color">
			<v-toolbar-title>{{ $t(config?.title) }}</v-toolbar-title>
		</v-toolbar>
		<v-card-text>
			<VueJsoneditor
				:mainMenuBar="false"
				:mode="config?.mode || 'text'"
				v-model:json="data"
				@change="changedData = $event.text"
				@error="onError"
				@focus="onFocus"
				@blur="onBlur"
			/>
		</v-card-text>
		<v-card-actions>
			<v-spacer></v-spacer>
			<v-btn color="primary" :loading="loading" :disabled="!config.submitUrl" @click="onSubmit">
				{{ $t('btn.send') }}
			</v-btn>
		</v-card-actions>
	</v-card>
</template>
