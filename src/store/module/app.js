export default {
  state: {
    errorList: [],
    hasReadErrorPage: false
  },
  mutations: {
    addError(state, error) {
      state.errorList.push(error);
    },
    setHasReadErrorLoggerStatus(state, status = true) {
      state.hasReadErrorPage = status;
    }
  },
  getters: {
    errorCount: state => state.errorList.length
  },
  actions: {
      addErrorLog({ commit, rootState }, info) {
        if (!window.location.href.includes("error_logger_page"))
          commit("setHasReadErrorLoggerStatus", false);
        const {
          user: { token, userId, userName }
        } = rootState;
        let data = {
          ...info,
          time: Date.parse(new Date()),
          token,
          userId,
          userName
        };
        //   saveErrorLogger(info).then(() => {
        //     commit('addError', data)
        //   })
      }
    }
};
