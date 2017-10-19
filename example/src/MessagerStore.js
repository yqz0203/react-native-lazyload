/**
 * messager store for communication between each container and component in container
 */

class Messager {
  constructor(id) {
    this.id = id
  }

  callbacks = []

  bind(cb) {
    this.callbacks.push(cb)
  }

  unbind(cb) {
    let index = -1
    this.callbacks.some((item, i) => {
      if (item === cb) {
        index = i
        return true
      }
    })
    if (index >= 0) {
      this.callbacks.splice(index, 1)
    }
  }

  trigger(...args) {
    this.callbacks.forEach((cb) => {
      cb(...args)
    })
  }

  setScroll(scroll) {
    this.scroll = scroll
  }

  getScroll() {
    return this.scroll
  }
}

const MessagerStore = {
  msgStore: {},

  getStore(id) {
    if (!id) throw new Error(`message store id is required`)
    if (!this.msgStore[id]) {
      this.msgStore[id] = new Messager(id)
    }
    return this.msgStore[id]
  },

  removeStore(id) {
    delete this.msgStore[id]
  },

  bind(id, cb) {
    if (!id) return
    let store = this.getStore(id)
    store.bind(cb)
  },

  unbind(id, cb) {
    if (!id) return
    let store = this.getStore(id)
    store.unbind(cb)
  },

  trigger(id, ...args) {
    if (!id) return
    let store = this.getStore(id)
    store.trigger(...args)
  },

  // save scroll context, it will be need when the component init 
  setScroll(id, scroll) {
    if (!id) return
    let store = this.getStore(id)
    store.setScroll(scroll)
  },

  getScroll(id) {
    if (!id) return
    let store = this.getStore(id)
    return store.getScroll()
  }
}

export default MessagerStore