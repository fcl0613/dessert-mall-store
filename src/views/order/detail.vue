<template>
  <div class="container">
    <el-card>
      <div class="base-info">
        <el-descriptions
          title="基本信息"
          direction="vertical"
          :column="4"
          border
        >
          <el-descriptions-item label="订单编号">{{
            orderInfo.id
          }}</el-descriptions-item>
          <el-descriptions-item label="用户账号">{{
            orderInfo.username
          }}</el-descriptions-item>
          <el-descriptions-item label="订单状态">{{
            orderInfo.orderStatus
          }}</el-descriptions-item>
          <el-descriptions-item label="订单可获得的积分">{{
            orderInfo.totalPrice
          }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <div class="goods-info">
        <div class="title">商品信息</div>
        <el-table :data="goodsList" border style="width: 100%">
          <el-table-column prop="goodsName" label="商品名称" width="180">
          </el-table-column>
          <el-table-column prop="goodsPic" label="商品图片" width="180">
              <template slot-scope="scope">
                  <img
                  :src="goodsPicBaseUrl + scope.row.goodsPic"
                  alt=""
                  style="width: 80px; height: 80px"
                />
              </template>
          </el-table-column>
          <el-table-column prop="goodsPrice" label="商品单价"> </el-table-column>
          <el-table-column prop="goodsCount" label="商品数量"> </el-table-column>
          <el-table-column prop="subtotal" label="小计"> </el-table-column>
        </el-table>
      </div>
      <div class="subtotal">
          合计：<span style="font-size:20px;color:red;">￥{{orderInfo.totalPrice}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import global from '@/utils/global'
import orderApi from '@/api/order'
export default {
  data() {
    return {
      //   orderId: this.$route.query.orderId,
      orderInfo: {},
      goodsList: [],
      goodsPicBaseUrl: global.BASE_GOOD_IMG_URL,
    }
  },
  created() {
    this.getOrderDeatil()
  },
  methods: {
    getOrderDeatil() {
      orderApi.getOrderDetail(this.$route.query.orderId).then((res) => {
        this.orderInfo = res.data.orderDetailDO
        this.goodsList = res.data.list
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  padding: 20px 30px;
  .goods-info {
    margin-top: 20px;
    .title {
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
  .subtotal{ 
      margin-top: 10px;
      float: right;
  }
}
</style>