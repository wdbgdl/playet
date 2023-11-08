import "./common/css/main.css";
import "./common/css/animate.css";
import "./common/css/flex.css";
import "./common/css/reset.css";
import "./common/font/iconfont.css";
import "./common/font/font.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import "@/mock/mock.js";
import {  setToastDefaultOptions } from "vant";
setToastDefaultOptions({ duration: 800 }); //修改轻提示默认配置
import "vant/es/toast/style"; //轻提示样式
import VueVideoPlayer from '@videojs-player/vue'
import 'video.js/dist/video-js.css'

import "element-plus/dist/index.css";

const pinia = createPinia();
const app = createApp(App);

app.use(router);
app.use(pinia);
app.use(VueVideoPlayer)

app.mount("#app");
