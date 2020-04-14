<template>
  <div class="home">
    <el-card header="请先登录" style="width: 25rem; margin: 5rem auto;">
      <el-form>
        <el-form-item label="用户名">
          <el-input type="text" v-model="model.username"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>

        <el-row type="flex">
          <el-col>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="login"
                >登录</el-button
              >
            </el-form-item>
          </el-col>
          <el-col>
            <el-form-item>
              <el-button type="primary" @click.native.prevent="registry"
                >注册</el-button
              >
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      model: {},
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login", this.model);
      localStorage.token = res.data.token;
      console.log(res.data);
      this.$router.push("/");
      this.$message({
        type: "success",
        message: "登陆成功",
      });
    },
    async registry() {},
  },
};
</script>
