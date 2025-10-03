<script lang='ts' setup>
const leagueStore = useLeagueStore();

const nameFilter = ref('');

const debounce = ref<ReturnType<typeof setTimeout> | number | undefined>();
watch(nameFilter, setDebounce);
function setDebounce() {
  clearTimeout(debounce.value);
  debounce.value = setTimeout(() => {
    leagueStore.filters.leagueName = nameFilter.value;
    debounce.value = 0;
  }, 1000);
}

onUnmounted(() => {
  leagueStore.filters.leagueName = null;
  clearTimeout(debounce.value);
});
</script>

<template>
  <fieldset class="flex justify-end items-center gap-2">
    <LeagueFilters />
    <label class="input">
      <!-- TODO: Use Icon Transitions -->
      <Icon
        v-show="debounce"
        name="majesticons:timer"
        size="24"
        class="h-[1em] opacity-50"
      />
      <Icon
        v-if="!debounce"
        name="majesticons:search-circle-line"
        size="24"
        class="h-[1em] opacity-50"
      />
      <input
        v-model="nameFilter"
        name="league"
        type="text"
        placeholder="Search Leagues"
      >
    </label>
  </fieldset>
</template>
