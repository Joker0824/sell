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
        <div class="goods-wrapper">
            <ul>
                <li class="goods-item" v-for="good in goods" :key="good.name">
                    <h1 class="good-name">{{good.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="food in good.foods" :key="food.name">
                            <div class="icon-wrapper">
                                <img width="57" height="57" :src="food.icon" class="icon" alt="食物的icon">
                            </div>
                            <div class="content">
                                <h3 class="food-name">{{food.name}}</h3>
                                <p class="description">{{food.description}}</p>
                                <div class="other">
                                    <span class="sellCount">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="price">￥{{food.price}}</span>
                                    <span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>

                                </div>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
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
  .goods-wrapper
    .goods-item
      padding-right 18px     
      .good-name
        height 26px
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        background-color #f3f5f7
        border-left 4px solid #d9dde1
        padding-left 14px
      .food-item
        padding 18px  
      .icon-wrapper
        display inline-block
        vertical-align top
      .content
        display inline-block
        font-size 10px
        line-height 10px
        color rgb(147,153,159)
        padding-top 2px 
        .food-name
          font-size 14px
          line-height 14px
          color rgb(7,17,27)
          padding 2px 0 8px 0
        .description
          padding-bottom 8px
        .other
          font-size 0
          .sellCount
            font-size 10px
            padding-right 12px
          .rating
            font-size 10px   
</style>