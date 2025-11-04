<!-- src/components/AppNavBar.vue -->
<template>
  <div class="gridList">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="items">
        <div class="item" @click="router.push(item.route)" v-for="item in list" :key="item.id">
          <div class="icon">{{ item.icon }}</div>
          <span>{{ item.title }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'

import { useRouter } from 'vue-router'
const router = useRouter()
//定义Props
withDefaults(
  defineProps<{
    title?: string
    // itemList?:
  }>(),
  {
    title: 'defaultTitle',
  },
)
//list
const list = [
  { id: 1, icon: '视频会议图标', title: '视频会议', route: '/video-meeting' },
  { id: 2, icon: '直播图标', title: '直播', route: '/live' },
  { id: 3, icon: '投屏图标', title: '投屏', route: '/screen-cast' },
  { id: 4, icon: '文档图标', title: '文档', route: '/document' },
  { id: 5, icon: '日历图标', title: '日历', route: '/calendar' },
  { id: 6, icon: 'DING图标', title: 'DING', route: '/ding' },
]
//函数
</script>

<style scoped lang="scss">
@use '@/assets/color.scss' as *;
$primary: #000;
$color: #fff;
@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.content {
  display: flex;
  flex-direction: column;
  padding-bottom: 1rem;
  .title {
    padding: 1rem;
    color: $secondary;
  }
  .items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 1rem;
    .item {
      @include flexCenter();
      flex-direction: column;

      .icon {
        border: 1px solid #000000;
        background: white;
        border-radius: 20%;
        width: 3.5rem;
        height: 3.5rem;
      }
      span {
        color: $color;
      }
    }
  }
}
</style>
