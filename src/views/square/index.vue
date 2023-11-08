<template>
  <div class="square_page">
    <div class="swiper_wrap">
      <swiper
        :slides-per-view="1"
        :space-between="50"
        data-swiper-autoplay="2000"
        @swiper="onSwiper"
        @slideChange="onSlideChange"
      >
        <swiper-slide>
          <img src="@/assets/images/banner1.png" alt="" srcset="" />
        </swiper-slide>
        <swiper-slide
          ><img src="@/assets/images/banner2.png" alt="" srcset=""
        /></swiper-slide>
        <swiper-slide
          ><img src="@/assets/images/banner3.png" alt="" srcset=""
        /></swiper-slide>
      </swiper>
    </div>
    <!-- 内容列表 -->
    <div
      :scroll-y="true"
      class="home_content"
      @scrolltolower="setScrolltolower"
    >

      <div class="square_playlet_wrap" v-if="scrollList.length">
        <div class="playlet_item" v-for="item in scrollList" :key="item.playet_id">
          <PlayletItem :item="item" />
        </div>
      </div>
      <NoData v-else />
    </div>
    <!-- 悬浮弹框 -->
    <template v-if="isFloat">
      <div
        class="square_float animate__animated animate__fadeInUp"
        :style="{ bottom: `${floatBottom}px` }"
      >
        <img
          class="square_float_cover"
          src="https://img2.doubanio.com/view/photo/s_ratio_poster/public/p2899182771.webp"
          mode="aspectFill"
        />
        <div class="square_float_info">
          <div class="square_info_title">{{ viewData.playet_name || "" }}</div>
          <div class="square_info_desc">
            Last watched was episode {{ viewData.series || 0 }} of {{ viewData.playet_name || "" }}
          </div>
        </div>
        <div
          class="square_float_btn"
          @click="
            router.push(
              `/pages_square/screening/screening?id=${viewData.playet_id}&series=${
                viewData.series - 1
              }`
            )
          "
        >
          Continue
        </div>
        <span
          class="square_float_close iconfont icon-guanbi"
          @click="closeFloatHandle"
        ></span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import { ref, onMounted } from "vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { showFailToast } from 'vant';
import mockApi from "../../mock/api.js";
import "swiper/css";

const router = useRouter();

const isFloat = ref(true);
const scrollHeight = ref(457);
const floatBottom = ref(8);
const viewData = ref({});

const page = ref(1);
const pageSize = ref(20);
const isLoad = ref(true);
let scrollList = ref([]);

console.log(scrollList)

onMounted(() => {
  getScrollHeight();
  getShortPlayData();
  getViewRecordData();
});

onMounted(() => {
  closeFloatHandle();
});

const onSwiper = (swiper) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log("slide change");
};

// 获取观看记录
async function getViewRecordData() {
  const { code, message, result } = await mockApi.getRecordList();
  if (code != 200) return showFailToast(message);
  if (!result.length) return;
  viewData.value = result[0] || {};
  setTimeout(() => {
    isFloat.value = true;
  }, 500);
}
// 获取短剧列表
async function getShortPlayData() {
  const params = { pageNo: page.value, pageSize: pageSize.value };
  const { code, message, result } = await mockApi.getTvList(params);
  if (code != 200) return showFailToast(message);
  if (!result.length && page.value > 1) {
    isLoad.value = false;
    showFailToast('No more data yet!')
    return;
  }
  scrollList = [...scrollList.value, ...result];
}
// 关闭弹框
function closeFloatHandle() {
  isFloat.value = false;
  viewData.value = {};
}
// 页面触底事件
function setScrolltolower() {
  if (scrollList.value.length < pageSize.value) return;
  if (!isLoad.value) return;
  page.value++;
  getShortPlayData();
}
// 获取页面剩余高度
function getScrollHeight() {
  //后面改造成h5的
  //   const { windowHeight, windowBottom } = uni.getSystemInfoSync();
  //   floatBottom.value = windowBottom + uni.upx2px(20);
  //   const query = uni.createSelectorQuery().in(this);
  //   query
  //     .select(".square_giant")
  //     .boundingClientRect(({ height }) => {
  //       scrollHeight.value = windowHeight - height;
  //     })
  //     .exec();
}
</script>

<style lang="scss" scoped>
.square_page {
  .home_content {
    padding: 0 0.53rem;
    height: calc(67vh - 1rem);
    overflow: auto;
  }

  .swiper_wrap {
    height: 25vh;
    margin-bottom: 1rem;
    .swiper {
      height: 100%;
      color: #000;
    }
    .swiper-slide {
      img {
        width: 100%;
        height: 100%;
      }
    }
  }

  // .square_scroll {
  //   display: flex;
  //   flex-wrap: wrap;
  //   justify-content: space-around;
  //   &_item {
  //     width: 7.24rem;
  //     display: inline-block;
  //     background: #000;
  //     border-radius: 0.43rem;
  //     overflow: hidden;
  //   }
  // }

  .square_playlet_wrap {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  .playlet_item {
    width: 40%;
    margin-bottom: 1rem;
  }
  .square_float {
    width: 21rem;
    height: 5.8rem;
    background: rgba(51, 51, 51, 0.8);
    padding: 0.53rem;
    box-sizing: border-box;
    border-radius: 0.43rem;
    position: fixed;
    bottom: 3.4rem;
    z-index: 2;
    left: 1rem;
    display: flex;
    align-items: center;
    .square_float_cover {
      width: 3.5rem;
      height: 100%;
      border-radius: 0.43rem;
    }
    .square_float_info {
      flex: 1;
      padding: 0 0.53rem;
      color: #fff;
      margin: 0 auto;
      font-family: ui-monospace;
      .square_info_title {
        font-size: 0.75rem;
      }
      .square_info_desc {
        font-size: 0.64rem;
        margin-top: 0.53rem;
      }
    }
    .square_float_btn {
      width: 8rem;
      height: 1.9rem;
      border-radius: 1rem;
      background: $color;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 0.8rem;
      color: #fff;
    }
    .square_float_close {
      position: absolute;
      top: 0.53rem;
      right: 0.53rem;
      font-size: 0.75rem;
      color: #fff;
    }
  }
}
</style>
