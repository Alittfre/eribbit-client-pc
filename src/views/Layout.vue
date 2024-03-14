<template>
  <appTopnav />
  <appHeader />
  <app-header-sticky />
  <main class="app-body">
    <!-- 二级路由 -->
    <router-view></router-view>
  </main>
  <appFooter />
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
import appHeader from '@/components/app-header.vue'
import appHeaderSticky from '@/components/app-header-sticky.vue'
import appFooter from '@/components/app-footer.vue'
import { useStore } from 'vuex'
export default {
  name: 'xtx-layout',
  components: {
    appTopnav,
    appHeader,
    appHeaderSticky,
    appFooter
  },
  setup () {
    const store = useStore()
    store.dispatch('category/getList')
  }
}
</script>
<style scoped lang='less'>
</style>
