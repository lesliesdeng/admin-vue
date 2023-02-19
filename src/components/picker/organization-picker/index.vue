<template>
  <div class="organization-picker">
    <el-select
      clearable
      v-model="inputValue"
      :placeholder="placeholder"
      readonly
      style="width: 100%"
      @focus="showModal"
      @clear="clearForm"
    >
      <el-option
        v-for="option in options"
        :key="option.id"
        :value="option.id"
        :label="option.name"
      ></el-option>
    </el-select>
    <page-modal
      ref="pageModalRef"
      :title="title"
      @selecConfirm="selecConfirm"
      :isLoadMembersOnInited="formOptions.isLoadMembersOnInited"
      :orgType="formOptions.orgType"
    ></page-modal>
  </div>
</template>
<script>
import PageModal from "./page-modal";

import usePageHandler from "@/mixins/use-page-handler";

export default {
  name: "organizationPicker",
  components: { PageModal },
  mixins: [usePageHandler],
  watch: {
    formValue(val) {
      this.inputValue = val;
    }
  },
  props: {
    title: {
      type: String,
      required: false
    },
    placeholder: {
      type: String,
      required: false
    },
    formValue: {
      type: String,
      required: true,
      default: undefined
    },
    formOptions: {
      type: Object,
      required: false,
      default() {
        return {
          // 是否在组织树加载完成后加载人员列表
          isLoadMembersOnInited: true,
          orgType: 2 // 组织类型：1 --> 行政组织；2 --> 学院组织
        };
      }
    }
  },
  data() {
    return {
      options: [],
      inputValue: this.formValue
    };
  },
  created() {},
  methods: {
    async showModal() {
      if (this.$refs.pageModalRef.dialogVisible) return;
      await this.$store.dispatch(`organizationPicker/getPageTreeData`, {
        orgType: this.formOptions.orgType
      });
      this.$refs.pageModalRef.dialogVisible = true;
    },
    selecConfirm(item) {
      this.options = [item];
      this.inputValue = item.id;
      this.$emit("update:formValue", item.id);
    },
    clearForm() {
      this.options = [];
      this.$emit("update:formValue", "");
    }
  }
};
</script>

<style scoped lang="less">
.btn-box {
  text-align: left;
  margin: 20px 0;
}
</style>
