<template>
  <div class="goods-tabs">
    <nav>
      <a @click="activeCom = 'GoodsDetail'" :class="{active:activeCom === 'GoodsDetail'}" href="javascript:;">商品详情</a>
      <a @click="activeCom = 'GoodsComment'" :class="{active:activeCom === 'GoodsComment'}" href="javascript:;">商品评价<span>({{goods.commentCount}})</span></a>
    </nav>
    <!-- 切换内容的地方 -->
    <component :is="activeCom"></component>
  </div>
</template>

<script>
import { inject, ref } from 'vue'
import GoodsComment from './goods-comment.vue'
import GoodsDetail from './goods-detail.vue'
export default {
  name: 'GoodsTabs',
  components: {
    GoodsDetail,
    GoodsComment
  },
  setup () {
    const activeCom = ref('GoodsDetail')
    const goods = inject('goods')
    return { activeCom, goods }
  }
}
</script>

<style lang="less" scoped>
.goods-tabs {
  min-height: 600px;
  background: #fff;
  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;
    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;
      > span {
        color: @priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
      &:first-child {
        border-right: 1px solid #f5f5f5;
      }
      &.active {
        &::before {
          content: "";
          position: absolute;
          left: 40px;
          bottom: -1px;
          width: 72px;
          height: 2px;
          background: @xtxColor;
        }
      }
    }
  }
}
</style>
