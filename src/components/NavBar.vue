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
    title: ' ',
  },
)
</script>

<style scoped lang="scss">
@use '@/styles/index.scss' as *;
.navBar {
  height: $navBar-height;
  background: $primary;
  .content {
    @include flexCenter();
    justify-content: space-between;
    width: 100%;
    font-size: $font20;
    padding: $space8;
    font-weight: bold;
    color: $gray0;
    .left {
      @include flexStart();
      justify-content: start;
      width: 25%;
    }
    .title {
      @include flexCenter();
      flex: 1;
    }
    .right {
      @include flexStart();
      justify-content: end;
      width: 25%;
    }
  }
}
</style>
