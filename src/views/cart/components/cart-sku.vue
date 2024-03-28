<template>
  <div class="cart-sku" ref="target">
    <div class="attrs" @click="toggle">
      <span class="ellipsis">{{ attrsText }}</span>
      <i class="iconfont icon-angle-down"></i>
    </div>
    <div class="layer" v-if="isShow">
        <template v-if="goods" >
            <GoodsSku :skuId="skuId" :goods="goods" />
            <XtxButton type="primary" size="mini" style="margin-left:60px" >确认</XtxButton>
        </template>
      <div class="loading" v-else></div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'
import GoodsSku from '@/views/goods/components/goods-sku.vue'
import { getSpecsAndSkus } from '@/api/product'
export default {
  name: 'CartSku',
  props: {
    attrsText: {
      type: String,
      default: ''
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  components: {
    GoodsSku
  },
  setup (props) {
    const goods = ref(null)
    const isShow = ref(false)
    const show = async () => {
      isShow.value = true
      // 获取当前spec和sku
      const { result } = await getSpecsAndSkus(props.skuId)
      goods.value = result
    }
    const hide = () => {
      isShow.value = false
      goods.value = null
    }
    const toggle = () => {
      isShow.value ? hide() : show()
    }
    const target = ref(null)
    onClickOutside(target, () => {
      hide()
    })

    return { isShow, toggle, target }
  }
}
</script>

<style scoped lang="less">
.cart-sku {
  height: 28px;
  border: 1px solid #f5f5f5;
  padding: 0 6px;
  position: relative;
  margin-top: 10px;
  display:inline-block;
  .attrs {
    line-height: 24px;
    display: flex;
    span {
      max-width: 230px;
      font-size: 14px;
      color: #999;
    }
    i {
      margin-left: 5px;
      font-size: 14px;
    }
  }
  .layer {
    position: absolute;
    left: -1px;
    top: 40px;
    z-index: 10;
    width: 400px;
    border: 1px solid @xtxColor;
    box-shadow: 2px 2px 4px lighten(@xtxColor,50%);
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    padding: 20px;
    &::before {
      content: "";
      width: 12px;
      height: 12px;
      border-left: 1px solid @xtxColor;
      border-top: 1px solid @xtxColor;
      position: absolute;
      left: 12px;
      top: -8px;
      background: #fff;
      transform: scale(.8,1) rotate(45deg);
    }
    .loading {
      height: 224px;
      background: url(~@/assets/images/loading.gif) no-repeat center;
    }
  }
}
</style>
