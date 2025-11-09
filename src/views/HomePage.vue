<template>
  <div>
    <van-popup class="popup" v-model:show="show">
      <adjustMessage :list="adjustItem" v-on:close="closePopup" />
    </van-popup>

    <div class="home-page">
      <!-- homeHeader -->
      <header class="home-header">
        <section class="title">
          <h1>学生教务系统</h1>
        </section>

        <section class="search">
          <div class="search-bar">
            <input type="text" style="width: 100px" v-model="keyword" />
            <button @click="onSearch">搜索</button>
          </div>
        </section>
      </header>
      <!-- homeBody -->
      <main class="home-body">
        <!-- 班级讯息模块 -->
        <section class="class-message">
          <header class="class-message-title">
            <h2>{{ sectionTitle }}</h2>
          </header>
          <main class="message-list">
            <div
              class="message-item"
              @click="handleMessageClick(message)"
              v-for="message in classMessageList"
              :key="message.id"
            >
              <div class="message-title">
                <span class="title">{{ message.title }} </span>
                <span class="time">{{ formatMessageTime(message.createTime) }} </span>
              </div>

              <img src="@/assets/arrow.png" alt="" class="arrow" />
              <span class="point" v-if="!message.isRead"></span>
            </div>
          </main>
        </section>
        <!-- 快速入口模块 -->
        <section class="quick-function">
          <div class="quick-function-grid">
            <div
              class="function-item"
              @click="handleItemClick(fun)"
              v-for="fun in functionList"
              :key="fun.id"
              :to="fun.route"
            >
              <img :src="fun.icon" class="icon" /> <span>{{ fun.text }}</span>
            </div>
          </div>
        </section>
        <!-- 课程安排模块 -->
        <section class="today-course">
          <header class="today-date">
            <h2>{{ formattedCurrentDate }}</h2>
          </header>
          <main class="course-list">
            <div class="course-item" v-for="course in todayCourseList" :key="course.courseId">
              <div class="course-indicator">
                <div class="indicator-time"></div>
              </div>

              <div class="course-detail">
                <header class="course-title">{{ course.courseName }}</header>
                <main class="course-content">
                  <div class="course-address">{{ '地点' }}</div>
                  <div class="course-time">{{ course.startTime }}-{{ course.endTime }}</div>
                </main>
              </div>
            </div>
          </main>
        </section>
      </main>
      <footer>
        <TabHolder />
      </footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import TabHolder from '@/components/TabHolder.vue'
import adjustMessage from '@/components/tools/adjustMessage.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router' //快捷入口
// 路由实例
const router = useRouter()
import { storeToRefs } from 'pinia'
// //导入数据格式
import { type ClassMessage, type FunctionItem } from '@/types/HomePage'
//导入工具函数
import { formatMessageTime } from '@/utils/time/fomat'

// //导入pinia状态数据

// //消息递送
import { useClassMessageList } from '@/stores/modules/Home/useClassMessageList'
const { classMessageList } = storeToRefs(useClassMessageList())
import { useFunctionList } from '@/stores/modules/Home/useFunctionList'
const { functionList } = storeToRefs(useFunctionList())
import { useTodayCourseList } from '@/stores/modules/Home/useCourseList'
const { todayCourseList } = storeToRefs(useTodayCourseList())

// //变量
const show = ref(false)

const keyword = ref('请输入关键字') //搜索关键字
const formattedCurrentDate = ref<string>('2025年11月2日 周一')
const sectionTitle = '班级讯息'

interface adjust {
  name: string
  teacher: string
  oldTime: {
    start: string
    end: string
  }
  oldAddress: string
  nowTime: {
    start: string
    end: string
  }
  nowAddress: string
}

const adjustItem = ref<adjust>({
  name: '跨移动开发',
  teacher: '齐老师',
  oldTime: {
    start: '8:00',
    end: '12:00',
  },
  oldAddress: '八号楼410',
  nowTime: {
    start: '8:00',
    end: '12:00',
  },
  nowAddress: '八号楼410',
})
//方法
//popup
const closePopup = () => {
  show.value = false
}
const showPopup = () => {
  show.value = true
}
//搜索框
const onSearch = () => {}
// const onClear = () => {}
const handleItemClick = (item: FunctionItem) => {
  // 路由跳转
  setTimeout(() => {
    router.push(item.route)
  }, 500)
}

const handleMessageClick = (message: ClassMessage) => {
  // 标记为已读（实际项目中可能需要调用接口）
  if (!message.isRead) {
    message.isRead = true
  }
  showMessageDetail(adjustItem.value)
  // 此处可添加跳转逻辑，如查看消息详情
  // router.push(`/message-detail/${message.id}`);
}

const showMessageDetail = (message: adjust) => {
  adjustItem.value = message
  showPopup()
}
</script>

<style lang="scss" scoped>
@use '@/styles/index.scss' as *;
.popup {
  width: 3rem;
  border-radius: $radius16;
  overflow: hidden;
  border: $radius16;
  overflow: hidden;
  background: $gray100;
  margin: auto;
}
.home-page {
  width: 100%;
  height: 100vh;
  background: $primary;
  overflow: hidden;
  overflow-y: scroll;
  scrollbar-width: none;
  //home头
  .home-header {
    @include flexCenter(column);
    padding: 0 $space16;

    width: 100%;
    .title {
      width: 100%;
      color: $gray0;
      font-size: $font20;
    }
    .search {
      width: 100%;
      margin: $space16;
      .search-bar {
        width: 100%;
        height: 0.5rem;
        border-radius: $radiusI;
        overflow: hidden;
        padding: 0.02rem;
        @include flexCenter;
        justify-self: flex-start;
        background: $gray0;
        button {
          width: 0.85rem;
          height: 100%;

          border: none;
          color: $gray0;
          font-size: $font16;
          border-radius: $radiusI;
          background: $primary;
        }
        input {
          font-size: $font14;
          margin-left: $space16;
          flex: 1 1 auto;
          height: 100%;
          color: $gray500;
          border: none;
          padding: $space16;
          background: none;
        }
      }
    }
  }
  //home体
  .home-body {
    padding: $space16 $space16;
    width: 100%;
    flex: 1 1 auto;
    border-radius: $radius16 $radius16 0 0;
    background: $gray200;
    //班级讯息模块
    .class-message {
      overflow: hidden;
      margin-bottom: $space16;
      .class-message-title {
        padding: 0 $space16;
        margin-bottom: $space16;
        h2 {
          font-size: $font18;
          color: $gray800;
        }
      }
      .message-list {
        flex: 1;
        background: $gray0;
        border-radius: $radius16;
        padding: 0 0;
        .message-item {
          position: relative;
          padding: $space8 $space16;
          @include flexCenter;
          justify-content: space-between;
          .message-title {
            flex: 1;
            @include flexCenter(column);
            align-items: flex-start;
            .title {
              font-size: $font14;
              color: $gray700;
              margin-bottom: $space8;
            }
            .time {
              font-size: $font12;
              color: $gray600;
            }
          }
          .arrow {
            height: $font12;
          }
          .point {
            position: absolute;
            top: $space16;
            right: $space8;
            overflow: hidden;
            width: $font10;
            height: $font10;
            border-radius: $round;
            background: red;
          }
        }
      }
    }

    //快速功能模块

    .quick-function {
      margin-bottom: $space16;
      padding: 0 $space16;

      $itemWidth: 0.3rem;
      $itemHeight: 0.3rem;
      width: 100%;

      background: $gray0;
      border-radius: $radius16;
      overflow: hidden;
      .quick-function-grid {
        padding: $space4 0;
        gap: $space32;
        @include flexCenter;
        justify-content: space-between;
        .function-item {
          @include flexCenter(column);
          flex: 1 1 auto;
          @keyframes scale {
            0% {
              transform: scale(1);
            }
            50% {
              transform: scale(0.8);
            }
            100% {
              transform: scale(1);
            }
          }
          &:active {
            animation: scale 0.5s forwards;
          }
          .icon {
            width: $itemWidth;
            height: $itemHeight;
            margin-bottom: $space8;
          }
          span {
            font-size: $font16;
            color: $gray700;
            color: $gray500;
            &:hover {
              color: $primary;
            }
          }
        }
      }
    }

    //课程安排模块
    .today-course {
      $indicatorRadius: 0.1rem;
      $indicatorMargin: 0.05rem;
      width: 100%;
      .today-date {
        padding: 0 $space16;
        margin-bottom: $space16;
        h2 {
          font-size: $font18;
          color: $gray800;
        }
      }
      .course-list {
        background: $gray0;
        border-radius: $radius16;
        padding: $space16;
        .course-item {
          @include flexCenter;
          justify-content: flex-start;
          align-items: flex-start;
          padding: $space16 0;
          border-bottom: $space2 solid $gray200;
          &:last-child {
            padding-bottom: 0;
            border-bottom: 0;
          }
          &:first-child {
            padding-top: 0;
          }
          .course-indicator {
            border-radius: 50%;
            margin-top: $indicatorMargin;
            background: $primary;
            width: $indicatorRadius;
            height: $indicatorRadius;
          }
          .course-detail {
            @include flexCenter(column);
            margin-left: $space4;
            align-items: flex-start;

            flex: 1;
            .course-title {
              font-size: $font14;
              margin-bottom: $space2;
            }
            .course-content {
              width: 100%;
              font-size: $font12;
              @include flexCenter;
              justify-content: space-between;
              // .course-address {
              // }
              // .course-time {
              // }
            }
          }
        }
      }
    }
  }
}
</style>
