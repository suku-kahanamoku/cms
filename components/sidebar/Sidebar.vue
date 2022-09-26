<script setup lang="ts">
	import { ref } from 'vue';

	import TreeItem from '@/components/tree/TreeItem.vue';

	const routes: any = useRouter()
		.getRoutes()
		.filter((route) => !route.meta.parentName && route.meta.visible !== false)
		.sort((a: any, b: any) => (a.meta.pos || 0) - (b.meta.pos || 0));
</script>

<template>
	<v-list class="pa-4">
		<template v-for="route in routes">
			<template v-if="route.visible !== false">
				<TreeItem v-if="route.children?.length" :data="route" />
				<v-list-item
					:to="route.path"
					rounded="lg"
					class="mb-1"
					v-else
					:value="route.name"
					:title="$t(route.meta.title || 'empty')"
					:prepend-icon="route.meta?.icon?.pos !== 'after' && route.meta?.icon?.value"
					:after-icon="route.meta?.icon?.pos === 'after' && route.meta?.icon?.value"
				></v-list-item>
			</template>
		</template>
	</v-list>
</template>
