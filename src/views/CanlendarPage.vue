<template>
  <div>
    <div class="canlendar">
      <header class="canlendar-header">
        <section class="canlendar-header-title">
          <h2>第{{ 10 }}周</h2>
          <span class="title-detail">
            <span class="date">2023-09-01</span>
            <span class="semester">第{{ '一' }}学期</span>
          </span>
        </section>
        <section class="canlendar-header-date">
          <div class="table-header__item" v-for="(day, index) in weekDays" :key="day">
            <span class="text">{{ day }}</span>
            <span class="index">{{ index + 1 }}</span>
          </div>
        </section>
      </header>
      <main class="canlendar-table">
        <main class="table-body">
          <div class="lines">
            <span class="lineT" v-for="num in [1, 2, 3, 4, 5]" :key="num">
              {{ num }}
            </span>
            <span class="break"></span>
            <span class="lineM" v-for="num in [6, 7, 8, 9]" :key="num">{{ num }}</span>
            <span class="break"></span>
            <span class="lineB" v-for="num in [10, 11, 12, 13]" :key="num">{{ num }}</span>
            <span class="break"></span>
          </div>
          <div class="table-col" v-for="(day, index) in weekDays" :key="day">
            <div
              class="table-item"
              v-for="item in buildCol(index)"
              :key="item.id"
              :class="item.type"
              :style="{ '--t': item.span }"
            >
              {{ item.type === 'course' ? item.course?.name : '' }}
            </div>
          </div>
        </main>
      </main>
      <footer class="canlendar-footer"></footer>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
defineEmits<{ cellClick: [payload: { day: number; course: Course }] }>()
interface Course {
  name: string
  startTime: string /* 'HH:mm' */
  endTime: string
  color?: string /* 允许外部指定颜色，可选 */
}
const weekDays = ['周一', '周二', '周三', '周四', '周五']

const courses = ref<Course[][]>([
  /* 周一 */
  [
    { name: '高数', startTime: '08:00', endTime: '09:35', color: '#67c23a' },
    { name: '体育', startTime: '10:30', endTime: '12:00', color: '#e6a23c' },
    { name: 'Vue3', startTime: '14:00', endTime: '15:35', color: '#409eff' },
  ],
  /* 周二 */
  [
    { name: '英语', startTime: '08:50', endTime: '10:25', color: '#f56c6c' },
    { name: '线代', startTime: '13:00', endTime: '14:35', color: '#909399' },
  ],
  /* 周三 */
  [
    { name: '大物', startTime: '09:00', endTime: '10:35', color: '#00c0ef' },
    { name: '算法', startTime: '15:00', endTime: '16:35', color: '#67c23a' },
  ],
  /* 周四 */
  [
    { name: '毛概', startTime: '08:00', endTime: '09:35', color: '#e6a23c' },
    { name: '日语', startTime: '13:30', endTime: '15:05', color: '#f56c6c' },
  ],
  /* 周五 */
  [
    { name: '化学', startTime: '10:00', endTime: '11:35', color: '#409eff' },
    { name: '高数', startTime: '16:00', endTime: '17:35', color: '#67c23a' },
  ],
])
/// function

/** 一节 45 min + 5 min 休息 = 50 min */
const SECTION_MIN = 50
const DAY_START_MIN = 8 * 60 // 08:00
const BREAK_TIME_m = 6
const BREAK_TIME_a = 11
/** HH:mm -> 分钟 */
const time2min = (t: string): number => {
  const [h, m] = t.split(':').map(Number) as [number, number]
  return h * 60 + m
}

/** 计算课程在当天的 flex 布局参数 */
const calcFlex = (startTime: string, endTime: string) => {
  const sMin = time2min(startTime)
  const eMin = time2min(endTime)
  const startSection = Math.floor((sMin - DAY_START_MIN) / SECTION_MIN) + 1
  const span = Math.round((eMin - sMin) / SECTION_MIN)
  return { startSection, span }
}

/** 构建一天的内列表：course | spacer */
const buildCol = (d: number) => {
  const list: {
    id: string
    type: 'course' | 'spacer' | 'break'
    span: number
    course?: Course
  }[] = []
  let cursor = 1 // 当前已占用到的节序号（1 基）

  const dayCourses = (courses.value[d] || []).sort(
    (a, b) => time2min(a.startTime) - time2min(b.startTime),
  )

  dayCourses.forEach((course, idx) => {
    const { startSection, span } = calcFlex(course.startTime, course.endTime)

    // 1. 前置 spacer
    if (startSection > cursor) {
      const count = startSection - cursor
      for (let i = 0; i < count; i++) {
        if (cursor === BREAK_TIME_m || cursor === BREAK_TIME_a) {
          list.push({ id: `s-${d}-${cursor}`, type: 'break', span: 1 })
        }
        list.push({ id: `s-${d}-${cursor}`, type: 'spacer', span: 1 })
        cursor++
      }
    }
    // 2. 课程块
    if (cursor === BREAK_TIME_m || cursor === BREAK_TIME_a) {
      list.push({ id: `s-${d}-${cursor}`, type: 'break', span: 1 })
    }
    list.push({ id: `c-${d}-${idx}`, type: 'course', span, course })
    cursor = startSection + span
  })

  // 3. 末尾 spacer
  if (cursor <= 13) {
    const count = 13 - cursor + 1
    for (let i = 0; i < count; i++) {
      if (cursor === BREAK_TIME_m || cursor === BREAK_TIME_a) {
        list.push({ id: `s-${d}-${cursor}`, type: 'break', span: 1 })
      }
      list.push({ id: `s-${d}-${cursor}`, type: 'spacer', span: 1 })
      cursor++
    }
  }
  return list
}
</script>

<style lang="scss" scoped>
@use '@/styles/index.scss';
@use '@/styles/index.scss' as *;
$table-gap: $space32;
$table-item-height: $space32;
$break-height: 0.1rem;
.canlendar {
  // background: red;
  @include flexCenter(column);
  font-size: $font16;
  background: $primary;

  .canlendar-header {
    .canlendar-header-title {
      padding: 0 $space16;
      color: $gray0;
      margin-bottom: $space4;
      @include flexCenter(column);
      align-items: flex-start;
      h2 {
        line-height: 1;
      }
      .title-detail {
        font-size: $font12;
        font-weight: 500;

        .semester {
          margin-left: $space16;
        }
      }
    }
    .canlendar-header-date {
      padding: 0 $space32;
      margin-bottom: $space8;
      width: 100%;
      @include flexCenter;
      justify-content: space-around;
      gap: $table-gap;
      .table-header__item {
        flex: 1 1 auto;
        color: $gray0;
        @include flexCenter(column);
        .text {
          @include flexCenter;
          margin-bottom: $space4;
        }
        .index {
          width: $font24;
          height: $font24;
          font-size: $font14;
          @include flexCenter;
          border-radius: $round;
          &:hover {
            color: $primary;
            background: $gray0;
          }
        }
      }
    }
  }
  .canlendar-table {
    position: relative;
    background: $gray0;
    width: 100%;
    border-radius: $radius16 $radius16 0 0;
    padding: $space20 $space32;
    overflow: hidden;
    .table-body {
      @include flexCenter();
      justify-content: space-around;
      align-items: flex-start;
      gap: $table-gap;
      .table-col {
        flex: 1 1 auto;
        height: 100%;
        z-index: $zstep;
        .table-item {
          height: calc(var(--t) * #{$table-item-height});
          @include flexCenter(column);
          color: $gray0;
          font-size: $font12;
        }
        .break {
          height: $break-height;
        }
        .course {
          background: #88c0f5;
        }
      }
      .lines {
        position: absolute;
        width: 100%;
        height: 100%;
        margin-left: $space24;
        @include flexCenter(column);
        justify-content: flex-start;
        .lineT,
        .lineB,
        .lineM {
          width: 100%;
          height: $table-item-height;
          border-bottom: 1px solid $gray300;
          @include flexStart(row);
          color: $gray900;
          &:nth-child(5),
          &:nth-child(10),
          &:nth-child(15) {
            border-bottom: none;
          }
        }

        .break {
          width: 100%;
          height: $break-height;
          border-bottom: 2px solid $gray900;
        }
      }
    }
  }
  .canlendar-footer {
    width: 100%;
  }
}
</style>
