<!-- src/components/AppNavBar.vue -->
<template>
  <div class="gridList">
    <div class="content">
      <div class="title">{{ title }}</div>
      <div class="items">
        <div class="item" @click="router.push(item.route)" v-for="item in list" :key="item.id">
          <div class="icon">
            <img src="@/assets/images/huiyi.png" alt="" />
          </div>
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
  { id: 1, icon: ' ', title: '视频会议', route: '/video-meeting' },
  { id: 2, icon: ' ', title: '直播', route: '/live' },
  { id: 3, icon: ' ', title: '投屏', route: '/screen-cast' },
  { id: 4, icon: ' ', title: '文档', route: '/document' },
  { id: 5, icon: ' ', title: '日历', route: '/calendar' },
  { id: 6, icon: ' ', title: 'DING', route: '/ding' },
]
//函数
</script>

<style scoped lang="scss">
@use '@/styles/index.scss' as *;
.content {
  @include flexStart;
  // padding-bottom: 1rem;
  .title {
    width: 100%;
    @include flexStart(row);
    padding: $space16;
    color: $gray800;
  }
  .items {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: $space32;
    .item {
      @include flexCenter(column);
      flex-direction: column;

      .icon {
        border: 1px solid #000000;
        margin-bottom: $space8;

        border-radius: 20%;
        width: $font32;
        height: $font32;
      }
      span {
        color: $gray900;
      }
    }
  }
}
</style>
