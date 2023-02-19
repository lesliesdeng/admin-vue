export const modalConfig = {
  title: "课程来源明细",
  type: "el-drawer", //el-drawer：抽屉  el-dialog：弹窗
  modalStyle: {
    direction: "rtl", //抽屉方向
    size: "50%"
  },
  // pageName必须跟store中命名一致
  pageName: "courceSource",
  formItems: [
    {
      field: "courseSourceName",
      type: "input",
      label: "课程来源明细",
      placeHolder: "请输入课程来源明细",
      rules: [
        { required: true, message: "请输入课程来源明细", trigger: "blur" }
      ],
      maxlength: 20
    },
    {
      field: "type",
      type: "select",
      label: "课程来源",
      placeHolder: "请选择课程来源",
      //   注意：select框使用校验change，使用blur的时候会导致选择后，第一次的错误提示不消失
      rules: [{ required: true, message: "请选择课程来源", trigger: "change" }],
      options: [
        { label: "内部课程", value: 0 },
        { label: "外部课程", value: 1 }
      ]
    },
    {
      field: "status",
      type: "select",
      label: "状态",
      defaultValue: 1,
      placeHolder: "请选择状态",
      isHidden: true,
      rules: [{ required: true, message: "请选状态", trigger: "blur" }],
      options: [
        { label: "启用", value: 1 },
        { label: "禁用", value: 0 }
      ]
    }
  ],
  labelWidth: "120px",
  colLayout: { span: 24 },
  itemStyle: { padding: 0 }
};
