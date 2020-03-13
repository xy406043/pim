import axios from "@/libs/axios";

export default {
  login: data => {
    return axios
      .request({
        url: "user/login",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getUserInfo: token => {
    return axios
      .request({
        url: "user/getUserInfo",
        params: {
          token
        },
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  sendCode: data =>{
    return axios
      .request({
        url: "user/sendCode",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });

  },
  register: data =>{
    return axios
      .request({
        url: "user/register",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  getDetailInfo: id => {
    return axios
      .request({
        url: "",
        params: {
          id
        },
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  },
  editUserInfo: data => {
    return axios
      .request({
        url: "user/editUserInfo",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  }
};
