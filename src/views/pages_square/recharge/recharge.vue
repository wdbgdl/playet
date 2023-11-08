<template>
  <div class="recharge">
    <div class="recharge_balance">
      账户余额：<span>{{ loginData.balance || 0 }}</span> U币
    </div>
    <!-- 充值选项 -->
    <div class="recharge_option">
      <div v-for="(item, index) in rechargeList" :key="item.id">
        <div
          class="recharge_option_list"
          :class="{ active: currentIndex == index }"
          @click="rechargeItemHandle(index)"
        >
          <div class="recharge_list_regular">
            <div class="recharge_list_regular_price">
              {{ item.amount || 0 }}元
            </div>
            <div class="recharge_list_regular_get">{{ item.mes || "" }}</div>
          </div>
          <template v-if="item.mes2">
            <div class="recharge_list_many">{{ item.mes2 || "" }}</div>
          </template>
        </div>
      </div>
    </div>
    <!-- 广告 -->
    <div class="recharge_advert" @click="advertHandle">
      <img
        class="recharge_advert_cover"
        src="/src/static/pageImages/recharge_advert.png"
      />
    </div>
    <!-- 充值说明 -->
    <div class="recharge_prove">
      <div class="recharge_prove_title">充值说明：</div>
      <div class="recharge_prove_desc">虚拟商品，已经购买不得退换</div>
      <div class="recharge_prove_content">
        用户使用K币解锁剧集，后期重复观看无需重新解锁充值后到账可能有延迟，2小时内未到账请与客服联系。
      </div>
      <div class="recharge_prove_content">
        未满18周岁的未成年人，应在父母或其他监护人的监护、指导、同意下进行如付费充值、付费
        阅读等相关操作
      </div>
      <div class="recharge_prove_content">
        在本平台所做的任何操作将视为已获得您的父母或其他监护人的同意并由您和您的父母或其他监护人承担相关法律责任
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { showFailToast } from 'vant';
import { useLoginStore } from "@/stores/login";
import { storeToRefs } from "pinia";

const store = useLoginStore();
const { loginData, setUserInfo } = storeToRefs(store);

const rechargeList = ref([]);
const currentIndex = ref(null);

onMounted(() => {
  getRechargeData();
});

// 获取充值列表
async function getRechargeData() {
  // const { code, message, result } = await this.$http('/scheme');
  // if(code !== 200) return showFailToast(message);
  // rechargeList.value = result || [];

}
// 点击广告匹配一年
function advertHandle() {
  let index = null;
  rechargeList.value.forEach((item, itemIndex) => {
    if (item.amount === 365) index = itemIndex;
  });
  if (index === null) return;
  rechargeItemHandle(index);
}
// 点击列表项选中并下单支付
function rechargeItemHandle(index) {
  if (index === currentIndex.value) return (currentIndex.value = null);
  currentIndex.value = index;
  // 调用下单接口 后面可能换成海外支付
  // setPlaceOrderAjax()
}
// 调用下单接口
// async function setPlaceOrderAjax() {
// 	const appid = 'wx6b96da9ef24474f8';
// 	const schemeId = this.rechargeList[this.currentIndex].id
// 	const params = { appid, schemeId };
// 	uni.showLoading({ mask: true });
// 	const { code, message, result } = await this.$http('/order', params);
// 	if(code !== 200) return uni.showToast({ title: message, icon: 'none' });
// 	uni.showToast({ title: '下单成功', icon: 'none' });
// 	this.setPaymentAjax(result);
// },
// 支付
// function setPaymentAjax(result) {
// 	const option = {
// 		provider: 'wxpay', timeStamp: result.timestamp,
// 		nonceStr: result.nonceStr, package: result.packageVal,
// 		signType: result.signType, paySign: result.paySign
// 	}
// 	uni.requestPayment({
// 		...option,
// 		success: res => {
// 			this.currentIndex = null;
// 			this.getUserInfoData();
// 			uni.showToast({ title: '支付成功', icon: 'none' });
// 		},
// 		fail: error => {
// 			uni.showToast({ title: '支付失败', icon: 'none' });
// 		}
// 	})
// },
// 获取用户信息并存储
// async function getUserInfoData() {
// 	const { code, result } = await this.$http('/user');
// 	if(code !== 200) return;
// 	this.$store.commit('setUserInfo', result);
// },
// ...mapMutations(['setUserInfo'])
</script>

<style lang="scss" scoped>
.recharge {
  padding: 0 0.64rem;
}
.recharge_balance {
  padding: 1.07rem 0;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #1d1d1d;
  span {
    color: $color;
    margin-right: 0.43rem;
  }
}
.recharge_option {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .recharge_option_list {
    width: 9.01rem;
    background: rgba(255, 255, 255, 0.11);
    border: 0.05rem solid #f5f5f5;
    border-radius: 0.43rem;
    margin-top: 0.53rem;
    overflow: hidden;
    .recharge_list_regular {
      padding: 0.43rem 0.64rem;
      .recharge_list_regular_price {
        font-size: 1.01rem;
        font-weight: bold;
        color: #333;
      }
      .recharge_list_regular_get {
        font-size: 0.64rem;
        color: #999;
        margin-top: 0.21rem;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
    }
    .recharge_list_many {
      padding: 0.1rem 0;
      border-top: 0.05rem solid #f5f5f5;
      font-size: 0.75rem;
      color: $color;
      text-align: center;
    }
    &.active {
      background: rgba(233, 89, 37, 0.11);
      border-color: $color;
      .recharge_list_regular {
        .recharge_list_regular_price {
          color: $color;
        }
      }
      .recharge_list_many {
        background: $color;
        color: #fff;
      }
    }
  }
}
.recharge_advert {
  height: 5.55rem;
  padding: 0 0.21rem;
  margin-top: 1.6rem;
  .recharge_advert_cover {
    width: 100%;
    height: 100%;
    border-radius: 0.43rem;
  }
}
.recharge_prove {
  padding: 0.96rem 0;
  padding-bottom: 2.08rem;
  .recharge_prove_title {
    font-size: 0.64rem;
    color: #666;
  }
  .recharge_prove_desc {
    padding: 0.43rem 0 0.16rem 0;
    font-size: 0.64rem;
    color: #666;
  }
  .recharge_prove_content {
    font-size: 0.59rem;
    color: #666;
    line-height: 1.07rem;
    margin-top: 0.27rem;
  }
}
</style>
