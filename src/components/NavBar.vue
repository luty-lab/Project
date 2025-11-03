<!-- src/components/AppNavBar.vue -->
<template>
  <div class="content">
    <van-nav-bar class="van-nav-bar" :title="title"> </van-nav-bar>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
}>()
</script>

<style scoped lang="scss">
@use '@/assets/color.scss' as m;
$primary: #000;
.content {
  width: 100%;
  .van-nav-bar {
    background: m.$primary;

    --van-nav-bar-title-text-color: #fff;
  }
}
</style>
