import { createMemoryHistory, createRouter } from 'vue-router';
import ComponentDetailView from '../views/ComponentDetail.vue';
import ComponentsView from '../views/Components.vue';
import DebugView from '../views/Debug.vue';
import HomeView from '../views/Home.vue';
import SemanticView from '../views/Semantic.vue';
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
      path: '/components/:id',
      component: ComponentDetailView
    },
    {
      path: '/debug',
      name: 'Debug',
      component: DebugView
    }
  ]
});

export { router };
