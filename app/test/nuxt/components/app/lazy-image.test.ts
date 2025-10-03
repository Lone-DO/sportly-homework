import { mountSuspended } from '@nuxt/test-utils/runtime';
import { describe, expect, it } from 'vitest';

import Component from '~/components/app/lazy-image.vue';

describe('appLazyImage', () => {
  it('when $props aren\'t provided, does NOT render', async () => {
    const wrapper = await mountSuspended(Component);
    expect(wrapper.html()).toBe('<!--v-if-->');
  });
  it('when $props.src is truthy && $props.loading is falsy, renders image', async () => {
    const wrapper = await mountSuspended(Component, {
      props: {
        src: 'foobar',
      },
    });
    expect(wrapper.find('.app-lazy-image').exists()).toBeTruthy();
    expect(wrapper.find('.skeleton').exists()).toBeFalsy();
    expect(wrapper.find('img').exists()).toBeTruthy();
  });
  it('when $props.src is falsy && $props.loading is truthy, renders skeleton', async () => {
    const wrapper = await mountSuspended(Component, {
      props: {
        src: '',
        loading: true,
      },
    });
    expect(wrapper.find('.app-lazy-image').exists()).toBeTruthy();
    expect(wrapper.find('.skeleton').exists()).toBeTruthy();
    expect(wrapper.find('img').exists()).toBeFalsy();
  });
});
