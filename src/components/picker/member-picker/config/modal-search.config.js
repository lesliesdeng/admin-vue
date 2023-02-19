export const searchFormConfig = {
  pageName: "memberPicker",
  formItems: [
    {
      field: "fullName",
      type: "input",
      label: "姓名",
      placeHolder: "请输入姓名",
      maxlength: 50
    },
    {
      field: "name",
      type: "input",
      label: "账号",
      placeHolder: "请输入账号",
      maxlength: 50
    },
    {
      field: "organizationId",
      type: "input",
      isHidden: true
    }
  ],
  labelWidth: "100px",
  itemStyle: { padding: "0" },
  colLayout: { span: 8 }
};
