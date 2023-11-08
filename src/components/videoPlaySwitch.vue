<template>
    <!-- 播放视频 -->
    <div class="video_play_comp">
      <van-swipe
        ref="swipeRef"
        :initial-swipe="0"
        @drag-end="dragEnd"
        @drag-start="dragStart"
        :show-indicators="false"
        style="height: 92vh"
        vertical
        :lazy-render="true"
      >
        <van-swipe-item v-for="(item, i) in props.playsData" :key="i">
          <div class="videos" @touchstart="touchStart" @touchend="touchEnd">
            <video
              v-show="item.imgFlag !== true"
              @click.stop="videoPlay(i)"
              :muted="true"
              preload="metadata"
              ref="videos"
              id="videos"
              :class="item.sizeFlag ? 'videosize' : 'videos'"
              :src="item.playet_fisrt_episode_url"
              loop
              autoplay
            >
              当前设备不支持该视频播放
            </video>
          </div>
  
          <!-- 播放与暂停按钮 -->
          <div v-if="playShow" @click="videoPlay(i)" class="conPlay">
            <van-icon name="play" color="#fff" size="50" />
          </div>
          <!-- 右侧边栏 -->
          <div class="right-info" v-if="props.type === 'switchPlay'">
            <div>
              <van-icon
                @click.stop="handlecollection(i)"
                name="star"
                size="30"
                color="#fff"
              />
              <p>{{ item.playet_star }}</p>
            </div>
            <!-- 选集 -->
            <div @click.stop="handleSelectionOpen(i)" class="seleted">
              <van-icon size="30" name="video-o" color="#fff" />
              <p>Anthology</p>
            </div>
          </div>
  
          <!-- 简介 -->
          <div class="video-text" v-if="props.type === 'switchPlay'">
            <div class="title">
              <h4>{{ item.playet_name }}</h4>
            </div>
            <p>{{ item.playet_name }}</p>
          </div>
          <!-- 底部选集 -->
          <div class="bottom_anthology">
            <div class="bottom_anthology_left">
              <van-icon size="20" name="video-o" color="#fff" />
              <span>{{item.palyet_current_series}}/{{item.palyet_all_series}}</span>
            </div>
            <div
              @click.stop="handleSelectionOpen(i)"
              class="bottom_anthology_right"
            >
              Anthology<van-icon name="arrow" color="#fff" />
            </div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
  </template>
  
  <script setup>
  import { ref, getCurrentInstance, computed, watch, defineProps } from "vue";
  import SelectionPopup from "./SelectionPopup.vue";
  import { showToast } from "vant";
  import { useRouter } from "vue-router";
  import { useVideoStore } from "../stores/videos";
  import { storeToRefs } from "pinia";
  
  // 子组件向父组件传值
  const emits = defineEmits(["goLink"]);
  
  // 定义数据
  let dbClick = ref(false); //判断是否是双击
  let playShow = ref(false); //控制视频播放与暂停
  let playIndex = ref(-1); //切换视频后当前视频的索引
  let shareShow = ref(false); //显示或隐藏分享面板
  const options = [
    //分享面板数据
    [
      { name: "微信", icon: "wechat" },
      { name: "QQ", icon: "qq" },
      { name: "复制链接", icon: "link" },
    ],
  ];
  let chatShow = ref(false); //显示或隐藏评论窗口
  let chatIndex = ref(0); //当前视频的评论索引
  let chatText = ref(""); //评论内容
  let isFlag = ref(false); //是否是当前用户评论
  let currentPlayData = ref({}); //当前播放的视频
  
  
  // 手势滑动数据(左右滑动)
  let touchStartX = ref(0);
  let touchStartY = ref(0);
  let delta = ref(50);
  let visible = ref(false);
  
  // 获取当前组件实例
  let { proxy } = getCurrentInstance();
  
  // 路由
  let router = useRouter();
  
  // 获取pinia里的数据
  let videoStore = useVideoStore();
  // 使pinia里state变成响应式数据
  let { musicData, epsPopupVisible, currentsubEpsId  } = storeToRefs(videoStore);
  
  let props = defineProps({
    playsData: {
      type: Object,
      required: true,
    },
    workFlag: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'switchPlay',
    }
  });
  
  // watch(
  //   () => currentsubEpsId.value,
  //   (newValue) => {
  //     proxy.$refs.swipeRef.swipeTo(newValue);
  //   },
  //   { deep: true }
  // );
  
  // 监听
  watch(
    () => props.playsData.isPlay,
    (newValue) => {
      // 如果为null不做操作
      if (newValue === null) {
        return;
      }
      // 如果是false代表打开登录组件 暂停视频
      else if (newValue === false) {
        proxy.$refs.videos[chatIndex.value].pause();
      }
      // 如果是true代表关闭登录组件 继续播放视频
      else if (newValue === true) {
        proxy.$refs.videos[chatIndex.value].play();
      }
    }
  );
  
  // 计算属性
  //未登录直接不显示 是当前用户的作品也不显示关注图标 如已登录但是未关注作者显示
  let userColl = computed(() => {
    return (
      (props.playsData.collectionFlag !== true &&
        props.playsData.flag !== true) ||
      localStorage.getItem("Qy") === null
    );
  });
  
  // let videoList = computed(() => {
  //     let currentId = router.currentRoute.value.query?.id || 1
  //     let currentIndex = props.playsData.videos?.findIndex(item => item?.id == currentId);
  //     let newData = props.playsData.videos.slice(currentIndex)
  //     return newData
  // })
  
  // 是否登录
  let userItem = computed(() => {
    return localStorage.getItem("Qy") !== null;
  });
  // 当前视频的评论
  let chatArr = computed(() => {
    let arr = [];
    videoStore.playsData.videos.forEach((item, i) => {
      if (i == chatIndex.value) {
        item.chat.forEach((item) => {
          return arr.push(item);
        });
      }
    });
    return arr;
  });
  // 当前视频的评论总数
  let chatCount = computed(() => {
    return videoStore.playsData.videos[chatIndex.value].chat.length;
  });
  
  // 方法(事件)
  // 播放或暂停视频
  function videoPlay(i) {
    // 如果评论或分享面板开启中就只关闭它们
    if (chatShow.value === true || shareShow.value === true) {
      chatShow.value = false;
      shareShow.value = false;
    } else {
      let timer = null;
      clearTimeout(timer);
      dbClick.value = !dbClick.value;
      timer = setTimeout(() => {
        // 单机
        if (dbClick.value === true) {
          // 播放视频
          if (playShow.value === true) {
            proxy.$refs.videos[i].play();
            playShow.value = false;
          } else {
            proxy.$refs.videos[i].pause();
            playShow.value = true;
          }
        } else {
          //    双击
          playShow.value = false;
          if (props.playsData.videos[chatIndex.value].likeFlag === false) {
            showToast({
              icon: "like",
              message: "已点赞",
            });
            videoStore.$patch(() => {
              props.playsData.videos[chatIndex.value].likeFlag = true;
            });
          }
        }
        dbClick.value = false;
      }, 300);
    }
  }
  
  // 打开剧集
  const handleSelectionOpen = (i) => {
    //   console.log(epsPopupVisible.value, 'vvv')
  //   epsPopupVisible.value = !epsPopupVisible.value;
  //   setEpsPopupVisible(!epsPopupVisible.value)
    // console.log(props.playsData[i])
    // emits("goLink", props.playsData[i].playet_id);
    router.push({
      path: "/pages_square/dramaSubset/dramaSubset",
      query: {
        id:props.playsData[i].playet_id
      },
    });
  };
  
  // 触摸开始(左右滑动)
  function touchStart(e) {
    touchStartX.value = e.touches[0].clientX;
    touchStartY.value = e.touches[0].clientY;
  }
  // 触摸结束(左右滑动)
  function touchEnd(e) {
    let deltaX = e.changedTouches[0].clientX - touchStartX.value;
    let deltaY = e.changedTouches[0].clientY - touchStartY.value;
    // X轴的滑动距离大于 delta，此次事件是以X轴移动为主（左滑或者右滑）；
    if (Math.abs(deltaX) > delta.value && Math.abs(deltaX) > Math.abs(deltaY)) {
      if (deltaX >= 0) {
        console.log("右滑");
        playShow.value = false;
        if (videoStore.playsData.navIndex !== 0) {
          videoStore.$patch(() => {
            videoStore.playsData.navIndex--;
          });
        } else {
          showToast("前面没有咯~");
        }
      } else {
        console.log("左滑");
        playShow.value = false;
        if (videoStore.playsData.navIndex !== 3) {
          videoStore.playsData.navIndex++;
        } else {
          //跳转到作者页面
          router.push({
            path: "/authorHome",
            query: {
              dataObj: JSON.stringify(props.playsData),
            },
          });
        }
      }
    } else {
      // console.log("可能是误触")
    }
  }
  
  // 上下滑动开始触发
  function dragStart(e) {
    proxy.$refs.videos[e.index].pause();
    playShow.value = false;
  }
  // 上下滑动结束触发
  function dragEnd(e) {
    proxy.$refs.videos[e.index].play();
    playIndex.value = e.index;
    chatIndex.value = e.index; //当前视频的评论索引
    videoStore.$patch(() => {
      props.playsData.backHomeIndex = e.index;
    });
  }
  
  // 是否收藏
  function handlecollection(i) {
    playShow.value = false;
    if (localStorage.getItem("Qy") !== null) {
      if (props.playsData.videos[i].collectionFlag) {
        videoStore.$patch(() => {
          props.playsData.videos[i].collectionFlag = false;
          props.playsData.videos[i].collTotal--;
        });
        showToast("已取消");
      } else {
        videoStore.$patch(() => {
          props.playsData.videos[i].collectionFlag = true;
          props.playsData.videos[i].collTotal++;
        });
        showToast("已收藏");
      }
    } else {
      showToast("登录后才可以收藏哦~");
    }
  }
  
  </script>
  
  <style scoped lang="less">
  .video_play_comp {
    background-color: black;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
  }
  
  .videos {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .videosize {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  
  // 控制播放
  .conPlay {
    position: absolute;
    top: 0;
    left: 0;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  
  // 右侧边栏
  .right-info {
    position: absolute;
    right: 10px;
    bottom: 8%;
    height: 115px;
    display: flex;
    flex-direction: column; //设置排列方向为纵向
    align-items: center;
    justify-content: space-between;
    text-align: center;
  
    img {
      border: 3px solid #fff;
      width: 55px;
      height: 55px;
      border-radius: 50%;
      object-fit: cover;
    }
  
    .addCol {
      position: absolute;
      top: 15%;
      left: 35%;
      width: 20px;
      height: 20px;
      line-height: 20px;
      border-radius: 50%;
      background-color: #f9476f;
      text-align: center;
  
      :deep(.van-icon-plus) {
        vertical-align: 15%;
      }
    }
  
    p {
      font-size: 12px;
      color: #fff;
      margin: 0;
      text-align: center;
    }
  }
  
  // 评论窗口内样式
  .chatContent {
    padding: 10px 15px 20px; // margin-bottom: 40px;
    display: flex;
    justify-content: space-between;
  
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }
  
    div {
      padding-left: 10px;
      font-size: 12px;
  
      span {
        margin-left: 5px;
        display: inline-block;
        width: 33px;
        height: 19px;
        line-height: 19px;
        border-radius: 5px;
        color: #fff;
        transform: scale(0.9);
        text-align: center;
        background-color: #f9476f;
      }
  
      p {
        width: 230px;
        font-size: 14px;
        word-wrap: break-word; //强制换行
      }
    }
  }
  
  .chatSplit {
    margin-bottom: 50px;
  }
  
  // 发布评论
  .chatValue {
    text-align: center;
    background-color: #ffffff;
    padding: 8px;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  
    div {
      height: 50px;
      background-color: #f2f2f2;
      border-radius: 25px;
      display: flex;
      justify-content: space-around;
      align-items: center;
  
      input {
        width: 240px;
        height: 30px;
        border: 0;
        background-color: #f2f2f2;
        font-size: 16px;
      }
  
      // placeholder颜色
      input::-webkit-input-placeholder {
        color: #aab2bd;
        font-size: 16px;
      }
  
      div {
        background-color: #f9476f;
        width: 60px;
        height: 40px;
        line-height: 40px;
        border-radius: 20px;
        font-size: 16px;
        color: #fff;
        text-align: center;
      }
    }
  }
  
  // 视频介绍
  .video-text {
    position: absolute;
    left: 10px;
    bottom: 5%;
    color: #fff;
    font-size: 16px;
    padding-bottom: 10px;
    .title {
      display: flex;
      align-items: baseline; //第一行文字基线对齐
  
      h4 {
        margin: 0 10px 10px 0;
      }
  
      i {
        color: gray;
      }
    }
  
    p {
      margin: 0;
      width: 250px;
      overflow: hidden;
      font-size: 14px;
      font-family: cursive; //草书字体
      word-wrap: break-word; //强制换行
    }
  }
  
  .bottom_anthology {
    position: absolute;
    left: 0px;
    right: 0px;
    bottom: 0%;
    color: #fff;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.3);
    padding: 10px;
    .bottom_anthology_left {
      display: flex;
      i {
        margin-right: 5px;
      }
    }
  }
  
  /* 旋转动画 */
  
  @keyframes rotateImg {
    0% {
      transform: rotateZ(0);
    }
  
    100% {
      transform: rotateZ(360deg);
    }
  }
  
  /* 开启图片旋转动画 */
  
  .roteActive {
    animation-play-state: running !important;
  }
  </style>
  