<script setup lang="ts">
	import { ref } from 'vue';
	import VueDraggableResizable from 'vue-draggable-resizable/src/components/vue-draggable-resizable.vue';

	import type { IDraggableResizable } from '@/components/ol/ol.interface';

	const props = defineProps<{
		config?: IDraggableResizable | any;
	}>();

	const emits = defineEmits(['change', 'drag', 'resize', 'close']);

	const el = ref();

	function onChange(e: any): void {
		emits('change', e.value.$data);
	}

	function onDrag(x: number, y: number): void {
		emits('drag', x, y);
		onChange(el);
	}

	function onResize(x: number, y: number): void {
		emits('resize', x, y);
		onChange(el);
	}
</script>

<template>
	<VueDraggableResizable
		ref="el"
		:z="config?.z || 1"
		:x="config?.x"
		:y="config?.y"
		:w="config?.w"
		:h="config?.h || 'auto'"
		:minWidth="config?.minWidth"
		:minHeight="config?.minHeight"
		:maxWidth="config?.maxWidth"
		:maxHeight="config?.maxHeight"
		:parent="true"
		:draggable="config?.draggable"
		:resizable="config?.resizable"
		@dragstop="onDrag"
		@resizestop="onResize"
	>
		<slot>
			<v-card>
				<template v-slot:title>
					<slot name="header">...</slot>
					<v-btn @click="emits('close')">X</v-btn>
				</template>
				<template v-slot:text>
					<slot name="body">...</slot>
				</template>
			</v-card>
		</slot>
	</VueDraggableResizable>
</template>

<style scoped>
	.draggable.active {
		z-index: 9999 !important;
	}

	.draggable {
		cursor: grab;
		border: none;
		transition: box-shadow 0.3s ease;
	}

	.draggable:active {
		cursor: grabbing;
		box-shadow: 0 10px 10px 10px rgb(0 0 0 / 7%);
	}
</style>
