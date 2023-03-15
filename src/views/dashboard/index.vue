<template>
  <div class="container">
    <div class="table-area">
      <el-descriptions title="系统数据" direction="vertical" :column="3" border>
        <el-descriptions-item label="订单总数">{{dashboardData.orderCount}}</el-descriptions-item>
        <el-descriptions-item label="昨日订单数">{{dashboardData.yesterdayOrder}}</el-descriptions-item>
        <el-descriptions-item label="有效订单总数">{{dashboardData.effectiveOrderCount}}</el-descriptions-item>
        <el-descriptions-item label="昨日有效订单总数">{{dashboardData.yesterdayEffectiveOrderCount}}</el-descriptions-item>
        <el-descriptions-item label="总收入">{{dashboardData.totalIncome}}</el-descriptions-item>
        <el-descriptions-item label="昨日总收入">{{dashboardData.yesterdayIncome}}</el-descriptions-item>
      </el-descriptions>
    </div>
    <div class="chart-area"></div>
  </div>
</template>

<script>
import dashboardApi from '@/api/dashboard'
export default {
  data() {
    return {
      dashboardData: {}
    }
  },
  created() {
    this.getDashboardData()
  },
  methods: {
    getDashboardData() {
      dashboardApi.getDashboardData().then((res) => {
        this.dashboardData = res.data
      })
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 30px;
}
</style>