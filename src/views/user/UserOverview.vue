<template>
  <div>
    <div v-if="state.isPending">Loading...</div>

    <div v-else-if="state.error">{{ state.error }}</div>

    <div v-else class="flex flex-col">
      <div
        v-for="event in state.data"
        :key="event.id"
        class="border rounded p-4 mb-2"
      >
        {{ event.type }} to repo {{ event.repo.name }} at {{ event.created_at }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from '@vue/composition-api';
import { usePromise } from 'vue-compose-promise';

import GitHub from '../../github';

export default createComponent({
  name: 'UserOverview',

  props: {
    username: {
      type: String,
      required: true
    }
  },

  setup({ username }) {
    const promise = usePromise({ promise: GitHub.users.events(username) });

    return {
      state: promise.state
    };
  }
});
</script>
