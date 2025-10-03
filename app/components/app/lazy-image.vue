<script lang='ts' setup>
import type { NullString } from '~/lib/types';

defineProps<{
  src?: NullString;
  alt?: NullString;
  loading?: boolean;
}>();
</script>

<template>
  <client-only>
    <suspense>
      <template #fallback>
        <div class="skeleton min-h-5 min-w-5" v-bind="$attrs" />
      </template>
      <div
        v-if="loading || src"
        class="app-lazy-image"
        v-bind="$attrs"
      >
        <div
          v-if="loading"
          class="skeleton min-w-5"
          v-bind="$attrs"
        />
        <img
          v-if="!loading && src"
          :src="src || ''"
          :alt="alt || ''"
        >
      </div>
    </suspense>
  </client-only>
</template>
