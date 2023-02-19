import axios from "axios";
import QS from "qs";
import { Message } from "element-ui";
import Service from "@/global/common";
import { errorCodes } from "./errorCodes";

const encodeURIComponentFun = config => {
  /* 在axios中就会对get请求的整个url进行encodeURI，
    导致有些get方法不能传[]，所以在请求拦截器中可以对get方法单独处理，
    避开axios的encodeURI */
  const cfg = config;
  let url = cfg.url;
  const keys = Object.keys(cfg.params);
  url += "?";
  for (const key of keys) {
    if (cfg.params[key] || cfg.params[key] === 0) {
      url += `${key}=${encodeURIComponent(cfg.params[key])}&`;
    }
  }
  url = url.substring(0, url.length - 1);
  cfg.params = {};
  cfg.url = url;
  return cfg;
};

const { access_token, token_type } = JSON.parse(localStorage.getItem("token"))
  ? JSON.parse(localStorage.getItem("token"))
  : {};

// 请求超时时间
// 存在某些慢得超出想象的接口。。。。不设置。。。。
// axios.defaults.timeout = 30000;

// post请求头
axios.defaults.headers.post["Content-Type"] = "application/json;charset=UTF-8";
axios.defaults.headers.common.Authorization = `${token_type}__${access_token}`;

// 请求拦截器
axios.interceptors.request.use(
  config => {
    const cfg = config;
    if (cfg.method === "get") {
      if (cfg.params) {
        if (cfg.params.uri) {
          cfg.headers.get.uri = cfg.params.uri;
          delete cfg.params.uri;
        }
        const newConfig = encodeURIComponentFun(cfg);
        cfg.params = Object.assign(newConfig.params, {
          _: new Date().getTime()
        }); // 防止缓存
        // cfg.params = Object.assign(cfg.params, { '_=': new Date().getTime() }); // 防止缓存
      } else {
        cfg.params = { "_=": new Date().getTime() };
      }
    }
    return cfg;
  },
  error => {
    return Promise.reject(error);
  }
);
// 响应拦截器
axios.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是200的情况
  ({ response }) => {
    if (response.status) {
      const errorCode = response.data.errorCode;
      if (errorCodes[errorCode]) {
        Message.error(errorCodes[errorCode]);
        return Promise.reject({});
      }
      switch (response.status) {
        //其他情况待补充
        // 其他错误，直接抛出错误提示
        default:
          Message.error(response.data.message);
      }
      return Promise.reject(response);
    }
  }
);

// get、delete请求
function getRequest(method = "get", url, params = {}, responseAll) {
  return new Promise((resolve, reject) => {
    const loading =
      params.loading === false
        ? null
        : Service.loading(params.loading ? params.loading : undefined);
    axios[method || "get"](url, {
      params: params
    })
      .then(res => {
        //  标志位，该接口需要返回全部
        if (responseAll) {
          resolve(res.data);
          return;
        }
        const code = res.data.code;
        if (code === undefined || code == 0) {
          resolve(res.data);
        } else {
          Message.error(res.data.message);
          reject(res.data);
        }
      })
      .catch(err => {
        Message.error(err.data.message);
        reject(err.data);
      })
      .finally(() => {
        loading && loading.close();
      });
  });
}
// post、put请求
export function postRequest(
  method = "post",
  url,
  params = {},
  cotentType,
  returnAll
) {
  return new Promise((resolve, reject) => {
    let data = params;
    if (cotentType == "form") {
      data = QS.stringify(params, { arrayFormat: "indices", allowDots: true });
    }
    const loading =
      params.loading === false
        ? null
        : Service.loading(params.loading ? params.loading : undefined);
    axios[method || "post"](url, data, {
      headers: {
        "Content-Type":
          cotentType == "form"
            ? "application/x-www-form-urlencoded;charset=UTF-8"
            : "application/json;charset=UTF-8"
      }
    })
      .then(res => {
        if (returnAll) {
          resolve(res.data);
        }
        const { code, msg } = res.data;
        if (code === undefined || code == 0 || msg == "success") {
          resolve(res.data);
        } else if (res.data instanceof Array) {
          resolve(res.data);
        } else {
          Message.error(res.data.message);
          reject(res.data);
        }
      })
      .catch(err => {
        reject(err.data);
        Message.error(err.data.message);
      })
      .finally(() => {
        loading && loading.close();
      });
  });
}
/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params, responseAll) {
  return getRequest("get", url, params, responseAll);
}
/**
 * del方法，对应delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function del(url, params, responseAll) {
  return getRequest("delete", url, params, responseAll);
}
/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params, cotentType, returnAll) {
  return postRequest("post", url, params, cotentType, returnAll);
}
/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params = {}, cotentType, returnAll) {
  return postRequest("put", url, params, cotentType, returnAll);
}
