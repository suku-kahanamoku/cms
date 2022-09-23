<script setup lang="ts">
	import { ref } from 'vue';

	import TreeItem from '@/components/tree/TreeItem.vue';

	const routes: any = useState('routes');
</script>

<template>
	<div>
		<!-- ---------------------------------------------- -->
		<!---Navigation -->
		<!-- ---------------------------------------------- -->
		<div class="scrollnavbar">
			<div class="profile">
				<div class="profile-pic">
					<v-avatar size="45">
						<img src="@/assets/images/1.jpg" width="50" alt="Julia" />
					</v-avatar>
				</div>
				<div class="profile-name">
					<h5>Jonathan Deo</h5>
				</div>
			</div>
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
		</div>
	</div>
</template>
