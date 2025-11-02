import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type FunctionItem } from '@/types/HomePage'

export const useFunctionList = defineStore('functionList', () => {
  const functionList = ref<FunctionItem[]>([
    { id: 'func-select-course', icon: 'orders-o', text: '选课', route: '/select-course' },
    { id: 'func-rating', icon: 'star-o', text: '评级', route: '/rating' },
    { id: 'func-query', icon: 'search', text: '查询', route: '/query' },
    { id: 'func-more', icon: 'ellipsis', text: '更多', route: '/more' },
  ])

  return { functionList }
})
