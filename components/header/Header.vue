<script setup lang="ts">
	import { Ref } from 'vue';

	async function logout() {}
</script>

<template>
	<v-menu anchor="bottom end" origin="auto" min-width="300">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" icon="mdi-account-edit"> </v-btn>
		</template>

		<v-list class="pa-2">
			<template v-if="$kc.authenticated">
				<v-list-item to="/login" rounded="lg" class="mb-1" :title="$t('route.login' || 'empty')" />
			</template>
			<template v-else>
				<v-list-item to="/login" rounded="lg" class="mb-1" :title="$t('route.login' || 'empty')" />
				<v-list-item to="/reset_pass" rounded="lg" class="mb-1" :title="$t('route.reset_pass' || 'empty')" />
				<v-list-item to="/signup" rounded="lg" class="mb-1" :title="$t('route.signup' || 'empty')" />
			</template>
		</v-list>
	</v-menu>
</template>
