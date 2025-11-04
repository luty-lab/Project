<template>
  <div class="app">
    <NavBar :title="activeTitle" />
    <RouterView />
    <!-- <TabBar ref="tabBar" /> -->
    <TabBarT ref="tabBarT" />
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { RouterView } from 'vue-router'
import emitter from '@/utils/emitter'
import changeTitle from './utils/main/changeTitle'
import NavBar from './components/NavBar.vue'
// import TabBar from './components/TabBar.vue'
import TabBarT from './components/TabBarT.vue'

const activeTitle = ref<string>('')
//切换标题的逻辑

emitter.on('changeTitle', (title: string) => {
  activeTitle.value = title
})
changeTitle('首页')
// emitter.emit('changeTitle', 'this is title')

//获取ActiveTile
</script>

<style scoped>
.app {
  width: 100%;
  height: 100%;
  background: #000;
  /* overflow: hidden; */
  border-radius: 1rem;
}
</style>
