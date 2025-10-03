<script lang='ts' setup>
const leagueStore = useLeagueStore();

onMounted(() => {
  leagueStore.refresh();
});
</script>

<template>
  <section id="league" class="flex gap-4 justify-center flex-col w-full max-w-200">
    <LeagueList :list="leagueStore.list" :loading="leagueStore.isLoading" />
  </section>
</template>
