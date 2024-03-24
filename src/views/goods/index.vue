<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtxBread>
        <xtxBreadItem to="/">首页</xtxBreadItem>
        <xtxBreadItem :to="'/category/' + goods.categories[0].id">{{
          goods.categories[0].name
        }}</xtxBreadItem>
        <xtxBreadItem :to="'/category/sub/' + goods.categories[1].id">{{
          goods.categories[1].name
        }}</xtxBreadItem>
        <xtxBreadItem>{{ goods.name }}</xtxBreadItem>
      </xtxBread>
      <!-- 商品信息 -->
      <div class="goods-info">
        <div class="media">
          <GoodsImage :images="goods.mainPictures"></GoodsImage>
          <GoodsSales />
        </div>
        <div class="spec">
          <GoodsName :goods="goods" />
          <GoodsSku :goods="goods" @change="changeSku" />
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <div class="goods-tabs"></div>
          <!-- 注意事项 -->
          <div class="goods-warn"></div>
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue'
import GoodsRelevant from './components/goods-relevant'
import { findGood } from '@/api/product'
import { useRoute } from 'vue-router'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku
  },
  setup () {
    const goods = useGoods()
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    return { goods, changeSku }
  }
}
const useGoods = () => {
  const goods = ref(null)
  const route = useRoute()
  watch(
    () => route.params.id,
    (newVal) => {
      if (newVal && `/product/${newVal}` === route.path) {
        findGood(route.params.id).then(({ result }) => {
          result.skus.forEach((sku) => {
            const sortSpecs = []
            result.specs.forEach((spec) => {
              sortSpecs.push(sku.specs.find((item) => item.name === spec.name))
            })
            sku.specs = sortSpecs
          })
          goods.value = result
        })
      }
    },
    { immediate: true }
  )
  return goods
}
</script>i

  <style scoped lang='less'>
.goods-info {
  min-height: 600px;
  background: #fff;
}
.goods-footer {
  display: flex;
  margin-top: 20px;
  .goods-article {
    width: 940px;
    margin-right: 20px;
  }
  .goods-aside {
    width: 280px;
    min-height: 1000px;
  }
}
.goods-tabs {
  min-height: 600px;
  background: #fff;
}
.goods-warn {
  min-height: 600px;
  background: #fff;
  margin-top: 20px;
}
.goods-info {
  min-height: 600px;
  background: #fff;
  display: flex;
  .media {
    width: 580px;
    height: 600px;
    padding: 30px 50px;
  }
  .spec {
    flex: 1;
    padding: 30px 30px 30px 0;
  }
}
</style>
