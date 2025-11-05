<template>
  <section class="time-table">
    <header class="day-header">
      <div class="day-header-item" v-for="(day, index) in weekDays" :key="day">
        <div class="header-content">
          <span>{{ day }}</span>
          <span>{{ index + 1 }}</span>
          <!-- 修正类型转换问题 -->
        </div>
      </div>
    </header>
    <div class="wrap">
      <main class="day-body">
        <div class="labels">
          <span class="label" v-for="label in 13" :key="label">
            {{ label }}
          </span>
        </div>
        <div class="lines">
          <div class="line" v-for="value in 13" :style="{ '--t': value }" :key="value"></div>
        </div>
        <div v-for="(day, dIdx) in weekDays" :key="day" class="day-col">
          <!-- 动态填充 flex 块 -->
          <div class="col-body">
            <template v-for="item in buildCol(dIdx)" :key="item.id">
              <!-- 课程块 -->
              <div
                v-if="item.type === 'course'"
                class="course-block"
                :style="{ flex: item.span, background: '#8dc9ff' }"
                @click="$emit('cellClick', { day: dIdx, course: item.course! })"
              >
                <span class="course-name">{{ item.course!.name }}</span>
                <!-- 修正非空断言 -->
              </div>

              <!-- 空白占位 -->
              <div v-else class="spacer" :style="{ flex: item.span }" />
            </template>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
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
  const list: { id: string; type: 'course' | 'spacer'; span: number; course?: Course }[] = []
  let cursor = 1 // 当前已占用到的节序号（1 基）

  const dayCourses = (courses.value[d] || []).sort(
    (a, b) => time2min(a.startTime) - time2min(b.startTime),
  )

  dayCourses.forEach((course, idx) => {
    const { startSection, span } = calcFlex(course.startTime, course.endTime)

    // 1. 前置 spacer
    if (startSection > cursor) {
      list.push({ id: `s-${d}-${cursor}`, type: 'spacer', span: startSection - cursor })
    }
    // 2. 课程块
    list.push({ id: `c-${d}-${idx}`, type: 'course', span, course })
    cursor = startSection + span
  })

  // 3. 末尾 spacer
  if (cursor <= 13) {
    list.push({ id: `s-${d}-tail`, type: 'spacer', span: 13 - cursor + 1 })
  }
  return list
}
</script>

<style scoped lang="scss">
// 修复 scss 中的拼写错误
$padding: 2rem;
$primary-color: #2297ff;
$primary-text: #303133;
$light-text: #606266;
$border-color: #e4e7ed;
$course-border: 1px solid rgba(255, 255, 255, 0.3);
$spacing-sm: 4px;
$spacing-md: 8px;
$course-radius: 4px;
$course-font-size: 14px;
$header-height: 3rem;
$item-weight: 50px;
$item-height: 3rem;

$tableHeight: $item-height * 13;
.time-table {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background: #2297ff;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.05);
  .day-header {
    padding: 0.5rem $padding;
    width: 100%;
    display: flex;
    justify-content: space-around;
    flex-direction: row;
    align-items: center;
    .day-header-item {
      height: $header-height;
      width: $item-weight;
      padding: $spacing-md;
      color: #fff;
      font-weight: 500;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center; // 修复拼写错误（centbeer -> center）
      .header-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-weight: 500; // 修复错误（500px -> 500，font-weight 不接受像素单位）
      }
    }
  }
  // 其他样式保持不变...
  .lines {
    position: absolute;
    width: 100%;
    height: 100%;
    .line {
      height: $item-height;
      border-bottom: 1px solid #8f8f8f;
      width: 100%;
      margin-left: 1.5rem;
      &:nth-child(4n + 5) {
        height: $item-height;
        border-bottom: 1.5px solid #000000;
        margin-left: 1.5rem;
      }
      &:nth-child(5) {
        margin-left: 0rem;
      }
    }
  }
  // 其余样式省略...
}

// 其余样式保持不变...
</style>
