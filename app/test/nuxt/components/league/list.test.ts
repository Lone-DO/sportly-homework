import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import type { AllLeagueItem } from '~/lib/types';

import Component from '~/components/league/list.vue';

const propOpts = {
  list: [] as AllLeagueItem[],
  loading: false,
};
describe('leagueList', () => {
  it('mounts', async () => {
    const wrapper = await mountSuspended(Component, { props: propOpts });
    expect(wrapper.find('.league-list').exists()).toBeTruthy();
  });
});
