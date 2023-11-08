<template>
  <div class="spectate">
    <template v-if="viewList.length">
      <div v-for="item in viewList" :key="item.playet_id">
        <div class="spectate_select">
          <img
            class="spectate_select_cover"
            :src="item.playet_image || ''"
            mode="aspectFill"
          />
          <div class="spectate_select_content">
            <div class="select_content_title">{{ item.playet_name || "" }}</div>
            <div class="select_content_look">
              Watched Episode {{ item.series || 0 }} of {{ item.playet_name || "" }}
            </div>
            <div class="select_content_all">Episode {{ item.numUpdate || 0 }} completed</div>
          </div>
          <div
            class="spectate_select_btn"
            @click="
              router.push(
                `/pages_square/screening/screening?id=${item.playet_id}&series=${
                  item.series - 1
                }`
              )
            "
          >
          Continue
          </div>
        </div>
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
import { scrollData} from '../../../mock/index'
import { useRouter } from "vue-router";

const router = useRouter();


const viewList = ref(scrollData);

onMounted(() => {
  getViewRecordData();
});

// 获取观看记录
async function getViewRecordData() {
  
  // const { code, message, result } = await this.$http("/record");
  // if (code !== 200) return showFailToast(message);
  // viewList.value = result || [];

}
</script>

<style lang="scss" scoped>
.spectate {
  padding: 0.32rem 0.64rem;
  padding-bottom: 0.85rem;
}
.spectate_select {
  margin-top: 0.53rem;
  display: flex;
  align-items: center;
  font-family: ui-monospace;
  .spectate_select_cover {
    width: 4.75rem;
    height: 7rem;
    border-radius: 0.43rem;
  }
  .spectate_select_content {
    flex: 1;
    padding: 0 0.53rem;
    .select_content_title {
      // font-size: 0.85rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      font-size: 13px;
      color: #f4f4f4;
    }
    .select_content_look {
      font-size: 0.64rem;
      // color: #999;
      margin-top: 1.17rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      color: #f4f4f4;
    }
    .select_content_all {
      font-size: 0.64rem;
      // color: #999;
      margin-top: 1.01rem;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
      color: #f4f4f4;
    }
  }
  .spectate_select_btn {
    width: 5.76rem;
    height: 1.92rem;
    border-radius: 0.96rem;
    background: $color;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #fff;
  }
}
</style>
