<template>
<appTopnav/>
<appHeader/>
    <main class="app-body">
        <!-- 二级路由 -->
        <router-view></router-view>
    </main>
    <appFooter/>
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
import appHeader from '@/components/app-header.vue'
import appFooter from '@/components/app-footer.vue'
export default {
  name: 'xtx-layout',
  components: {
    appTopnav,
    appHeader,
    appFooter
  }
}
</script>
<style scoped lang='less'></style>
