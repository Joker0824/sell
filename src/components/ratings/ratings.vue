<template>
	<div class="ratings" ref="bsHook">
		<div class="ratings-content">
			<!-- 概览部分 -->
			<div class="overview">
				<div class="overview-left">
					<p class="score">{{seller.score}}</p>
					<h2>综合评分</h2>
					<p class="rankRate">高于周边商家{{seller.rankRate}}</p>
				</div>
				<div class="overview-right">
					<div class="score-wrapper">
						<span class="title">服务态度</span>
						<star :size="36" :score="4.1"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">商品评价</span>
						<star :size="36" :score="4.1"></star>
						<span class="score">{{seller.serviceScore}}</span>
					</div>
					<div class="score-wrapper">
						<span class="title">送达时间</span>
						<span class="deliveryTime">{{seller.deliveryTime}}分钟</span>
					</div>
				</div>
				<!-- 概览部分 -->
			</div>
			<!-- 分割组件 -->
			<split></split>
			<!-- 分割组件 -->
			<food-ratings :ratings="ratings">
				<div class="rating-list">
					<ul>
						<li class="rating">
						</li>
					</ul>
				</div>
			</food-ratings>
		</div>
	</div>
</template>
<script>
import star from 'components/star/star';
import split from 'components/split/split';
import foodRatings from 'components/foodratings/foodratings';
import BScroll from 'better-scroll';
const ERR_OK = 0;
export default {
	props: {
		seller: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			ratings: []
		};
	},
	created() {
		this.axios.get('api/ratings')
			.then((res) => {
				console.log(res.data);
				if (res.data.errno === ERR_OK) {
					this.ratings = res.data.data;
					this.$nextTick(() => {
						this.scroll = new BScroll(this.$refs.bsHook, {
							click: true
						});
						console.log(this.scroll);
					});
				}
			})
			.catch((error) => {
				console.log(error);
			});
	},
	components: {
		star,
		split,
		foodRatings
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.ratings
		position absolute
		top 176px
		bottom 0
		width 100%
		overflow hidden
		.ratings-content
			.overview
				display flex
				.overview-left
					flex 0 0 137px
					margin 18px 0
					width 137px
					text-align center
					border-right 1px solid rgba(7,17,27,.3)
					.score
						line-height 26px
						font-size 24px
						color rgb(255,153,0)
					h2
						font-size 12px
						line-height 12px
						color rgb(7,17,27)
						padding 6px 0 8px 0
					.rankRate
						color rgba(7,17,27,0.5)
						font-size 10px
						font-size 10px
						padding-bottom 6px
				.overview-right
					margin 18px 0
					flex 1
					padding-left 24px
					.score-wrapper
						padding-bottom 8px
						.title
							line-height 18px
							font-size 12px
							color rgb(7,17,27)
						.component-star
							display inline-block
							vertical-align top
						.score
							line-height 18px
							font-size 12px
							color rgb(255,153,0)
						.deliveryTime
							line-height 18px
							font-size 12px
							color rgb(147,153,159)
</style>