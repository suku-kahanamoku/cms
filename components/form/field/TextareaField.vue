<script setup lang="ts">
	import { ref } from 'vue';

	import { IFormFieldTextarea } from '@/components/form/field/field.interface';
	import { IS_DEFINED } from '@/utils/check.functions';

	const props = defineProps<{
		config: IFormFieldTextarea;
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
	<v-textarea
		ref="el"
		v-model="fieldValue"
		:type="'textarea'"
		:id="config.name"
		:name="config.name"
		:label="$t(config.label || 'empty') + (config.required ? ' *' : '')"
		:placeholder="$t(config.placeholder || 'empty')"
		:disabled="config.disabled"
		:readonly="config.readonly"
		:autofocus="config.autofocus"
		:counter="config.maxlength"
		:hint="$t(config.hint || 'empty')"
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
		:rules="[
			(value) => (!value && config.required ? '' : true),
			(value) => (rule ? rule.test(value) || $t(config.validation.msg || 'empty') : true),
		]"
		:clearable="config.clearable"
		:rows="config.rows"
	/>
</template>
