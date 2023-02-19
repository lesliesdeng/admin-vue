export const contentTableConfig = {
  showIndexColumn: true,
  //   showSelectColumn: true,  //是否展示多选框
  //   命名规则一二级文件夹名称
  pageName: "courceSource",
  propList: [
    // { prop: "code", label: "枚举值", minWidth: "100" },
    { prop: "type", label: "课程来源", minWidth: "80", slotName: "soure" },
    { prop: "courseSourceName", label: "课程来源明细", minWidth: "80" },
    {
      prop: "status",
      label: "状态",
      minWidth: "80",
      slotName: "status",
      defaultValue: 1
    },
    // {
    //   prop: "createAt",
    //   label: "创建时间",
    //   minWidth: "220",
    //   slotName: "create"
    // },
    // {
    //   prop: "updateAt",
    //   label: "更新时间",
    //   minWidth: "220",
    //   slotName: "update"
    // },
    { label: "操作", minWidth: "120", slotName: "courceSourceHandler" }
  ],
  statusMap: { 1: "启用", 0: "禁用" },
  soureMap: { 0: "内部课程", 1: "外部课程" }
};
