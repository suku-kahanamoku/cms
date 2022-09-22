<script setup lang="ts">
	import ConfirmDialog from '@/components/dialog/ConfirmDialog.vue';

	const props = defineProps<{
		data: any;
		cols: any[];
	}>();

	const emits = defineEmits(['delete']);
</script>

<template>
	<v-table fixed-header height="800px" class="w-100 elevation-1">
		<thead>
			<tr>
				<th v-for="col in cols" class="text-left">
					<v-btn variant="plain">{{ $t(col.label) }}</v-btn>
				</th>
			</tr>
		</thead>
		<tbody>
			<tr v-for="item in data" :key="item.name">
				<td v-for="(col, index) in cols">
					<v-btn v-if="index === 0" :to="item.path" variant="plain">
						{{ col.value === 'title' || col.value === 'name' ? $t(item[col.value]) : item[col.value] }}
					</v-btn>
					<template v-else-if="col.value === 'action'">
						<ConfirmDialog @confirm="$event && emits('delete', item)">
							<template v-slot:btn>
								<v-btn size="x-small" icon="mdi-delete" color="error" />
							</template>
							<template v-slot:title>
								{{ $t('method.delete') }}
							</template>
							<template v-slot:text>
								{{
									$t('query.delete', {
										name: item?.title ? $t(item?.title) : $t(item?.name || 'empty'),
									})
								}}
							</template>
						</ConfirmDialog>
					</template>
					<template v-else>
						{{ item[col.value] }}
					</template>
				</td>
			</tr>
		</tbody>
	</v-table>
</template>

<style scoped>
	tbody tr:nth-of-type(odd) {
		background-color: rgba(0, 0, 0, 0.03);
	}
</style>
