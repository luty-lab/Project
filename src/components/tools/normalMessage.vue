<template>
  <div class="box">
    <nav>
      <span>调课通知</span>
      <span class="delete" @click="closeMessage">x</span>
    </nav>
    <div class="content">
      <slot> </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const emit = defineEmits(['close'])
const closeMessage = () => {
  emit('close')
  console.log(111)
}
</script>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;
$popup-header-height: 0.5rem;
.box {
  position: relative;
  height: 100%;
  width: 100%;
  @include flexCenter(column);

  nav {
    @include flexCenter;
    width: 100%;
    height: $popup-header-height;
    background: $primary;
    color: #fff;
    font-size: $font24;
    font-weight: bold;

    .delete {
      @include flexCenter;
      font-size: $font18;
      position: absolute;
      right: $space12;
      width: $font24;
      height: $font24;
      border: 1px solid $gray200;
      border-radius: 50%;
    }
  }

  .content {
    width: 100%;
    flex: 1 1 auto;
  }
}
</style>
