import Vue from 'vue';
import App from './App.vue';

import { message1, message2 } from './data';
import func from './func';

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount('#app');

func(message1);
func(message2);
