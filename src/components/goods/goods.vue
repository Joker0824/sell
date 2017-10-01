<template>
    <div class="goods">
        <div class="menu-wrapper" ref="menuScroll">
            <ul v-if="goods">
                <li @click="selectMenu(index,$event)" class="menu-item border-1px" :class="{currentMenu:menuCurrentIndex==index}" v-for="(item,index) in goods" :key="item.type">
                    <span class="text">
                        <i class="icon" :class="classMap[item.type]" v-if="item.type>0"></i>{{item.name}}</span>
                </li>
            </ul>
        </div>
        <div class="goods-wrapper" ref="goodsScroll">
            <ul>
                <li class="goods-item" v-for="good in goods" :key="good.name" ref="goodsItemHook">
                    <h1 class="good-name">{{good.name}}</h1>
                    <ul>
                        <li class="food-item" v-for="food in good.foods" :key="food.name">
                            <div class="icon-wrapper">
                                <img width="57" height="57" :src="food.icon" class="icon" alt="食物的icon">
                            </div>
                            <div class="content">
                                <h3 class="food-name">{{food.name}}</h3>
                                <p class="description" v-if="food.description">{{food.description}}</p>
                                <div class="other">
                                    <span class="sellCount">月售{{food.sellCount}}份</span>
                                    <span class="rating">好评率{{food.rating}}%</span>
                                </div>
                                <div class="price">
                                    <span class="price">￥{{food.price}}</span>
                                    <span class="oldPrice" v-if="food.oldPrice">￥{{food.oldPrice}}</span>
                                </div>
                            </div>
                            <cart-control :food="food"></cart-control>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
        <!-- 购物车组件 -->
        <shopcart :selectFood="selectFoods"></shopcart>
        <!-- 购物车组件 -->
    </div>
</template>
<script>
/* 引入better-scroll插件 */
import BScroll from 'better-scroll';
import Shopcart from 'components/shopcart/shopcart';
import CartControl from 'components/cartcontrol/cartcontrol';
const ERR_OK = 0;
export default {
    data() {
        return {
            goods: [],
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            // food对应的每种套餐的高度
            goodsHeightList: [],
            //  food的滚动高度
            scrollY: 0
        };
    },
    computed: {
        // 根据foods的scrollY算出左边是哪种类型的套餐
        menuCurrentIndex() {
            // console.log(this.scrollY);
            for (let i = 0; i < this.goodsHeightList.length - 1; i++) {
                let height1 = this.goodsHeightList[i];
                let height2 = this.goodsHeightList[i + 1];
                if (this.scrollY > height1 && this.scrollY < height2) {
                    return i;
                }
            }
            return 0;
        }
    },
    methods: {
        //  初始化better-scroll
        _initBScroll() {
            // 实例化menuscroll和goodscroll
            this.menuScroll = new BScroll(this.$refs.menuScroll, {
                click: true
            });
            this.goodsScroll = new BScroll(this.$refs.goodsScroll, {
                probeType: 3,
                click: true
            });
            this.goodsScroll.on('scroll', (pos) => {
                this.scrollY = Math.abs(pos.y);
            });
        },
        // 计算套餐所在高度
        _calculHeight() {
            let goodsItems = this.$refs.goodsItemHook;
            let height = 0;
            this.goodsHeightList.push(height);
            goodsItems.forEach(function(element) {
                height += element.offsetHeight;
                this.goodsHeightList.push(height);
            }, this);
        },
        // 点击左边的分类右边跳转到不同位置
        selectMenu(index, event) {
            let goodsItems = this.$refs.goodsItemHook;
            let el = goodsItems[index];
            // better-scroll的api,跳转到对应的套餐、
            this.goodsScroll.scrollToElement(el, 300);
        }
    },
    created() {
        this.axios.get('api/goods')
            .then((res) => {
                console.log(res.data);
                if (res.data.errno === ERR_OK) {
                    this.goods = res.data.data;
                    // dom更新后进行的操作
                    this.$nextTick(() => {
                        this._initBScroll();
                        this._calculHeight();
                    });
                    // console.log(this.goods);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },
    components: {
        /* 引入shopcart组件 */
        Shopcart,
        CartControl
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
      box-sizing border-box
      width 100%
      border-1px(rgba(7,17,27,0.1))
      &.currentMenu
        font-size 12px
        color rgb(240,20,20)
        line-height 14px
        background-color #fff
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
      .good-name
        height 26px
        font-size 12px
        color rgb(147,153,159)
        line-height 26px
        background-color #f3f5f7
        border-left 2px solid #d9dde1
        padding-left 14px
      .food-item
        padding 18px
        border-1px(rgba(7,17,27,0.1))
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
          line-height 18px
          padding-bottom 8px
        .other
          font-size 0
          .sellCount
            font-size 10px
            padding-right 12px
          .rating
            font-size 10px
        .price
          line-height 24px
          font-weight 700
          .price
            font-size 14px
            color rgb(255,0,0)
            margin-right 8px
          .oldPrice
            font-size 10px
            text-decoration line-through
</style>