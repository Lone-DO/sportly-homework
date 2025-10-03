<script lang='ts' setup>
import type { AllLeagueItem } from '~/lib/types';

const $props = defineProps<{
  list: AllLeagueItem[];
  loading: boolean;
}>();

const items = computed(() => $props.loading ? [{} as AllLeagueItem] : $props.list);
</script>

<template>
  <ul class="league-list w-full gap-2 p-0 flex flex-row max-sm:flex-col sm:flex-wrap items-stretch">
    <li
      v-for="league in items"
      :key="league.idLeague"
      class="flex-1 sm:min-w-70 border-2 border-neutral-500 p-2 rounded-2xl hover:bg-base-300"
    >
      <LeagueListItem :league :loading />
    </li>
  </ul>
</template>
