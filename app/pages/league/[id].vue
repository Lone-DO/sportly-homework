<script lang='ts' setup>
import type { LookupLeagueBadge, LookupLeagueItem } from '~/lib/types';

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

const {
  data: badgeData,
  // error: badgeError,
  status: badgeStatus,
  refresh: refreshBadge,
} = useFetch<LookupLeagueBadge>(`${leagueUrlWithId.value}/badge`, {
  lazy: true, // Don't force First Render to wait on data
  watch: false, // Handler must be propagated manually
  immediate: false,
});

async function refresh() {
  await refreshLeague();
  await refreshBadge();
}

const isLoading = computed(() => status.value === 'pending');
watch(() => $route.params.id, () => refresh());
/** TODO: Create a Banner for rendering parsed errors to the user */
watch(error, err => console.error(err));
onMounted(refresh);
</script>

<template>
  <article id="league-id" class="max-w-200 flex flex-col flex-1 gap-2 w-full">
    <app-lazy-image
      alt="Banner"
      class="w-full min-h-20"
      :loading="isLoading"
      :src="league?.strBanner"
    />
    <div class="flex gap-2 items-center flex-wrap">
      <app-lazy-image
        alt="Brand"
        class="w-10 min-h-10"
        :loading="isLoading"
        :src="league?.strBadge"
      />
      <h3 class="text-xl sm:text-nowrap">
        {{ league?.strLeague }}
      </h3>
      <app-lazy-image
        alt="Badge"
        class="w-20 min-h-20 ml-auto"
        :src="badgeData?.strBadge"
        :loading="badgeStatus === 'pending'"
      />
    </div>
    <!-- TODO: Description needs better design, and language toggle to swap between translations -->
    <p v-if="league?.strDescriptionEN" class="text-sm border-2 border-neutral-500 p-2">
      {{ league?.strDescriptionEN }}
    </p>
  </article>
</template>
