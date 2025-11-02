<!-- 主页 -->
<template>
  <div class="calendar-view">
    <div class="content">
      <input type="text" placeholder="请输入标题" v-model="title" />
      <van-button @click="changeTitle(title)">改变标题</van-button>
      <input type="text" placeholder="请输入路由地址" v-model="path" />
      <van-button
        @click="
          () => {
            routerWithTitle(path, title)
          }
        "
        >手动路由(用于调试)</van-button
      >
      <br />
      <span>可选项目:' /','/profile','/calendar','/score'</span>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import changeTitle from '@/utils/main/changeTitle'
const router = useRouter()
const routerWithTitle = (to: string, title: string) => {
  if (to && title) {
    router.push(to)
    changeTitle(title)
  }
}

const title = ref('')
const path = ref('')
</script>
<style scoped lang="scss"></style>
