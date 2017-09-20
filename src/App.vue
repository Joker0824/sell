<template>
  <div id="app">
    <!-- header部分 -->
    <v-header :sellers="sellers"></v-header>
    <!-- header部分 -->
    <!-- 导航栏 -->
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link to="/goods">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/ratings">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link to="/sellers">商家</router-link>
      </div>
    </div>
    <!-- 导航栏 -->
    <router-view></router-view>
  </div>
</template>
<script>
// 导入组件
import VHeader from '@/components/header/header.vue';
// 定义成功的状态码
const ERR_OK = 0;
export default {
  data() {
    return {
      sellers: {}
    };
  },
  // 实例创建钩子
  created() {
    this.axios.get('api/sellers').then((res) => {
      let data = res.data;
      console.log(data);
      if (data.errno === ERR_OK) {
        // console.log('success');
        this.sellers = data.data;
      }
    }).catch((err) => {
      console.log(err);
    });
  },
  // 注册组件
  components: { VHeader }
};
</script>
<style lang="stylus" rel="stylesheet/stylus">
@import './common/stylus/mixin.styl'; 
  #app
   .tab
    display flex
    height 40px
    line-height 40px
    width 100%
    border-1px(rgba(7,17,27,.1))
    .tab-item
     flex 1
     text-align center
     & > a
      display block
      font-size 14px
      color #778593
      &.active
       color #dd0000
</style>