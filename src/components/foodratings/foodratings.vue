<template>
	<div class="food-ratings">
		<div class="ratings-type">
			<span @click="selType('all')" :class="{'active':selectedType===0}" class="all">{{desc.all}}{{ratings.length}}</span>
			<span @click="selType('positive')" :class="{'active':selectedType===1}" class="positive">{{desc.positive}}{{count.posCount}}</span>
			<span @click="selType('negative')" :class="{'active':selectedType===2}" class="negative">{{desc.negative}}{{count.negCount}}</span>
		</div>
		<div class="onlyContent">
			<i @click="toggleContent" :class="{'active':onlyContent}" class="icon-check_circle"></i>
			<span>只看有内容的评价</span>
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
		},
		onlyContent: {
			type: Boolean,
			default: false
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
			if (type === 'all') {
				type = 2;
			} else if (type === 'positive') {
				type = 0;
			} else {
				type = 1;
			}
			this.$emit('select', type, this.selectTypeRatings);
		},
		toggleContent() {
			// 通知父组件执行方法
			this.$emit('toggle');
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
  </style>