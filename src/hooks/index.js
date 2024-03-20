// 懒加载方法，基于useIntersectionObserver

import { useIntersectionObserver } from '@vueuse/core'
import { ref } from 'vue'

export const useLazyData = (apiFn) => {
  const target = ref(null)
  const result = ref([])
  const { stop } = useIntersectionObserver(
    target,
    ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        console.log(target.value, '元素可见可以发请求了.....')
        apiFn().then(data => {
          result.value = data.result
          stop()
        })
      }
    }, {
      threshold: 0
    }
  )
  return { target, result }
}
