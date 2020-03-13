import axios from "@/libs/axios";

export default{
    getSecondCode: () =>{
        return axios
      .request({
        url: "security/getSecondCode",
        method: "get"
      })
      .then(resp => {
        return resp.data;
      });
    },
    addSecondCode: (data)  => {
        return axios
        .request({
          url: "security/addSecondCode",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    verifyCode: (data) =>{
        return axios
        .request({
          url: "security/verifyCode",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    /**
     * @密码本
     */
    getCodeList: (data) =>{
        return axios
        .request({
          url: "security/getCodeList",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    addCode: data =>{
        return axios
        .request({
          url: "security/addCode",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    editCode: data =>{
        return axios
        .request({
          url: "security/editCode",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    deleteCode: id =>{
        return axios
        .request({
          url: "security/deleteCode?id="+id,
          method: "get"
        })
        .then(resp => {
          return resp.data;
        });
    },
    /**
     * @文件夹
     */
    getFileList: (data) =>{
        return axios
        .request({
          url: "security/getFileList",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    },
    addFile: (data) =>{
        return axios
        .request({
          url: "security/addFile",
          method: "POst",
          data
        })
        .then(resp => {
          return resp.data;
        });
    }
}