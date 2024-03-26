<template>
  <div class="xtx-goods-page" v-if="goods">
    <div class="container">
      <!-- 面包屑 -->
      <xtxBread>
        <xtxBreadItem to="/">首页</xtxBreadItem>
        <xtxBreadItem :to="`/category/${goods.categories[1].id}`">{{
          goods.categories[1].name
        }}</xtxBreadItem>
        <xtxBreadItem :to="`/category/sub/${goods.categories[0].id}`">{{
          goods.categories[0].name
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
          <XtxNumbox label="数量" v-model="num" :max="goods.inventory" />
          <XtxButton
            @click="insertCart()"
            type="primary"
            style="margin-top: 20px"
            >加入购物车</XtxButton
          >
        </div>
      </div>
      <!-- 商品推荐 -->
      <GoodsRelevant :goodsId="goods.id" />
      <!-- 商品详情 -->
      <div class="goods-footer">
        <div class="goods-article">
          <!-- 商品+评价 -->
          <GoodsTabs />
          <!-- 注意事项 -->
          <GoodsWarn />
        </div>
        <!-- 24热榜+专题推荐 -->
        <div class="goods-aside">
          <GoodsHot :goodsId="goods.id" :type="1" />
          <GoodsHot :goodsId="goods.id" :type="2" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { provide, ref, watch } from 'vue'
import { findGood } from '@/api/product'
import { useRoute } from 'vue-router'
import GoodsRelevant from './components/goods-relevant'
import GoodsImage from './components/goods-image.vue'
import GoodsSales from './components/goods-sales.vue'
import GoodsName from './components/goods-name.vue'
import GoodsSku from './components/goods-sku.vue'
import GoodsTabs from './components/goods-tabs.vue'
import GoodsHot from './components/goods-hot.vue'
import GoodsWarn from './components/goods-warn.vue'
import { useStore } from 'vuex'
import Message from '@/components/library/Message'
export default {
  name: 'XtxGoodsPage',
  components: {
    GoodsRelevant,
    GoodsImage,
    GoodsSales,
    GoodsName,
    GoodsSku,
    GoodsTabs,
    GoodsHot,
    GoodsWarn
  },
  setup () {
    let goods = ref(null)
    goods = useGoods()
    const changeSku = (sku) => {
      if (sku.skuId) {
        goods.value.price = sku.price
        goods.value.oldPrice = sku.oldPrice
        goods.value.inventory = sku.inventory
      }
    }
    // numbox数量
    const num = ref(1)

    // 加入购物车
    const store = useStore()
    const currSku = ref(null)
    const insertCart = () => {
      if (currSku.value && currSku.value.skuId) {
        const { skuId, specsText: attrsText, inventory: stock } = currSku.value
        const { id, name, price, mainPictures } = goods.value
        store.dispatch('cart/insertCart', {
          skuId,
          attrsText,
          stock,
          id,
          name,
          price,
          nowPrice: price,
          picture: mainPictures[0],
          selected: true,
          isEffective: true,
          count: num.value
        }).then(() => {
          Message({ type: 'success', text: '加入成功' })
        })
      } else {
        Message({ text: '请选择完整规格' })
      }
    }
    // provide注入goods
    provide('goods', goods)
    return { goods, changeSku, num, insertCart }
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
</script>
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
