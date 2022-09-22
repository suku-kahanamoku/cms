<script setup lang="ts">
	import { inject, onMounted, ref, type Ref } from 'vue';
	import type { FeatureCollection } from '@turf/turf';
	import Map from 'ol/Map';
	import type Style from 'ol/style/Style';
	import 'ol/ol.css';

	import { OlService } from '@/components/ol/ol.service';
	import Area from '@/components/ol/Area.vue';
	import type { IArea, IDraggableResizable } from '@/components/ol/ol.interface';
	import * as data from '@/assets/data/cityspaces.json';

	const props = defineProps<{
		wrapId: string;
	}>();

	const olService = inject('OlService') as OlService;
	const map: Ref<Map | undefined> = ref();
	const areas: Ref<IArea[] | undefined> = ref();
	const hoveredArea: Ref<IArea | undefined> = ref();
	const areaConfig: any = ref();

	onMounted(async () => {
		areaConfig.value = (await useApi('/api/component?where={"syscode":"area"}'))[0];
		initMap();
		initAreas();
		listenClick();
		listenHover();
	});

	/**
	 * Inicializuje mapu
	 */
	function initMap(): void {
		map.value = new Map({
			target: 'map',
			layers: [olService.createTileLayer()],
			view: olService.createView(),
		});
	}

	/**
	 * Inicializuje vsechny area
	 */
	function initAreas(): void {
		// bude load na json data
		const features = olService.createFeaturesFromGeoJson(data as FeatureCollection) as any;
		map.value?.addLayer(olService.createVectorLayer(features));
		areas.value = features.map((feature) => ({
			feature: feature,
			style: feature.getStyle() as Style,
			config: {
				w: 400,
				h: 400,
			},
		}));
	}

	/**
	 * click na feature
	 */
	function listenClick(): void {
		// na klik, posle signal potomkovi, aby provedl patricne operace na klik
		map.value?.on('click', (e) => {
			map.value?.forEachFeatureAtPixel(e.pixel, (feature: any) => {
				const area = getArea(feature.ol_uid);
				if (area) {
					area.calculate = { event: 'click', value: true };
				}
			});
		});
		// pokud 2x klikne na oblast, zakaze udalost
		map.value?.on('dblclick', (e) => {
			map.value?.forEachFeatureAtPixel(e.pixel, (feature: any) => {
				if (feature) {
					e.preventDefault();
					e.stopPropagation();
				}
			});
		});
	}

	/**
	 * Hover na feature
	 */
	function listenHover(): void {}

	/**
	 * Z pole vytahne area dle id
	 *
	 * @param {Feature} feature
	 */
	function getArea(id: string): IArea | undefined {
		return areas.value?.find((area: any) => area.feature?.ol_uid === id);
	}
</script>

<template>
	<div id="map" class="position-absolute w-100 h-100" :class="{ 'cursor-pointer': hoveredArea?.feature }"></div>
	<template v-if="areas?.length">
		<Area
			v-for="area in areas"
			:config="areaConfig"
			:wrapId="wrapId"
			:area="area"
			@change="area.config = olService.convertToDragResizeConfig($event)"
		/>
	</template>
</template>

<style scoped></style>
