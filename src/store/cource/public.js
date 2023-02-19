import {
  getData,
  deleteData,
  editData,
  creatData
} from "@/service/course/public";

const courseSourseModule = {
  namespaced: true,
  state() {
    return {
      // 测试代码
      listData: [],
      totalCount: 1000
    };
  },
  mutations: {
    changeCourseSourceDatas(state, list) {
      state.listData = list;
    }
  },
  getters: {
    //  处理数据
  },
  actions: {
    async getPageListDataAction({ commit }, payload) {
      const resultTopPanelDatas = await getData(payload);
      commit("changeCourseSourceDatas", resultTopPanelDatas);
    },
    async deletePageDataAction(obj, payload) {
      const deleteId = payload.id;
      if (!deleteId) return;
      await deleteData({ deleteId });
    },
    async newPageDataAction(obj, payload) {
      const pageData = payload.queryInfo;
      await creatData(pageData);
    },

    async editPageDataAction(obj, payload) {
      if (!payload.id) return;
      const pageData = payload.queryInfo;
      await editData(pageData);
    }
  }
};

export default courseSourseModule;
