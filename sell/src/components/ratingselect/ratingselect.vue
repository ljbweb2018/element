<template>
  <div class="ratingselect">
    <div class="rating-type">
      <span class="block positive" @click="select(2,$event)" :class="{'active':mySelectType===2}">{{ desc.all }}<span class="count">{{ ratings.length }}</span></span>
      <span class="block positive" @click="select(0,$event)" :class="{'active':mySelectType===0}">{{ desc.positive }}<span class="count">{{ positives.length }}</span></span>
      <span class="block negative" @click="select(1,$event)" :class="{'active':mySelectType===1}">{{ desc.negative }}<span class="count">{{ negatives.length }}</span></span>
    </div>
    <div class="switch" @click="toggleContent($event)" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看有内容的评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
const POSITIVE = 0 // 推荐
const NEGATIVE = 1 // 吐槽
const ALL = 2 // 满意
export default {
  name: 'ratingselect',
  props: {
    ratings: {
      type: Array,
      default () {
        return []
      }
    },
    selectType: {
      type: Number,
      default: ALL // 默认
    },
    onlyContent: { // 读取&不读取内容
      type: Boolean,
      default: false
    },
    desc: { // 描述
      type: Object,
      default () {
        return {
          all: '全部',
          positive: '推荐',
          negative: '吐槽'
        }
      }
    }
  },
  computed: {
    positives () {
      return this.ratings.filter((rating) => { // 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        return rating.rateType === POSITIVE
      })
    },
    negatives () {
      return this.ratings.filter((rating) => { // 创建一个新的数组，新数组中的元素是通过检查指定数组中符合条件的所有元素。
        return rating.rateType === NEGATIVE
      })
    }
  },
  data () {
    return {
      mySelectType: this.selectType,
      myOnlyContent: this.onlyContent
    }
  },
  methods: {
    select (type, event) {
      if (!event._constructed) {
        return // 检测事件派发是否来自于better-scrol
      }
      this.mySelectType = type
      this.$emit('increment', 'selectType', this.mySelectType)
    },

    toggleContent (event) {
      if (!event._constructed) {
        return
      }
      this.myOnlyContent = !this.myOnlyContent
      this.$emit('increment', 'onlyContent', this.myOnlyContent)
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
@import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding 18px 0
      margin 0 18px
      border-bottom 1px solid rgba(7,17,27,.1)
      font-size 0
      .block
        display inline-block
        padding 8px 12px
        margin-right 8px
        border-radius 1px
        font-size 12px
        color rgb(77,85,93)
        &.active
          color #fff
        .count
          margin-left 2px
          font-size 8px
          line-height 16px
        &.positive
          background rgba(0,160,220,.2)
          &.active
            background rgb(0,160,220)
        &.negative
          background rgba(77,85,93,.2)
          &.active
            background rgb(77,85,93)
    .switch
      padding 12px 18px
      line-height 24px
      border-bottom 1px solid rgba(7,17,27,.1)
      color rgb(147,153,159)
      font-size 0
      &.on
        .icon-check_circle
          color #00c850
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
        margin-right 4px
      .text
        font-size 12px
</style>
