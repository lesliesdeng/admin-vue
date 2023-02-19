import { post, get } from "../http";
import API from "../api";

const { query, deleteItem, create, edit } = API.courceSource;

let resquest = "/api";

export function getData(params) {
  return get(`${resquest}${query}`, params);
}

export function deleteData(params) {
  return post(`${resquest}${deleteItem}`, params, "form");
}

export function editData(params) {
  return post(`${resquest}${edit}`, params, "form");
}

export function creatData(params) {
  return post(`${resquest}${create}`, params, "form");
}
