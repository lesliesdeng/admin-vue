export const modalConfig = {
  title: "课程来源明细",
  type: "el-drawer", //el-drawer：抽屉  el-dialog：弹窗
  modalStyle: {
    direction: "rtl", //抽屉方向
    size: "50%"
  },
  pageName: "courcePublic",
  formItems: [
    {
      field: "name",
      type: "input",
      label: "课程来源明细",
      placeHolder: "请输入课程来源明细",
      rules: [
        { required: true, message: "请输入课程来源明细", trigger: "blur" }
      ],
      maxlength: 20
    },
    {
      field: "soure",
      type: "select",
      label: "课程来源",
      placeHolder: "请选择课程来源",
      //   注意：select框使用校验change
      rules: [{ required: true, message: "请选择课程来源", trigger: "change" }],
      options: [
        { label: "内部课程", value: 1 },
        { label: "外部课程", value: 0 }
      ]
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      placeHolder: "请选择状态",
      rules: [{ required: true, message: "请选状态", trigger: "blur" }],
      options: [
        { label: "开启", value: 1 },
        { label: "废弃", value: 0 }
      ]
    }
  ],
  labelWidth: "120px",
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
};
