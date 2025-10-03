import { defineStore } from 'pinia';

import type { AllLeagueFilters, AllLeagueItem } from '~/lib/types';

export const useLeagueStore = defineStore('leagueStore', () => {
  const {
    data: allData,
    status,
    refresh,
  } = useFetch<AllLeagueItem[]>('/api/leagues', {
    lazy: true,
  });

  const isLoading = computed(() => status.value === 'pending');
  const filters = reactive<AllLeagueFilters>({
    sport: null,
    leagueName: null,
  });
  const list = computed(() => {
    const data = Array.isArray(allData.value) ? allData.value : [];
    if (!filters.leagueName && !filters.sport) {
      return data;
    }

    return data.filter((item) => {
      const validSport = !filters.sport || item.strSport.toLowerCase().includes(filters.sport.toLowerCase());
      const validName = !filters.leagueName || item.strLeague.toLowerCase().includes(filters.leagueName.toLowerCase());
      return validSport && validName;
    });
  });

  return {
    allData,
    filters,
    isLoading,
    list,
    status,
    refresh,
  };
});
