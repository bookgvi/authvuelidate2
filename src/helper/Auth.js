const token = localStorage.getItem('jwt')

export const isAuth = function (to, from, next) {
  if (token) {
    next('/')
  } else {
    next()
  }
}

export const isNoAuth = function (to, from, next) {
  if (!token) {
    next('/login')
  } else {
    next()
  }
}
