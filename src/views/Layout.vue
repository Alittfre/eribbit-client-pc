<template>
<appTopnav/>
<appHeader/>
    <nav>顶部通栏</nav>
    <header>头部</header>
    <main>
        <!-- 二级路由 -->
        <router-view></router-view>
    </main>
    <footer>底部</footer>
</template>

<script>
import appTopnav from '@/components/app-topnav.vue'
import appHeader from '@/components/app-header.vue'
export default {
  name: 'xtx-layout',
  components: {
    appTopnav,
    appHeader
  }
}
</script>
<style scoped lang='less'></style>
