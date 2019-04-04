<template>
  <div class="login-page">
    <div style="height: 300px;">登陆页</div>
    <van-cell-group>
      <van-field
        v-model="username"
        required
        clearable
        label="用户名"
        right-icon="question-o"
        placeholder="请输入用户名"
        @click-right-icon="$toast('question')"
      />

      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        required
      />
    </van-cell-group>
    <van-button size="large" @click="login" type="info">登 陆</van-button>
  </div>
</template>

<script>
  // import Vue from 'vue'
  // import { Toast } from 'vant'
  // Vue.use(Toast)
  import { removeToken, setToken } from "../utils/auth";

  export default {
    name: "login",
    data() {
      return {
        username: '',
        password: ''
      }
    },
    methods: {
      async login() {
        // 如果是有单点登陆或者免登陆就不能用sessionStorage了，不能保存。且服务端不能给客户端传写session，cookie可以
        // removeToken() //清除token;保证每次点击登陆之前是没有token的。保证每次跳登录页后就不能回退其他页，故在路由拦截做处理
        console.log('登陆')
        let params = {
          username: this.username,
          password: this.password
        }
        let res = await this.axios.post('portal/api/user/login.do', params)
        if (res.data.status === 201) {
          console.log(res.data.data.token, 'token信息')
          setToken(res.data.data.token)
          this.$router.push('/home')
        } else {
          // Toast.fail('用户名或密码错误！') 必须下面的写法才生效。不然就得在单独引入然后use一次指令组件才可以这样使用
          this.$toast.fail('用户名或密码错误！')
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
.login-page {
  padding: 20px;
  .van-button {
    margin-top: 100px;
  }
}

</style>
