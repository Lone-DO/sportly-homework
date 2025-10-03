<script lang='ts' setup>
import type { AllLeagueItem } from '~/lib/types';

const $props = defineProps<{
  league: AllLeagueItem;
  loading: boolean;
}>();

const to = computed(() => $props.loading ? '' : `/league/${$props.league.idLeague}`);
/** TODO Convert to Tailwind Utility class */
const baseSkeletonStyle = 'bg-base-200 rounded-xl';
</script>

<template>
  <NuxtLink
    class="league-list-item flex justify-between h-full"
    :class="loading && 'skeleton w-full cursor-default'"
    :to
  >
    <article class="flex flex-col" :class="loading && 'w-full gap-2'">
      <h3 class="text-xl" :class="loading && `${baseSkeletonStyle} h-5`">
        {{ league.strLeague }}
      </h3>
      <i :class="loading && `${baseSkeletonStyle} h-5`">{{ league.strLeagueAlternate }}</i>
    </article>
    <p :class="loading && `${baseSkeletonStyle} h-10 w-10` ">
      {{ league.strSport }}
    </p>
  </NuxtLink>
</template>
