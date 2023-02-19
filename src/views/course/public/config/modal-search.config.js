export const searchFormConfig = {
  pageName: "courcePublicModal",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "课程名称",
      placeHolder: "请输入课程名称",
      maxlength: 20
    },
    {
      field: "name1",
      type: "select",
      label: "归属部门",
      placeHolder: "请输入课程名称",
      maxlength: 20,
      options: [
        { label: "内部课程", value: 1 },
        { label: "外部课程", value: 0 }
      ]
    },
    {
      field: "name2",
      type: "select",
      label: "课程目录",
      placeHolder: "请输入课程名称",
      maxlength: 20,
      options: [
        { label: "内部课程", value: 1 },
        { label: "外部课程", value: 0 }
      ]
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
  colLayout: { span: 6 }
};
