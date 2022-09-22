<script setup lang="ts">
	import 'vue-draggable-resizable/dist/VueDraggableResizable.css';
	import { OlService } from '@/components/ol/ol.service';
	import TopSettings from '@/components/ol/settings/TopSettings.vue';
	import BottomSettings from '@/components/ol/settings/BottomSettings.vue';
	import MapContainer from '@/components/ol/MapContainer.vue';

	definePageMeta({
		title: 'route.radar',
		pos: 2,
		icon: {
			value: 'mdi-radar',
		},
	});

	provide('OlService', new OlService());

	const id = 'map-wrapper';
	const ready = ref(false);

	onMounted(() => {
		ready.value = true;
	});
</script>

<template>
	<div class="w-100 h-100">
		<div id="top-menu" class="container-fluid bg-light shadow-sm d-flex justify-content-between align-items-center">
			<TopSettings />
		</div>
		<div :id="id" class="position-relative w-100 h-100">
			<MapContainer :wrapId="id" />
		</div>
		<div
			v-if="ready"
			id="bottom-menu"
			class="container-fluid bg-light shadow bottom-0 d-flex justify-content-between flex-wrap"
		>
			<BottomSettings :wrapId="id" />
		</div>
	</div>
</template>
