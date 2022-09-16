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
	<v-btn v-if="open" color="danger" class="my-1" @click="open = !open">{{ $t('settings.errors') }}</v-btn>
	<v-btn v-else outline="danger" class="my-1" @click="open = !open">{{ $t('settings.errors') }}</v-btn>

	<Teleport v-if="open" :to="`#${wrapId}`">
		<DraggableResizable :config="config" @change="onChange" @close="open = false">
			<template v-slot:header>
				{{ $t('settings.errors') }}
			</template>
			<template v-slot:body>
				{{ $t('settings.errors') }}
			</template>
		</DraggableResizable>
	</Teleport>
</template>

<style scoped></style>
