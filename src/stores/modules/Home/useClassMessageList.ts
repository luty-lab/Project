import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type ClassMessage } from '@/types/HomePage'
// import axios from 'axios'
// const url = 'https://633988fhat48.vicp.fun/index/hello2'
// 定义请求函数()
// const apiGetClassMessage = async () => {
//   try {
//     const response = await axios.get(url)
//     return response.data
//   } catch (error) {
//     console.error('Error fetching data:', error)
//     throw error
//   }
// }
console.log('开始请求数据')
// const list = await apiGetClassMessage()
// 模拟数据
const list: ClassMessage[] = [
  {
    id: '1',
    title: '关于期末考试安排的通知',
    createTime: '2025-11-02 08:30:00',
    isRead: false,
  },
  {
    id: '2',
    title: '新学期课程表发布',
    createTime: '2025-10-28 14:15:00',
    isRead: false,
  },
  {
    id: '3',
    title: '校园安全须知',
    createTime: '2025-10-25 09:00:00',
    isRead: false,
  },
  {
    id: '4',
    title: '图书馆开放时间调整通知',
    createTime: '2025-10-20 11:45:00',
    isRead: false,
  },
]
export const useClassMessageList = defineStore('classMessageList', () => {
  const classMessageList = ref<ClassMessage[]>(list)
  return { classMessageList }
})
