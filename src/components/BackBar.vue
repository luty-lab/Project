<!-- src/components/AppNavBar.vue -->
<template>
  <div class="backBar">
    <NavBar :title="title">
      <template #left>
        <div @click="handleBack" class="icon"><van-icon name="arrow-left" /></div>
      </template>
      <template #right></template>
    </NavBar>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
import NavBar from './NavBar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

//定义Props
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'defaultTitle',
  },
)

//函数

const handleBack = () => {
  router.back()
}
</script>

<style scoped lang="scss">
$primary: #000;

@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
