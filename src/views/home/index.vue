<template>
  <div class="home_page">
    <van-tabs
      v-model:active="active"
      color="transparent"
      title-active-color="#fff"
      title-inactive-color="#a9aeb9"
      background="rgba(0,0,0,0.2)"
      :animated="true"
      :sticky="true"
      @change="tabChange"
    >
      <van-tab title="Recommend" name="recommend">
      </van-tab>
      <van-tab title="Recent" name="recent">
      </van-tab>
    </van-tabs>
    <Recommend v-if="active === 'recommend'" />
    <Recent v-else />
  </div>
</template>
<script setup>
import { ref } from "vue";
import Recommend from './components/recommend.vue'
import Recent from './components/recent.vue'

const active = ref("recommend");

const tabChange = (name) => {
  active.value = name;
};
</script>

<style>
.home_page {
  height: 92vh;
  overflow: auto;
  background-color: #141414;
  .van-tabs{
    z-index: 10;
  }
}
</style>
