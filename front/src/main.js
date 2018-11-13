import Vue from 'vue';
import app from './app.vue';
import router from './router';
import store from  './components/store/_all';
import wysiwyg from 'vue-wysiwyg';
import "vue-wysiwyg/dist/vueWysiwyg.css";

Vue.config.productionTip = false;
Vue.use(wysiwyg, {
  hideModules: { 
    'justifyLeft': true,
    'justifyCenter': true,
    'justifyRight': true,
    'image': true,
    'separator': true,
    'code': true,
  },
  maxHeight: '200px',
});

new Vue({
  router,
  store,
  render: h => h(app),
}).$mount('#app');


