<!-- 课表 -->
<template>
  <div class="MoreModule">
    <BackBar>
      <template #left>
        <div>left</div>
      </template>
      <template #right>
        <div>right</div>
      </template>
    </BackBar>
    <div class="content">
      <GridList></GridList>
      <GridList></GridList>
      <GridList></GridList>
      <GridList></GridList>
      <GridList></GridList>
      <GridList></GridList>
      <TabHolder />
    </div>
  </div>
</template>
<script setup lang="ts">
import BackBar from '@/components/BackBar.vue'
import GridList from '@/components/GridList.vue'
import TabHolder from '@/components/TabHolder.vue'
// import { useRouter } from 'vue-router'
// const router = useRouter()
</script>

<style scoped lang="scss">
@use '@/styles/index.scss' as *;
.MoreModule {
  font-size: $font14;
  height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  .content {
    flex: 1;
    overflow-y: auto;
    scrollbar-width: none;
  }
}
</style>
