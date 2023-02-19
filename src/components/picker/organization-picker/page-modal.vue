<template>
  <div class="page-modal">
    <el-dialog
      :title="title || '选择部门'"
      :visible.sync="dialogVisible"
      width="65em"
      :close-on-click-modal="false"
      append-to-body
      destroy-on-close
    >
      <page-search
        :searchConfig="searchFormConfig"
        :otherParams="{ orgType: orgType || 2 }"
      />
      <div class="modal-content">
        <el-row>
          <el-col :span="24">
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
import { searchFormConfig } from "./config/modal-search.config";

import usePageHandler from "@/mixins/use-page-handler";
import { mapState } from "vuex";

export default {
  name: "organizationPickerModal",
  mixins: [usePageHandler],
  components: {
    PageSearch: () => import("@/components/page-search")
  },
  props: {
    title: {
      type: String,
      required: false
    },
    isLoadMembersOnInited: {
      type: Boolean,
      default: true
    },
    orgType: {
      type: [Number, String],
      default: 2
    }
    // modalConfig: {
    //   type: Object,
    //   required: false
    // }
  },
  created() {
    this.$eventBus.$on("organizationPicker", this.getPageData);
  },
  beforeDestroy() {
    //组件销毁eventbus。否则会出现重复触发事件的问题
    this.$eventBus.$off("organizationPicker");
  },
  watch: {
    treeData: {
      handler: function(val) {
        // 设置树形组件的默认选中
        this.defaultCheck = val && val.length && val[0].id;
        // 测试
        this.searchFormConfig = JSON.parse(
          JSON.stringify(this.searchFormConfig)
        );
      }
    },
    deep: true
  },
  computed: {
    ...mapState({
      treeData(state) {
        return state.organizationPicker.treeData;
      }
    })
  },
  data() {
    return {
      defaultCheck: "",
      searchFormConfig,
      dialogVisible: false,
      defaultProps: {
        children: "children",
        label: "name",
        isLeaf: "isLeaf"
      },
      searchData: null,
      currentNode: null
    };
  },
  methods: {
    handleConfirmClick() {
      this.$emit(
        "selecConfirm",
        this.currentNode || this.$refs.tree.getCurrentNode()
      );
      this.dialogVisible = false;
    },
    handleNodeClick(data) {
      this.currentNode = data;
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve(node.data);
      }
      if (node.data && node.data.children && node.data.children.length !== 0) {
        return resolve(node.data.children);
      } else {
        this.$store
          .dispatch(`organizationPicker/getPageTreeChildrenData`, {
            uri: "activity/gensee",
            parentId: node.data.id
          })
          .then(list => {
            list.forEach(item => {
              item.isLeaf = !item.isParent && !item.children;
            });
            return resolve(list);
          });
      }
    },
    getPageData(searchData) {
      //   保存搜索条件
      if (searchData) {
        this.searchData = { ...searchData };
      }

      const parmas = {
        ...this.searchData
      };
      this.$store.dispatch(`organizationPicker/getPageTreeData`, parmas);
    },
    selectionChange(items) {
      this.checkItems = items;
      this.$emit("selectionChange", items);
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
