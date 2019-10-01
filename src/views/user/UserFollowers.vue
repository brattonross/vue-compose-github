<template>
  <div>
    <div v-if="state.isPending">Loading...</div>

    <div v-else-if="state.error">{{ state.error }}</div>

    <div v-else class="flex flex-col">
      <div
        v-for="user in state.data"
        :key="user.id"
        class="flex items-center justify-between border rounded p-4 mb-2"
      >
        <div class="flex items-start">
          <img
            :src="user.avatar_url"
            width="50"
            height="50"
            class="rounded mr-4"
          />

          <div>
            <span class="text-sm text-gray-600">{{ user.login }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { usePromise } from 'vue-compose-promise';

import GitHub from '../../github';

export default createComponent({
  name: 'UserFollowers',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  setup({ username }) {
    const promise = usePromise({ promise: GitHub.users.followers(username) });

    return {
      state: promise.state
    };
  }
});
</script>
