<template>
  <div class="page-modal">
    <el-dialog
      :title="title || '选择用户'"
      :visible.sync="dialogVisible"
      width="80%"
      :key="new Date().getTime()"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <page-search :searchConfig="searchFormConfig" ref="pageSearchRef" />
      <div class="modal-content">
        <el-row>
          <el-col :span="6">
            <el-tree
              :default-checked-keys="[defaultCheck]"
              :current-node-key="defaultCheck"
              :check-on-click-node="true"
              node-key="id"
              :data="treeData"
              :props="defaultProps"
              :load="loadNode"
              ref="tree"
              :highlight-current="true"
              @node-click="handleNodeClick"
              lazy
            >
              <!--此处使用插槽是为了让文本过长时候显示‘...’,且有鼠标悬浮文本框-->
              <span class="span-ellipsis" slot-scope="{ node }">
                <el-tooltip
                  class="item"
                  effect="dark"
                  :content="node.label"
                  placement="top-start"
                >
                  <span>{{ node.label }}</span>
                </el-tooltip>
              </span>
            </el-tree>
          </el-col>
          <el-col :span="17" :offset="1">
            <page-content
              ref="pageContentRef"
              :contentConfig="contentTableConfig"
            >
            </page-content>
          </el-col>
        </el-row>
      </div>
      <slot></slot>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">关闭</el-button>
          <el-button type="primary" @click="handleConfirmClick">确定</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import PageContent from "@/components/page-content";

import { contentTableConfig } from "./config/modal-content.config";
import { searchFormConfig } from "./config/modal-search.config";

import usePageHandler from "@/mixins/use-page-handler";
import { mapState } from "vuex";
import { Message } from "element-ui";

export default {
  name: "memberPickerModal",
  mixins: [usePageHandler],
  components: {
    PageContent
    // PageSearch
  },
  props: {
    title: {
      type: String,
      required: false
    },
    isLoadMembersOnInited: {
      type: Boolean,
      default: true
    }
    // modalConfig: {
    //   type: Object,
    //   required: false
    // }
  },
  // 该引用方式，避免跟page-search循环调用报错
  beforeCreate() {
    if (this.$options.propsData.isLoadMembersOnInited === false) {
      searchFormConfig.isLoadOnCreated = false;
    }
    this.$options.components.PageSearch = require("../../page-search.vue").default;
  },
  watch: {
    treeData: {
      handler: function(val) {
        // 设置树形组件的默认选中
        this.defaultCheck = val[0].id;
        // 测试
        // item.defaultValue = val[1].id;
        this.searchFormConfig.formItems.map(item => {
          if (item.field === "organizationId") {
            // 设置defaultValue，不被搜索栏重置清空
            item.defaultValue = this.defaultCheck;
          }
        });
        this.searchFormConfig = JSON.parse(
          JSON.stringify(this.searchFormConfig)
        );
        // this.$refs.tree.setCheckedKeys([this.treeData[0].id]);
      }
    },
    deep: true
  },
  computed: {
    ...mapState({
      treeData(state) {
        return state[this.contentTableConfig.pageName].treeData;
      }
    })
  },
  data() {
    return {
      defaultCheck: "",
      contentTableConfig,
      searchFormConfig,
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "isLeaf"
      }
    };
  },
  methods: {
    handleConfirmClick() {
      const chooseItem = this.getCheckBox();
      if (!chooseItem) {
        Message.error("请选择用户");
        return;
      }
      this.$emit("selecConfirm", chooseItem);
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      this.$refs.pageContentRef.pageInfo.currentPage = 1;
      this.$eventBus.$emit(this.contentTableConfig.pageName, {
        organizationId: data.id
      });
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(node.data);
      }
      if (node.data && node.data.children && node.data.children.length !== 0) {
        return resolve(node.data.children);
      } else {
        this.$store
          .dispatch(
            `${this.contentTableConfig.pageName}/getPageTreeChildrenData`,
            {
              uri: "activity/gensee",
              parentId: node.data.id
            }
          )
          .then(list => {
            list.forEach(item => {
              item.isLeaf = !item.isParent && !item.children;
            });
            return resolve(list);
          });
      }
    }
  }
};
</script>

<style scoped lang="less">
.drawer-footer {
  position: absolute;
  bottom: 20px;
  right: 40px;
}
.modal-content {
  padding: 15px 20px 0;
  margin-top: 20px;
  border-top: 1px solid #dbdbdb;
  height: 360px;
  overflow: auto;
  .el-tree {
    height: 300px;
    overflow: auto;
    .span-ellipsis {
      width: 100%;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
      display: inline-block;
    }
  }
}
</style>
