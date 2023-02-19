export const contentTableConfig = {
  showIndexColumn: true,
  //   showSelectColumn: true,  //是否展示多选框
  //   命名规则一二级文件夹名称
  pageName: "courcePublic",
  propList: [
    { prop: "name", label: "课程名称" },
    { prop: "oldPrice", label: "课程编码" },
    { label: "操作", minWidth: "120", slotName: "courcePublicHandler" }
  ]
};
