<script setup lang="ts">
	import { ref, type Ref, watch } from 'vue';
	import Fill from 'ol/style/Fill.js';
	import Stroke from 'ol/style/Stroke.js';
	import Style from 'ol/style/Style.js';

	import DraggableResizable from '@/components/ol/DraggableResizable.vue';
	import area from '@turf/area';
	import { IArea } from '@/components/ol/ol.interface';
	import Form from '@/components/form/Form.vue';

	const props = defineProps<{
		config: any;
		wrapId: string;
		area: IArea;
	}>();

	const emits = defineEmits(['change']);
	const open: Ref<boolean | undefined> = ref(props.area.config?.open);
	const hover: Ref<boolean | undefined> = ref();

	watch(
		() => props.area.calculate,
		(e) => {
			switch (e?.event) {
				case 'click':
					open.value = !open.value;
					break;

				case 'hover':
					hover.value = e.value;
					break;
			}
		}
	);

	watch(open, (e: boolean | undefined) => {
		console.log(props.area.feature.getProperties());
		if (e) {
			setStyle(props.area);
		} else {
			setStyle(props.area, props.area.style);
		}
	});

	watch(hover, (e: boolean | undefined) => {
		if (!open.value) {
			if (e) {
				setStyle(props.area);
			} else {
				setStyle(props.area, props.area.style);
			}
		}
	});

	/**
	 * Udalosti pri zmene => drag, resize
	 *
	 * @param e
	 */
	function onChange(e: any): void {
		// do configu uliz open stav
		e.open = open.value;
		emits('change', e);
	}

	/**
	 * Nastavi styly dane area
	 *
	 * @param {IArea} area
	 * @param {Style} [style=new Style({
	 * 		fill: new Fill({
	 * 			color: 'rgba(255, 255, 255, 0.4)',
	 * 		}),
	 * 		stroke: new Stroke({
	 * 			color: 'white',
	 * 		}),
	 * 	})]
	 */
	function setStyle(
		area: IArea,
		style: Style = new Style({
			fill: new Fill({
				color: 'rgba(255, 255, 255, 0.4)',
			}),
			stroke: new Stroke({
				color: 'white',
			}),
		})
	): void {
		area.feature?.setStyle(style);
	}

	async function onSubmit(url, form?, fieldConfigs?, loading?, method?: string) {
		
	}
</script>

<template>
	<Teleport v-if="open" :to="`#${wrapId}`">
		<DraggableResizable :config="area.config" @change="onChange" @close="open = false">
			<template v-slot:header>
				{{ area.feature?.getProperties()?.name }}
			</template>
			<template v-slot:body>
				<Form v-if="config" :config="config" @submit="onSubmit" />
			</template>
		</DraggableResizable>
	</Teleport>
</template>

<style></style>
