// import xtxSkeleton from './xtx-skeleton.vue'
// import xtxCarousel from './xtx-carousel.vue'
// import xtxMore from './xtx-more'
// import xtxBread from './xtx-bread.vue'
// import xtxBreadItem from './xtx-bread-item.vue'
import defaultImg from '@/assets/images/200.png'

const importFn = require.context('./', false, /\.vue$/)

export default {
  install (app) {
    // app.component(xtxSkeleton.name, xtxSkeleton)
    // app.component(xtxCarousel.name, xtxCarousel)
    // app.component(xtxMore.name, xtxMore)
    // app.component(xtxBread.name, xtxBread)
    // app.component(xtxBreadItem.name, xtxBreadItem)
    importFn.keys().forEach(key => {
      const component = importFn(key).default
      app.component(component.name, component)
    })

    defineDirective(app)
  }
}

const defineDirective = (app) => {
  app.directive('lazyload', {
    mounted (el, binding) {
      const observer = new IntersectionObserver(([{ isIntersecting }]) => {
        if (isIntersecting) {
          observer.unobserve(el)
          el.onerror = () => {
            el.src = defaultImg
          }
          el.src = binding.value
        }
      }, { threshold: 0.01 })
      observer.observe(el)
    }
  })
}
