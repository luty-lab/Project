<!-- 首页 -->
<!-- src/views/HomeView.vue -->
<template>
  <div class="home-view">
    <header class="pageHeader">
      <h2>浙江经贸教务系统</h2>
    </header>
    <!-- 搜索框 -->

    <div class="course-search">
      <div class="course-search-bar">
        <van-search
          v-model="keyword"
          placeholder="搜课程"
          class="van-search"
          type="default"
          @search="onSearch"
          @clear="onClear"
        >
        </van-search>
        <van-button @click="onSearch" size="normal" round class="van-button">搜索</van-button>
      </div>
    </div>
    <!-- 搜索框之下 -->
    <div class="largerContent">
      <!-- 班级讯息 -->
      <section class="class-message-module">
        <div class="message-group">
          <!-- 讯息列表 -->
          <div class="message-section-title">{{ sectionTitle }}</div>

          <!-- 标题单元格 -->
          <van-cell
            v-for="message in classMessageList"
            :key="message.id"
            :title="message.title"
            :label="formatMessageTime(message.createTime)"
            class="message-item"
            @click="handleMessageClick(message)"
            :is-link="true"
          >
            <!-- 未读标记 -->
            <template #extra>
              <van-badge v-if="!message.isRead" dot />
            </template>
          </van-cell>

          <!-- 空状态（无消息时显示） -->
          <van-empty v-if="isMessageListEmpty" description="暂无班级讯息" class="empty-message" />
        </div>
      </section>

      <!-- 快捷入口 -->
      <section class="quick-function-panel">
        <van-grid :border="false" column-num="4" class="function-grid">
          <van-grid-item
            v-for="item in functionList"
            :key="item.id"
            :icon="item.icon"
            :text="item.text"
            icon-color="#2297ff"
            @click="handleItemClick(item)"
            class="function-item"
          />
        </van-grid>
      </section>

      <!-- 今日课程 -->
      <section class="today-course-panel">
        <!-- 头部日期区域 -->
        <header class="today-course-header">
          <span class="today-date-text">{{ formattedCurrentDate }}</span>
        </header>

        <!-- 课程列表内容区 -->
        <div class="today-course-body">
          <!-- 课程项循环 -->
          <div v-for="course in todayCourseList" :key="course.courseId" class="course-item">
            <div class="course-indicator" />
            <div class="course-detail">
              <p class="course-name">{{ course.courseName }}</p>
              <p class="course-meta-info">
                <span>地点：{{ course.classroom }}</span>
                <span>{{ course.startTime }} - {{ course.endTime }}</span>
              </p>
            </div>
          </div>

          <!-- 空状态 -->
          <van-empty v-if="isTodayCourseEmpty" description="今日无课" />
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router' //快捷入口
// 路由实例
const router = useRouter()
import { storeToRefs } from 'pinia'
//导入数据格式
import { type ClassMessage, type FunctionItem } from '@/types/HomePage'

//导入工具函数
import { formatMessageTime } from '@/utils/time/fomat'

//导入pinia状态数据

//消息递送
import { useClassMessageList } from '@/stores/modules/Home/useClassMessageList'
const { classMessageList } = storeToRefs(useClassMessageList())
//快捷入口
import { useFunctionList } from '@/stores/modules/Home/useFunctionList'
const { functionList } = storeToRefs(useFunctionList())

import { useTodayCourseList } from '@/stores/modules/Home/useCourseList'
const { todayCourseList } = storeToRefs(useTodayCourseList())
//搜索框----------------------------------------------------
const keyword = ref<string>('') //搜索关键字
const onSearch = () => {}
const onClear = () => {}

//快捷入口---------------------------------------------------

// 功能列表数据Home useFunctionList

// 点击功能项处理函数（抽离逻辑，便于扩展如权限校验、埋点等）
const handleItemClick = (item: FunctionItem) => {
  // 路由跳转
  router.push(item.route)
}

//课程卡片---------------------------------------------------

// 今日课程列表 Home useCourseLise

// 格式化当前日期（如：2025年11月2日 周一）
const formattedCurrentDate = ref<string>('2025年11月2日 周一')

// 计算属性：判断今日是否有课（逻辑抽离，增强可读性）
const isTodayCourseEmpty = computed(() => {
  return todayCourseList.value.length === 0
})

//调课信息---------------------------------------------------

// 组件配置常量
const sectionTitle = '班级讯息'

// 班级消息列表 Home useCourseList
// 计算属性：判断列表是否为空
const isMessageListEmpty = computed(() => {
  return classMessageList.value.length === 0
})

// 消息点击事件处理
const handleMessageClick = (message: ClassMessage) => {
  // 标记为已读（实际项目中可能需要调用接口）
  if (!message.isRead) {
    message.isRead = true
  }

  // 此处可添加跳转逻辑，如查看消息详情
  // router.push(`/message-detail/${message.id}`);
}
</script>

<style scoped lang="scss">
@use '@/assets/main.scss' as *;
@use '@/assets/color.scss' as *;
.home-view {
  display: flex;
  flex-direction: column;
  justify-content: start;
  width: 100%;
  height: 100%;
  min-height: calc(100vh - 96px);
  background: $primary;

  //头部
  .pageHeader {
    padding: 0rem 1.5rem;
    h2 {
      color: #fff;
    }
  }
  //搜索框
  .course-search {
    width: 100%;
    padding: 1rem 1.7rem; //为了视觉对齐，略微增加边距
    .course-search-bar {
      display: flex;
      justify-content: space-between;

      border-radius: 20px;
      overflow: hidden;
      padding: 0.1rem;
      background-color: #fff;
      .van-search {
        flex: 1;
        --van-search-padding: 0px;
        --van-search-background: none;
        --van-search-content-background: none;
        --van-search-left-icon-color: #000;
      }
      .van-button {
        font-size: 1rem;
        font-weight: bold;
        background: rgba(34, 151, 255, 0.7); /* 半透明白色背景，关键！ */
        backdrop-filter: blur(12px); /* 模糊背后内容 */
        -webkit-backdrop-filter: blur(12px); /* Safari 兼容 */
        color: #fff;
        // backdrop-filter: blur(10px);
        // -webkit-backdrop-filter: blur(10px); /* Safari 兼容 */
        --van-button-default-height: 2.4rem;
        --van-button-normal-padding: 0 1.5rem;
      }
    }
  }
  .largerContent {
    border-radius: 1rem 1rem 0 0;
    background: #f5f7fa;
    min-height: 0;

    //消息递送
    .class-message-module {
      padding: 1.5rem 1.5rem;
      overflow: hidden;
      border-radius: 1rem;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      // 消息组容器样式

      .message-group {
        background-color: #fff;
        border: none; // 移除vant默认边框，由外层section控制样式
        border-radius: 1rem; // 外层圆角，增强卡片感
        height: 18rem;
        padding: 0.8rem 0 0.8rem 1.2rem;

        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06); // 轻微阴影，提升层次感
        // 消除单元格默认内边距差异
        --van-cell-vertical-padding: 12px;

        // 标题样式
        .message-section-title {
          margin-bottom: 0.3rem;
          font-weight: 500;
          font-size: 1rem;
          font-weight: bold;
        }

        // 消息项样式
        .message-item {
          border-bottom: 1px solid #f0f0f0;
          padding: 0.4rem 0.4rem;

          --van-cell-font-size: 0.9rem;
          ::v-deep {
            .van-cell__title {
              font-weight: 500;
              color: #000000;
            }
          }
        }

        // 空状态样式
        .empty-message {
          padding: 30px 0;
          --van-empty-description-color: #999;
        }
      }
    }

    //快速入口
    .quick-function-panel {
      // border: 1px solid black;
      padding: 0 1.5rem;

      .function-grid {
        /* 消除默认内边距影响，统一由外层控制 */
        display: flex;
        border-radius: 12px;
        padding: 0.5rem 0;
        margin-top: 12px;
        background-color: #ffffff;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
        .function-item {
          // 主题色变量（便于全局主题切换）
          --van-grid-item-content-background: transparent;
          --van-grid-item-icon-size: 3rem;
          --van-grid-item-text-font-size: 1rem;
          --van-grid-item-content-padding: 0rem;
        }
      }
    }
    //今日课程
    .today-course-panel {
      padding: 1rem 1.5rem;
      background: none;
      border-radius: 12px;
      overflow: hidden;
      .today-course-header {
        padding: 12px 16px;
        font-size: 1rem;
        font-weight: bold;
        border-bottom: 1px solid #f0f0f0;
      }
      .today-course-body {
        border-radius: 12px;
        background: #ffffff;
        padding: 0rem 1rem;
        box-shadow: 0 1px 8px rgba(0, 0, 0, 0.05);
        .course-item {
          display: flex;
          align-items: start;
          height: 6rem;
          padding: 1rem 0;
          border-bottom: 1px solid #959595;

          &:last-child {
            border-bottom: none;
          }
          .course-indicator {
            width: 1rem;
            height: 1rem;
            border-radius: 1rem;
            background: rgba(34, 151, 255, 0.7); /* 半透明白色背景，关键！ */
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
            backdrop-filter: blur(0.2rem); /* 模2rem12px); /* Safari 兼容 */

            margin-right: 0.5rem;
            flex-shrink: 0;
          }
          .course-detail {
            flex: 1;
            .course-name {
              font-size: 15px;
              font-weight: 500;
              margin-bottom: 4px;
            }
            .course-meta-info {
              font-size: 13px;
              color: #666;
              display: flex;
              justify-content: space-between;
            }
          }
        }
      }
    }
  }
}
</style>
