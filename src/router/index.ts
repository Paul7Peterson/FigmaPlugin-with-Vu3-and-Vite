import { createRouter, createMemoryHistory } from 'vue-router';

import HomeView from '../views/Home.vue';
import TokensView from '../views/Tokens.vue';

const router = createRouter({
  history: createMemoryHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/tokens',
      name: 'Tokens',
      component: TokensView
    }
  ]
});

export { router };