<script setup lang="ts">
	import { Ref } from 'vue';

	const routes: any = useState('routes');

	async function logout() {
		await useApi('/api/logout');
		navigateTo(routes.login?.path || '/');
	}
</script>

<template>
	<NuxtLink to="/" class="d-flex ms-2">
		<img src="@/assets/images/logo.svg" width="140" alt="logo" />
	</NuxtLink>
	<v-spacer />
	<v-menu anchor="bottom end" origin="auto" min-width="300">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" icon="mdi-account-edit"> </v-btn>
		</template>

		<v-list class="pa-2">
			<template v-if="$kc?.authenticated">
				<v-list-item
					:to="routes['pz-profile']?.path + '/' + $kc?.subject"
					rounded="lg"
					class="mb-1"
					:title="$t('route.profile' || 'empty')"
				/>
				<v-list-item
					:link="true"
					rounded="lg"
					class="mb-1"
					:title="$t('route.logout' || 'empty')"
					@click="logout"
				/>
			</template>
			<template v-else>
				<v-list-item :to="routes.login?.path" rounded="lg" class="mb-1" :title="$t('route.login' || 'empty')" />
				<v-list-item
					:to="routes.reset_pass?.path"
					rounded="lg"
					class="mb-1"
					:title="$t('route.reset_pass' || 'empty')"
				/>
				<v-list-item
					:to="routes.signup?.path"
					rounded="lg"
					class="mb-1"
					:title="$t('route.signup' || 'empty')"
				/>
			</template>
		</v-list>
	</v-menu>
</template>
