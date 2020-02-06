import userApi from "@/api/user";
import { setToken, getToken ,localSave} from "@/libs/utils";
import {changeTheme} from "@/libs/theme"
export default {
  state: {
    userName: "",
    nickName:"",
    userId: 0,
    avatar: "",
    email: "",
    phone: "",
    token: getToken(),
    access: "",
    hasGetInfo: false
  },
  mutations: {
    setAvatar: (state, avatar) => {
      state.avatar = avatar;
    },
    setNickName:(state,name) => {
     state.nickName = name;
    },
    setUserName: (state, userName) => {
      state.userName = userName;
    },
    setUserId: (state, id) => {
      state.userId = id;
    },
    setAccess: (state, access) => {
      state.access = access;
    },
    setToken(state, token) {
      state.token = token;
      setToken(token);
    },
    setTel(state, tel) {
      state.tel = tel;
    },
    setPhone(state, email) {
      state.email = email;
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status;
    }
  },
  getters: {},
  actions: {
    //登录
    handleLogin({ commit }, { userName, password }){
      return new Promise((resolve, reject) => {
        userApi.login({
          userName,
          password
        })
          .then(res => {
             console.log("login",res)
            if(res ===undefined) return
           
            let result = res.result;
            if (res.code === 0) {
              commit("setToken", result.token);
              commit("setAccess", result.access);
              commit("setUserId", result.userId);
            }
            resolve(res);
          })
          .catch(err => {
            reject(err);
          });
      });
    },
    handleLogOut({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit("setToken", "");
        commit("setAccess", "");
        resolve();
      });
    },
    getUserInfo({ state, commit }) {
      let _this =this
      return new Promise((resolve, reject) => {
        try {
          userApi.getUserInfo(state.token)
            .then(res => {
              let result = res.result;
              if (res.code === 0) {
                commit("setNickName", result.nickName);
                commit("setAvatar", result.avatar);
                commit("setHasGetInfo", true);
                localSave("colorTheme",result.colorTheme)
                localSave("backgroundUrl",result.backgroundUrl)
                localSave("email",result.email)
                changeTheme(result.colorTheme)
                
              }else{
              this.$Message.error(res.errorMsg)
              }
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        } catch (error) {
          reject(err);
        }
      });
    }
  }
};
