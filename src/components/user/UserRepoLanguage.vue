<template>
  <div v-bind="$attrs" class="flex items-center">
    <div class="w-3 h-3 rounded-full mr-1" :style="{ background: color }" />
    {{ language }}
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';

import colors from '../../colors';

export default createComponent({
  name: 'RepoLanguage',

  props: {
    language: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const color = computed(() => {
      const language = colors[props.language];
      return language ? language.color : null;
    });

    return {
      color
    };
  }
});
</script>
