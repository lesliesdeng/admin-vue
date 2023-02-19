<template>
  <div class="cource-soure">
    <page-search :searchConfig="searchFormConfig" ref="pageSearchRef" />
    <div class="btn-box">
      <el-button
        size="small"
        type="primary"
        icon="el-icon-plus"
        @click="handleNewData()"
        >新增</el-button
      >
      <el-button type="primary" size="small" @click="exportExcel()"
        >导出</el-button
      >
    </div>
    <page-content ref="pageContentRef" :contentConfig="contentTableConfig">
      <!-- 自定义表格项操作按钮 -->
      <template #soure="scope">
        {{ contentTableConfig.soureMap[scope.row.type] }}
      </template>
      <template #courceSourceHandler="scope">
        <el-button
          type="text"
          icon="el-icon-edit"
          size="mini"
          @click="handleEditClick(scope.row)"
        >
          修改
        </el-button>
        <el-button
          type="text"
          icon="el-icon-delete"
          size="mini"
          @click="handleDeleteClick(scope.row)"
        >
          删除
        </el-button>
        <el-button
          type="text"
          size="mini"
          @click="handleEditStatusClick(scope.row)"
        >
          {{ scope.row.status === 1 ? "禁用" : "启用" }}
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
import PageModal from "@/components/page-modal";

import { searchFormConfig } from "./config/search.config";
import { contentTableConfig } from "./config/content.config";
import { modalConfig } from "./config/modal.config";

import usePageHandler from "@/mixins/use-page-handler";

export default {
  name: "courceSource",
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
  methods: {
    handleEditStatusClick(data) {
      const { courseSourceName, type, status, id } = data;
      this.handleAfterUpdataClick(
        {
          queryInfo: {
            courseSourceName,
            type,
            status: status === 1 ? 0 : 1
          },
          id
        },
        "editPageDataAction"
      );
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
