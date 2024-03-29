import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
//
export const findBanner = (distributionSite = 1) => {
  return request('/home/banner', 'get', { distributionSite })
}

export const findNew = () => {
  return request('/home/new', 'get')
}

export const findHot = () => {
  return request('/home/hot', 'get')
}

export const findGoods = () => {
  return request('/home/goods', 'get')
}

export const findSpecial = () => {
  return request('/home/special', 'get')
}
