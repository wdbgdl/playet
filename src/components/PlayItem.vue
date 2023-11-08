<template>
  <div class="square_scroll_item">
    <img
      class="scroll_item_cover"
      :src="cover || ''"
      mode="aspectFill"
    />
    <div class="scroll_item_title">{{ title || "" }}</div>
  </div>
</template>

<script>
export default {
  props: ["cover", "title"],
};
</script>

<style lang="scss" scoped>
.square_scroll_item {
  width: 6.1rem;
  // background: #fff;
  // border-radius: 0.43rem;
  overflow: hidden;
  // box-shadow: 0rem 0.161rem 0.537rem 0rpx rgba(235, 235, 235, 0.4);
  .scroll_item_cover {
    width: 100%;
    height: 9.784rem;
  }
  .scroll_item_title {
    padding: 0.322rem 0.430rem;
    font-size: 0.752rem;
    color: #f4f4f4;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  &:nth-child(3n + 3) {
    margin-right: 0;
  }
}
</style>