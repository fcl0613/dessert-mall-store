<template>
  <div class="container">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{ p1menu }}</el-breadcrumb-item>
      <el-breadcrumb-item>{{ p2menu }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
    name: "MyBreadcrumb",
    props: ['p1', 'p2'],
    data() {
        return {
            p1menu: this.p1,
            p2menu: this.p2
        }
    }
}
</script>

<style lang="less" scoped>
.container {
    margin-bottom: 20px;
}
</style>