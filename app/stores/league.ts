import { defineStore } from 'pinia';

import type { AllLeagueItem } from '~/lib/types';

export const useLeagueStore = defineStore('leagueStore', () => {
  const {
    data: allData,
    status,
    refresh,
  } = useFetch<AllLeagueItem[]>('/api/leagues', {
    lazy: true,
  });

  const isLoading = computed(() => status.value === 'pending');

  const list = computed(() => {
    return Array.isArray(allData.value) ? allData.value : [];
  });

  return {
    allData,
    isLoading,
    list,
    status,
    refresh,
  };
});
