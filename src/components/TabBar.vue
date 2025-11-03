<!-- src/components/AppTabBar.vue -->
<template>
  <main>
    <van-tabbar class="TabBar" @change="handleTabChange" v-model="active" route>
      <van-tabbar-item v-for="(item, index) in TabBarList" :key="index" :to="item.path">
        {{ item.name }}
      </van-tabbar-item>
    </van-tabbar>
  </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import changeTitle from '@/utils/main/changeTitle'
import { useTabList } from '@/stores/modules/TabBar/useTabList'
const { TabBarList } = useTabList()
//TabBarList

//当前页号
const active = ref(2) // 默认选中“首页”

//用于传输标题

//处理手动切换
const handleTabChange = () => {
  changeTitle(TabBarList[active.value]?.name as string)
}
</script>

<style scoped lang="scss">
main {
  .TabBar {
    --van-tabbar-height: 60px;
    --van-tabbar-background: #eaeaea;
    // --van-tabbar-item-active-background: #000;

    --van-tabbar-item-active-color: #1989fa;
    --van-tabbar-item-text-color: #999;
    --van-tabbar-item-font-size: 1rem;

    --van-tabbar-item-line-height: 50px;

    // --van-tabbar-item-icon-size;
    // --van-tabbar-item-icon-margin-bottom;

    font-weight: 600;
  }
}
</style>
