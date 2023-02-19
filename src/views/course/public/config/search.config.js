export const searchFormConfig = {
  pageName: "courcePublic",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "课程名称",
      placeHolder: "请输入课程名称",
      maxlength: 20
    },
    {
      field: "code",
      type: "input",
      label: "课程编码",
      placeHolder: "请输入课程编码",
      maxlength: 20
    }
  ],
  labelWidth: "100px",
  itemStyle: { padding: "0" },
  colLayout: { span: 8 }
};
