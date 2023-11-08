<template>
    <videoSeriesSwitch :playsData="playsSubData" type="switchSeries" />
    <!-- 底部栏组件 -->
</template>

<script setup>
import videoSeriesSwitch from '@/components/videoSeriesSwitch.vue'
import { useVideoStore } from '@/stores/videos'
import { storeToRefs } from 'pinia';


// 获取pinia里的数据
let videoStore = useVideoStore()
// 使pinia里state变成响应式数据
let {playsSubData } = storeToRefs(videoStore);

</script>

