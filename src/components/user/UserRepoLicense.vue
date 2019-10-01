<template>
  <div class="flex items-center">
    <div class="flex items-center mr-1">
      <law-icon size="1.25x" />
    </div>
    <span>{{ license }}</span>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { LawIcon } from '@brattonross/vue-octicons';

export default createComponent({
  name: 'UserRepoLicense',

  components: {
    LawIcon
  },

  props: {
    license: {
      type: String,
      required: true
    }
  }
});
</script>
