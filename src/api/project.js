
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
            url:"/project/editProject",
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
    changeState: (data) =>{
        return axios.request({
            url:'project/changeState',
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    changeFinishState: (data) =>{
        return axios.request({
            url:'project/changeFinishState',
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    /**
     * @项目设置
     *  */ 
    addTag: (data) => {
        return axios.request({
            url:"/project/addTag",
            method:"POSt",
            data
        }).then(resp => {
            return resp.data
        })
    }
    , 
    /**
     * @任务
     */
    getTodoDetail: (id) => {
        return axios.request({
            url:"project/getTodoDetail?id="+id,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    },
    addTodo: (data) => {
        return axios.request({
            url:"project/addTodo",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    editTodo: (data) => {
        return axios.request({
            url:"project/editTodo",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },deleteTodo: (id) =>{
        return axios.request({
            url:"project/deleteTodo?id="+id,
            method:"GET"
        }).then(resp => {
          return  resp.data
        })
    },
    /**
     * @任务清单
     * 
     */
    addList: (data) => {
        return axios.request({
            url:"project/addList",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })

    },
    getListList: (id) =>{
        return axios.request({
            url:"project/getListList?id="+id,
            method:"GET"
        }).then(resp => {
            return resp.data
        })

    },
    getListDetail: (id) =>{
       return axios.request({
           url:"project/getListDetail?id="+id,
           method:"GET"
       }).then(resp => {
           return resp.data
       })
    },
    editList: (data) =>{
        return axios.request({
            url:"project/editList",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    deleteList: (id) => {
        return axios.request({
            url:"project/deleteList?id="+id,
            method:"GET"
        }).then(resp => {
          return  resp.data
        })
    },
    removeOutList: (id) =>{
        return axios.request({
            url:"project/removeOutList?id="+id,
            method:"GET"
        }).then(resp => {
          return  resp.data
        })

    },
    archiveList: (id) => {  //归档
        return axios.request({
            url:"project/archiveList?id="+id,
            method:"GET"
        }).then(resp => {
          return  resp.data
        })
    },
    /**
     * @日程
     */
    getMonthScheduleList: (data) =>{
        return axios.request({
            url:"project/getMonthScheduleList",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })

    },
    getScheduleList: (data) => {
        return axios.request({
            url:"project/getScheduleList",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    getScheduleDetail: id =>{
        return axios.request({
            url:"project/getScheduleDetail?id="+id,
            method:"GET"
        }).then(resp => {
          return  resp.data
        })
    },
    addSchedule: (data) =>{
        return axios.request({
            url:"project/addSchedule",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    editSchedule: (data) =>{
        return axios.request({
            url:"project/editSchedule",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    deleteSchedule: (id) => {
        return axios.request({
            url:"project/deleteSchdeule?id="+id,
            method:"GET"
        }).then(resp => {
            return resp.data
        })
    }

}