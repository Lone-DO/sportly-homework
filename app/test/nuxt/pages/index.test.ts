import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import Page from '~/pages/index.vue';

describe('pages: "/"', () => {
  it('mounts', async () => {
    const wrapper = await mountSuspended(Page);
    expect(wrapper.find('#league').exists()).toBeTruthy();
  });
});
