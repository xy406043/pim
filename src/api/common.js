import axios from "@/libs/axios";

export default {
  /**
   * @通用分组
   * @groupType 1 通讯录 2网址收藏
   */
  addGroup: data => {
    return axios
      .request({
        url: "common/addGroup",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  getGroupList: data => {
    return axios
      .request({
        url: "common/getGroupList",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  getDynamic: data => {
    return axios
      .request({
        url: "",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getNotice: params => {
    return axios
      .request({
        url: "",
        params,
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getOverView: () => {
    return axios
      .request({
        url: "common/getOverView",
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getQiniuToken: (data) =>{
    return axios
      .request({
        url: "common/getQiniuToken",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  }
};
