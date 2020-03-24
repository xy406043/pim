
import axios from "@/libs/axios"

export default { 
    /**
     * @common
     */
    getProjectOverView: (id) =>{
        return axios.request({
            url:"/project/getProjectOverView?id="+id,
            method:"get",
        }).then(resp => {
            return resp.data
        })
    },
    //网页右上方搜索，其它功能块内置了搜索，因此此处仅搜索任务集相关内容
    searchProject: (data) =>{
        return axios.request({
            url:"/project/searchProject",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    /**
     * @设置
     */
    getProjectInfo: (id) =>{
        return axios.request({
            url:"/project/getProjectInfo?id="+id,
            method:"get",
        }).then(resp => {
            return resp.data
        })
    } ,
    editProjectInfo:(data) =>{
        return axios.request({
            url:"/project/editProjectInfo",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    editLabel:(data)=>{
        return axios.request({
            url:"/project/editLabel",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    deleteLabel:(data)=>{
        return axios.request({
            url:"/project/deleteLabel",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    /**
     * @任务集
     */
    addProject: (data) => {
        return axios.request({
            url:"/project/addProject",
            method:"POST",
            data
        }).then(resp => {
            return resp.data
        })
    },
    getProjectList: (data)  => {
        return axios.request({
            url:"/project/getProjectList",
            method:"POST",
            data
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
    getTodoList: (data)=>{
        return axios.request({
            url:"/project/getTodoList",
            method:"POSt",
            data
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
    getScheduleDetail: (id) =>{
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
    },
    /**
     * @文件
     * @与保险下的文件接口虽然属于同一数据库但是接口路由不同因此可以使用相同的方法
     */
    addFile:(data) =>{
        return axios.request({
            url:"project/addFile",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    getFileList: (data) =>{
        return axios.request({
            url:"project/getFileList",
            data,
            method:"POST"
        }).then(resp => {
            return resp.data
        })
    },
    deleteFile:(id) =>{
        return axios.request({
            url:"project/deleteFile?id="+id,
            method:"get"
        }).then(resp => {
            return resp.data
        })
    }

}