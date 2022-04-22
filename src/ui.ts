import { createApp } from 'vue';
import { createPinia } from 'pinia';

import { router } from './router';
import App from './App.vue';
import './ui.scss';

import * as Component from '@/components';

createApp(App)
  .use(router)
  .use(createPinia())
  .component('Button', Component.Button)
  .component('Select', Component.Select)
  .component('InputNumber', Component.InputNumber)
  .component('Modal', Component.Modal)
  .component('Details', Component.Details)
  .component('ErrorsBadge', Component.ErrorsBadge)
  .component('DataList', Component.DataList)
  .component('Spinner', Component.Spinner)
  .component('Table', Component.Table)
  .component('TextInput', Component.TextInput)
  .mount('#app');