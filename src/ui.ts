import { createPinia } from 'pinia';
import { createApp } from 'vue';
//
import * as Component from '~ui/components';
import App from './App.vue';
import { router } from './router';
import './ui.scss';

const app = createApp(App)
  .use(router)
  .use(createPinia())
  .component('Button', Component.Button)
  .component('Select', Component.Select)
  .component('InputNumber', Component.InputNumber)
  .component('Modal', Component.Modal)
  .component('Details', Component.Details)
  .component('ErrorsBadge', Component.ErrorsBadge)
  .component('DescriptionList', Component.DescriptionList)
  .component('Spinner', Component.Spinner)
  .component('Table', Component.Table)
  .component('TextInput', Component.TextInput)
  .component('NumberInput', Component.NumberInput);

app.mount('#app');
