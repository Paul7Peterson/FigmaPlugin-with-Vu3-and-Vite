import { createRouter, createMemoryHistory } from 'vue-router';

import HomeView from '../views/Home.vue';
import TokensView from '../views/Tokens.vue';
import SemanticView from '../views/Semantic.vue';
import ComponentsView from '../views/Components.vue';
import DebugView from '../views/Debug.vue';

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
    },
    {
      path: '/semantic',
      name: 'Semantic',
      component: SemanticView
    },
    {
      path: '/components',
      name: 'Components',
      component: ComponentsView
    },
    {
      path: '/debug',
      name: 'Debug',
      component: DebugView
    }
  ]
});

export { router };