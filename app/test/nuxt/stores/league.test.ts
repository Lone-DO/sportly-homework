import { registerEndpoint } from '@nuxt/test-utils/runtime';
import { createPinia, setActivePinia } from 'pinia';
import { beforeEach, describe, expect, it } from 'vitest';

import type { AllLeagueItem } from '~/lib/types';

import { useLeagueStore } from '~/stores/league';

const mockLeagues: AllLeagueItem[] = [{
  idLeague: '101',
  strLeague: 'Test',
  strSport: 'Basketball',
  strLeagueAlternate: 'Mock League',
}, {
  idLeague: '202',
  strLeague: 'Test 2',
  strSport: 'Ice Skating',
  strLeagueAlternate: 'Mock League',
}];

describe('leagueStore', () => {
  beforeEach(() => {
    /** https://pinia.vuejs.org/cookbook/testing.html#Unit-testing-a-store */
    // creates a fresh pinia and makes it active
    // so it's automatically picked up by any useStore() call
    // without having to pass it to it: `useStore(pinia)`
    setActivePinia(createPinia());
    /** https://nuxt.com/docs/4.x/getting-started/testing#registerendpoint */
    registerEndpoint('/api/leagues', () => mockLeagues);
  });
  describe('getters', () => {
    describe('isLoading', () => {
      it('returns false, WHEN status is not pending', () => {
        const store = useLeagueStore(createPinia());
        store.status = 'idle';
        expect(store.isLoading).toBe(false);
      });
      it('returns true, WHEN status is pending', () => {
        const store = useLeagueStore(createPinia());
        store.status = 'pending';
        expect(store.isLoading).toBe(true);
      });
    });
    describe('availableSports', () => {
      it('returns DropdownItems[], parsed from allData', async () => {
        const store = useLeagueStore(createPinia());
        store.allData = mockLeagues;
        expect(store.availableSports.map(({ icon }) => icon)).toEqual(['basketball', 'ice-skating']);
      });
    });
    describe('list', () => {
      it('returns raw allData, when no filters exist', () => {
        const store = useLeagueStore(createPinia());
        store.filters = { sport: '', leagueName: '' };
        expect(store.list).toEqual(store.allData);
      });
      describe('returns filtered allData, when filters exist', () => {
        let store: ReturnType<typeof useLeagueStore>;
        beforeEach(() => {
          store = useLeagueStore(createPinia());
        });
        it('when filters.sport is truthy for some', () => {
          store.allData = mockLeagues;
          store.filters.sport = mockLeagues[0]?.strSport as string;
          store.filters.leagueName = '';
          expect(store.list).toEqual([mockLeagues[0]]);
        });
        it('when filters.leagueName is truthy for some', () => {
          store.filters.sport = '';
          store.filters.leagueName = mockLeagues[1]?.strLeague as string;
          expect(store.list).toEqual([mockLeagues[1]]);
        });
        it('when filters.leagueName is truthy for all', () => {
          store.filters.sport = '';
          store.filters.leagueName = mockLeagues[0]?.strLeague as string;
          expect(store.list).toEqual(mockLeagues);
        });
      });
    });
  });
  describe('actions', () => {
    it('refresh - sets allData', async () => {
      const mock: AllLeagueItem[] = [{
        idLeague: '',
        strLeague: '',
        strSport: '',
        strLeagueAlternate: '',
      }];
      registerEndpoint('/api/leagues', () => mock);
      const store = useLeagueStore(createPinia());
      store.allData = [];
      expect(store.allData).toEqual([]);
      await store.refresh();
      expect(store.allData).toEqual(mock);
    });
  });
});
