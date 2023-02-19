<template>
  <div :class="{ search: type, 'u-form': true }">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <el-row>
      <el-col :span="formLayout.span || 20">
        <el-form :label-width="labelWidth" :model="formData" :ref="formRef">
          <el-row>
            <template v-for="(item, index) in formItems">
              <el-col v-bind="colLayout" :key="index">
                <el-form-item
                  :prop="`${item.field}`"
                  :label="item.label"
                  :rules="item.rules"
                  class="form-item"
                  :style="itemStyle"
                  v-if="!item.isHidden"
                >
                  <template
                    v-if="item.type === 'input' || item.type === 'password'"
                  >
                    <el-input
                      v-model="formData[`${item.field}`]"
                      :placeholder="item.placeHolder"
                      :[getMaxLengthKey(item)]="
                        item.maxlength ? item.maxlength : 30
                      "
                      :readonly="item.readonly"
                      show-word-limit
                      :show-password="item.type === 'password'"
                    />
                  </template>
                  <template v-else-if="item.type === 'select'">
                    <el-select
                      clearable
                      v-model="formData[`${item.field}`]"
                      :placeholder="item.placeHolder"
                      style="width: 100%"
                    >
                      <template v-if="Array.isArray(item.options)">
                        <el-option
                          v-for="option in item.options"
                          :key="option.value"
                          :value="option.value"
                          :label="option.label"
                        />
                      </template>
                      <template v-else>
                        <el-option
                          v-for="(label, value) in item.options"
                          :key="value"
                          :value="value"
                          :label="label"
                        />
                      </template>
                    </el-select>
                  </template>
                  <template v-else-if="item.type === 'datepicker'">
                    <el-date-picker
                      v-model="formData[`${item.field}`]"
                      v-bind="item.otherOption"
                      style="width: 100%"
                    >
                    </el-date-picker>
                  </template>
                  <template v-else-if="item.type === 'picker'">
                    <component
                      :is="item.picker"
                      :title="item.title"
                      :placeholder="item.placeHolder"
                      :formValue.sync="formData[`${item.field}`]"
                      :formOptions="item.options"
                    />
                  </template>
                  <template #default="scope" v-if="item.slotName">
                    <slot
                      :name="item.slotName"
                      :value="formData[`${item.field}`]"
                    >
                    </slot>
                  </template>
                </el-form-item>
              </el-col>
            </template>
          </el-row> </el-form
      ></el-col>
      <el-col :span="24 - (formLayout.span || 20)">
        <div class="footer-box">
          <slot name="footer"></slot></div
      ></el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "uForm",
  components: {
    memberPicker: () => import("@/components/picker/member-picker"),
    organizationPicker: () => import("@/components/picker/organization-picker")
  },
  props: {
    labelWidth: {
      type: String,
      default: () => "80px"
    },
    type: null, //用于区别搜索栏调用和普通表单调用，值为search，则为搜索栏
    formRef: String, // 表单校验使用
    formItems: [],
    itemStyle: null,
    modelValue: {},
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6, // ≥1920px
        lg: 8, // ≥1200px
        md: 12, // ≥992px
        sm: 24, // ≥768px
        xs: 24 // <768px
      })
    },
    formLayout: {
      type: Object,
      default: () => ({
        span: 20
      })
    }
  },
  watch: {
    formData: {
      handler(value) {
        this.$emit("update:modelValue", value);
      },
      deep: true
    }
  },
  methods: {
    // maxlength 为 none 时， 不限制输入长度
    getMaxLengthKey(item) {
      return item.maxlength === "none" ? "length" : "maxlength";
    }
  },
  data() {
    return {
      formData: {
        ...this.modelValue
      }
    };
  }
};
</script>

<style scoped lang="less">
.u-form {
  padding: 20px 20px 10px;
  .footer-box {
    padding-left: 15px;
  }
}
.search {
  .el-form-item {
    margin-bottom: 10px !important;
  }
}
</style>
