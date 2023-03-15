<template>
  <div class="container">
    <my-breadcrumb p1="商品管理" p2="商品列表"></my-breadcrumb>

    <div class="goods-list-area">
      <el-card>
        <div class="search-area">
          <div class="left">
            <el-input
              placeholder="请搜索输入内容"
              v-model="searchParams.goodsName"
              clearable
              @clear="getGoodsList"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getGoodsList"
              ></el-button>
            </el-input>
          </div>
          <div class="right">
            <el-button type="primary" @click="showAddDialog">添加</el-button>
          </div>
        </div>
        <div class="data-table">
          <el-table :data="goodsList" border stripe style="width: 100%">
            <el-table-column label="编号" type="index" width="200">
            </el-table-column>
            <el-table-column prop="goodsName" label="商品名" width="300">
            </el-table-column>
            <el-table-column prop="goodsPoints" label="商品积分" width="180">
            </el-table-column>
            <el-table-column prop="stock" label="商品库存" width="180">
            </el-table-column>
            <el-table-column prop="goodsPic" label="商品图片" width="300">
              <template slot-scope="scope">
                <img
                  :src="goodsPicBaseUrl + scope.row.goodsPic"
                  alt=""
                  style="width: 80px; height: 80px"
                />
              </template>
            </el-table-column>
            <el-table-column prop="goodsStatus" label="商品状态" width="300">
              <template slot-scope="scope">
                <el-switch
                  v-model="scope.row.goodsStatus"
                  :active-value="1"
                  :inactive-value="0"
                  @change="changStatus(scope.row)"
                >
                </el-switch>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  icon="el-icon-plus"
                  @click="showStockDialog(scope.row.id)"
                ></el-button>
                <el-button
                  type="primary"
                  icon="el-icon-edit"
                  @click="showEditDialog(scope.row.id)"
                ></el-button>
                <el-button
                  type="danger"
                  icon="el-icon-delete"
                  @click="removeGoodsOne(scope.row.id)"
                ></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="page-area">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="searchParams.pageNum"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="searchParams.pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
          >
          </el-pagination>
        </div>
      </el-card>
    </div>

    <el-dialog
      :title="dialogTitle"
      :visible.sync="dialogVisible"
      width="30%"
      @close="initForm"
    >
      <el-form
        :model="dataForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="商品名称" prop="goodsName">
          <el-input v-model="dataForm.goodsName"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" prop="categoryId">
          <el-select v-model="dataForm.categoryId" placeholder="请选择">
            <el-option
              v-for="item in categoryList"
              :key="item.value"
              :label="item.categoryName"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品描述" prop="description">
          <el-input v-model="dataForm.description"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" prop="goodsPrice">
          <el-input v-model.number="dataForm.goodsPrice"></el-input>
        </el-form-item>
        <el-form-item label="商品库存" prop="description">
          <el-input v-model.number="dataForm.stock"></el-input>
        </el-form-item>
        <el-form-item label="商品积分" prop="goodsPoints">
          <el-input v-model.number="dataForm.goodsPoints"></el-input>
        </el-form-item>
        <el-form-item label="商品状态" prop="description">
          <el-switch
            v-model="dataForm.goodsStatus"
            :active-value="1"
            :inactive-value="0"
          >
          </el-switch>
        </el-form-item>
        <el-form-item prop="goodsPic">
          <el-upload
            ref="upload"
            action=""
            :file-list="fileList"
            :http-request="fileUpload"
            :show-file-list="false"
            :limit="1"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">
              只能上传jpg/png文件，且不超过500kb
            </div>
          </el-upload>
        </el-form-item>

        <img
          v-if="imageUrl"
          :src="goodsPicBaseUrl + dataForm.goodsPic"
          alt=""
          style="width: 60px; height: 60px; margin-left: 80px"
        />
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="库存修改"
      :visible.sync="stockDialogVisible"
      width="30%"
      @close="initStockForm"
    >
      <el-form :model="stockForm" ref="stockRuleForm" label-width="100px">
        <el-form-item label="库存">
          <el-input v-model.number="stockForm.stock"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer">
        <el-button @click="stockDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="subStockForm">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import MyBreadcrumb from '@/components/MyBreadcrumb'
import goodsApi from '@/api/goods'
import global from '@/utils/global'
import categoryApi from '@/api/category'
import fileUploadApi from '@/api/fileUpload'
export default {
  components: {
    MyBreadcrumb,
  },
  data() {
    return {
      searchParams: {
        pageNum: 1,
        pageSize: 10,
        goodsName: '',
      },
      dialogTitle: '添加',
      goodsList: [],
      total: 0,
      dialogVisible: false,
      dataForm: {
        goodsStatus: 0,
        stock: 0,
        goodsPrice: 0,
        goodsPoints: 0,
      },
      rules: {
        goodsName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' },
        ],
        categoryId: [
          { required: true, message: '请选择商品分类', trigger: 'blur' },
        ],
        description: [
          { required: true, message: '请输入商品描述', trigger: 'blur' },
        ],
        goodsPrice: [
          { required: true, message: '价格不能为空', trigger: 'blur' },
          { type: 'number', message: '价格必须为数字值', trigger: 'blur' },
        ],
        goodsPoints: [
          { required: true, message: '积分不能为空', trigger: 'blur' },
          { type: 'number', message: '积分必须为数字值', trigger: 'blur' },
        ],
      },
      imageUrl: '',
      goodsPicBaseUrl: global.BASE_GOOD_IMG_URL,
      fileList: [],
      categoryList: [],
      stockDialogVisible: false,
      stockForm: {
        stock: 0,
      },
    }
  },
  created() {
    this.getGoodsList()
    this.getAllDefaultCategory()
  },
  methods: {
    getGoodsList() {
      goodsApi.getGoodsList(this.searchParams).then((res) => {
        this.goodsList = res.data.list
        this.total = res.data.total
      })
    },
    showAddDialog() {
      this.dialogTitle = '添加'
      this.dialogVisible = !this.dialogVisible
    },
    showEditDialog(id) {
      goodsApi.getGoodsDetail(id).then((res) => {
        this.dataForm = res.data
        this.imageUrl = this.dataForm.goodsPic
      })
      this.dialogTitle = '修改'
      this.dialogVisible = !this.dialogVisible
    },
    removeGoodsOne(id) {
      this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).then(() => {
        goodsApi.removeGoods(id).then((res) => {
          this.$message.success('删除成功')
          this.getGoodsList()
        })
      })
    },
    handleSizeChange(val) {
      this.searchParams.pageSize = val
      this.getGoodsList()
    },
    handleCurrentChange(val) {
      this.searchParams.pageNum = val
      this.getGoodsList()
    },
    subForm() {
      this.$refs.ruleForm.validate((valid) => {
        if (!valid) return
        if (this.dataForm.id) {
          // 对象更新逻辑
          this.updateGoods()
        } else {
          // 走添加逻辑
          this.addGoods()
        }
      })
    },
    addGoods() {
      if (!this.dataForm.goodsPic) {
        this.$message.error('请先上传图片')
        return
      }
      goodsApi.addGoods(this.dataForm).then((res) => {
        this.$message.success('添加成功')
        this.dialogVisible = !this.dialogVisible
        this.getGoodsList()
      })
    },
    updateGoods() {
      goodsApi.updateGoods(this.dataForm).then((res) => {
        this.$message.success('更新成功')
        this.dialogVisible = !this.dialogVisible
        this.getGoodsList()
      })
    },
    fileUpload(options) {
      let file = options.file
      let formData = new FormData()
      formData.append('file', file)
      formData.append('flag', 'goods')
      fileUploadApi.fileUpload(formData).then((response) => {
        console.log('ssss')
        let res = response.data
        if (res.code == 200) {
          this.imageUrl = res.data
          this.dataForm.goodsPic = this.imageUrl
          console.log(this.imageUrl)
          this.$message.success('文件上传成功')
        } else {
          this.$message.error('文件上传失败')
        }
      })
    },
    getAllDefaultCategory() {
      categoryApi.getCategoryList().then((res) => {
        this.categoryList = res.data
      })
    },
    changStatus(goods) {
      let obj = new Object()
      obj.id = goods.id
      obj.status = goods.goodsStatus
      goodsApi.publishedGoods(obj).then((res) => {
        this.$message.success('修改成功')
      })
    },
    initForm() {
      this.$refs.ruleForm.resetFields()
      this.dataForm = {
        goodsStatus: 0,
        stock: 0,
      }
      this.imageUrl = ''
      this.fileList = []
    },
    initStockForm() {
      this.$refs.stockRuleForm.resetFields()
      this.stockForm = {
        stock: 0,
      }
    },
    showStockDialog(id) {
      this.stockForm.id = id
      this.stockDialogVisible = !this.stockDialogVisible
    },
    subStockForm() {
      goodsApi.updateStock(this.stockForm).then((res) => {
        this.$message.success('修改成功')
        this.stockDialogVisible = !this.stockDialogVisible
        this.getGoodsList()
      })
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  .goods-list-area {
    .search-area {
      display: flex;
      justify-content: space-between;
    }
    .data-table {
      margin-top: 20px;
    }
    .page-area {
      margin-top: 20px;
      margin-bottom: 10px;
      float: right;
    }
  }
}
</style>