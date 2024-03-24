<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img
            :src="val.picture"
            v-if="val.picture"
            :title="val.name"
            :class="{ selected: val.selected }"
            @click="clickSpecs(item.val)"
            alt=""
          />
          <span
            :class="{ selected: val.selected }"
            @click="clickSpecs(item, val)"
            v-else
            >{{ val.name }}</span
          >
        </template>
      </dd>
    </dl>
    <dl>
      <dt>尺寸</dt>
      <dd>
        <span class="disabled">10英寸</span>
        <span class="selected">20英寸</span>
        <span>30英寸</span>
      </dd>
    </dl>
    <dl>
      <dt>版本</dt>
      <dd>
        <span>美版</span>
        <span>港版</span>
      </dd>
    </dl>
  </div>
</template>
<script>
import getPowerSet from '@/vender/power-set'
export default {
  name: 'GoodsSku',
  props: {
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    },
    skuId: {
      type: String,
      default: ''
    }
  },
  setup (props, { emit }) {
    const clickSpecs = (item, val) => {
      if (val.disabled) return false
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach((bv) => {
          bv.selected = false
        })
        val.selected = true
      }
    }

    const pathMap = getPathMap(props.goods.skus)
    initSelectedStatus(props.goods, props.skuId)
    updateDisabledStatus(props.specs, pathMap)
    // 触发change事件将sku数据传递出去
    const selectedArr = getSelectedArr(props.goods.specs).filter((v) => v)
    if (selectedArr.length === props.goods.specs.length) {
      const skuIds = pathMap[selectedArr.join(spliter)]
      const sku = props.goods.skus.find((sku) => sku.id === skuIds[0])
      // 传递
      emit('change', {
        skuId: sku.id,
        price: sku.price,
        oldPrice: sku.oldPrice,
        inventory: sku.inventory,
        specsText: sku.specs
          .reduce((p, n) => `${p} ${n.name}:${n.valueName}`, '')
          .replace(' ', '')
      })
    } else {
      emit('change', {})
    }
    return { clickSpecs }
  }
}
const spliter = '★'
const getPathMap = (skus) => {
  const pathMap = {}
  skus.forEach((sku) => {
    if (sku.inventory) {
      const specs = sku.specs.map((spec) => spec.valueName)
      const powerSet = getPowerSet(specs)
      powerSet.forEach((set) => {
        const key = set.join(spliter)
        if (pathMap[key]) {
          pathMap[key].push(sku.id)
        } else {
          pathMap[key] = [sku.id]
        }
      })
    }
  })
  return pathMap
}

// 获取当前选择合集
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((specs) => {
    const selectedVal = specs.values.find((val) => val.selected)
    selectedArr.push(selectedVal ? selectedVal.name : undefined)
  })
  return selectedArr
}

// 更新按钮状态
const updateDisabledStatus = (specs, pathMap) => {
  specs.forEach((spec, i) => {
    const selectedArr = getSelectedArr(specs)
    spec.values.forEach((val) => {
      if (val.name === selectedArr[i]) return false
      selectedArr[i] = val.name
      const key = selectedArr.filter((v) => v).join(spliter)
      val.disabled = !pathMap[key]
    })
  })
}
// 初始化选中状态
const initSelectedStatus = (goods, skuId) => {
  const sku = goods.skus.find((sku) => sku.id === skuId)
  if (sku) {
    goods.specs.forEach((spec, i) => {
      const value = sku.specs[i].valueName
      spec.values.forEach((val) => {
        val.selected = val.name === value
      })
    })
  }
}
</script>
<style scoped lang="less">
.sku-state-mixin () {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;
  &.selected {
    border-color: @xtxColor;
  }
  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}
.goods-sku {
  padding-left: 10px;
  padding-top: 20px;
  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;
    dt {
      width: 50px;
      color: #999;
    }
    dd {
      flex: 1;
      color: #666;
      > img {
        width: 50px;
        height: 50px;
        .sku-state-mixin ();
      }
      > span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        .sku-state-mixin ();
      }
    }
  }
}
</style>
