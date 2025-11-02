<!-- src/components/AppNavBar.vue -->
<template>
  <div class="content">
    <van-nav-bar class="van-nav-bar" :title="title" placeholder> </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
.content {
  width: 100%;
  .van-nav-bar {
    --van-nav-bar-background: #2297ff;
    --van-nav-bar-title-text-color: #fff;
  }
}
</style>
