<template>
    <div class="home-banner">
        <xtxCarousel :sliders="list" />
    </div>
</template>

<script>
import { ref } from 'vue'
import { findBanner } from '@/api/home'

export default {
  name: 'HomeBanner',
  setup () {
    const list = ref([])
    findBanner().then(data => {
      list.value = data.result
    })
    return { list }
  }
}
</script>

<style scoped lang="less">
.home-banner {
    width: 1240px;
    height: 500px;
    position: absolute;
    left: 0;
    top: 0;
    z-index: 98
}
.xtx-carousel {
  :deep(.carousel-btn.prev) {
    left: 270px !important;
  }
  :deep(.carousel-indicator) {
    padding-left: 250px;
  }
}
</style>
