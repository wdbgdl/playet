<template>
  <div class="recent_page">
    <van-loading type="spinner" v-if="loading" />
    <div class="recent_playlet_wrap" v-if="scrollList.length">
      <div class="playlet_item" v-for="item in scrollList" :key="item.id">
        <PlayletItem :item="item" />
      </div>
    </div>
    <NoData v-else />
  </div>
</template>
<script setup>
import { ref, onMounted } from "vue";
import PlayletItem from "@/components/playletItem/index.vue";
import NoData from '@/components/noData/index.vue'
import mockApi from "@/mock/api.js";

const page = ref(1);
const pageSize = ref(20);
const loading = ref(false);
let scrollList = ref([]);

onMounted(() => {
  getShortPlayData();
});

async function getShortPlayData() {
  loading.value = true;
  const params = { pageNo: page.value, pageSize: pageSize.value };
  const { code, message, result } = await mockApi.getTvList(params);
  if (code != 200) return ElMessage({ message, icon: "none" });
  if (!result.length && page.value > 1) {
    loading.value = false;
    ElMessage({ message: "暂无更多数据", icon: "none" });
    return;
  }
  scrollList = [...scrollList.value, ...result];
  loading.value = false;
}
</script>
<style>
.recent_page {
  height: calc(92vh - 44px);
  overflow: auto;
  .recent_playlet_wrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .playlet_item{
    width: 40%;
    margin-bottom: 1rem;
  }
}
</style>
