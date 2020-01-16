import axios from "@/libs/axios"

export default {
  login: (data) => {
    return axios
      .request({
        url: "pim/user/login",
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
        url: "pim/user/getUserInfo",
        params: {
          token
        },
        method: "GET"
      })
      .then(resp => {
        return resp.data;
      });
  }
};
