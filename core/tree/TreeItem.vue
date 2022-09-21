<script setup lang="ts">
	const props = defineProps<{
		data: any;
	}>();
</script>
<template>
	<v-list-group v-if="data.children.length" :value="data.name">
		<template v-slot:activator="{ props }">
			<v-list-item
				v-bind="props"
				rounded="lg"
				class="mb-1"
				:title="$t(data.meta.title || 'empty')"
				:prepend-icon="data.icon?.pos !== 'after' && data.icon?.value"
				:after-icon="data.icon?.pos === 'after' && data.icon?.value"
			></v-list-item>
		</template>

		<template v-for="child in data.children">
			<template v-if="child.visible !== false">
				<TreeItem v-if="child.children.length" :data="child" />
				<v-list-item
					v-else
					:to="child.path"
					rounded="lg"
					class="mb-1 pl-1"
					:title="$t(child.meta.title || 'empty')"
					:prepend-icon="child.icon?.pos !== 'after' && child.icon?.value"
					:after-icon="child.icon?.pos === 'after' && child.icon?.value"
				></v-list-item>
			</template>
		</template>
	</v-list-group>
</template>
