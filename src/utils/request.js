import axios from 'axios'
import store from '@/store'
import router from '@/router'

// 基地址导出
export const baseURL = 'http://pcapi-xiaotuxian-front-devtest.itheima.net/'
const instance = axios.create({
  baseURL,
  timeout: 5000
})

// 请求拦截器
instance.interceptors.request.use(config => {
  // 获取用户信息
  const { profile } = store.state.user
  // 是否存在token
  if (profile.token) {
    config.headers.Authorization = `Bearer ${profile.token}`
  }
  return config
}, err => {
  return Promise.reject(err)
})

// 响应拦截器
instance.interceptors.response.use(res => res.data, err => {
  // 401状态清除本地信息
  if (err.response && err.response.status === 401) {
    store.commit('user/setUser', {})
    // 跳转登录页

    const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
    router.push('/login?redirectUrl=' + fullPath)
  }
  return Promise.reject(err)
})

// 导出方法
export default (url, method, submitData) => {
  return instance({
    url,
    method,
    // 判断请求方法
    [method.toLowerCase() === 'get' ? 'params' : 'data']: submitData
  })
}
