<script>
import { h } from 'vue'
export default {
  name: 'xtxBread',
  render () {
    const items = this.$slots.default()
    const dymanicItems = []
    items.forEach((item, i) => {
      if (item.type.name === 'xtxBreadItem' || item.type.displayName === 'Transition') {
        dymanicItems.push(item)
        if (i < items.length - 1) {
          dymanicItems.push(h('i', { class: 'iconfont icon-angle-right' }))
        }
      }
    })
    return h('div', { class: 'xtx-bread' }, dymanicItems)
  }
}
</script>

<style lang='less'>
.xtx-bread {
    display: flex;
    padding: 25px 10px;

    &-item {
        a {
            color: #666;
            transition: all .4s;

            &:hover {
                color: @xtxColor;
            }
        }
    }

    i {
        font-size: 12px;
        margin-left: 5px;
        margin-right: 5px;
        line-height: 22px;
    }
}
</style>
