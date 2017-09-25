import Vue from 'vue';
import Router from 'vue-router';
// import VHeader from 'components/header/header.vue';
import Sellers from 'components/sellers/sellers.vue';
import Goods from 'components/goods/goods.vue';
import Ratings from 'components/ratings/ratings.vue';
// 注释
Vue.use(Router);

export default new Router({
  routes: [{
    path: '/',
    name: 'home',
    component: Goods
  }, {
    path: '/goods',
    name: 'goods',
    component: Goods

  }, {
    path: '/sellers',
    name: 'sellers',
    component: Sellers

  }, {
    path: '/ratings',
    name: 'ratings',
    component: Ratings

  }],
  // 对应激活的router-link的css样式
  linkActiveClass: 'active'
});
