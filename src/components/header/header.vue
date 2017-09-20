<template>
    <div class="header">
        <div class="content">
            <!-- 头像区域 -->
            <div class="avatar">
                <img :src="sellers.avatar" width="64" height="64" alt="">
            </div>
            <!-- 头像区域 -->
            <!-- 内容区域 -->
            <div class="content-main">
                <div class="title">
                    <span class="brand"></span>
                    <span class="seller-name">{{sellers.name}}</span>
                </div>
                <div class="description">
                    {{sellers.description}}/{{sellers.deliveryTime}}分钟送达
                </div>
                <div v-if="sellers.supports" class="support">
                    <span class="support-icon" :class="classMap[sellers.supports[0].type]"></span>
                    <span class="support-text">{{sellers.supports[0].description}}</span>
                </div>
            </div>
            <!-- 内容区域 -->
            <!-- 右下角的数量 -->
            <div class="support-count" @click="showMask">
                <span class="span-count">5个</span>
                <span class="icon-keyboard_arrow_right"></span>
            </div>
            <!-- 右下角的数量 -->
        </div>
        <!-- 公告区域 -->
        <div class="bulletin" @click="showMask">
            <span class="bulletin-icon"></span>
            <span class="bulletin-text">{{sellers.bulletin}}</span>
            <i class="icon-keyboard_arrow_right"></i>
        </div>
        <!-- 公告区域 -->
        <!-- header背景 -->
        <div class="background">
            <img :src="sellers.avatar" alt="" width="100%" height="100%">
        </div>
        <!-- header背景 -->
        <!-- 弹出层 -->
        <div class="mask" v-show="isShowMask">
            <div class="mask-wrapper">
                <div class="mask-main">
                    <star :size="48" :score="4.1"></star>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                    <div>{{sellers.bulletin}}</div>
                </div>
            </div>
            <div class="mask-close">
                <i class="icon-close" @click="closeMask"></i>
            </div>
        </div>
        <!-- 弹出层 -->
    </div>
</template>
<script>
import Star from 'components/star/star.vue';
export default {
    props: ['sellers'],
    data() {
        return {
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            isShowMask: false
        };
    },
    methods: {
        showMask() {
            this.isShowMask = true;
        },
        closeMask() {
            this.isShowMask = false;
        }
    },
    components: {
        Star
    }
};
</script>
<style lang="stylus" rel="stylesheet/style" scoped>
// 只能是相对路径引用css
@import '../../common/stylus/mixin.styl'
.header
  position relative
  background-color rgba(7,17,27,0.5)
  /*去除header底部阴影*/
  overflow hidden
  .content
    position relative
    .avatar
     display inline-block
     vertical-align top
     padding 24px 16px 18px 24px
     img 
       border-radius 4px
    .content-main
     display inline-block
     padding-top 24px
     .title
       font-size 0px
       .brand
         display inline-block
         bg-img('./imgs/brand')
         width 30px
         height 18px
         background-size 30px 18px
         margin-right 12px
       .seller-name
         font-size 16px
         color #ffffff
         font-weight bold
         line-height 18px
         vertical-align top
     .description
       font-size 12px
       color #ffffff
       font-weight 200
       line-height 12px
       padding 8px 0 10px 0
     .support
       font-size 0
       .support-icon
         display inline-block
         width 12px
         height 12px   
         margin-right 4px
         background-size 12px 12px
         &.decrease 
           bg-img('./imgs/decrease_1')
         &.discount 
           bg-img('./imgs/discount_1')
         &.guarantee 
           bg-img('./imgs/guarantee_1')
         &.invoice 
           bg-img('./imgs/invoice_1')
         &.special 
           bg-img('./imgs/special_1')
       .support-text
         font-size 10px
         color #ffffff
         font-weight 200
         line-height 12px
         vertical-align top
    .support-count
     position absolute
     padding 7px 8px
     right 12px
     bottom 18px
     color #ffffff
     line-height px
     font-size 10px
     font-weight 200
     background-color rgba(0,0,0,.2)
     border-radius 8px
  .bulletin
    position relative
    height 28px
    line-height 28px
    padding 0 22px 0 12px
    white-space nowrap
    overflow hidden 
    text-overflow ellipsis
    color rgba(255,255,255,1)
    background-color rgba(7,17,27,.2)
    .bulletin-icon
      display inline-block
      width 22px
      height 12px
      bg-img('./imgs/bulletin')
      background-size 22px 12px
      background-repeat no-repeat
      padding-top 8px
      background-origin content-box
    .bulletin-text
      font-size 10px
      padding 0 4px
      vertical-align top
    .icon-keyboard_arrow_right
      font-size 10px
      position absolute
      right 12px
      top 8px
  .background
    position absolute
    width 100%
    height 100%
    top 0
    left 0
    z-index -1
    filter blur(10px)
    background-color rgba(7,17,27,0.5)
  .mask
    position fixed
    left 0
    top 0
    width 100%
    height 100%
    background-color rgba(7,17,27,0.8)
    z-index 100
    overflow auto
    color #fff
    .mask-wrapper
      .mask-main
        padding-bottom 64px
        margin-top 64px
        text-align center  
    .mask-close
      position relative
      height 32px
      margin-top -32px
      margin-bottom 32px
      .icon-close
        position absolute
        left 50%
        transform translateX(-50%)
        display inline-block  
        width 32px
        height 32px
        font-size 32px
        line-height 32px
</style>

