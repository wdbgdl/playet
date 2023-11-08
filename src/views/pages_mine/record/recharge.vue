<template>
  <div class="recharge">
    <template v-if="rechargeList.length">
      <div
        class="recharge_item"
        v-for="(item, index) in rechargeList"
        :key="index"
      >
        <div class="recharge_item_left">
          <div class="recharge_left_title">{{ item.mes || "" }}</div>
          <div class="recharge_left_date">{{ item.creTime || "" }}</div>
        </div>
        <div class="recharge_item_right">
          <div class="recharge_right_price">+{{ item.coin || "0U币" }}</div>
          <div class="recharge_right_desc">Payment Successful</div>
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
import rechargeData from "@/mock/mine/recharge";
const rechargeList = ref(rechargeData);

onMounted(() => {
  getRechargeRecordData();
});

async function getRechargeRecordData() {
  // const { code, message, result } = await this.$http("/recharge");
  // if (code !== 200) return showFailToast(message);
  // rechargeList.value = result || [];
}
</script>

<style lang="scss" scoped>
.recharge {
  padding: 0 0.7rem;
  padding-right: 0.59rem;
}
.recharge_item {
  padding: 0.85rem 0;
  border-bottom: 0.05rem solid #a9aeb9;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .recharge_item_left,
  .recharge_item_right {
    .recharge_left_title,
    .recharge_right_price {
      font-size: 0.85rem;
      color: #fff;
      text-align: right;
    }
    .recharge_left_date,
    .recharge_right_desc {
      font-size: 0.64rem;
      color: #999;
      margin-top: 0.21rem;
    }
    .recharge_left_title{
      text-align: left;
    }
  }

  .recharge_right_desc {
    text-align: right;
  }
  &:last-child {
    border-bottom: none;
  }
}
</style>
