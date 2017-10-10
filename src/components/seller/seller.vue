<template>
	<div class="sellers" ref="scrollHook">
		<div class="sellers-content">
			<div class="overview">
				<h2 class="sellers-name">{{sellers.name}}</h2>
				<div class="star-wrapper">
					<star class="star" :size="36" :score="sellers.score"></star>
					<span class="ratingCount">({{sellers.ratingCount}})</span>
					<span class="sellCount">月售{{sellers.sellCount}}单</span>
				</div>
				<div class="delivery-info">
					<div class="info-item"><p class="title">起送价</p><span>{{sellers.minPrice}}元</span></div>
					<div class="info-item"> <p class="title">商家配送</p><span>{{sellers.deliveryPrice}}元</span></div>
					<div class="info-item"><p class="title">平均配送时间</p><span>{{sellers.deliveryTime}}分钟</span></div>
				</div>
			</div>
			<split></split>
			<!-- 公告和活动 -->
			<div class="bulletin">
				<h2 class="title">公告与活动</h2>
        <div class="text">
         {{sellers.bulletin}}
				</div>
				<div class="supports">
					<ul>
						<li class="support" v-for="(support,index) in sellers.supports" :key="support.type">
              <i class="icon" :class="classMap[support.type]"></i>
							<span class="text">{{sellers.supports[index].description}}</span>
						</li>
					</ul>
				</div>
			</div>
			<!-- 公告和活动 -->
			<!-- 商家实景 -->
			<div class="picture"></div>
			<!-- 商家实景 -->
			<!-- 商家信息 -->
			<div class="info"></div>
			<!-- 商家信息 -->
		</div>
	</div>
</template>
<script>
import star from 'components/star/star';
import split from 'components/split/split';
import BScroll from 'better-scroll';
export default {
	props: {
		sellers: {
			type: Object,
			default() {
				return {};
			}
		}
	},
	data() {
		return {
			classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
		};
	},
	methods: {
		_initBS() {
			if (!this.scroll) {
				this.scroll = new BScroll(this.$refs.scrollHook, {
					click: true
				});
			} else {
				this.scroll.refresh();
			}
	}

	},
    watch: {
      sellers() {
				console.log(this.sellers);
        this.$nextTick(() => {
          this._initBS();
        });
      }
    },
    mounted() {
      this.$nextTick(() => {
        this._initBS();
      });
    },
		components: {
			star,
			split
		}
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
.sellers
	position absolute
	left 0
	top 176px
	width 100%
	overflow hidden
	.sellers-content
		.overview
			padding 18px 0
			margin 0 18px
			.star-wrapper
				line-height 18px
				font-size 10px
				color rgb(77,85,93)
				border-bottom 1px solid rgb(147,153,159)
				padding 8px 0 18px 0
				.star
					display inline-block
					vertical-align top
					padding-top 2px
      .sellers-name
				font-size 14px
        color rgb(7,17,27)
				line-height 14px
			.delivery-info
				display flex
				padding-top 18px
				text-align center
				.info-item
					flex 1
					border-right 1px solid rgb(147,153,159)
					font-size 10px
					line-height 10px
					color rgb(147,153,159)
					&:last-of-type
						border none
					.title
						padding-bottom 4px
					span
						font-size 16px
						line-height 24px
						font-weight 200
						color rgb(7,17,27)
		.bulletin
			padding 0 18px
			.title
				padding 18px 0 8px 0
				font-size 14px
				line-height 14px
				color rgb(7,17,27)
			.text
				padding-left 12px
				font-size 12px
				line-height 24px
				color rgb(240,20,20)
				font-weight 200
			.supports
				padding-top 16px
				.support
					border-top 1px solid rgba(7,17,27,0.1)
					padding 16px 12px
					.icon
						display inline-block
						vertical-align top
						width 18px
						height 18px
						margin-right 4px
						background-size 18px 18px
						&.decrease
							bg-img('./imgs/decrease_2')
						&.discount
							bg-img('./imgs/discount_2')
						&.guarantee
							bg-img('./imgs/guarantee_2')
						&.invoice
							bg-img('./imgs/invoice_2')
						&.special
							bg-img('./imgs/special_2')
					.text
						font-size 12px
						line-height 16px
						font-weight 200
						color rgb(7,17,27)
</style>

