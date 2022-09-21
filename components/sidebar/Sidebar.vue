<script setup lang="ts">
	import { ref } from 'vue';

	import TreeItem from '@/core/tree/TreeItem.vue';

	const routes: any = useState('routes');
	console.log(routes);
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
						<img src="@/assets/images/users/user2.jpg" width="50" alt="Julia" />
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
							:prepend-icon="route.icon?.pos !== 'after' && route.icon?.value"
							:after-icon="route.icon?.pos === 'after' && route.icon?.value"
						></v-list-item>
					</template>
				</template>
			</v-list>
		</div>
	</div>
</template>
