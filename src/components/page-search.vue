<template>
  <div class="page-search">
    <u-form
      ref="form"
      v-bind="searchConfig"
      :modelValue.sync="formData"
      :formRef="formRef"
      type="search"
    >
      <template #footer>
        <div class="btns">
          <el-button
            type="primary"
            size="small"
            icon="el-icon-search"
            @click="handleQueryClick"
            >查询</el-button
          >
          <el-button
            size="small"
            icon="el-icon-refresh"
            @click="handleResetClick"
            >重置</el-button
          >
        </div>
      </template>
      <!-- 自定义插槽 -->
      <template v-for="item in searchConfig.formItems" #[item.slotName]="scope">
        <template v-if="item.slotName">
          <slot :name="item.slotName"></slot>
        </template>
      </template>
    </u-form>
  </div>
</template>

<script>
import UForm from "@/base-ui/form";

export default {
  name: "pageSearch",
  components: { UForm },
  props: {
    searchConfig: null,
    title: {
      type: String,
      default: "高级检索"
    },
    otherParams: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      formRef: "searchForm",
      // 空表单，重置时使用
      originFormData: {},
      formItem: {}
    };
  },
  computed: {
    pageName() {
      return this.searchConfig.pageName;
    }
  },
  created() {
    const formItems = this.searchConfig.formItems
      ? this.searchConfig.formItems
      : [];
    for (const formItem of formItems) {
      this.originFormData[`${formItem.field}`] = formItem.defaultValue
        ? formItem.defaultValue
        : "";
    }
    this.formData = { ...this.originFormData, ...this.otherParams };
  },
  mounted() {
    // isLoadOnCreated: 是否在加载完成后获取数据，值为false时不加载
    if (this.searchConfig.isLoadOnCreated !== false) {
      this.$eventBus.$emit(this.pageName, this.formData);
    }
  },
  methods: {
    handleQueryClick() {
      this.$eventBus.$emit(this.pageName, this.formData);
    },
    // 重置搜索项
    handleResetClick() {
      for (const key in this.originFormData) {
        this.formData[`${key}`] = this.originFormData[key];
      }
      this.$eventBus.$emit(this.pageName, this.formData);
    }
  }
};
</script>

<style scoped lang="less"></style>
