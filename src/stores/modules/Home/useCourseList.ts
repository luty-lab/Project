import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type CourseItem } from '@/types/HomePage'

// import axios from 'axios'
// const url = 'https://633988fhat48.vicp.fun/index/daily_schedule'
// const apiGeCouseList = async () => {
//   try {
//     const response = await axios.get(url)
//     return response.data
//   } catch (error) {
//     console.error('返回默认数据', error)
//     throw error
//   }
// }
// console.log(apiGeCouseList())
export const useTodayCourseList = defineStore('todayCourseList', () => {
  const todayCourseList = ref<CourseItem[]>([
    {
      courseId: 'CR20251102001',
      courseName: '高等数学（上）',
      classroom: '教学楼101',
      startTime: '08:30',
      endTime: '10:10',
    },
    {
      courseId: 'CR20251102002',
      courseName: '大学英语',
      classroom: '语音室202',
      startTime: '10:30',
      endTime: '12:10',
    },
  ])

  return { todayCourseList }
})
