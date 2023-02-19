<template>
  <div class="cource-soure">
    <page-search :searchConfig="searchFormConfig" />
    <div class="btn-box">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleNewData()"
        >新增</el-button
      >
    </div>
    <page-content ref="pageContentRef" :contentConfig="contentTableConfig">
      <template #courcePublicHandler="scope">
        <el-button
          type="text"
          icon="el-icon-delete"
          size="mini"
          @click="handleDeleteClick(scope.row)"
        >
          删除
        </el-button>
      </template>
    </page-content>
    <page-modal
      ref="pageModalRef"
      :modalConfig="modalConfig"
      :defaultInfo="modalInfo"
    ></page-modal>
  </div>
</template>
<script>
import PageSearch from "@/components/page-search";
import PageContent from "@/components/page-content";
import PageModal from "./page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import usePageHandler from "@/mixins/use-page-handler";

export default {
  name: "courcePublic",
  components: { PageSearch, PageContent, PageModal },
  mixins: [usePageHandler],
  data() {
    return {
      searchFormConfig,
      contentTableConfig,
      modalConfig,
      modalInfo: {}
    };
  },
  created() {
    // Service.loading("0");
  },
  methods: {}
};
</script>

<style scoped lang="less">
.btn-box {
  text-align: left;
  margin: 20px 0;
}
</style>
