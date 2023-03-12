<template>
  <div class="container">
    <div class="login-form">
      <h2>店家登录</h2>
      <el-form
        :model="formData"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formData.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="formData.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >登录</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import sellerApi from '@/api/seller'
export default {
  data() {
    return {
      formData: {},
      rules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          {
            min: 6,
            max: 12,
            message: '长度在 6 到 12 个字符',
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          let that = this
          sellerApi.login(this.formData.username, this.formData.password).then((res) => {
            that.$store.commit("setToken", res.data.token);
            this.$router.push('/home')
          })
        } else {
          this.$message.error({
            message: '用户名或密码格式错误，请重新输入'
          })
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  background-color: #2b4b6b;
  display: flex;
  justify-content: center;
  // align-items: center;
  h2 {
    margin-top: 0;
    margin-bottom: 10px;
    padding-left: 40px;
    text-align: center;
  }
  .login-form {
    margin-top: 200px;
    padding: 20px 80px 0 20px;
    width: 400px;
    height: 250px;
    background-color: #fff;
  }
}
</style>