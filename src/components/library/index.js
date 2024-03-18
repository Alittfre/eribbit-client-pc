import xtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'
import xtxMore from './xtx-more'

export default {
  install (app) {
    app.component(xtxSkeleton.name, xtxSkeleton)
    app.component(xtxCarousel.name, xtxCarousel)
    app.component(xtxMore.name, xtxMore)
  }
}
