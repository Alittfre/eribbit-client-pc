<template>
  <div class="goods-comment-image">
    <!-- 图片列表 -->
    <div class="list">
      <a
        href="javascript:;"
        v-for="item in pictures"
        :key="item"
        @click="currImage = item"
        :class="{ active: currImage === item }"
      >
        <img :src="item" alt="" />
      </a>
    </div>
    <!-- 大图预览 -->
    <div class="preview" v-if="currImage">
      <img :src="currImage" alt="" />
      <i @click="currImage = ''" class="iconfont icon-close-new"></i>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
export default {
  name: 'GoodsCommentImage',
  props: {
    pictures: {
      type: Array,
      default: () => []
    }
  },
  setup () {
    const currImage = ref('')
    return { currImage }
  }
}
</script>

<style scoped lang="less">
.goods-comment-image {
  .list {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
    a {
      width: 120px;
      height: 120px;
      border: 1px solid #e4e4e4;
      margin-right: 20px;
      margin-bottom: 10px;
      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
      &.active {
        border-color: @xtxColor;
      }
    }
  }
  .preview {
    width: 480px;
    height: 480px;
    border: 1px solid #e4e4e4;
    background: #f8f8f8;
    margin-bottom: 20px;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
    i {
      position: absolute;
      right: 0;
      top: 0;
      width: 30px;
      height: 30px;
      background: rgba(0, 0, 0, 0.2);
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
}
</style>
