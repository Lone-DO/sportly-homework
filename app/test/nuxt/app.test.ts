import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import App from '~/app.vue';

describe('app', () => {
  it('mounts', async () => {
    const wrapper = await mountSuspended(App);
    expect(wrapper.find('#app').exists()).toBeTruthy();
  });
});
