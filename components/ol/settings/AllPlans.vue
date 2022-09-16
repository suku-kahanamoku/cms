<script setup lang="ts">
	import { onMounted, ref, type Ref } from 'vue';

	import type { IDraggableResizable } from '@/components/ol/ol.interface';
	import DraggableResizable from '@/components/ol/DraggableResizable.vue';

	const props = defineProps<{
		wrapId: string;
		config?: IDraggableResizable;
	}>();

	const emits = defineEmits(['change']);

	const open: Ref<boolean | undefined> = ref(props.config?.open);

	onMounted(() => {});

	function onChange(e: any) {
		e.open = open.value;
		emits('change', e);
	}
</script>

<template>
	<v-btn v-if="open" color="primary" class="my-1" @click="open = !open">{{ $t('settings.all_plans') }}</v-btn>
	<v-btn v-else outline="primary" class="my-1" @click="open = !open">{{ $t('settings.all_plans') }}</v-btn>

	<Teleport v-if="open" :to="`#${wrapId}`">
		<DraggableResizable :config="config" @change="onChange" @close="open = false">
			<template v-slot:header>
				{{ $t('settings.all_plans') }}
			</template>
			<template v-slot:body>
				{{ $t('settings.all_plans') }}
			</template>
		</DraggableResizable>
	</Teleport>
</template>

<style scoped></style>
