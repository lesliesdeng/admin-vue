<template>
  <div class="u-table">
    <el-table
      :size="size"
      stripe
      :data="listData"
      :height="tableHeight"
      border
      @selection-change="selectionChange"
      @row-click="handleRowClick"
      v-bind="childrenProps"
    >
      <el-table-column
        v-if="showSelectColumn"
        type="selection"
        fixed
        align="center"
        width="60"
      ></el-table-column>
      <!-- 单选框模板 -->
      <el-table-column v-if="showRadioColumn" fixed align="center" width="60">
        <template slot-scope="scope">
          <el-radio v-model="checkValue" :label="scope.row.id">
            <!-- 随便放点东西，让id不显示 -->
            <span></span>
          </el-radio>
        </template>
      </el-table-column>
      <!-- 序号模板 -->
      <el-table-column
        v-if="showIndexColumn"
        type="index"
        fixed
        label="序号"
        align="center"
        width="80"
      ></el-table-column>
      <div v-for="item in propList" :key="item.prop">
        <el-table-column
          v-bind="item"
          :align="item.align || 'center'"
          :show-overflow-tooltip="item.tooltip !== false"
          :key="Math.random()"
        >
          <template #default="scope">
            <slot :name="item.slotName" :row="scope.row">
              {{ getTableAttr(scope.row, item.prop) }}
            </slot>
          </template>
        </el-table-column>
      </div>
      <slot></slot>
    </el-table>
    <div class="footer-box" v-if="showFooter">
      <slot name="footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          :total="totalCount"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "uTable",
  props: {
    title: {
      type: String,
      default: "表格数据"
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn: {
      type: Boolean,
      default: false
    },
    showRadioColumn: {
      type: Boolean,
      default: false
    },
    showFooter: {
      type: Boolean,
      default: true
    },
    tableHeight: null,
    listData: [],
    propList: [],
    childrenProps: {
      type: Object,
      default: () => ({})
    },
    totalCount: {
      type: Number,
      default: 0
    },
    page: {
      type: Object,
      default: () => ({
        currentPage: 1,
        pageSize: 10
      })
    },
    size: {
      type: String,
      default: "mini"
    }
  },
  components: {},
  data() {
    return {
      checkValue: "" //单选框选中值
    };
  },
  methods: {
    selectionChange(value) {
      if (this.showSelectColumn) {
        this.$emit("selectionChange", value);
      }
    },

    handleCurrentChange(currentPage) {
      this.checkValue = "";
      this.$emit("update:page", { ...this.page, currentPage });
    },
    handleSizeChange(pageSize) {
      // 修改页码，回到首页
      this.$emit("update:page", { ...this.page, pageSize, currentPage: 1 });
    },
    handleRowClick(row) {
      if (this.showRadioColumn) {
        this.checkValue = row.id;
        this.$emit("selectionChange", row);
      }
    },
    getTableAttr(row, prop) {
      const propsList = prop.split(".");
      return propsList[1]
        ? row[propsList[0]]
          ? row[propsList[0]][propsList[1]]
          : ""
        : row[prop];
    }
  }
};
</script>

<style scoped lang="less">
.footer-box {
  margin-top: 15px;

  .el-pagination {
    text-align: right;
  }
}
</style>
