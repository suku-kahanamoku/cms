<script setup lang="ts">
	import { ref } from 'vue';

	import { IFormFieldRadio } from '@/core/form/field/field.interface';
	import { IS_DEFINED } from '@/core/utils/check.functions';

	const props = defineProps<{
		config: IFormFieldRadio;
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
	});

	watch(
		() => props.value,
		(value) => (fieldValue.value = value)
	);
</script>

<template>
	<v-checkbox
		ref="el"
		v-model="fieldValue"
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
		:multiple="config.multiple"
		:inline="config.inline"
	/>
</template>
