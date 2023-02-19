import {
  getData,
  deleteData,
  editData,
  creatData
} from "@/service/course/source";
// import { Stats } from "fs";

const courseSourseModule = {
  namespaced: true,
  state() {
    return {
      listData: [],
      totalCount: 0
    };
  },
  mutations: {
    changeCourseSourceDatas(state, list) {
      state.listData = list.items;
      state.totalCount = list.recordCount;
    }
  },
  getters: {
    //  处理数据
  },
  actions: {
    async getPageListDataAction({ commit }, payload) {
      const resultTopPanelDatas = await getData(payload);
      commit("changeCourseSourceDatas", resultTopPanelDatas.content);
    },
    async deletePageDataAction(obj, payload) {
      const { id } = payload;
      if (!id) return;
      await deleteData({ id });
    },
    async newPageDataAction(obj, payload) {
      const pageData = payload.queryInfo;
      await creatData(pageData);
    },

    async editPageDataAction(obj, payload) {
      if (!payload.id) return;
      const pageData = payload.queryInfo;
      pageData.id = payload.id;
      await editData(pageData);
    }
  }
};

export default courseSourseModule;
