import Vue from "vue";
import Vuex from "vuex";

import courceSource from "./cource/source";
import activitySetting from "./activity/setting";
import activityVirtual from "./activity/virtual";
import memberPicker from "./memberPicker/main";
import organizationPicker from "./organizationPicker/main";
import activityMeeting from "./activity/meeting";
import organization from "./organization/index";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    courceSource,
    activitySetting,
    activityVirtual,
    memberPicker,
    organizationPicker,
    activityMeeting,
    organization
  }
});
