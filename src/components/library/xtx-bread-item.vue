<div class="xtx-bread-item">
    <RouterLink v-if="to" :to="to"><slot /></RouterLink>
      <span v-else><slot /></span>
</div>
<script>
export default {
  name: 'xtxBreadItem',
  props: {
    to: {
      type: [String, Object]
    }
  }
}
</script>
