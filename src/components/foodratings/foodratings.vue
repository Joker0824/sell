<template>
	<div class="food-ratings">
		<div class="ratings-type">
			<span @click="selType('all')" :class="{'active':selectedType===0}" class="all">{{desc.all}}{{ratings.length}}</span>
			<span @click="selType('positive')" :class="{'active':selectedType===1}" class="positive">{{desc.positive}}{{count.posCount}}</span>
			<span @click="selType('negative')" :class="{'active':selectedType===2}" class="negative">{{desc.negative}}{{count.negCount}}</span>
		</div>
		<div class="onlyContent">
			<i @click="onlyContent" :class="{'active':selOnlyContent}" class="icon-check_circle"></i>
			<span>只看有内容的评价</span>
		</div>
		<div class="ratings-list">
			<ul>
				<li class="rating" v-for="rating in selectTypeRatings" :key="rating.username">
					<div class="rating-header clearfix">
						<div class="fl">
							<span class="rateTime">{{moment(rating.rateTime).format('l')}}
							</span>
						</div>
						<div class="fr">
							<span class="username">{{rating.username}}</span>
							<img :src="rating.avatar" width="24" height="24" alt="">
						</div>
					</div>
					<div class="rating-text">
						<i class="type" :class="{'icon-thumb_down':rating.rateType===1,'icon-thumb_up':rating.rateType===0}"></i>
						<span class="text">{{rating.text}}</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
	props: {
		desc: {
			type: Object,
			default() {
				return {
					all: '全部',
					positive: '满意',
					negative: '不满意'
				};
			}
		},
		ratings: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	computed: {
		//    计算各种评价的人数
		count() {
			let count = {
				negCount: 0,
				posCount: 0
			};
			this.ratings.forEach(function(rating) {
				if (rating.rateType === 1) {
					count.negCount++;
				} else if (rating.rateType === 0) {
					count.posCount++;
				}
			}, this);
			return count;
		}
	},
	data() {
		return {
			positive: '推荐',
			all: '全部',
			negative: '吐槽',
			selectTypeRatings: [],
			selOnlyContent: false,
			selectedType: 0
		};
	},
	methods: {
		selType(type) {
			this.selectTypeRatings = [];
			console.log(type);
			if (type === 'all') {
				this.selectedType = 0;
				this.selectTypeRatings = this.ratings;
			} else if (type === 'positive') {
				this.selectedType = 1;
				this.ratings.forEach(function(rating) {
					if (rating.rateType === 0) {
						this.selectTypeRatings.push(rating);
					}
				}, this);
			} else if (type === 'negative') {
				this.selectedType = 2;
				this.ratings.forEach(function(rating) {
					if (rating.rateType === 1) {
						this.selectTypeRatings.push(rating);
					}
				}, this);
			}
			this.selOnlyContent = false;
		},
		onlyContent() {
			let arr = [];
			if (!this.selectTypeRatings) {
				return;
			}
			this.selectTypeRatings.forEach(function(rating) {
				if (rating.text) {
					arr.push(rating);
				}
			}, this);
			this.selectTypeRatings = arr;
			this.selOnlyContent = !this.selOnlyContent;
		}
	}
};
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
	.food-ratings
		background-color #fff
		.ratings-type
			margin 0 18px
			padding 12px 0
			border-bottom 1px solid rgba(7,17,27,0.1)
			font-size 0
			line-height 16px
			.all
				background-color rgba(75,88,93,0.2)
				padding 8px 12px
				color #ffffff
				font-size 12px
				border-radius 12px
				margin-right 8px
			.positive
				padding 8px 12px
				color rgb(77,85,93)
				background-color  rgba(0,160,220,0.2)
				font-size 12px
				border-radius 12px
				margin-right 8px
			.negative
				padding 8px 12px
				background-color rgba(75,88,93,0.2)
				color rgb(77,85,93)
				font-size 12px
				border-radius 12px
			.active
				background-color rgba(0,160,220,1)
		.onlyContent
			padding 12px 18px
			line-height 24px
			font-size 0px
			color rgb(147,153,159)
			.icon-check_circle
				padding-right 4px
			  font-size 24px
			.active
				color rgba(0,160,00,0.5)
			span
				font-size 12px
				vertical-align top
		.ratings-list
			padding 12px 18px
	  	.rating
				padding 16px 18px
				border-top 1px solid rgba(7,17,27,0.1)
				.rating-header
					padding 0 18px
					.fl
						float left
					.fr
						float right
				.rating-text
					padding 6px 0 16px 4px
					.icon-thumb_up
						color rgba(0,160,220,1)
  </style>