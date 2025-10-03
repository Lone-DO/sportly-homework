<script lang='ts' setup>
import type { DropdownItem } from '~/lib/types';

const leagueStore = useLeagueStore();

const clearFilter = { icon: 'ic:baseline-clear', label: 'Clear Filter', value: null };
function setFilter(item: DropdownItem) {
  leagueStore.filters.sport = item.value;
}
</script>

<template>
  <app-dropdown
    label="Filter"
    :items="leagueStore.availableSports"
    :show-prefix="Boolean(leagueStore.filters.sport)"
    @input="setFilter"
  >
    <template #prefix>
      <ul>
        <li @click="setFilter(clearFilter)">
          <p>
            <Icon :name="clearFilter.icon" size="20" />
            <span>{{ clearFilter.label }}</span>
          </p>
        </li>
      </ul>
    </template>
  </app-dropdown>
</template>
