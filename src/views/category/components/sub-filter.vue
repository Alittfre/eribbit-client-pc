<template>
    <!-- 筛选区 -->
    <div class="sub-filter" v-if="filterData && !filterLoading">
        <div class="item">
            <div class="head">品牌：</div>
            <div class="body">
                <a :class="{ active: filterData.selectedBrand === brand.id }" href="javasript:;"
                    v-for="brand in filterData.brands" :key="brand.id">{{ brand.name }}</a>
            </div>
        </div>
        <div class="item" v-for="p in filterData.saleProperties" :key="p.id">
            <div class="head">{{ p.name }}：</div>
            <div class="body">
                <a :class="{ active: p.selectedProp === attr.id }" href="javasript:;" v-for="attr in p.properties"
                    :key="attr.id">{{ attr.name }}</a>
            </div>
        </div>
    </div>
    <div v-else class="sub-filter">
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="800px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
        <XtxSkeleton class="item" width="600px" height="40px" />
    </div>
</template>
<script>
import { findSubCategoryFilter } from '@/api/category'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'

export default {
  name: 'SubFilter',
  setup (props, { emit }) {
    const route = useRoute()
    const filterData = ref(null)
    const filterLoading = ref(false)
    // 监听分类变化
    watch(() => route.params.id, (newVal, oldVal) => {
      if (newVal && route.path === ('/category/sub/' + newVal)) {
        filterLoading.value = true
        newVal && findSubCategoryFilter(route.params.id).then(({ result }) => {
          result.selectedBrand = null
          result.brands.unshift({ id: null, name: '全部' })
          result.saleProperties.forEach(p => {
            p.selectedProp = undefined
            p.properties.unshift({ id: null, name: '全部' })
          })
          filterData.value = result
          filterLoading.value = false
        })
      }
    }, { immediate: true })

    // 获取筛选参数的函数
    const getFilterParams = () => {
      const obj = { brandId: null, attrs: [] }
      // 品牌
      obj.brandId = filterData.value.selectedBrand
      // 销售属性
      filterData.value.saleProperties.forEach(item => {
        if (item.selectedProp) {
          const prop = item.properties.find(prop => prop.id === item.selectedProp)
          obj.attrs.push({ groupName: item.name, propertyName: prop.name })
        }
      })
      // 参考数据：{brandId:'',attrs:[{groupName:'',propertyName:''},...]}
      if (obj.attrs.length === 0) obj.attrs = null
      return obj
    }

    // 1. 记录当前选择的品牌
    const changeBrand = (brandId) => {
      if (filterData.value.selectedBrand === brandId) return
      filterData.value.selectedBrand = brandId
      emit('filter-change', getFilterParams())
    }
    // 2. 记录呢选择的销售属性
    const changeProp = (item, propId) => {
      if (item.selectedProp === propId) return
      item.selectedProp = propId
      emit('filter-change', getFilterParams())
    }

    return { filterData, filterLoading, changeBrand, changeProp }
  }
}
</script>
<style scoped lang='less'>
// 筛选区
.sub-filter {
    background: #fff;
    padding: 25px;

    .item {
        display: flex;
        line-height: 40px;

        .head {
            width: 80px;
            color: #999;
        }

        .body {
            flex: 1;

            a {
                margin-right: 36px;
                transition: all .3s;
                display: inline-block;

                &.active,
                &:hover {
                    color: @xtxColor;
                }
            }
        }
    }
}

.xtx-skeleton {
    padding: 10px 0;
}
</style>
