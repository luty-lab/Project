import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type FunctionItem } from '@/types/HomePage'
import course from '@/assets/images/function/course.png'
import grade from '@/assets/images/function/grade.png'
import query from '@/assets/images/function/query.png'
import more from '@/assets/images/function/more.png'

// import course from '@/assets/images/function/courseB.png'
// import grade from '@/assets/images/function/gradeB.png'
// import query from '@/assets/images/function/queryB.png'
// import more from '@/assets/images/function/more.png'

export const useFunctionList = defineStore('functionList', () => {
  const functionList = ref<FunctionItem[]>([
    {
      id: 'func-select-course',
      icon: course,
      text: '选课',
      route: '/select-course',
    },
    {
      id: 'grade',
      icon: grade,
      text: '课表',
      route: '/grade',
    },
    {
      id: 'func-query',
      icon: query,
      text: '查询',
      route: '/query',
    },
    {
      id: 'func-more',
      icon: more,
      text: '更多',
      route: '/more',
    },
    // { id: 'func-rating', icon: 'star-o', text: '评级', route: '/rating' },
    // { id: 'func-query', icon: 'search', text: '查询', route: '/query' },
    // { id: 'func-more', icon: 'ellipsis', text: '更多', route: '/more' },
  ])

  return { functionList }
})
