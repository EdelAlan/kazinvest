import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from  './components/store/_all';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app');
