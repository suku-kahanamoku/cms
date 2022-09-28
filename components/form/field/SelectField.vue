<script setup lang="ts">
	import { ref } from 'vue';

	import { IFormFieldSelect } from '@/components/form/field/field.interface';
	import { IS_DEFINED } from '@/utils/check.functions';

	const props = defineProps<{
		field: IFormFieldSelect;
		value?: any;
	}>();

	const el = ref();
	const rule = ref();
	const fieldValue = ref();
	const loading = ref();

	onMounted(() => {
		// inicializuje regex
		if (props.field?.validation?.pattern) {
			rule.value = new RegExp(props.field.validation.pattern);
		}
		// nastavi defaultni hodnotu
		if (IS_DEFINED(props.field.value)) {
			fieldValue.value = props.field.value;
		}
		// nacte options
		loadOptions(props.field.restOptions);
	});

	watch(
		() => props.value,
		(value) => (fieldValue.value = value)
	);

	async function loadOptions(restOptions?: any): Promise<void> {
		if (restOptions?.url) {
			loading.value = true;
			const options = await useApi(restOptions.url);
			props.field.options = options.map((option) => ({
				value: option[restOptions.value],
				label: option[restOptions.label],
				item: option,
			}));
			loading.value = false;
		}
	}
</script>

<template>
	{{ field.options }}
	<v-select
		ref="el"
		v-model="fieldValue"
		:id="field.name"
		:name="field.name"
		:label="$t(field.label || 'empty') + (field.required ? ' *' : '')"
		:disabled="field.disabled"
		:readonly="field.readonly"
		:density="((field.density || 'comfortable') as any)"
		:variant="((field.variant || 'outlined') as any)"
		:prepend-icon="
			field.icon?.variant !== 'inner' && field.icon?.position !== 'append' ? field.icon?.value : undefined
		"
		:append-icon="
			field.icon?.variant !== 'inner' && field.icon?.position === 'append' ? field.icon.value : undefined
		"
		:prepend-inner-icon="
			field.icon?.variant === 'inner' && field.icon?.position !== 'append' ? field.icon?.value : undefined
		"
		:append-inner-icon="
			field.icon?.variant === 'inner' && field.icon?.position === 'append' ? field.icon.value : undefined
		"
		:rules="[(value) => (!value && field.required ? '' : true)]"
		:chips="field.chips === false ? false : true"
		:multiple="field.multiple"
		:items="field.options?.length ? field.options : []"
		:item-title="(item) => $t(item.label || 'empty')"
		item-value="value"
	/>
</template>
