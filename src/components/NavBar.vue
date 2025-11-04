<!-- src/components/AppNavBar.vue -->
<template>
  <div class="navBar">
    <div class="content">
      <div class="left">
        <slot name="left"> </slot>
      </div>
      <div class="title">
        {{ title }}
      </div>
      <div class="right">
        <slot name="right"> </slot>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { withDefaults } from 'vue'
withDefaults(
  defineProps<{
    title?: string
  }>(),
  {
    title: 'defaultTitle',
  },
)
</script>

<style scoped lang="scss">
@use '@/assets/color.scss';
// $primary: #000;
$primary: #000;
@mixin flexCenter {
  display: flex;
  justify-content: center;
  align-items: center;
}
.navBar {
  background: $primary;
  height: 3rem;
  .content {
    @include flexCenter();
    justify-content: space-between;
    gap: 1rem;
    width: 100%;

    padding: 0.5rem 0rem;
    color: rgb(0, 0, 0);
    * {
      @include flexCenter();
      font-size: 1.3rem;
      font-weight: bold;
      color: #fff;
    }
    .left {
      margin-left: 2rem;
      justify-content: start;
      width: 25%;
    }
    .title {
      flex: 1;
    }
    .right {
      margin-right: 2rem;
      justify-content: end;
      width: 25%;
    }
  }
}
</style>
