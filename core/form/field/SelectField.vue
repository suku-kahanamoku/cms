<script setup lang="ts">
	import { ref } from 'vue';

	import { IFormFieldSelect } from '@/core/form/field/field.interface';
	import { IS_DEFINED } from '@/core/utils/check.functions';

	const props = defineProps<{
		config: IFormFieldSelect;
		value?: any;
	}>();

	const el = ref();
	const rule = ref();
	const fieldValue = ref();

	onMounted(() => {
		// inicializuje regex
		if (props.config?.validation?.pattern) {
			rule.value = new RegExp(props.config.validation.pattern);
		}
		// nastavi defaultni hodnotu
		if (IS_DEFINED(props.config.value)) {
			fieldValue.value = props.config.value;
		}
		// nacte options
		loadOptions(props.config.restOptions);
	});

	watch(
		() => props.value,
		(value) => (fieldValue.value = value)
	);

	async function loadOptions(restOptions?: any): Promise<void> {
		if (restOptions?.url) {
			const options = await useApi(restOptions.url);
			props.config.options = options.map((option) => ({
				value: option[restOptions.value],
				label: option[restOptions.label],
				item: option,
			}));
		}
	}
</script>

<template>
	<v-select
		ref="el"
		v-model="fieldValue"
		:id="config.name"
		:name="config.name"
		:label="$t(config.label || 'empty') + (config.required ? ' *' : '')"
		:disabled="config.disabled"
		:readonly="config.readonly"
		:density="((config.density || 'comfortable') as any)"
		:variant="((config.variant || 'outlined') as any)"
		:prepend-icon="
			config.icon?.variant !== 'inner' && config.icon?.position !== 'append' ? config.icon?.value : undefined
		"
		:append-icon="
			config.icon?.variant !== 'inner' && config.icon?.position === 'append' ? config.icon.value : undefined
		"
		:prepend-inner-icon="
			config.icon?.variant === 'inner' && config.icon?.position !== 'append' ? config.icon?.value : undefined
		"
		:append-inner-icon="
			config.icon?.variant === 'inner' && config.icon?.position === 'append' ? config.icon.value : undefined
		"
		:rules="[(value) => (!value && config.required ? '' : true)]"
		:chips="config.chips === false ? false : true"
		:multiple="config.multiple"
		:items="config.options"
		:item-title="(item) => $t(item.label || 'empty')"
		item-value="value"
	/>
</template>
