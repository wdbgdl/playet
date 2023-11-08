<template>
  <div
    class="tv_item"
    @click.native="
      router.push(`/pages_square/dramaSubset/dramaSubset?id=${props.item.playet_id}`)
    "
  >
    <img class="img" :src="props.item.playet_image" alt="" />
    <p class="tv_name">{{ props.item.playet_name }}</p>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { defineProps } from 'vue'

const props = defineProps(['item']);

const router = useRouter();
</script>
<style lang="less">
.tv_item {
  .img {
    width: 100%;
    height: 200px;
  }
  .tv_name {
    font-size: 13px;
    color: #f4f4f4;
    font-family: ui-monospace;
  }
}
</style>
