import { defineStore } from 'pinia';

import type { AllLeagueFilters, AllLeagueItem, DropdownItem } from '~/lib/types';

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

  const availableSports = computed<DropdownItem[]>(() => {
    /**
     * TODO: Future implementation is to fetch All Sports via api endpoint
     * https://www.thesportsdb.com/api/v1/json/123/all_sports.php
     */
    const data = Array.isArray(allData.value) ? allData.value : [];
    const available = data.reduce((set, item) => {
      set.add(item.strSport);
      return set;
    }, new Set<string>());
    return [...available].map(sport => ({
      icon: sport.toLowerCase().split(' ').join('-'),
      label: sport,
      value: sport,
    }));
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
    availableSports,
    filters,
    isLoading,
    list,
    status,
    refresh,
  };
});
