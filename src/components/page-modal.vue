<template>
  <div class="page-modal">
    <component
      :is="modalConfig.type"
      :title="(isEdit ? '修改' : '新增') + modalConfig.title"
      :visible.sync="dialogVisible"
      width="50%"
      center
      append-to-body
      :close-on-click-modal="false"
      v-bind="modalConfig.modalStyle"
      destroy-on-close
    >
      <u-form
        v-if="dialogVisible"
        ref="form"
        v-bind="modalConfig"
        :modelValue.sync="formData"
        formRef="modalForm"
      ></u-form>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleConfirmClick"
            >确 定</el-button
          >
        </span>
      </template>
      <span class="drawer-footer" v-if="modalConfig.type == 'el-drawer'">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleConfirmClick">确 定</el-button>
      </span>
    </component>
    <!-- </el-dialog> -->
  </div>
</template>

<script>
import UForm from "@/base-ui/form";

export default {
  name: "pageModal",
  components: {
    UForm
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    otherInfo: {
      type: Object,
      default: () => ({})
    }
  },
  watch: {
    defaultInfo: {
      handler(newValue) {
        for (const item of this.modalConfig.formItems) {
          this.formData[`${item.field}`] =
            newValue[`${item.field}`] !== undefined &&
            newValue[`${item.field}`] !== ""
              ? newValue[`${item.field}`]
              : item.defaultValue;
        }
        this.isEdit = Object.keys(this.defaultInfo).length !== 0;
      },
      deep: true
    }
  },
  data() {
    return {
      formData: {},
      isEdit: false,
      dialogVisible: false
    };
  },
  methods: {
    handleConfirmClick() {
      //表单校验
      let checkForm = false;
      this.$refs.form.$refs["modalForm"].validate(valid => {
        if (valid) {
          checkForm = true;
        } else {
          checkForm = false;
        }
      });
      if (!checkForm) {
        return;
      }
      this.dialogVisible = false;
      if (this.isEdit) {
        // 编辑
        this.$store
          .dispatch(`${this.modalConfig.pageName}/editPageDataAction`, {
            queryInfo: { ...this.formData, ...this.otherInfo },
            id: this.defaultInfo.id
          })
          .then(() => {
            this.$eventBus.$emit(this.modalConfig.pageName);
          });
      } else {
        // 新建
        this.$store
          .dispatch(`${this.modalConfig.pageName}/newPageDataAction`, {
            queryInfo: { ...this.formData, ...this.otherInfo }
          })
          .then(() => {
            this.$eventBus.$emit(this.modalConfig.pageName);
          });
      }
    }
  }
};
</script>

<style scoped>
.drawer-footer {
  position: absolute;
  bottom: 20px;
  right: 40px;
}
</style>
