<script setup lang="ts">
	import { ref } from 'vue';

	import {
		IFormField,
		IFormFieldNumber,
		IFormFieldTextarea,
		IFormFieldSelect,
		IFormFieldRadio,
		IFormFieldDatetime,
	} from '@/components/form/field/field.interface';
	import TextField from '@/components/form/field/TextField.vue';
	import TextareaField from '@/components/form/field/TextareaField.vue';
	import SelectField from '@/components/form/field/SelectField.vue';
	import SearchField from '@/components/form/field/SearchField.vue';
	import CheckboxField from '@/components/form/field/Checkbox.vue';
	import RadioField from '@/components/form/field/RadioField.vue';

	const props = defineProps<{
		field:
			| IFormField
			| IFormFieldNumber
			| IFormFieldTextarea
			| IFormFieldSelect
			| IFormFieldRadio
			| IFormFieldDatetime;
		value?: any;
	}>();
</script>

<template>
	<!-- todo - je to urcene jen pro frontend, pac select field dela neplechu pri navigaci -->
	<client-only>
		<TextareaField v-if="field.type === 'textarea'" :field="(field as IFormFieldTextarea)" :value="value" />
		<SelectField v-else-if="field.type === 'select'" :field="(field as IFormFieldSelect)" :value="value" />
		<SearchField v-else-if="field.type === 'search'" :field="(field as IFormFieldSelect)" :value="value" />
		<CheckboxField v-else-if="field.type === 'checkbox'" :field="(field as IFormFieldRadio)" :value="value" />
		<RadioField v-else-if="field.type === 'radio'" :field="(field as IFormFieldRadio)" :value="value" />
		<template v-else-if="field.type === 'group'">
			<Field v-for="childfield in (field as any).options" :field="childfield" :value="value" />
		</template>
		<TextField v-else :field="field" :value="value" />
	</client-only>
</template>
