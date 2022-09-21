<script setup lang="ts">
	import { Ref } from 'vue';

	async function logout() {}
</script>

<template>
	<v-menu anchor="bottom end" origin="auto" min-width="300">
		<template v-slot:activator="{ props }">
			<v-btn v-bind="props" icon="mdi-account-edit"> </v-btn>
		</template>

		<v-list class="pa-6" elevation="10" rounded="lg">
			<v-btn block to="/login">{{ $t('route.login') }}</v-btn>
			<v-btn block to="/reset_pass">{{ $t('route.reset_pass') }}</v-btn>
			<v-btn block to="/signup">{{ $t('route.signup') }}</v-btn>
			<v-btn block @click="logout()">{{ $t('route.logout') }}</v-btn>
		</v-list>
	</v-menu>
</template>
