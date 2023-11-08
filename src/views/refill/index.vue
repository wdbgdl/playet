<template>
  <div class="refill_page">
    <div class="balance_wrap">
      <span class="balance">Balance: </span>
      <span class="gold">{{ refillInfo.data.balance_gold }} Gold</span>
      <i class="line"></i>
      <span class="award">{{ refillInfo.data.award_gold }} Award</span>
    </div>
    <div class="refill_list">
        <div v-for="(item, index) in fillList" :key="index" @click="handleClick(index)">
            <RefillItem :item="item" :index="index" :clickIndex="clickIndex"/>
        </div>
    </div>
    <p class="recharging_agreement">Recharging means agreeing to <a class="agreement_src">the recharging agreement</a></p>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import { showLoadingToast } from 'vant';
import RefillItem from '@/components/refillItem/index.vue';
import refillInfo from '@/mock/mine/refill'

const clickIndex = ref(0);

const fillList = ref(refillInfo.list)

const handleClick = (index) => {
    clickIndex.value=index;
    showLoadingToast({message: 'Payments...', forbidClick: true,duration:5000});
}
</script>
<style>
.refill_page {
    overflow: hidden;
  .balance_wrap {
    line-height: 16px;
    padding: 17px 20px;
    display: flex;
    color: #fff;
    font-weight: 600;
    background-color: #1f1f1f;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    .balance {
      color: #d9d9d9;
      margin-right: 10px;
      font-weight: 400;
    }
    .line{
        height: 10px;
        border-left: 1px solid #8c8c8c;
        margin: 0 8px;
        position: relative;
        top: 3px;
    }
  }
  .refill_list{
    height: calc(100vh - 35px);
    padding: 80px 20px 0;
    overflow: auto;
  }
  .recharging_agreement{
    font-size: 12px;
    color: #8c8c8c;
    text-align: center;
    .agreement_src{
        color: #fff;
    }
  }
}
</style>
