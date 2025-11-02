//主页数据结构

//班级讯息
// 消息数据类型定义
export interface ClassMessage {
  id: string // 消息唯一标识
  title: string // 消息标题
  createTime: string // 消息创建时间（原始格式，如：2025-11-02 08:30:00）
  isRead: boolean // 是否已读
  // 可扩展字段：content（消息内容）、sender（发送人）等
}

//快捷入口

export interface FunctionItem {
  id: string // 唯一标识（避免key冲突，便于后续扩展）
  icon: string // 图标名称（Vant图标库）
  text: string // 功能名称
  route: string // 路由路径（替代to，语义更明确）
  // 可扩展：权限控制字段（如requiredPermission）、埋点字段（如trackId）等
}

//课程卡片

//课程单项
export interface CourseItem {
  courseId: string // 课程唯一标识（推荐用字符串ID而非数字）
  courseName: string // 课程名称
  classroom: string // 上课地点（比location更具体）
  startTime: string // 开始时间
  endTime: string // 结束时间
  // 可扩展其他字段：如teacherName（教师）、credit（学分）等
}
