import xtxSkeleton from './xtx-skeleton.vue'
import xtxCarousel from './xtx-carousel.vue'

export default {
  install (app) {
    app.component(xtxSkeleton.name, xtxSkeleton)
    app.component(xtxCarousel.name, xtxCarousel)
  }
}
