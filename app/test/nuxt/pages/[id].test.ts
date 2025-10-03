import { mountSuspended, registerEndpoint } from '@nuxt/test-utils/runtime';
import { describe, expect, it, vi } from 'vitest';

import Page from '~/pages/league/[id].vue';

const mock = {
  idLeague: '101',
  strLeague: 'Test',
  strSport: 'Basketball',
  strLeagueAlternate: 'Mock League',
};
describe('pages: "/league/:id"', () => {
  it('mounts', async () => {
    registerEndpoint('/api/leagues/101', () => mock);
    const wrapper = await mountSuspended(Page, {
      route: '/league/101',
    });
    expect(wrapper.find('#league-id').exists()).toBeTruthy();
  });
  it('redirects when :id is invalid', async () => {
    registerEndpoint('/api/leagues/undefined', () => null);
    vi.spyOn(console, 'error');
    await mountSuspended(Page);
    expect(console.error).toHaveBeenCalledWith('404 - Invalid League ID');
  });
});
