import API from "@/service/api";
import QS from "qs";
export default {
  data() {},
  methods: {
    handleNewData() {
      this.modalInfo = {};
      this.$refs.pageModalRef.dialogVisible = true;
    },
    handleEditClick(rowItem) {
      this.modalInfo = { ...rowItem };
      this.$refs.pageModalRef.dialogVisible = true;
    },
    // 删除操作 el-button不接收async函数
    handleDeleteClick(rowItem) {
      this.$store
        .dispatch(`${this.contentTableConfig.pageName}/deletePageDataAction`, {
          id: rowItem.id
        })
        .then(() => {
          this.$eventBus.$emit(this.contentTableConfig.pageName);
        });
    },
    // 其他操作，操作后刷新,prams:参数  action：需要操作接口
    handleAfterUpdataClick(prams, action) {
      this.$store
        .dispatch(`${this.contentTableConfig.pageName}/${action}`, prams)
        .then(() => {
          this.$eventBus.$emit(this.contentTableConfig.pageName);
        });
    },
    // 获取表格中选中的checkbox
    getCheckBox() {
      return this.$refs.pageContentRef.checkItems;
    },
    exportExcel() {
      const { access_token } = JSON.parse(localStorage.getItem("token"));
      const a = document.createElement("a");
      const data = QS.stringify(
        {
          ...this.$refs.pageSearchRef.formData,
          pageNum: 1,
          pageSize: 1000,
          access_token
        },
        {
          arrayFormat: "indices",
          allowDots: true
        }
      );
      a.href = API[this.contentTableConfig.pageName].export + "?" + data;
      a.style = "display:none";
      a.click();
    }
  },
  computed: {}
};
