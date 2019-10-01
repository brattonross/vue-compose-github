<template>
  <div class="container :mx-auto px-4 py-6">
    <div class="flex">
      <div class="w-1/4 pr-10">
        <user-profile-loader v-if="pending" />

        <template v-else>
          <img class="border border-b-0 rounded-t" :src="user.avatar_url" />

          <div class="py-4">
            <h1 class="font-semibold text-3xl leading-tight">
              {{ user.name }}
            </h1>
            <span class="text-gray-600 font-light text-2xl leading-none">
              {{ user.login }}
            </span>
          </div>

          <button
            class="border rounded w-full px-2 py-1 bg-gray-100 font-semibold mb-4"
          >
            Follow
          </button>

          <div class="flex flex-col text-sm text-gray-600">
            <span>{{ user.bio }}</span>

            <div class="flex items-center">
              <location-icon class="mr-2" />
              <span>{{ user.location }}</span>
            </div>

            <div class="flex items-center">
              <link-icon class="mr-2" />
              <a :href="user.blog">{{ user.blog }}</a>
            </div>

            <hr class="my-4" />

            <h2 class="text-gray-700 text-lg font-semibold mb-1">
              Organizations
            </h2>
            <div class="flex items-center">
              <div v-for="org in orgs" :key="org.id" class="mr-1">
                <img :src="org.avatar_url" height="35" width="35" />
              </div>
            </div>
          </div>
        </template>
      </div>

      <div class="w-3/4">
        <div class="flex flex-col">
          <user-nav
            v-if="user"
            :followers="user.followers"
            :following="user.following"
            :repositories="user.public_repos"
          />

          <div class="mt-8">
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, computed, ref, watch } from '@vue/composition-api';
import { LinkIcon, LocationIcon } from '@brattonross/vue-octicons';
import { usePromise } from 'vue-compose-promise';

import GitHub from '../../github';
import UserNav from '../../components/user/UserNav.vue';
import UserProfileLoader from '../../components/user/loaders/UserProfileLoader.vue';

export default createComponent({
  name: 'UserProfile',

  components: {
    LinkIcon,
    LocationIcon,
    UserNav,
    UserProfileLoader
  },

  props: {
    username: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const promise = usePromise({
      promise: Promise.all([
        GitHub.users.user(props.username),
        GitHub.users.orgs(props.username)
      ])
    });

    const pending = computed(() => promise.state.isPending);
    const user = computed(() =>
      promise.state.data ? promise.state.data[0] : null
    );
    const orgs = computed(() =>
      promise.state.data ? promise.state.data[1] : null
    );

    return {
      pending,
      user,
      orgs
    };
  }
});
</script>
