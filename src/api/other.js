import axios from "@/libs/axios"

export default {
     getDynamic: (data) =>{
        return axios.request({
            url:"",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
     },
      getNotice:(params) => {
        return axios.request({
            url:"",
            params,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
      }
}