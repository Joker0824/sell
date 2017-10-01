<template>
	<div class="cartcontrol">
		<div class="cartcontrol-wrapper">
			<transition name="move">
				<div class="decrease" @click="decreaseFood" v-if="food.count>0">
					<i class="icon-remove_circle_outline"></i>
				</div>
			</transition>
			<div class="foodCount" v-if="food.count>0">{{food.count}}</div>
			<div class="addFood" @click="addFood">
				<i class="icon-add_circle "></i>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		food: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	methods: {
		addFood() {
			if (!this.food.count) {
				// 动态添加的属性
				this.$set(this.food, 'count', 1);
			} else {
				// console.log(this.food);
				this.food.count++;
			}
			// console.log(this.food.count);
			// console.log('addFoodCompeleted');
		},
		decreaseFood() {
			this.food.count--;
			// console.log('decreaseCompeleted');
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.cartcontrol-wrapper
		position absolute
		right 18px
		bottom 18px
		height 24px
		font-size 0
		color rgb(0,160,222)
		.addFood
			display inline-block
			font-size 24px
			line-height 24px
		.foodCount
			display inline-block
			width 24px
			line-height 24px
			vertical-align top
			font-size 10px
			color rgb(147,153,159)
			text-align center
		.decrease
			display inline-block
			font-size 24px
			line-height 24px
</style>