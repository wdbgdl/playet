<template>
  <div class="consumption">
    <template v-if="consumptionList.length">
      <div
        class="consumption_item"
        v-for="item in consumptionList"
        :key="item.id"
      >
        <div class="consumption_item_left">
          <div class="consumption_left_title">{{ item.mes || "" }}</div>
          <div class="consumption_left_date">{{ item.creTime || "" }}</div>
        </div>
        <div class="consumption_item_right">
          <div class="consumption_right_price">{{ item.coin || "0U币" }}</div>
          <div class="consumption_right_desc">Payment Successful</div>
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
import { showFailToast } from "vant";
import consumptionData from "@/mock/mine/consumption";
const consumptionList = ref(consumptionData);

onMounted(() => {
  getConsumptionRecordData();
});

async function getConsumptionRecordData() {
  // const { code, message, result } = await this.$http("/expend");
  // if (code !== 200) return showFailToast(message);
  // consumptionList.value = result || [];
}
</script>

<style lang="scss" scoped>
.consumption {
  padding: 0 0.7rem;
  padding-right: 0.59rem;
}
.consumption_item {
  padding: 0.85rem 0;
  border-bottom: 0.05rem solid #a9aeb9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .consumption_item_left,
  .consumption_item_right {
    .consumption_left_title,
    .consumption_right_price {
      font-size: 0.85rem;
      color: #fff;
    }
    .consumption_left_date,
    .consumption_right_desc {
      font-size: 0.64rem;
      color: #999;
      margin-top: 0.21rem;
    }
  }
  .consumption_right_desc {
    color: #fff !important;
    text-align: right;
  }
  &:last-child {
    border-bottom: none;
  }
}
</style>
