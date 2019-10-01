<template>
  <div>
    <div v-if="state.isPending">Loading...</div>

    <div v-else-if="state.error">{{ state.error }}</div>

    <div v-else class="flex flex-col">
      <div class="bg-gray-100 border rounded-t p-4 text-sm">
        <div class="flex justify-between">
          <div class="flex">
            <a class="flex items-center cursor-pointer mr-4">
              <project-icon height="16" width="15" class="mr-2" />
              <span class="font-semibold">{{ openProjects }} Open</span>
            </a>

            <div class="flex items-center text-gray-600">
              <check-icon size="1.25x" class="mr-2" />
              <span>{{ closedProjects }} Closed</span>
            </div>
          </div>

          <div class="flex items-center text-gray-600 pr-4">
            <span class="mr-1">Sort</span>
            <triangle-down-icon size="0.75x" />
          </div>
        </div>
      </div>

      <div class="border border-t-0 rounded-b bg-white p-8">
        <div class="flex items-center justify-center text-xl font-semibold">
          {{ username }} doesn't have any projects yet.
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed } from '@vue/composition-api';
import {
  CheckIcon,
  ProjectIcon,
  TriangleDownIcon
} from '@brattonross/vue-octicons';
import { usePromise } from 'vue-compose-promise';

import GitHub from '../../github';

export default createComponent({
  name: 'UserProjects',

  components: {
    CheckIcon,
    ProjectIcon,
    TriangleDownIcon
  },

  props: {
    username: {
      type: String,
      required: true
    }
  },

  setup({ username }) {
    const promise = usePromise({ promise: GitHub.users.projects(username) });

    const openProjects = computed(() => 0);
    const closedProjects = computed(() => 0);

    return {
      closedProjects,
      openProjects,
      state: promise.state
    };
  }
});
</script>
