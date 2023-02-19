<template>
  <div class="page-modal">
    <el-dialog
      title="添加课程"
      :visible.sync="dialogVisible"
      width="80%"
      center
      v-bind="modalConfig.modalStyle"
      destroy-on-close
    >
      <page-search :searchConfig="searchFormConfig" />
      <page-content ref="pageContentRef" :contentConfig="contentTableConfig">
      </page-content>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import PageContent from "@/components/page-content";
import PageSearch from "@/components/page-search";

import { contentTableConfig } from "./config/modal-content.config";
import { searchFormConfig } from "./config/modal-search.config";

import usePageHandler from "@/mixins/use-page-handler";

export default {
  name: "publicPageModal",
  mixins: [usePageHandler],
  components: {
    PageContent,
    PageSearch
  },
  props: {
    modalConfig: {
      type: Object,
      required: true
    }
  },
  watch: {},
  data() {
    return {
      contentTableConfig,
      searchFormConfig,
      dialogVisible: false
    };
  },
  created() {},
  methods: {
    handleConfirmClick() {
      console.log(this.getCheckBox());
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
