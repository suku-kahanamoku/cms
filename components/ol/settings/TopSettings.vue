<script setup lang="ts">
	import { onMounted, onUnmounted, reactive, ref, type Ref } from 'vue';

	import Field from '@/components/form/field/Field.vue';
	import type { IFormFieldRadio } from '@/components/form/field/field.interface';

	let timer: NodeJS.Timer;

	const date = new Date();
	const dateTime = reactive({
		hh: date.getHours() as any,
		mm: date.getMinutes() as any,
		ss: date.getSeconds() as any,
		session: 'AM',
	});

	onMounted(() => {
		timer = setInterval(updateDateTime, 1000);
	});

	onUnmounted(() => {
		clearInterval(timer);
	});

	function updateDateTime() {
		let date = new Date();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		if (hours === 0) {
			dateTime.hh = 12;
		}
		if (hours > 12) {
			dateTime.hh = hours - 12;
			dateTime.session = 'PM';
		}

		dateTime.hh = hours < 10 ? `0${hours}` : hours;
		dateTime.mm = minutes < 10 ? `0${minutes}` : minutes;
		dateTime.ss = seconds < 10 ? `0${seconds}` : seconds;
	}

	const speedField = {
		type: 'radio',
		name: 'speed',
		label: 'Speed',
		inline: true,
		value: 2,
		class: 'd-flex align-items-center',
		options: [
			{ label: '1', value: 1 },
			{ label: '2', value: 2 },
			{ label: '3', value: 3 },
			{ label: '4', value: 4 },
			{ label: '5', value: 5 },
		],
	} as IFormFieldRadio;

	const historyField = {
		type: 'radio',
		name: 'history',
		label: 'History',
		inline: true,
		value: 0,
		class: 'd-flex align-items-center',
		options: [
			{ label: '0', value: 0 },
			{ label: '3', value: 3 },
			{ label: '5', value: 5 },
			{ label: '10', value: 10 },
			{ label: '50', value: 50 },
		],
	} as IFormFieldRadio;

	const labelField = {
		type: 'select',
		name: 'label',
		label: 'Label',
		class: 'd-flex align-items-center',
		options: [
			{ label: 'small', value: 'small' },
			{ label: 'medium', value: 'medium' },
			{ label: 'large', value: 'large' },
		],
	} as IFormFieldRadio;
</script>

<template>
	<div>
		<span>{{ dateTime?.hh }}:</span>
		<span>{{ dateTime?.mm }}:</span>
		<span>{{ dateTime?.ss }}</span>
	</div>
	<Field :config="speedField" />
	<Field :config="historyField" />
	<Field :config="labelField" />
</template>

<style scoped></style>
