/*
 * @Author: wzq
 * @Date: 2023-10-30 17:52:00
 * @LastEditors: W205349 wu205349@163.com
 * @LastEditTime: 2023-10-30 17:52:09
 * @FilePath: \playlet\src\mock\http.js
 * @Description: 
 * 
 * Copyright (c) 2023 by ${git_name_email}, All Rights Reserved. 
 */
import axios from "axios";
import { showLoadingToast, closeToast, showFailToast } from 'vant';
 
let http = axios.create({
  baseURL: "",
  timeout: 10000,
});
 
 
// 拦截器的添加
http.interceptors.request.use(
  (config) => {
    showLoadingToast({
      message: 'loading...',
      duration:0,
      forbidClick: true,
    })
    return config;
  },
  (err) => {
    closeToast()
    showFailToast('Network anomaly');
    return Promise.reject(err);
  }
);
 
//响应拦截器
http.interceptors.response.use(
  (res) => {
    closeToast()
    return res.data;
  },
  (err) => {
    closeToast()
    showFailToast('Network anomaly');
    return Promise.reject(err);
  }
);
export default http;