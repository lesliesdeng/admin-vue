<template>
  <div class="page-content">
    <u-table
      :totalCount="totalCount"
      :listData="pageListData"
      v-bind="contentConfig"
      :page.sync="pageInfo"
      ref="table"
      @selectionChange="selectionChange"
    >
      <template #status="scope">
        {{ contentConfig.statusMap[scope.row.status] }}
      </template>
      <template #create="scope">
        {{ moment(scope.row.createAt).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <template #update="scope">
        {{ moment(scope.row.updateAt).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
      <!-- 默认操作列 -->
      <!-- <template #handler="scope">
        <div class="handler">
          <el-button
            type="text"
            icon="el-icon-edit"
            size="mini"
            @click="handleEditClick(scope.row)"
          >
            编辑
          </el-button>
          <el-button
            type="text"
            icon="el-icon-delete"
            size="mini"
            @click="handleDeleteClick(scope.row)"
          >
            删除
          </el-button>
        </div>
      </template> -->
      <!-- 自定义插槽 -->
      <template v-for="item in otherPropSlots" #[item.slotName]="scope">
        <template v-if="item.map && contentConfig[item.map]">
          {{ contentConfig[item.map][scope.row[item.prop]] || "-" }}
        </template>
        <slot v-else :name="item.slotName" :row="scope.row"></slot>
      </template>
    </u-table>
  </div>
</template>

<script>
import UTable from "@/base-ui/table";
import moment from "moment";
import { mapState } from "vuex";

export default {
  name: "pageContent",
  props: {
    contentConfig: {
      type: Object,
      required: true
    }
  },
  components: {
    UTable
  },
  data() {
    return {
      checkItems: "", //选中项
      moment,
      pageInfo: {
        currentPage: 1,
        pageSize: 10
      },
      otherInfo: null //搜索条件
      //   totalCount: 0
    };
  },
  watch: {
    pageInfo: {
      handler() {
        this.getPageData();
      },
      deep: true
    }
  },
  computed: {
    pageName() {
      return this.contentConfig.pageName;
    },
    otherPropSlots: function() {
      return this.contentConfig.propList.filter(item => {
        if (!item.slotName) return false;
        // 筛除默认操作列
        if (["create", "update", "handler", "status"].includes(item.slotName)) {
          return false;
        }
        return true;
      });
    },
    ...mapState({
      pageListData(state) {
        return state[this.pageName].listData;
      },
      totalCount(state) {
        return state[this.pageName].totalCount;
      }
    })
  },
  created() {
    //   默认不在此处自行调用搜索函数，而在page-search中调用；跳转详情或者弹框的时候，搜索条件的处理可能是异步的，便于控制时序，在处理完所有搜索条件后，再调用搜索接口
    // 不需要搜索栏的页面，传入load：true，在该页面初始化数据
    if (this.contentConfig.load) {
      this.getPageData();
    }
    this.$eventBus.$on(this.pageName, this.getPageData);
  },
  beforeDestroy() {
    //组件销毁eventbus。否则会出现重复触发事件的问题
    this.$eventBus.$off(this.pageName);
  },
  methods: {
    getPageData(otherInfo) {
      //   保存搜索条件
      if (otherInfo) {
        this.otherInfo = otherInfo;
      }
      //   获取数据  使用此组件，约定获取数据action getPageListDataAction
      //   如果是搜索，回到首页
      if (otherInfo && Object.keys(otherInfo).length != 0) {
        this.pageInfo.currentPage = 1;
      }
      const parmas = {
        ...this.otherInfo,
        pageNum: this.pageInfo.currentPage,
        pageSize: this.pageInfo.pageSize
      };
      if (this.contentConfig.showFooter === false) {
        delete parmas.pageNum;
        delete parmas.pageSize;
      }
      this.$store.dispatch(`${this.pageName}/getPageListDataAction`, parmas);
      //   每次变更表格数据，清空选择框
      if (this.$refs.table) {
        this.$refs.table.checkValue = "";
      }
    },
    selectionChange(items) {
      this.checkItems = items;
      this.$emit("selectionChange", items);
    }
    // 本来想将基础的删除编辑操作封装在模板中
    // async handleDeleteClick(rowItem) {
    //   //   删除操作
    //   await this.$store.dispatch(
    //     `${this.pageName}/deletePageDataAction`,
    //     { id: rowItem.id, pageName: this.pageName }
    //   );
    //   this.getPageData();
    // },
    // handleEditClick(item) {
    //   this.$emit("editBtnClick", item);
    // }
  }
};
</script>

<style scoped lang="less"></style>
