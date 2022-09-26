<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useDisplay } from 'vuetify';
	import Sidebar from '@/components/sidebar/Sidebar.vue';
	import Header from '@/components/header/Header.vue';

	const drawer = ref();
	/* const innerW = window.innerWidth; */
	const { mdAndUp, smAndDown } = useDisplay();
</script>
<template>
	<div>
		<v-app>
			<!-- toolbar -->
			<v-app-bar elevation="2" color="primary">
				<Header />
				<v-app-bar-nav-icon v-if="smAndDown" @click="drawer = !drawer" />
			</v-app-bar>

			<!-- sidemenu -->
			<v-navigation-drawer :permanent="mdAndUp" elevation="4" v-model="drawer">
				<Sidebar />
			</v-navigation-drawer>

			<!-- content -->
			<v-main>
				<v-container fluid class="w-100 h-100">
					<slot />
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>
