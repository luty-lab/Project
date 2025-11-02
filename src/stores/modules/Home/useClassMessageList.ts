import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type ClassMessage } from '@/types/HomePage'
export const useClassMessageList = defineStore('classMessageList', () => {
  const classMessageList = ref<ClassMessage[]>([
    {
      id: 'msg-20251102-001',
      title: '[调课通知] 高等数学课程地点变更至实验楼302',
      createTime: '2025-11-02 08:30:00',
      isRead: false,
    },
    {
      id: 'msg-20251102-002',
      title: '[考试安排] 11月中旬英语四级模拟考试通知',
      createTime: '2025-11-02 09:15:00',
      isRead: true,
    },
  ])
  return { classMessageList }
})
