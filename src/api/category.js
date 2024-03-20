import request from '@/utils/request'

// 获取首页头部数据
export const findAllCategory = () => {
  return request('/home/category/head', 'get')
}

export const findTopCategory = (id) => {
  return request('/category', 'get', { id })
}
