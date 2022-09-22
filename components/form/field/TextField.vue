<script setup lang="ts">
	import { ref } from 'vue';

	import { IFormField } from '@/components/form/field/field.interface';
	import { IS_DEFINED } from '@/utils/check.functions';

	const props = defineProps<{
		field: IFormField;
		value?: any;
	}>();

	const el = ref();
	const rule = ref();
	const fieldValue = ref();

	onMounted(() => {
		// inicializuje regex
		if (props.field?.validation?.pattern) {
			rule.value = new RegExp(props.field.validation.pattern);
		}
		// nastavi defaultni hodnotu
		if (IS_DEFINED(props.field.value)) {
			fieldValue.value = props.field.value;
		}
	});

	watch(
		() => props.value,
		(value) => (fieldValue.value = value)
	);
</script>

<template>
	<v-text-field
		ref="el"
		v-model="fieldValue"
		:type="field.type || 'text'"
		:id="field.name"
		:name="field.name"
		:label="$t(field.label || 'empty') + (field.required ? ' *' : '')"
		:placeholder="$t(field.placeholder || 'empty')"
		:disabled="field.disabled"
		:readonly="field.readonly"
		:autofocus="field.autofocus"
		:counter="field.maxlength"
		:hint="$t(field.hint || 'empty')"
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
		:rules="[
			(value) => (!value && field.required ? '' : true),
			(value) => (value && rule ? rule.test(value) || $t(field.validation.msg || 'empty') : true),
		]"
		:clearable="field.clearable"
		:autocomplete="field.autocomplete"
	/>
</template>
