<template>
  <div class="opera">
    <template v-if="scrollList.length">
      <div v-for="item in scrollList" :key="item.id">
        <playItem
          class="opera_component"
          :cover="item.tvImage"
          :title="item.tvName"
          @click.native="
            router.push(`/pages_square/screening/screening?id=${item.id}`)
          "
        />
      </div>
    </template>
    <template v-else>
      <div class="no-data">暂无数据</div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { showFailToast } from 'vant';
import { useRouter } from "vue-router";

const router = useRouter();

const scrollList = ref([]);

onMounted(() => {
  getMustData();
});
// 获取必看数据
async function getMustData() {
  
//   const { code, message, result } = await this.$http("/tvRecommend");
//   if (code !== 200) return showFailToast(message);
//   scrollList.value = result || [];

}
</script>

<style lang="scss" scoped>
.opera {
  padding: 0 0.53rem;
  padding-top: 0.53rem;
  display: flex;
  flex-wrap: wrap;
  .opera_component {
    margin: 0 0.32rem 0.53rem 0;
    &:nth-child(3n + 3) {
      margin-right: 0;
    }
  }
}
</style>
