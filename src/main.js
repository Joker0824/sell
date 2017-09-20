// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
// 引入axios组件
import axios from 'axios';
Vue.prototype.axios = axios;
// 全局引用css
import '@/common/stylus/index.styl';
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App></App>',
  components: {
    App
  }
});
