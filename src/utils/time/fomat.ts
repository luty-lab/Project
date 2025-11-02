// 格式化时间显示（如：08:30 或 昨天 14:20）
export const formatMessageTime = (timeStr: string) => {
  const date = new Date(timeStr)
  const now = new Date()

  // 同一天：显示时分
  if (date.toDateString() === now.toDateString()) {
    return `${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  // 昨天：显示“昨天 时分”
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (date.toDateString() === yesterday.toDateString()) {
    return `昨天 ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`
  }

  // 更早：显示月日
  return `${date.getMonth() + 1}月${date.getDate()}日`
}
