import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import Component from '~/components/app/dropdown.vue';

const propOpts = {
  items: [],
};
describe('appDropdown', () => {
  it('mounts', async () => {
    const wrapper = await mountSuspended(Component, { props: propOpts });
    expect(wrapper.find('.dropdown').exists()).toBeTruthy();
  });
});
