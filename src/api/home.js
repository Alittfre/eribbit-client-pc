import request from '@/utils/request'

export const findBrand = (limit) => {
  return request('/home/brand', 'get', { limit })
}
//
export const findBanner = (distributionSite = 1) => {
  return request('/home/banner', 'get', { distributionSite })
}

export const findNew = () => {
  return request('home/new', 'get')
}

export const findHot = () => {
  return request('home/hot', 'get')
}
