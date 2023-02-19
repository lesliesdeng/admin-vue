export const searchFormConfig = {
  pageName: "organizationPicker",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "部门姓名",
      placeHolder: "请输入部门姓名",
      maxlength: 50
    },
    {
      field: "code",
      type: "input",
      label: "部门编码",
      placeHolder: "请输入部门编码",
      maxlength: 50
    }
  ],
  itemStyle: { padding: "0" },
  colLayout: { span: 12 },
  formLayout: { span: -1 },
  isLoadOnCreated: false
};
