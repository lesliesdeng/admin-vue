import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import registerApp from "./global";

import "./assets/style/index.less";

Vue.config.productionTip = false;
Vue.prototype.$eventBus = new Vue();

registerApp(Vue);

const createIns = () => {
  const instance = new Vue({
    // 初始化application
    router,
    store,
    render: h => h(App)
  });
  instance.$on("vueBeginCreate", callBack => {
    instance.$off("vueBeginCreate");
    instance.$destroy();
    window.zxyVue = createIns();
    callBack();
    callBack = null;
  });
  return instance;
};
// 调试使用，可单独启vue工程
createIns().$mount("#app");
