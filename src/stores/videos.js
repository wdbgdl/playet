import { defineStore } from "pinia";
import { ref } from "vue";
import jiewu1 from "@/assets/videos/jiewu1.mp4";
import jiewu2 from "@/assets/videos/jiewu2.mp4";
import jiewu3 from "@/assets/videos/jiewu3.mp4";
import jiewu4 from "@/assets/videos/jiewu4.mp4";

import gaoxiao1 from "@/assets/videos/gaoxiao1.mp4";
import gaoxiao2 from "@/assets/videos/gaoxiao2.mp4";
import gaoxiao3 from "@/assets/videos/gaoxiao3.mp4";
// import { getCurrentInstance } from "vue";

// pinia中使用defineStore方法来定义store
//第一个参数是模块名
//第二个参数是一个对象,store的配置项,比如配置store内的数据
export const useVideoStore = defineStore("videos", () => {
  // state是一个函数 必须有返回值
  let epsPopupVisible = ref(false);
  let playsData = ref([
    {
      playet_name: "jiewu",
      playet_id: 1, // 剧名
      palyet_all_series: "4", // 全部集数
      palyet_current_series: "1", // 当前播放集数
      playet_fisrt_episode_url: jiewu1, // 当前播放剧url, 默认当前剧的第一集url
      playet_star: "20K", // 剧的点赞量（播放量）
      sizeFlag: true,
      // imgFlag: true,
    },
    {
      playet_name: "gaoxiao", // 剧名
      playet_id: 2,
      palyet_all_series: "3", // 全部集数
      palyet_current_series: "1", // 当前播放集数
      playet_fisrt_episode_url: gaoxiao1, // 当前播放剧url, 默认当前剧的第一集url
      playet_star: "34.5K", // 剧的点赞量（播放量）
      sizeFlag: true,
      // imgFlag: true,
    },
  ]);

  let playDetailById = ref([
    {
      playet_name: "jiewu", // 剧名
      playet_id:1,
      palyet_all_series: "4", // 全部集数
      palyet_current_series: "1", // 当前播放集数
      playet_src: jiewu1, // 当前播放剧src
      playet_star: '20K', // 剧的点赞量（播放量）
      playet_image: "", // 剧照
      is_ended: true, // 是否完结
      seriesList: [
        // 集列表
        {
          which_episode: "1", // 第几集
          is_lock: false, // 是否解锁
          episode_url: jiewu1, // 当前集的url
          playet_star: "20K",
          sizeFlag: true,
        },
        {
          which_episode: "2", 
          is_lock: false, 
          episode_url: jiewu2, 
          playet_star: "20K",
          sizeFlag: true,
        },
        {
          which_episode: "3", 
          is_lock: true, 
          episode_url: jiewu3, 
          playet_star: "20K",
          sizeFlag: true,
        },
        {
          which_episode: "4", 
          is_lock: true, 
          episode_url: jiewu4, 
          playet_star: "20K",
          sizeFlag: true,
        },
      ],
    },
    {
      playet_name: "gaoxiao", // 剧名
      playet_id: 2,
      palyet_all_series: "3", // 全部集数
      palyet_current_series: "1", // 当前播放集数
      playet_src: gaoxiao1, // 当前播放剧src
      playet_star: '34.5K', // 剧的点赞量（播放量）
      playet_image: "", // 剧照
      is_ended: true, // 是否完结
      seriesList: [
        // 集列表
        {
          which_episode: "1", // 第几集
          is_lock: false, // 是否解锁
          episode_url: gaoxiao1, // 当前集的url
          playet_star: "34.5K",
          sizeFlag: true,
        },
        {
          which_episode: "2", 
          is_lock: true, 
          episode_url: gaoxiao2, 
          playet_star: "34.5K",
          sizeFlag: true,
        },
        {
          which_episode: "3", 
          is_lock: true, 
          episode_url: gaoxiao3, 
          playet_star: "34.5K",
          sizeFlag: true,
        }
      ],
    },
  ]);

  function setEpsPopupVisible(value) {
    epsPopupVisible.value = value;
  }

  return { epsPopupVisible, playsData, setEpsPopupVisible, playDetailById };
});
