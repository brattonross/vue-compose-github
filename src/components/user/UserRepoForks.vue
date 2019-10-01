<template>
  <div class="flex items-center">
    <div class="flex items-center mr-1">
      <repo-forked-icon size="1.25x" />
    </div>
    <span>{{ forks }}</span>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { RepoForkedIcon } from '@brattonross/vue-octicons';

export default createComponent({
  name: 'UserRepoForks',

  components: {
    RepoForkedIcon
  },

  props: {
    forks: {
      type: Number,
      required: true
    }
  }
});
</script>
