<template>
  <div id="login">

    <!-- 登录 -->
    <el-card class="box-card"
             ref="overturn">
      <div slot="header"
           class="clearfix">
        <i class="el-icon-user-solid"></i>
        <span>图书借阅后台系统登录</span>
        <span class="register">
          <el-button class="overturn"
                     @click="overturn"
                     plain>注册</el-button>
        </span>
      </div>
      <div>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="login_form"
                 class="demo-ruleForm">
          <el-form-item label="用户名"
                        prop="name">
            <el-input type="name"
                      v-model="login_form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="pass">
            <el-input type="pass"
                      v-model="login_form.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="d-flex">
              <el-button type="primary"
                         @click="login">登录</el-button>
              <el-button @click="resetForm('login_form')">重置</el-button>
            </div>

          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <!-- 注册 -->
    <el-card class="box-card  over2"
             ref="overturn">
      <div slot="header"
           class="clearfix">
        <i class="el-icon-user-solid"></i>
        <span>请注册！！！</span>
        <span class="register">
          <el-button class="overturn"
                     @click="overturn"
                     plain>登录</el-button>
        </span>
      </div>
      <div>
        <el-form :model="ruleForm"
                 status-icon
                 :rules="rules"
                 ref="register_form"
                 class="demo-ruleForm">
          <el-form-item label="用户名"
                        prop="name">
            <el-input type="name"
                      v-model="register_form.name"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="密码"
                        prop="pass">
            <el-input type="pass"
                      v-model="register_form.pass"
                      autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item>
            <div class="d-flex">
              <el-button type="primary"
                         @click="register">注册</el-button>
              <el-button @click="resetForm('register_form')">重置</el-button>
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
      login_form: {
        name: "",
        pass: ""
      },
      register_form: {
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
    overturn () {
      var login = document.getElementsByClassName("box-card")[0]
      var register = document.getElementsByClassName("box-card")[1]

      login.classList.toggle('login_overturn')
      register.classList.toggle('register_overturn')


    },
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
    register () {
      //
    },
    // 重置
    resetForm (formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
#login {
  display: flex;
  justify-content: center;
  align-content: center;
}
.box-card {
  z-index: 1;
  width: 25rem;
  height: 20rem;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  margin: auto;
  transition: 0.4s;
}
.over2 {
  z-index: 0;
}
.register_overturn {
  z-index: 1;
  transform: rotateY(360deg);
}
.login_overturn {
  z-index: 0;
  transform: rotateY(180deg);
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
.overturn {
  border: none;
}
</style>