<template>
    <div class="component-star">
        <div class="stars" :class="starType">
            <span v-for="itemClass in itemClasses" :key="itemClass" class="item-star" :class="itemClass">{{itemClasses}}</span>
        </div>
    </div>
</template>
<script>
const starsNum = 5;
export default {
    props: {
        size: {
            type: Number
        },
        score: {
            type: Number
        }
    },
    computed: {
        starType() {
            return 'star-' + this.size;
        },
        itemClasses() {
            let results = [];
            let score = Math.floor(this.score * 2) / 2;
            //  判断是不是小数
            let hasDecimal = score % 1 !== 0;
            let int = Math.floor(score);
            for (let i = 0; i < int; i++) {
                results.push('on');
            }
            if (hasDecimal) {
                results.push('half');
            }
            console.log(results.length);
            if (results.length < starsNum) {
                let left = starsNum - results.length;
                for (let i = 0; i < left; i++) {
                    results.push('off');
                }
            }
            return results;
        }
    }
};
</script>
<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl';
  .stars
    font-size 0
    .item-star
      display inline-block
    &.star-24
      .item-star
        width 10px
        height 10px
        background-size 10px 10px 
        margin-right 3px
        &.on
          bg-img('./imgs/star24_on')
        &.half
          bg-img('./imgs/star24_half')
        &.off
          bg-img('./imgs/star24_off')  
    &.star-36
      .item-star
        width 15px
        height 15px
        background-size 15px 15px
        margin-right 6px
        &.on
          bg-img('./imgs/star36_on')
        &.half
          bg-img('./imgs/star36_half')
        &.off
          bg-img('./imgs/star36_off')   
    &.star-48
      .item-star
        width 20px
        height 20px
        background-size 20px 20px
        margin-right 22px
        &.on
          bg-img('./imgs/star48_on')
        &.half
          bg-img('./imgs/star48_half')
        &.off
          bg-img('./imgs/star48_off')       
</style>
