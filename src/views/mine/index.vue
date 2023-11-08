<template>
  <div class="mine">
    <!-- 用户信息 -->
    <div class="mine_user">
      <img
        class="mine_user_avatar"
        :src="loginData.icon || '/src/static/pageImages/default_avatar.png'"
        mode="aspectFill"
        
      />
      <div class="mine_user_info">
        <div class="mine_info_title">
          {{ ProfileInfo.user_name || "Guest" }}
        </div>
        <div class="mine_info_major">UID：{{ ProfileInfo.id || "0000" }}</div>
      </div>
      <div class="login_wrap" @click="router.push('/sign')">
        Sign in<span class="mine_take_icon iconfont icon-youjiantou"></span>
      </div>
    </div>
    <div class="wallet_wrap">
      <div class="detail">
        <span class="label">My Wallet</span>
        <!-- <p><span class="text">Detail</span><span class="mine_take_icon iconfont icon-youjiantou"></span></p> -->
      </div>
      <div class="wallet">
        <span class="label">{{ ProfileInfo.my_wallet_gold }}</span>
        <span class="refill" @click="router.push('/refill')">Refill</span>
      </div>
    </div>
    <!-- 三个记录 -->
    <div class="mine_take">
      <div v-for="item in takeList" :key="item.id">
        <div class="mine_take_item" @click="router.push(item.url)">
          <div class="mine_take_title">
            <img :src="item.icon || ''" /> {{ item.title || "" }}
          </div>
          <span class="mine_take_icon iconfont icon-youjiantou"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";
import ProfileInfo from '@/mock/mine/index';

const router = useRouter();
const store = useLoginStore();
const { loginData, setUserInfo } = storeToRefs(store);

const takeList = ref([
  // {
  //   id: 1,
  //   icon: "/src/static/pageImages/info01.png",
  //   title: "Playback History",
  //   url: "/pages_mine/record/spectate",
  // },
  // {
  //   id: 2,
  //   icon: "/src/static/pageImages/info02.png",
  //   title: "Expenses record",
  //   url: "/pages_mine/record/consumption",
  // },
  {
    id: 3,
    icon: "/src/static/pageImages/info03.png",
    title: "Recharge record",
    url: "/pages_mine/record/recharge",
  },
]);

function onShow() {
  getUserInfoData();
}

// 获取用户信息并存储
async function getUserInfoData() {
  const { code, result } = await this.$http("/user");
  if (code !== 200) return;
  setUserInfo(result);
}
</script>

<style lang="scss" scoped>
.mine_user {
  padding: 1.47rem;
  display: flex;
  align-items: center;
  .mine_user_avatar {
    width: 3.75rem;
    height: 3.75rem;
    border-radius: 50%;
  }
  .mine_user_info {
    flex: 1;
    padding-left: 0.625rem;
    .mine_info_title {
      font-size: 1.125rem;
      font-weight: bold;
      color: #fff;
    }
    .mine_info_major,
    .mine_info_remainder {
      line-height: 1rem;
      font-size: 0.75rem;
      color: #999;
      margin-top: 0.185rem;
    }
  }
  .login_wrap{
    color: #c6cddb;
    display: flex;
    .mine_take_icon{
      font-size: 12px;
      position: relative;
      top:3px;
    }
  }
}
.wallet_wrap {
  width: 80%;
  margin: 0 auto;
  background-color: #1f1f1f;
  border-radius: 8px;
  padding: 0 20px;
  .label{
      color: #fff;
      font-size: 15px;
    }
  .detail {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #434343;
    .text{
      font-size: 13px;
    }
    p{
      display: flex;
      .mine_take_icon{
        font-size: 12px;
        margin-top: 1px;
        margin-left:3px;
      }
    }
  }
  .wallet {
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .refill{
      width: 70px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      display: inline-block;
      border-radius: 4px;
      color: #fff;
      background: linear-gradient(45deg, #ff9a26, #fe6178);
      // background: linear-gradient(45deg, red, blue);
    }
  }
}
.mine_take {
  padding: 0 1.5rem;
  .mine_take_item {
    margin-top: 1.39rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .mine_take_title {
      font-size: 1rem;
      color: #fff;
      display: flex;
      align-items: center;
      img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.43rem;
      }
    }
    .mine_take_icon {
      font-size: 0.85rem;
      color: #c1c1c3;
    }
  }
}
</style>
