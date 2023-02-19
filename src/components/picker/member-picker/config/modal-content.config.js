export const contentTableConfig = {
  //   showIndexColumn: true,
  showRadioColumn: true, //是否展示单选框
  pageName: "memberPicker",
  tableHeight: "15.63vw", //是否限制表格高度，固定表头，一般弹框表格使用，注意：写成vw
  propList: [
    { prop: "fullName", label: "姓名" },
    { prop: "name", label: "账号", width: 200 },
    { prop: "sex", label: "性别", slotName: "status" },
    { prop: "majoyPosition.name", label: "岗位" },
    { prop: "job.name", label: "职务" },
    { prop: "organization.name", label: "归属部门", width: 200 },
    { prop: "organization.companyName", label: "归属机构" }
  ],
  statusMap: { 0: "男", 1: "女" }
};
