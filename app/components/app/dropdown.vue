<script lang='ts' setup>
import type { DropdownItem } from '~/lib/types';

const $props = withDefaults(defineProps<{
  label?: string;
  hideLabel?: boolean;
  items: DropdownItem[];
  showPrefix?: boolean;
  showAffix?: boolean;
  listClasses?: string[] | string;
  openBy?: 'click' | 'hover';
}>(), {
  label: 'insert label',
  openBy: 'click',
});

const $emit = defineEmits(['input']);

const handlers = computed(() => ({
  mouseover: $props.openBy === 'hover' ? open : undefined,
  mouseleave: $props.openBy === 'hover' ? close : undefined,
}));

const isOpen = ref(false);
const appStore = useAppStore();
const dropdown = useTemplateRef('dropdown');
function selectAction(item?: DropdownItem) {
  close();
  item?.onClick?.();
  $emit('input', item);
}

function getIconName(item: DropdownItem) {
  /** WHEN Item has parsed icon name, use that, OTHERWISE use item.icon as key for appStore.icons */
  return (item.icon.includes(':') ? item.icon : appStore.icons[item.icon as keyof object]) || '';
}

function syncAttribute() {
  if ($props.openBy === 'click') {
    /** WHEN dropdown is toggled, Manually trigger sync to update chevron icon */
    isOpen.value = Boolean(!dropdown.value?.hasAttribute('open'));
  }
}
function open() {
  isOpen.value = true;
  dropdown.value?.setAttribute('open', 'true');
}
function close() {
  isOpen.value = false;
  dropdown.value?.removeAttribute('open');
}
</script>

<template>
  <!-- https://daisyui.com/components/dropdown/#dropdown-using-details-and-summary -->
  <details
    ref="dropdown"
    class="dropdown"
    v-on="handlers"
  >
    <summary class="p-0 menu cursor-pointer" @mousedown="syncAttribute">
      <p class="flex gap-1 items-center text-sm pointer-events-none">
        <slot :is-open>
          {{ label }}
        </slot>
        <i
          v-if="!hideLabel"
          id="app-theme-toggle"
          class="swap swap-rotate"
          :class="{ 'swap-active': isOpen }"
        >
          <Icon
            class="swap-on"
            :name="appStore.icons['chevron-up']"
            size="16"
          />
          <Icon
            class="swap-off"
            :name="appStore.icons['chevron-down']"
            size="16"
          />
        </i>
      </p>
    </summary>
    <div class="menu dropdown-content bg-base-200 rounded-box z-1 p-0 shadow-sm text-nowrap" :class="listClasses">
      <div
        v-if="$slots.prefix"
        v-show="showPrefix"
        class="border-b-2 border-neutral-400 p-2"
      >
        <slot name="prefix" />
      </div>
      <ul class="p-2">
        <li v-for="(item, index) in items" :key="index">
          <NuxtLink
            :to="item?.to"
            class="text-nowrap"
            :class="item.classes || ''"
            @click="selectAction(item)"
          >
            <Icon
              :name="getIconName(item)"
              class="text-(--btn-fg)"
              :size="item.size || '20'"
            />
            <span class="text-(--btn-fg)">{{ item.label }}</span>
          </NuxtLink>
        </li>
      </ul>
      <div
        v-if="$slots.affix"
        v-show="showAffix"
        class="border-t-2 border-neutral-400 p-2"
      >
        <slot name="affix" />
      </div>
    </div>
  </details>
</template>
