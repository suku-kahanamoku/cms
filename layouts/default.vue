<script setup lang="ts">
	import { ref, onMounted } from 'vue';
	import { useDisplay } from 'vuetify';
	import Sidebar from '@/components/sidebar/Sidebar.vue';
	import Header from '@/components/header/Header.vue';

	const drawer = ref(undefined || true);
	/* const innerW = window.innerWidth; */
	const { mdAndUp, mdAndDown } = useDisplay();
	onMounted(() => {
		/* if (innerW < 950) {
    drawer.value = !drawer.value;
  } */
	});
</script>
<template>
	<div>
		<v-app>
			<!-- ---------------------------------------------- -->
			<!---Header -->
			<!-- ---------------------------------------------- -->
			<v-app-bar elevation="0" color="primary">
				<div class="pe-5">
					<NuxtLink to="/" class="d-flex">
						<img src="@/assets/images/logo.svg" width="140" alt="logo" />
					</NuxtLink>
				</div>
				<v-app-bar-nav-icon class="" @click="drawer = !drawer" />
				<v-spacer />
				<!-- ---------------------------------------------- -->
				<!-- User Profile -->
				<!-- ---------------------------------------------- -->
				<Header />
			</v-app-bar>
			<!-- ---------------------------------------------- -->
			<!---Sidebar -->
			<!-- ---------------------------------------------- -->
			<v-navigation-drawer
				left
				:permanent="mdAndUp"
				elevation="10"
				app
				:temporary="mdAndDown"
				v-model="drawer"
				expand-on-hover
			>
				<Sidebar />
			</v-navigation-drawer>
			<!-- main -->
			<v-main>
				<v-container fluid class="w-100 h-100">
					<slot />
				</v-container>
			</v-main>
		</v-app>
	</div>
</template>
