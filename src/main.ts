import Vue from 'vue';
import { createComponent, createElement as h } from '@vue/composition-api';

import App from './App.vue';
import './composition-api';
import router, { provideRouter } from './router';

import './styles/main.scss';

Vue.config.productionTip = false;

new Vue({
  router,
  render: h =>
    h(
      createComponent({
        setup() {
          provideRouter(router);

          return () => h(App);
        }
      })
    )
}).$mount('#app');
