<template>
  <ul class="flex border-b">
    <router-link
      v-for="item in items"
      :key="item.to"
      class="flex items-center text-sm text-gray-600 cursor-pointer p-4 mr-2 border-b-2 border-transparent hover:border-gray-400"
      exact-active-class="text-gray-700 font-semibold border-b-2 border-orange-600 hover:border-orange-600"
      tag="li"
      :to="{ name: item.to }"
    >
      <span class="mr-2">
        {{ item.text }}
      </span>

      <div
        v-if="item.total !== undefined"
        class="flex items-center text-xs font-semibold bg-gray-200 text-gray-600 rounded-full px-1"
      >
        {{ item.total }}
      </div>
    </router-link>
  </ul>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import numeral from 'numeral';

export default createComponent({
  name: 'UserNav',

  props: {
    followers: {
      type: Number,
      default: 0
    },

    following: {
      type: Number,
      default: 0
    },

    projects: {
      type: Number,
      default: 0
    },

    repostiories: {
      type: Number,
      default: 0
    },

    stars: {
      type: Number,
      default: 0
    }
  },

  setup({ projects, stars, followers, following, repostiories }) {
    const format = val => {
      if (val < 1000) return val;
      return numeral(val).format('0.0a');
    };

    const items = ref([
      { text: 'Overview', to: 'user', total: undefined },
      { text: 'Repositories', to: 'repositories', total: format(repostiories) },
      { text: 'Projects', to: 'projects', total: format(projects) },
      { text: 'Stars', to: 'stars', total: format(stars) },
      { text: 'Followers', to: 'followers', total: format(followers) },
      { text: 'Following', to: 'following', total: format(following) }
    ]);

    return {
      items
    };
  }
});
</script>
