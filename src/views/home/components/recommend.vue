<template>
    <div class="recomment-page">
        <videoPlaySwitch :playsData="playsData" @goLink="goLink" type="switchPlay" /> 
    </div>
    <!-- 底部栏组件 -->
  </template>
  
  <script setup>
  import videoPlaySwitch from "@/components/videoPlaySwitch.vue";
  import { useVideoStore } from "@/stores/videos";
  import { useRouter } from 'vue-router';
  import { storeToRefs } from "pinia";
  
  // 获取pinia里的数据
  let videoStore = useVideoStore();
  // 使pinia里state变成响应式数据
  let { playsData,playsSubData } = storeToRefs(videoStore);
  
  
  // 路由
  let router = useRouter()
  
  function goLink(id) {
    let currentVideos = playsData.value?.find(item=>item?.playet_id == id);
    // playsSubData.value.videos =currentVideos?.children;
    router.push({
      path: "/pages_square/dramaSubset/dramaSubset",
      query: {
         id 
      },
    });
  }
  
  
  </script>
<style scoped>
.recomment-page{
    min-height:calc(100vh - 44px - 48px)
}
</style>
  