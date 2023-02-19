export const searchFormConfig = {
  pageName: "courceSource",
  formItems: [
    {
      field: "courseSourceName",
      type: "input",
      label: "课程来源明细",
      placeHolder: "请输入课程来源明细",
      maxlength: 20
    },
    {
      field: "type",
      type: "select",
      label: "课程来源",
      placeHolder: "请选择课程来源",
      options: [
        { label: "内部课程", value: 0 },
        { label: "外部课程", value: 1 }
      ]
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeHolder: "请选择状态",
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    }
  ],
  labelWidth: "100px",
  itemStyle: { padding: "0" },
  colLayout: { span: 8 }
};
