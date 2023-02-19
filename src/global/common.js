import { Loading } from "element-ui";

const loading = function(text = "努力加载中") {
  return Loading.service({
    lock: true,
    text,
    spinner: "u-loading",
    background: "rgba(0, 0, 0, 0.5)"
  });
};

// const recursiveToTree = function(data) {
//   function loop(key) {
//     const arr = [];
//     data.forEach(item => {
//       if (item.parentId === key) {
//         item.children = loop(item.id);
//         arr.push(item);
//       }
//     });
//     return res;
//   }
//   return loop(1);
// };

const listToTree = function(data) {
  const obj = {};
  const parentList = [];
  // * 先生成parent建立父子关系
  data.forEach(item => {
    const parent = obj[item.parentId];
    obj[item.id] = item;
    // * 当前项有父节点
    if (parent) {
      parent.children = parent.children || [];
      parent.children.push(item);
    }
  });
  //   第二次循环里面处理isLeaf，标志是否叶节点
  data.forEach(item => {
    const parent = obj[item.parentId];
    item.isLeaf = !item.isParent && !item.children;
    if (!parent) {
      parentList.push(item);
    }
  });
  return parentList;
};

export default {
  loading,
  //   recursiveToTree,
  listToTree
};
