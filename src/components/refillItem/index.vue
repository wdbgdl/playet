<template>
  <div class="refill_comp" v-bind:class="{ 'active': props.index === props.clickIndex }">
    <van-tag v-if="props.item.isAward" type="primary" class="tag" color="#f5222d" text-color="#fff">{{ props.item.rate }}</van-tag>
    <div class="icon_wrap">
      <img class="img" src="@/assets/images/gold.png" alt="" srcset="" />
    </div>
    <div class="refill_count">
      <p class="gold">{{ props.item.gold }} gold</p>
      <p v-if="props.item.isAward" class="award">+{{ props.item.award }} award</p>
    </div>
    <div class="refill_money">${{ props.item.money }}</div>
  </div>
</template>
<script setup>
import { defineProps } from 'vue'

const props = defineProps(['item', 'index', 'clickIndex']);

console.log(props.index === props.clickIndex, props.index, props.clickIndex)
</script>
<style>
.refill_comp {
  padding: 20px;
  background-color: #262626;
  border-radius: 5px;
  display: flex;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
  &.active{
    border: 1px solid #cf1322;
  }
  .tag{
    position: absolute;
    top: 0;
    left: 0;
  }
  .icon_wrap {
    width: 30px;
    height: 30px;
    .img {
      width: 100%;
      height: 100%;
    }
  }
  .refill_count {
    margin-left: 10px;
    flex: 1;
    .gold {
      color: #fff;
      font-weight: 600;
    }
    .award {
      color: #cf1322;
    }
  }
  .refill_money {
    width: 60px;
    height: 25px;
    line-height: 25px;
    color: #fff;
    font-weight: 600;
    background-color: #f5222d;
    text-align: center;
    border-radius: 4px;
  }
}
</style>
