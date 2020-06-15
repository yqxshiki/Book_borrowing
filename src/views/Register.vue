<template>
  <div id="login">
    <el-card class="box-card"
             ref="overturn">
      <div slot="header"
           class="clearfix">
        <i class="el-icon-user-solid"></i>
        <span>用户注册</span>
        <span class="register">
          <router-link to="/register">登录</router-link>
        </span>
      </div>
      <div>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="ruleForm"
                 class="demo-ruleForm">
          <el-form-item label="用户名"
                        prop="name">
            <el-input type="name"
                      v-model="ruleForm.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="pass">
            <el-input type="pass"
                      v-model="ruleForm.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="d-flex">
              <el-button type="primary"
                         @click="login">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </div>

          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "login",
  data () {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入用户名"));
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      }
    };
    return {
      ruleForm: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  methods: {
    async login () {
      if (
        this.ruleForm.name == "" ||
        this.ruleForm.pass == ""
      ) {
        this.$message({
          message: "请输入用户名和密码",
          type: "warning"
        });
      } else {
        const data = await this.$axios.post(`/Login/Login?name=${this.ruleForm.name}&pass=${this.ruleForm.pass}`);
        console.log(data)
        if (data.data.response == null) {
          return
        } else {
          this.$message({
            message: "恭喜你！登录成功",
            type: "success"
          });
          sessionStorage.book_token = data.data.response.token;
          this.$router.push("/");
        }

      }
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.box-card {
  width: 25rem;
  height: 20rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  transition: 0.5s;
}
.register {
  position: absolute;
  right: 0;
  margin-right: 1rem;
}
.d-flex {
  display: flex;
  justify-content: space-around;
}
</style>