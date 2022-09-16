<script setup lang="ts">
	import { inject, onMounted, reactive } from 'vue';

	import type { OlService } from '@/components/ol/ol.service';
	import CwpSetup from '@/components/ol/settings/CwpSetup.vue';
	import Maps from '@/components/ol/settings/Maps.vue';
	import Areas from '@/components/ol/settings/Areas.vue';
	import Brigthness from '@/components/ol/settings/Brigthness.vue';
	import Schemes from '@/components/ol/settings/Schemes.vue';
	import SecWindow from '@/components/ol/settings/SecWindow.vue';
	import FplWindow from '@/components/ol/settings/FplWindow.vue';
	import Errors from '@/components/ol/settings/Errors.vue';
	import Warn from '@/components/ol/settings/Warn.vue';
	import StripSetup from '@/components/ol/settings/StripSetup.vue';
	import Stats from '@/components/ol/settings/Stats.vue';
	import AllPlans from '@/components/ol/settings/AllPlans.vue';
	import DelPlans from '@/components/ol/settings/DelPlans.vue';
	import Lost from '@/components/ol/settings/Lost.vue';
	import PrimaryTrack from '@/components/ol/settings/PrimaryTrack.vue';

	const props = defineProps<{
		wrapId: string;
	}>();

	const olService = inject('OlService') as OlService;
	const configs = reactive({} as any);

	onMounted(() => {});

	function saveConfig(e: any, key: string) {
		configs[key] = olService.convertToDragResizeConfig(e);
	}
</script>

<template>
	<CwpSetup :wrapId="wrapId" :config="configs?.cwp_setup" @change="saveConfig($event, 'cwp_setup')" />
	<Maps :wrapId="wrapId" :config="configs?.maps" @change="saveConfig($event, 'maps')" />
	<Areas :wrapId="wrapId" :config="configs?.areas" @change="saveConfig($event, 'areas')" />
	<Brigthness :wrapId="wrapId" :config="configs?.brigthness" @change="saveConfig($event, 'brigthness')" />
	<Schemes :wrapId="wrapId" :config="configs?.schemes" @change="saveConfig($event, 'schemes')" />
	<SecWindow :wrapId="wrapId" :config="configs?.sech_window" @change="saveConfig($event, 'sech_window')" />
	<FplWindow :wrapId="wrapId" :config="configs?.fpl_window" @change="saveConfig($event, 'fpl_window')" />
	<Errors :wrapId="wrapId" :config="configs?.errors" @change="saveConfig($event, 'errors')" />
	<Warn :wrapId="wrapId" :config="configs?.warn" @change="saveConfig($event, 'warn')" />
	<StripSetup :wrapId="wrapId" :config="configs?.strip_setup" @change="saveConfig($event, 'strip_setup')" />
	<Stats :wrapId="wrapId" :config="configs?.stats" @change="saveConfig($event, 'stats')" />
	<AllPlans :wrapId="wrapId" :config="configs?.all_plans" @change="saveConfig($event, 'all_plans')" />
	<!-- <DelPlans :wrapId="wrapId" :config="configs?.del_plans" @change="saveConfig($event, 'del_plans')" />
    <Lost :wrapId="wrapId" :config="configs?.lost" @change="saveConfig($event, 'lost')" /> -->
	<PrimaryTrack :wrapId="wrapId" :config="configs?.primary_track" @change="saveConfig($event, 'primary_track')" />
</template>

<style scoped></style>
