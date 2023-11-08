<template>
  <div class="selection_popup">
    <van-popup
      :round="true"
      :overlay="true"
      v-model:show="props.visible"
      :close-on-popstate="true"
      position="bottom"
      @click-overlay="handleClickOverlay"
    >
      <div class="popup_header">
        <img :src="props.currentPlayData.playet_image" alt="" />
        <div>{{ props.currentPlayData.playet_name }}</div>
      </div>
      <div class="popup_content">
        <div class="title">
          <span>
            <bold>Anthology</bold> completed/{{
              props.currentPlayData?.seriesList?.length
            }}
            Eps
          </span>
        </div>
        <div class="video_list">
          <div
            class="gather_item"
            :class="
              props.currentsubEpsId == citem.which_episode
                ? 'gather_item_active'
                : ''
            "
            @click="() => onSelect(citem)"
            v-for="(citem, cindex) in props.currentPlayData.seriesList"
            :key="cindex"
          >
            {{ citem.which_episode }}
            <van-icon v-if="citem.is_lock" class="lock" name="lock" size="10" />
          </div>
        </div>
      </div>
    </van-popup>
  </div>
</template>
<script setup>
import { showFailToast } from 'vant';

const emit = defineEmits(["toggleOverlay", "select-series"]);
const props = defineProps(["visible", "currentPlayData", "currentsubEpsId"]);

function handleClickOverlay() {
  emit("toggleOverlay");
}


function onSelect(citem) {
  if (citem.is_lock) {
    return showFailToast('请支付')
  } else {
    emit("select-series", citem.which_episode);
  }
}
</script>

<style lang="scss">
.selection_popup {
  .van-popup {
    padding: 16px;
    background-color: #141414;

    .popup_header {
      display: flex;
      margin-bottom: 10px;
      color: #fff;
      img {
        width: 40px;
        height: 60px;
        border-radius: 3px;
      }

      div {
        margin-left: 20px;
      }
    }

    .popup_content {
      .title {
        margin-bottom: 6px;
        color: #ccc;

        bold {
          font-weight: 600;
          font-size: 16px;
          color: #fff;
        }
      }

      .video_list {
        display: flex;
        flex-wrap: wrap;
        .gather_item {
          background-color: #a9aeb9;
          text-align: center;
          width: 17%;
          margin-bottom: 8px;
          /*每个格子宽度为20%*/
          height: 40px;
          color: #fff;
          line-height: 40px;
          border-radius: 3px;
          position: relative;
          &_active {
            background: #f9476f;
          }
          &:not(:nth-child(5n)) {
            margin-right: 10px;
          }
          .lock {
            position: absolute;
            right: 4px;
            top: 2px;
          }
        }
      }
    }
  }
}
</style>
