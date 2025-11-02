import emitter from '../emitter'
const changeTitle = (title: string) => {
  emitter.emit('changeTitle', title)
}

export default changeTitle
