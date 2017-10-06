<template>
	<div class="food" v-if="foodShow" ref="bs">
		<div class="food-content">
			<div class="img-header">
				<img src="./imgs/seller_avatar_256px.jpg" alt="">
				<i @click="foodShow=false" class="icon-arrow_lift"></i>
			</div>
			<div class="content">
				<h2 class="food-name">{{food.name}}</h2>
				<div class="food-detail">
					<span class="sellCount">月售{{food.sellCount}}份</span>
					<span class="rating">好评率{{food.rating}}%</span>
				</div>
				<div class="price-detail">
					<span class="price">￥{{food.price}}</span>
					<span class="oldPrice" v-show="food.oldPrice">￥{{food.oldPrice}}</span>
				</div>
				<div class="addCart" v-if="!food.count||food.count==0" @click="addCart">加入购物车</div>
				<transition name="fade">
					<!-- 引入cartcontrol组件 -->
					<div class="cartcontrol-wrapper">
						<cartcontrol :food="food" v-if="food.count>0"></cartcontrol>
					</div>
					<!-- 引入cartcontrol组件 -->
				</transition>
			</div>
			<!-- 分割组件 -->
			<split v-if="food.info"></split>
			<!-- 分割组件 -->
			<div class="food-info" v-if="food.info">
				<h2>商品介绍</h2>
				<p class="info">{{food.info}}</p>
			</div>
			<split v-if="food.ratings"></split>
			<div class="food-ratings-wrapper">
				<h2>商品评价</h2>
				<food-ratings :desc="desc" :ratings="food.ratings" ref="foodRate"></food-ratings>
			</div>
		</div>
	</div>
</template>
<script>
import Vue from 'vue';
import BScroll from 'better-scroll';
import cartcontrol from 'components/cartcontrol/cartcontrol';
import split from 'components/split/split';
import FoodRatings from 'components/foodratings/foodratings';
export default {
	data() {
		return {
			foodShow: false,
			desc: {
				negative: '吐槽',
				positive: '推荐',
				all: '全部'
			}
		};
	},
	props: {
		food: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	components: {
		cartcontrol,
		split,
		FoodRatings
	},
	methods: {
		showFlag() {
			this.foodShow = true;
			this.$nextTick(() => {
				if (!this.scroll) {
					this._initBS();
				} else {
					this.scroll.refresh();
				}
			});
		},
		// 绑定betterscroll
		_initBS() {
			this.scroll = new BScroll(this.$refs.bs, {
				click: true
			});
		},
		addCart() {
			if (!this.food.count) {
				Vue.set(this.food, 'count', 1);
			} else {
				this.food.count++;
			}
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.food
		position fixed
		width 100%
		top 0
		left 0
		bottom 50px
		z-index 10
		background-color #ffffff
		.food-content
			background-color #fff
			position relative
			.img-header
				position relative
				width 100%
				height 0
				padding-top 100%
				img
					position absolute
					left 0
					top 0
					width 100%
				.icon-arrow_lift
					position absolute
					top 0
					left 0
					font-size 18px
					padding 10px
					color #fefefe
			.content
				padding 18px
				position relative
				.food-name
					background-color #fff
					font-size 14px
					font-weight 700
					line-height 14px
					color rgb(7,17,27)
				.food-detail
					padding 8px 0 18px 0
					font-size 10px
					line-height 10px
					color rgb(147,153,159)
					.sellCount
						padding-right 12px
				.price-detail
					.price
						color rgb(240,20,20)
						font-weight 700
						line-height 24px
						font-size 14px
					.oldPrice
						font-size 10px
						line-height 24px
						font-weight 700
						color rgb(147,153,159)
				.addCart
					position absolute
					right 18px
					bottom 18px
					color #ffffff
					background-color rgb(0,160,220)
					line-height 12px
					font-size 10px
					padding 6px 12px
					border-radius 6px
				.cartcontrol-wrapper
					position absolute
					right 20px
					bottom 18px
			.food-info
				padding 18px
				h2
					font-size 14px
					line-height 14px
					color rgb(0,0,0)
				.info
					line-height 24px
					font-size 12px
					color rgb(77,85,90)
					font-weight 200
					padding 6px 0 0 8px
			.food-ratings-wrapper
				h2
					padding 18px 18px 6px 18px
</style>