import Vue from 'vue';
import { provide, inject } from '@vue/composition-api';
import Router from 'vue-router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/:username',
      name: 'user',
      component: () => import('./views/user/UserProfile.vue'),
      props: true,
      children: [
        {
          path: '/',
          name: 'overview',
          component: () => import('./views/user/UserOverview.vue'),
          props: true
        },
        {
          path: 'followers',
          name: 'followers',
          component: () => import('./views/user/UserFollowers.vue'),
          props: true
        },
        {
          path: 'projects',
          name: 'projects',
          component: () => import('./views/user/UserProjects.vue'),
          props: true
        },
        {
          path: 'repositories',
          name: 'repositories',
          component: () => import('./views/user/UserRepositories.vue'),
          props: true
        }
      ]
    }
  ]
});

router.beforeEach((to, _from, next) => {
  if (to.name) {
    NProgress.start();
  }

  next();
});

router.afterEach(() => {
  NProgress.done();
});

const RouterSymbol = Symbol();

export function provideRouter(router: Router) {
  provide(RouterSymbol, router);
}

export function useRouter(): Router {
  const router = inject<Router>(RouterSymbol);
  if (!router) {
    throw new Error('router must be provided');
  }
  return router;
}

export default router;
