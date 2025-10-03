<script lang='ts' setup>
import type { LookupLeagueItem } from '~/lib/types';

const $route = useRoute();
const leagueUrlWithId = computed<string>(() => `/api/leagues/${$route.params.id}`);
if (!$route.params.id || isNaN($route.params.id as unknown as number)) {
  console.error('404 - Invalid League ID');
  navigateTo('/');
}

const {
  data: league,
  error,
  status,
  refresh: refreshLeague,
} = useFetch<LookupLeagueItem>(leagueUrlWithId, {
  lazy: true, // Don't force First Render to wait on data
  watch: false, // Handler must be propagated manually
  immediate: false,
});

const isLoading = computed(() => status.value === 'pending');
watch(() => $route.params.id, () => refreshLeague());
/** TODO: Create a Banner for rendering parsed errors to the user */
watch(error, err => console.error(err));
onMounted(refreshLeague);
</script>

<template>
  <article id="league-id" class="max-w-200 flex flex-col flex-1 gap-2 w-full">
    <p v-if="isLoading">
      Loading...
    </p>
    <template v-if="!isLoading">
      <app-lazy-image
        :src="league?.strBanner"
        alt="Badge"
        class="w-full"
      />
      <div class="flex gap-2 items-center flex-wrap">
        <app-lazy-image
          :src="league?.strBadge"
          alt="Badge"
          class="w-10"
        />
        <h3 class="text-xl sm:text-nowrap">
          {{ league?.strLeague }}
        </h3>
      </div>
      <!-- TODO: Description needs better design, and language toggle to swap between translations -->
      <p v-if="league?.strDescriptionEN" class="text-sm border-2 border-neutral-500 p-2">
        {{ league?.strDescriptionEN }}
      </p>
    </template>
  </article>
</template>
