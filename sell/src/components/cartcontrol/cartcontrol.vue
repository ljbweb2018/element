<template>
    <div class="cartcontrol">
      <transition name="slide-fade">
        <div class="cart-decrease" v-show="food.count>0" @click.stop.prevent="decreaseCart">
          <span class="inner icon-remove_circle_outline"></span>
        </div>
      </transition>
      <div class="cart-count" v-show="food.count>0">{{ food.count }}</div>
      <div class="cart-add icon-add_circle" @click.stop.prevent="addCart"></div>
    </div>
</template>

<script type="text/ecmascript-6">
import Vue from 'vue'
export default {
  name: 'cartcontrol',
  props: {
    food: {
      type: Object
    }
  },
  created () {
  },
  methods: {
    addCart (event) {
      if (!event._constructed) {
        return // 检测事件派发是否来自于better-scrol
      }
      if (!this.food.count) {
        // 当给一个观测对象添加一个它不存在的属性的时候，直接赋值是不可以的，需要使用Vue.set设置这个属性
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$emit('cart-add', event.target) // 向父组件触发一个自定义的cart-add事件，同时将事件对象传递给父组件
    },
    decreaseCart () {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .cartcontrol
    font-size 0
    .cart-decrease
      display inline-block
      padding 6px
      .inner
        display inline-block
        line-height 24px
        font-size 24px
        color rgb(0,160,220)
      &.slide-fade-enter-active, &.slide-fade-leave-active
        transition all .4s linear
        .inner
          transition all .4s linear
          transform rotate(0deg)
      &.slide-fade-enter, &.slide-fade-leave-to
        transform translateX(24px)
        opacity 0
        .inner
          transform rotate(180deg)
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size 10px
      color rgb(147,153,159)
    .cart-add
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0,160,220)
</style>
