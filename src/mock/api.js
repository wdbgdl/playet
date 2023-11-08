import http from "./http.js";
export default {
  getTvList() {
    return http({
      url: `/tv`,
      method: "get",
    });
  },
  getLikeTvList() {
    return http({
      url: `/likeTv`,
      method: "get",
    });
  },
  getRecordList() {
    return http({
      url: `/recordList`,
      method: "get",
    });
  },
};
