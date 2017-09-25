<template>
    <div class="goods">
        <div class="menu-wrapper">
            <ul v-if="goods">
                <li class="menu-item border-1px" v-for="(item,index) in goods" :key="item.type">
                    <span class="text">
                        <i class="icon" :class="classMap[item.type]" v-if="item.type>0"></i>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="foods-list"></div>
    </div>
</template>
<script>
const ERR_OK = 0;
export default {
    data() {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
        };
    },
    created() {
        this.axios.get('api/goods')
            .then((res) => {
                console.log(res.data);
                if (res.data.errno === ERR_OK) {
                    this.goods = res.data.data;
                    console.log(this.goods);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    }
};
</script>
<style lang="stylus" rel="stylesheet/style">
@import '../../common/stylus/mixin.styl';
.goods
  position absolute
  z-index -1
  display flex
  top 176px
  bottom 64px
  width 100%
  overflow hidden
  .menu-wrapper
    flex 0 0 80px
    width 80px/* 保证移动端兼容性 */
    background-color rgba(7,17,27,0.1)
    .menu-item
      display table
      border-1px(rgba(7,17,27,0.1))
      height 54px
      padding 0 12px
     .icon
       display inline-block
       width 12px
       height 12px   
       margin-right 2px
       background-size 12px 12px
       background-repeat no-repeat
       vertical-align top
       margin-top 2px
       &.decrease 
         bg-img('./imgs/decrease_3')
       &.discount 
         bg-img('./imgs/discount_3')
       &.guarantee 
         bg-img('./imgs/guarantee_3')
       &.invoice 
         bg-img('./imgs/invoice_3')
       &.special 
         bg-img('./imgs/special_3')
     .text
       line-height 14px
       font-size 12px
       display table-cell
       vertical-align middle
</style>