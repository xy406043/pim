import axios from "@/libs/axios";

export default {
  login: (data) => {
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
  getUserInfo: (token) => {
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
  sendCode: (data) =>{
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
    sendReCode: (data) =>{
    return axios
      .request({
        url: "user/sendReCode",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  register: (data) =>{
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
  getDetailInfo: (id) => {
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
  editUserInfo: (data) => {
    return axios
      .request({
        url: "user/editUserInfo",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  /**
   * @验证用户登录密码
   */
  verifyPass:(data) =>{
    return axios
      .request({
        url: "user/verifyPass",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  editEmail:(data) =>{
    return axios
      .request({
        url: "user/updateEmail",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  editPass:(data) =>{
    return axios
      .request({
        url: "user/updatePass",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  },
  verifyCode:(data) =>{
    return axios
      .request({
        url: "user/verifyCode",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      }); 
  },
  resetPass: (data) => {
    return axios
      .request({
        url: "user/resetPass",
        data,
        method: "POST"
      })
      .then(resp => {
        return resp.data;
      });
  }
};
