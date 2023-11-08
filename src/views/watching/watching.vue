<template>
  <div class="watching">
    <!-- 追剧记录 -->
    <div class="watching_view">
      <div class="playback_history_wrap">
        <div class="watching_title">Playback History</div>
        <template v-if="viewList.length > 6">
        <div
          class="watching_view_more"
          @click="$router.push('/pages_mine/record/spectate')"
        >
          <div>More</div>
          <img src="@/static/pageImages/more_icon.png" />
        </div>
      </template>
      </div>
      
      <div class="watching_view_select">
        <template v-if="viewList.length">
          <div
            v-for="(item, index) in viewList"
            :key="item.tvId"
            class="view-item"
          >
            <template v-if="index < 6">
              <playItem
                class="square_scroll_item watching_select_component"
                :cover="item.tvImage"
                :title="item.tvName"
                @click="
                  router.push(
                    `/pages_square/screening/screening?id=${item.tvId}&series=${
                      item.series - 1
                    }`
                  )
                "
              ></playItem>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="no-data">暂无数据</div>
        </template>
      </div>
      
    </div>
    <!-- 我的追剧 -->
    <div class="watching_mine">
      <div class="watching_title">My drama</div>
      <template v-if="likeList.length">
        <div class="watching_mine_select">
          <div v-for="item in likeList" :key="item.tvId">
            <div
              class="watching_mine_item"
              @click="
                router.push(
                  `/pages_square/screening/screening?id=${item.tvId}&series=${
                    item.series - 1
                  }`
                )
              "
            >
              <img
                class="watching_item_cover"
                :src="item.tvImage || ''"
                mode="aspectFill"
              />
              <div class="watching_item_content">
                <div class="watch_content_name">{{ item.tvName || "" }}</div>
                <div class="watch_content_info">
                  <div class="content_info_left">
                    <div class="content_left_head">
                      更新至 <span>第{{ item.numUpdate || 0 }}集</span>
                    </div>
                    <div class="content_left_desc">
                      看到
                      <span
                        >{{ item.tvName || "" }}第{{ item.series || 0 }}集</span
                      >
                    </div>
                  </div>
                  <span class="content_info_icon iconfont icon-icmore"></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="watching_mine_nodata">
          <img
            class="watching_nodata_icon"
            src="@/static/pageImages/no_play.png"
          />
          <div class="watching_nodata_desc">暂无追剧</div>
          <img
            class="watching_nodata_btn"
            src="@/static/pageImages/watch_btn.png"
            @click="guWatchingHandle"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { scrollData } from "@/mock/index";
import mockApi from "../../mock/api.js";
import { useRouter } from "vue-router";

const router = useRouter();

const viewList = ref(scrollData);
const likeList = ref(scrollData);

onMounted(() => {
  // const userid = uni.getStorageSync('userid');
  // 		if(!userid) return;
  getViewRecordData();
  getMyLikeData();
});

// 获取观看记录
async function getViewRecordData() {
  //   const { code, message, result } = await this.$http("/record");
  //   if (code !== 200) return ElMessage({ message });
  //   viewList.value = result || [];
}
// 获取我的追剧
async function getMyLikeData() {
  const { code, message, result } = await mockApi.getLikeTvList();
  if (code != 200) return ElMessage({ message });
  likeList.value = result || [];

}
// 去追剧跳转首页
function guWatchingHandle() {
  router.push("/pages/square");
}
</script>

<style lang="scss" scoped>
.watching {
  padding: 0 0.53rem;
  height: 92vh;
  overflow: auto;
}
.watching_view {
  .playback_history_wrap{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .watching_view_select {
    padding-top: 0.625rem;
    display: flex;
    flex-wrap: wrap;
    .view-item {
      &:nth-child(3n + 3) {
        .square_scroll_item {
          margin-right: 0;
        }
      }
      .square_scroll_item {
        margin: 0 0.32rem 0.53rem 0;
      }
    }
    .square_scroll_item {
      width: 7.24rem;
      display: inline-block;
      overflow: hidden;
    }
  }
  .watching_view_more {
    padding: 0.32rem 0;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #e95925;
    view {
      font-size: 0.75rem;
    }
    img {
      width: 0.76rem;
      height: 0.76rem;
      margin-left: 0.43rem;
    }
  }
}
.watching_mine {
  padding-top: 1.07rem;
  .watching_mine_select {
    .watching_mine_item {
      display: flex;
      align-items: center;
      margin-top: 0.85rem;
      .watching_item_cover {
        width: 6.08rem;
        height: 9.71rem;
        border-radius: 0.27rem;
      }
      .watching_item_content {
        flex: 1;
        padding-left: 0.59rem;
        padding-right: 0.75rem;
        .watch_content_name {
          font-size: 0.85rem;
          color: #f4f4f4;
        }
        .watch_content_info {
          padding-top: 1.6rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          .content_info_left {
            .content_left_head {
              display: flex;
              align-items: center;
              font-size: 0.75rem;
              color: #f4f4f4;
              span {
                font-weight: bold;
                margin-left: 0.21rem;
              }
            }
            .content_left_desc {
              display: flex;
              align-items: center;
              margin-top: 0.85rem;
              font-size: 0.75rem;
              color: #f4f4f4;
              span {
                color: $color;
                margin-left: 0.21rem;
              }
            }
          }
          .content_info_icon {
            font-size: 1.28rem;
            color: #f4f4f4;
          }
        }
      }
    }
  }
  .watching_mine_nodata {
    display: flex;
    flex-direction: column;
    align-items: center;
    .watching_nodata_icon {
      width: 8.53rem;
      height: 6.83rem;
    }
    .watching_nodata_desc {
      padding: 0.85rem 0;
      font-size: 0.75rem;
      color: #999;
    }
    .watching_nodata_btn {
      width: 6.61rem;
      height: 1.92rem;
    }
  }
}
.watching_title {
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  padding: 0 0.1rem;
}
</style>
