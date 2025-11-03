<!-- src/components/AppTabBar.vue -->
<template>
  <main>
    <!-- <van-tabbar class="TabBar" @change="handleTabChange" v-model="active" route>
      <van-tabbar-item v-for="(item, index) in TabBarList" :key="index" :to="item.path">
        {{ item.name }}
        <template #icon>
          <Icon :name="item.icon" color="#fff" />
        </template>
      </van-tabbar-item>
    </van-tabbar> -->
    <div class="tabBar">
      <div class="tabs">
        <div class="scroll" ref="scroll"></div>
        <div class="tab" v-for="(item, index) in TabBarList" :key="index" @click="active = index">
          <RouterLink :to="item.path" @click="handleTabChange">
            <Icon :name="item.icon" color="#fff" size="1.5rem" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import changeTitle from '@/utils/main/changeTitle'
import { useTabList } from '@/stores/modules/TabBar/useTabList'
import { Icon } from 'vant'
import { RouterLink } from 'vue-router'
const { TabBarList } = useTabList()
//TabBarList

//当前页号
const active = ref(2) // 默认选中“首页”

//用于传输标题

//处理手动切换
const handleTabChange = () => {
  changeTitle(TabBarList[active.value]?.name as string)
}
//scroll位置跟随active变化
onMounted(() => {
  const scroll = ref<HTMLElement | null>(null)
  watch(active, () => {
    const tabWidth = scroll.value.parentElement?.offsetWidth || 0
    const step = (tabWidth / TabBarList.length) * (active.value - 2)
    if (scroll.value) {
      scroll.value.style.transform = `translateX(${step}px)`
    }
  })
})
</script>

<style scoped lang="scss">
@use '@/assets/color.scss' as *;
@mixin centerFlex {
  display: flex;
  justify-content: center;
  align-items: center;
}
* {
  box-sizing: border-box;
}
.tabBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 70px;
  background: #191717;
  padding: 5px 2px;

  .tabs {
    @include centerFlex;
    position: relative;
    height: 100%;
    border-radius: 10rem;
    background: #393636;
    .scroll {
      position: absolute;
      width: 20%;
      height: 100%;
      margin-bottom: 5px;
      border-radius: 10rem;
      background: #6d6565;
      z-index: 0;
      transition: transform 0.3s ease;
    }
    .tab {
      flex: 1;
      text-align: center;
      a {
        @include centerFlex;
        flex-direction: column;
        height: 100%;
        color: #d3d3d3;
        font-size: 0.75rem;
        text-decoration: none;
        span {
          // margin-top: 4px;
          margin-top: 0.25rem;
          z-index: 1;
        }
      }
      &:nth-child(n + 1) a {
        color: #ffffff;
      }
    }
  }
}
// main {
//   .TabBar {
//     padding: 2px 10px;

//     --van-tabbar-height: 60px;
//     background: $primary;

//     --van-tabbar-item-active-background: #1790fb;

//     --van-tabbar-item-text-color: #d3d3d3;
//     --van-tabbar-item-active-color: #ffffff;

//     --van-tabbar-item-font-size: 10px;
//     --van-tabbar-item-icon-size: 20px;
//     --van-tabbar-item-line-height: 15px;
//     // --van-tabbar-item-icon-margin-bottom;

//     font-weight: 600;
//   }
// }
</style>
