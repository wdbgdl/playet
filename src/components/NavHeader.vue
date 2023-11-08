<!--
 * @Author: wzq
 * @Date: 2023-10-30 17:24:20
 * @LastEditors: W205349 wu205349@163.com
 * @LastEditTime: 2023-10-30 17:33:40
 * @FilePath: \playlet\src\components\NavHeader.vue
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
-->
<template>
  <div
    class="nav_page_head"
    style="background-color: rgb(255, 255, 255); color: rgb(0, 0, 0)"
  >
    <div class="nav_page_head_hd">
      <div class="nav_page_head_btn" style="display: none">
        <i class="uni_btn_icon" style="color: rgb(0, 0, 0); font-size: 27px"
          ></i
        >
      </div>
      <div class="nav_page_head_ft"></div>
    </div>
    <div class="nav_page_head_bd">
      <div class="nav_page_head_title" style="font-size: 16px; opacity: 1">
        {{ title }}
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  props: ["cover", "title"],
};
</script>
  
  <style lang="scss" scoped>
.nav_page_head {
  position: fixed;
  left: 0;
  height: 44px;
  padding: 0.43rem 0.187rem;
  display: flex;
  overflow: hidden;
  justify-content: space-between;
  box-sizing: border-box;
  z-index: 998;
  color: #fff;
  background-color: #000;
  transition-property: all;
  font-size: 16px;
  opacity: 1;
}
</style>