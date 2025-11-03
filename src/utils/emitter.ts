import mitt from 'mitt'
type Events = {
  changeTitle: string // 明确 changeTitle 事件的参数是 string
  // 可以添加其他事件类型
  // 例如：updateUser: { id: number; name: string }
}
const emitter = mitt<Events>()
export default emitter
