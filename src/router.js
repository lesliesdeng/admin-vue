import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
// 因为跟外层框架也是单页面应用，需要共用路由，在此处理，避免路由重复点击报错
const originalPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};

// 2.获取路由信息
// 动态加载pages中所有的路由文件
const files = require.context('@/views', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/views' + key.replace('.', ''));
  return page.default;
})

// 3.创建路由对象
const router = new VueRouter({
  routes
})

export default router