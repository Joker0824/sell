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
			<food-ratings @toggle="toggleContent" :ratings="ratings" :onlyContent="onlyContent" @select="selType"></food-ratings>
			<div class="ratings-list">
				<ul>
					<li v-if="needShow(rating.rateType,rating.text)" v-for="rating in ratings" class="rating" :key="rating.username">
						<div class="rating-left">
							<img :src="rating.avatar" width="28" height="28" alt="">
						</div>
						<div class="rating-right">
							<p class="username">{{rating.username}}</p>
							<div class="star-wrapper">
								<star :size="24" :score="rating.score" class="star"></star>
								<span v-if="rating.deliveryTime" class="deliveryTime">{{rating.deliveryTime}}分钟送达</span>
							</div>
							<div class="text">{{rating.text}}</div>
							<div class="recommend">
								<i :class="{'icon-thumb_up':rating.rateType===0,'icon-thumb_down':rating.rateType===1}"></i>
								<span v-for="recommend in rating.recommend" :key="recommend">{{recommend}}</span>
							</div>
						</div>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import star from 'components/star/star';
import split from 'components/split/split';
import foodRatings from 'components/foodratings/foodratings';
import BScroll from 'better-scroll';
const ERR_OK = 0;
const ALL = 2;
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
			ratings: [],
			selectType: ALL,
			onlyContent: false
		};
	},
	methods: {
		selType(type) {
			this.selectType = type;
			this.$nextTick(() => {
				this._initBS();
			});
		},
		_initBS() {
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.bsHook, {
					click: true
				});
			} else {
				this.scroll.refresh();
			}
		},
		needShow(type, text) {
			console.log('type===' + type);
			console.log('rating.text===' + type);
			if (this.onlyContent && !text) {
				return false;
			}
			if (this.selectType === ALL) {
				return true;
			} else {
				return type === this.selectType;
			}
		},
		toggleContent() {
			this.onlyContent = !this.onlyContent;
			this.$nextTick(() => {
				this.scroll.refresh();
			});
		}
	},
	created() {
		this.axios.get('api/ratings')
			.then((res) => {
				console.log(res.data);
				if (res.data.errno === ERR_OK) {
					this.ratings = res.data.data;
					this.$nextTick(() => {
						this._initBS();
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
			.ratings-list
				padding 0 18px
				.rating
					position relative
					padding 18px 0
					border-bottom 1px solid rgba(147,153,159,0.3)
					.rating-left
						position absolute
						left 0
						top 18px
					  img
							border-radius 50%
					.rating-right
						padding-left 40px
            .username
							font-size 10px
							line-height 12px
							color rgb(7,17,27)
						.star-wrapper
							padding-top 4px
							.star
								display inline-block
								vertical-align top
								padding-top 2px
							.deliveryTime
								font-size 10px
								line-height 12px
								font-weight 200
								color rgb(147,153,159)
            .text
							line-height 18px
							font-size 12px
							color rgb(7,17,27)
							font-weight 400
							padding 6px 0 8px 0
						.recommend
							.icon-thumb_up
								font-size 12px
								line-height 16px
								color rgb(0,160,220)
              .icon_thumb_down
								font-size 12px
								line-height 16px
							span
								font-size 9px
								line-height 16px
								color rgb(147,153,159)
								border-radius 2px
								border-width 3px
								border-color rgba(7,17,27,1)
								padding 0 6px
</style>