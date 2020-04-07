import axios from "@/libs/axios";

export default {

  /**
   * @日记
   */
  getNoteList: (data) => {
    return axios
      .request({
        url: "knowledge/getNoteList",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  addNote: (data)  => {
    return axios
      .request({
        url: "knowledge/addNote",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  getNoteDetail: (id) => {
    return axios
      .request({
        url: "knowledge/getNoteDetail?id=" + id,
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  editNote: (data)  => {
    return axios
      .request({
        url: "knowledge/editNote",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  deleteNote: (id) => {
    return axios
      .request({
        url: "knowledge/deleteNote?id=" + id,
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getLimitNote: (data) =>{
    return axios
      .request({
        url: "knowledge/getLimitNote",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });

  },
  /**
   * @通讯录
   */
  addAddress: (data)  => {
    return axios
      .request({
        url: "knowledge/addAddress",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  getAddressList: (data)  => {
    return axios
      .request({
        url: "knowledge/getAddressList",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  getAddressDetail: (id) => {
    return axios
      .request({
        url: "knowledge/getAddressDetail?id=" + id,
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  editAddress: (data)  => {
    return axios
      .request({
        url: "knowledge/editAddress",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });
  },
  deleteAddress: (id) => {
    return axios
      .request({
        url: "knowledge/deleteAddress?id=" + id,
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getLimitAddress: (data) =>{
    return axios
      .request({
        url: "knowledge/getLimitAddress",
        method: "POST",
        data
      })
      .then(resp => {
        return resp.data;
      });

  },

  /**
   * @网址收藏
   */
  addBookMark: (data)  =>{
    return axios
    .request({
      url: "knowledge/addBookMark",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  },
  getBookMarkList: (data)  =>{
    return axios
    .request({
      url: "knowledge/getBookMarkList",
      data,
      method:"POST"
    })
    .then(resp => {
      return resp.data;
    });
  },
  deleteBookMarking: (id) =>{
    return axios
    .request({
      url: "knowledge/deleteBookMarking?id="+id,
      method:"get"
    })
    .then(resp => {
      return resp.data;
    });

  },
  editBookMarking: (data) =>{
    return axios
    .request({
      url: "knowledge/editBookMarking",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  },
  getLimitBookMark: (data) =>{
    return axios
    .request({
      url: "knowledge/getLimitBookMark",
      method: "POST",
      data
    })
    .then(resp => {
      return resp.data;
    });
  }
  /**
   * @账单
   */
  /**
   * @便签
   */
};
