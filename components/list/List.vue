<script setup lang="ts">
	import DefaultCard from '@/components/card/DefaultCard.vue';
	import DefaultTable from '@/components/table/DefaultTable.vue';
	import ProfileCard from '@/components/card/ProfileCard.vue';

	const props = defineProps<{
		config: any;
		data: any;
	}>();

	const emits = defineEmits(['delete']);
	const switchValue = ref(props.config.theme === 'table');
</script>

<template>
	<div v-if="data?.length">
		<v-switch v-model="switchValue" :label="$t('form.theme')"></v-switch>
		<v-row v-if="switchValue" class="w-100">
			<DefaultTable :data="data" :cols="config?.cols" @delete="emits('delete', $event)" />
		</v-row>
		<v-row v-else>
			<v-col v-for="item in data" cols="12" sm="6" md="4" lg="3">
				<ProfileCard v-if="config.ctype === 'profile'" :data="item" @delete="emits('delete', $event)" />
				<DefaultCard v-else :data="item" @delete="emits('delete', $event)" />
			</v-col>
		</v-row>
	</div>
	<v-alert v-else type="error">{{ $t('message.not_found') }}</v-alert>
</template>
