<template>
  <el-tooltip
    effect="dark"
    :content="organization.organizationName"
    placement="top"
  >
    <!-- 注意：如果这里是纯文字，需要元素包裹，否则在chrome不显示 -->
    <span @mouseover="getOrganizationFullPath">{{ organizationName }}</span>
  </el-tooltip>
</template>

<script type="text/javascript">
export default {
  props: {
    organizationId: {
      type: String,
      required: true
    },
    organizationName: {
      type: String
    }
  },
  data() {
    return {
      organization: {},
      loading: false
    };
  },
  watch: {
    organizationId() {
      this.loaded = false;
    }
  },
  methods: {
    getOrganizationFullPath() {
      if (this.organization.id === this.organizationId || this.loading) return;
      this.organization = this.$store.getters["organization/getOrgFullPath"](
        this.organizationId
      );
      if (this.organization.id === this.organizationId) return;
      this.loading = true;
      this.$store
        .dispatch("organization/getOrganizationFullPath", {
          organizationId: this.organizationId
        })
        .then(res => {
          this.organization = res;
          this.loading = false;
        });
    }
  }
};
</script>
