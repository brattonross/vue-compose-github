<template>
  <div class="flex flex-col">
    <content-loader :height="260" :width="260" class="rounded">
      <rect x="0" y="0" rx="0" ry="0" width="260" height="260" />
    </content-loader>

    <div class="py-4">
      <content-loader :height="30" :width="260" class="rounded mb-2">
        <rect x="0" y="0" rx="0" ry="0" width="260" height="30" />
      </content-loader>

      <content-loader :height="24" :width="260" class="rounded">
        <rect x="0" y="0" rx="0" ry="0" width="260" height="24" />
      </content-loader>
    </div>

    <content-loader :height="34" :width="260" class="rounded mb-4">
      <rect x="0" y="0" rx="0" ry="0" width="260" height="34" />
    </content-loader>

    <content-loader :height="96" :width="260" class="mb-4">
      <rect x="0" y="0" rx="3" ry="3" width="260" height="21" />
      <rect x="0" y="25" rx="3" ry="3" width="260" height="21" />
      <rect x="0" y="50" rx="3" ry="3" width="260" height="21" />
      <rect x="0" y="75" rx="3" ry="3" width="260" height="21" />
    </content-loader>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api';
import { ContentLoader } from 'vue-content-loader';

export default createComponent({
  name: 'UserProfileLoader',

  components: {
    ContentLoader
  }
});
</script>
