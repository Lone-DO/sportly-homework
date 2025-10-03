import type { Icons } from '~/lib/types';

import { DARK_MODE_ICONS, LIGHT_MODE_ICONS } from '~/lib/constants';

export const useAppStore = defineStore('appStore', () => {
  /** Colors */
  const colorMode = useColorMode();
  const icons = ref<Icons>(LIGHT_MODE_ICONS);
  function syncIcons() {
    if ((colorMode.value) === 'dark') {
      icons.value = DARK_MODE_ICONS;
    }
    else {
      icons.value = LIGHT_MODE_ICONS;
    }
  }
  effect(syncIcons);
  /**
   * Dev Note: `syncIcons` triggers 3x during initial page load due to SSR and Client staging
   * Must propagate onMounted due to SSR not having access to localStorage cache
   * Prevents initial page load from having incorrect icons
   */
  onMounted(syncIcons);

  return {
    icons,
  };
});
