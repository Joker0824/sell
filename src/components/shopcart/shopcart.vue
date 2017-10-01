<template>
	<div class="shopcart">
		<div class="content">
			<div class="content-left">
				<div class="logo-wrapper">
					<i class="icon-shopping_cart" :class="{highlight:totalCount>0}"></i>
				</div>
				<div class="price" :class="{highlight:totalPrice>0}">￥{{totalPrice}}</div>
				<div class="desc">另需配送费￥{{deliveryPrice}}元</div>
				<div class="badge" v-if="totalCount">{{totalCount}}</div>
			</div>
			<div class="content-right" :class="payClass">{{payText}}</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		selectFoods: {
			type: Array,
			default() {
				return [{
					price: 10,
					count: 3
				}];
			}
		},
		deliveryPrice: {
			type: Number,
			default() {
				return 0;
			}
		},
		minPrice: {
			type: Number,
			default() {
				return 20;
			}
		}
	},
	computed: {
		// 计算购物车的总价
		totalPrice() {
			let totalPrice = 0;
			this.selectFoods.forEach(function(food) {
				totalPrice += food.price * food.count;
			}, this);
			return totalPrice;
		},
		// 计算总数
		totalCount() {
			let totalCount = 0;
			this.selectFoods.forEach(function(food) {
				totalCount += food.count;
			});
			return totalCount;
		},
		// 计算付款时的文本
		payText() {
			if (this.totalCount === 0) {
				return '满￥20起送';
			} else if (this.totalPrice < this.minPrice) {
				let leftPay = this.minPrice - this.totalPrice;
				return `还剩${leftPay}起送`;
			} else {
				return `去结算`;
			}
		},
		// 计算付款的样式
		payClass() {
			if (this.totalPrice > this.minPrice) {
				return 'price-enough';
			} else {
				return 'price-notenough';
			}
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.content
		position fixed
		display flex
		left 0
		bottom 0
		height 48px
		width 100%
		line-height 24px
		font-size 16px
		font-weight 700
		color rgba(255,255,255,0.4)
		background-color #141d27
		.content-left
			position relative
			flex 1
			height 48px
			background-color #141d27
			.logo-wrapper
				position absolute
				left 18px
				bottom 8px
				width 50px
				height 50px
				background-color #141d27
				border-radius 50%
				.icon-shopping_cart
					display block
					width 44px
					height 44px
					border-radius 50%
					font-size 24px
					line-height 44px
					margin 6px 0 0 3px
					text-align center
					background-color rgba(255,255,255,0.4)
					&.highlight
						background-color rgb(0,160,220)
			.price
				display inline-block
				margin 12px 0 12px 80px
				padding-right 12px
				line-height 24px
				font-size 16px
				font-weight 700
				color rgba(255,255,255,0.4)
				border-right 1px solid rgba(255,255,255,0.4)
				&.highlight
					color rgb(255,255,255)
			.desc
				display inline-block
			.badge
				position absolute
				left 44px
				top -8px
				width 24px
				line-height 12px
				height 12px
				border-radius 6px
				background-color rgb(255,0,0)
				text-align center
				color rgb(255,255,255)
				font-size 9px
		.content-right
			flex 0 0 105px
			line-height 48px
			text-align center
			&.price-enough
				background-color rgb(0,220,80)
				color rgb(255,255,255)
			&.price-notenough
				background-color rgba(255,255,255,0.4)
			  color rgb(255,255,255)
</style>