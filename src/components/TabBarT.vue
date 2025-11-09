<!-- src/components/AppTabBar.vue -->
<template>
  <main>
    <div class="tabBar">
      <div class="tabs">
        <div class="scroll"></div>
        <div class="tab" v-for="(item, index) in TabBarList" :key="index" @click="active = index">
          <RouterLink :to="item.path">
            <Icon class="icon" :name="item.icon" color="#fff" size="0.1rem" />
            <span>{{ item.name }}</span>
          </RouterLink>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { ref, watch, computed, onMounted } from 'vue'
import changeTitle from '@/utils/main/changeTitle'
import { useTabList } from '@/stores/modules/TabBar/useTabList'
import { RouterLink } from 'vue-router'
const { TabBarList } = useTabList()
const active = ref(2) // 默认选中“首页”

//scroll位置跟随active变化
onMounted(() => {
  const scroll = document.querySelector('.scroll') as HTMLElement
  const tabWidth = document.querySelector('.tabs')?.clientWidth as number
  const step = computed(() => (tabWidth / TabBarList.length) * (active.value - 2))
  watch(active, () => {
    scroll.style.transform = `translateX(${step.value}px)`
    changeTitle(TabBarList[active.value]?.name as string)
  })
})
</script>

<style scoped lang="scss">
@use '@/styles/index.scss' as *;

.tabBar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: $tabBar-height;
  background: $tabBar-bg;
  font-size: $font16;
  .tabs {
    @include flexCenter;
    position: relative;
    height: 100%;
    border-radius: $radiusI;
    background: $tabBar-item-bg;
    .scroll {
      position: absolute;
      width: 18%;
      height: 90%;
      border-radius: $radiusI;
      background: $tabBar-bg-active;
      z-index: 0;
      transition: transform 0.15s ease-out;
    }
    .tab {
      flex: 1;
      text-align: center;
      height: 100%;
      a {
        @include flexCenter(column);
        height: 100%;
        color: $gray100;
        span {
          z-index: 1;
        }
      }
    }
  }
}
</style>
