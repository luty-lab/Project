import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type TabItem } from '@/types/tabBar'

export const useTabList = defineStore('TabList', () => {
  const TabBarList = ref<TabItem[]>([
    { name: '日历', icon: 'calendar-o', path: '/calendar' },
    { name: '成绩', icon: 'chart-o', path: '/score' },
    { name: '首页', icon: 'home-o', path: '/' },
    { name: '课表', icon: 'orders-o', path: '/schedule' },
    { name: '我的', icon: 'user-o', path: '/profile' },
  ])

  return { TabBarList }
})
