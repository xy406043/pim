
import axios from "@/libs/axios"

export default { 
    addProject: (data) => {
        return axios.request({
            url:"/project/addProject",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    getProjectList: ()  => {
        return axios.request({
            url:"/project/getProjectList",
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    },
    /**
     * @项目详情 
     * 描述，任务列表，
     * 任务可以分为 普通任务以及清单，每个任务可以添加子任务
     */
    getProjectDetail: (id) => {
        return axios.request({
            url:"/project/getProjectDetail?id="+id,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    },
    editProject:(data) => {
        return axios.request({
            url:"",
            data,
            method:"POSt"
        }).then(resp => {
            return resp.data
        })
    },
    deleteProject: (id) => {
        return axios.request({
            url:"/project/deleteProject?id="+id,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    },
    goProjectSort: (data)  => {
        return axios.request({
            url:"",
            data,
            method:"post"
        }).then(resp => {
            return resp.data
        })
    },   
    getTodo: (params) => {
        return axios.request({
            url:"",
            params,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    },
    addTodo: (data) => {
        return axios.request({
            url:"",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    editTodo: (data) => {
        return axios.request({
            url:"",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    }
}