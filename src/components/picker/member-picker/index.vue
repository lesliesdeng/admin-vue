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
        :label="option.fullName"
      ></el-option>
    </el-select>
    <page-modal
      ref="pageModalRef"
      :title="title"
      @selecConfirm="selecConfirm"
      :isLoadMembersOnInited="formOptions.isLoadMembersOnInited"
    ></page-modal>
  </div>
</template>
<script>
import PageModal from "./page-modal";

import usePageHandler from "@/mixins/use-page-handler";

export default {
  name: "memberPicker",
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
          isLoadMembersOnInited: true
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
      await this.$store.dispatch(`memberPicker/getPageTreeData`);
      //  清空之前查询数据，因为接口返回过慢，之前数据可能会显示挺长一段时间
      this.$store.dispatch(`memberPicker/initPageData`);
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
