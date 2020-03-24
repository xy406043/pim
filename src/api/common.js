import axios from "@/libs/axios";

export default {
  /**
   * @通用分组
   * @groupType 1 通讯录 2网址收藏
   */
  addGroup: (data) => {
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
  editGroup: (data) =>{
    return axios
    .request({
      url: "common/editGroup",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  },
  deleteGroup: (id) =>{
    return axios
    .request({
      url: "common/deleteGroup?id="+id,
      method: "get"
    })
    .then(resp => {
      return resp.data;
    });
  },
  getGroupList: (data) => {
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
  getDynamic: (data) => {
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
  getNotice: (params) => {
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
  },
  getSearchContent: (data)=>{
    return axios
    .request({
      url: "common/getSearchContent",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  },
  getLimitNotice :() =>{
    return axios
      .request({
        url: "common/getLimitNotice",
        method: "get",
      })
      .then(resp => {
        return resp.data;
      });
  },
  getNoticeList: (data) =>{
    return axios
    .request({
      url: "common/getNoticeList",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  },
  setNotice:(data)=>{
    return axios.request({
      url:"common/setRead",
      method:"POST",
      data
    }).then(resp => {
      return resp.data
    })
  }
};
