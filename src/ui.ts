import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { router } from './router';
import App from './App.vue';
import './ui.scss';

import {
  Button,
  Select,
  InputNumber,
  Modal,
  Details,
} from '@/components';

createApp(App)
  .use(router)
  .use(createPinia())
  .component('Button', Button)
  .component('Select', Select)
  .component('InputNumber', InputNumber)
  .component('Modal', Modal)
  .component('Details', Details)
  .mount('#app');
