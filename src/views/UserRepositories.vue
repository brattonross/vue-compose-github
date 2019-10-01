<template>
  <div>
    <p v-if="promise.isPending">
      Loading...
    </p>

    <p v-else-if="promise.error">
      {{ promise.error }}
    </p>

    <div v-else>
      <div
        v-for="repo in promise.data"
        :key="repo.id"
        class="bg-white rounded border px-5 py-4 mb-2"
      >
        <a class="text-lg font-semibold">{{ repo.name }}</a>
        <p class="text-sm text-gray-700 mb-2">{{ repo.description }}</p>

        <div class="flex text-sm text-gray-700">
          <user-repo-language
            v-if="repo.language"
            class="mr-4"
            :language="repo.language"
          />

          <user-repo-forks v-if="repo.forks" class="mr-4" :forks="repo.forks" />

          <user-repo-license
            v-if="repo.license"
            class="mr-4"
            :license="repo.license.name"
          />

          <time-ago :date="repo.updated_at">
            <template #default="{ timeAgo }">
              <span>Updated {{ timeAgo }}</span>
            </template>
          </time-ago>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent, ref } from '@vue/composition-api';
import { usePromise } from 'vue-compose-promise';

import GitHub from '../github';
import TimeAgo from '../components/TimeAgo.vue';
import UserRepoForks from '../components/user/UserRepoForks.vue';
import UserRepoLanguage from '../components/user/UserRepoLanguage.vue';
import UserRepoLicense from '../components/user/UserRepoLicense.vue';
import { useRouter } from '../router';

export default createComponent({
  name: 'UserRepositories',

  components: {
    TimeAgo,
    UserRepoForks,
    UserRepoLanguage,
    UserRepoLicense
  },

  props: {
    username: {
      type: String,
      required: true
    }
  },

  setup({ username }) {
    const router = useRouter();
    router.beforeResolve((to, from, next) => {
      console.log('before resolve');
      next();
    });

    const reposPromise = usePromise({
      promise: GitHub.users.repos(username)
    });

    return {
      promise: reposPromise.state
    };
  }
});
</script>
