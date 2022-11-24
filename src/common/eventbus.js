const store = {}

export const register = (event, fn) => {
  if(!store[event]) {
    store[event] = []
  }
  store[event].push(fn)
  return  () => {
    if(store[event]) {
      const index = store[event].indexOf(fn)
      store[event].splice(1, index)
    }
  }
} 

export const notify = (event, args) => {
  if(store[event]) {
   store[event].forEach(fn => fn(args))
  }
}