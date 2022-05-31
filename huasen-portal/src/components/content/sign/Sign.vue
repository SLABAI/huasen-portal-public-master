<!--
 * @Autor: huasenjio
 * @Date: 2021-11-27 22:38:22
 * @LastEditors: huasenjio
 * @LastEditTime: 2022-05-01 16:27:00
 * @Description: 登陆面板
-->
<template>
  <div class="sign">
    <div class="banner">
      <img src="~@/assets/img/sign/default.svg" />
    </div>
    <div class="tab">
      <ul>
        <li :class="{ active: activeIndex == 0 }" @click="activeIndex = 0">
          登陆
        </li>
        <li :class="{ active: activeIndex == 1 }" @click="activeIndex = 1">
          注册 · 找回
        </li>
      </ul>
      <div class="content">
        <!-- 登陆 -->
        <span class="panel" v-show="0 == activeIndex">
          <section class="login">
            <form name="login">
              <input
                class="id"
                type="text"
                placeholder="邮箱登陆"
                @input="user.id = inputMail(user.id)"
                v-model="user.id"
              />
              <input
                class="password"
                type="password"
                autocomplete="off"
                placeholder="输入密码"
                @input="user.password = inputNormal(user.password)"
                v-model="user.password"
              />
              <div class="buttom login-buttom" @click="loginHandle()">
                登 陆
              </div>
            </form>
          </section>
        </span>
        <!-- 注册 -->
        <span class="panel" v-show="1 == activeIndex">
          <section class="register relative">
            <form name="register">
              <input
                class="id"
                type="text"
                placeholder="邮箱注册"
                @input="user.id = inputMail(user.id)"
                v-model="user.id"
              />
              <input
                class="password"
                :type="isShowPassword ? 'text' : 'password'"
                autocomplete="off"
                placeholder="数字/字母/下划线"
                @input="user.password = inputNormal(user.password)"
                v-model="user.password"
              />
              <i
                class="iconfont absolute right-px-14 top-px-80"
                :class="isShowPassword ? 'icon-md-eye' : 'icon-md-eye-off'"
                @click="() => (isShowPassword = !isShowPassword)"
              >
              </i>
              <div class="mail-code">
                <input
                  class="code"
                  type="number"
                  v-model="user.mailCode"
                  placeholder="请输入邮箱接收的验证码"
                />
                <div ref="codeButtom" @click="getMailCode">点击发送</div>
              </div>
              <p class="ml-px-4 text-gray-700">
                tips：忘记密码？再次注册即可自动更新密码！
              </p>
              <div class="buttom register-buttom" @click="registerHandle">
                注 册 · 找 回
              </div>
            </form>
          </section>
        </span>
      </div>
    </div>
  </div>
</template>
<script>
import { checkParamsByRules } from '@/plugin/strategy.js';
export default {
  name: 'Sign',
  data() {
    return {
      activeIndex: 0,
      isShowPassword: false,
      user: {
        id: '',
        password: '',
        mailCode: '',
      },

      count: 60, // 倒计时秒数
      timer: null, // 定时器
      timerSwitch: true, // 可用开关
    };
  },
  methods: {
    getMailCode() {
      if (!this.user.id) {
        this.$notify({
          title: '警告',
          message: '请输入邮箱',
          type: 'warning',
          position: 'top-left',
          duration: 2000,
        });
        return;
      }
      if (!this.timerSwitch == true) {
        this.$notify({
          title: '警告',
          message: '请耐心等待验证码',
          type: 'warning',
          position: 'top-left',
          duration: 2000,
        });
        return;
      }

      this.API.getMailCode({ mail: this.user.id });
      // 无论是否发送成功均打开定时器
      this.timer = setInterval(() => {
        if (this.count >= 0) {
          this.$refs.codeButtom.innerText = --this.count; // 倒秒效果
        } else {
          clearInterval(this.timer); // 达到秒速停止定时器
          // 修改定时器初始参数
          this.count = 60;
          this.timerSwitch = true;
          this.$refs.codeButtom.innerText = '点击发送';
        }
      }, 1000);
      // 设置定时器为不可用
      this.timerSwitch = false;
    },

    /**
     * @description: 去除非数字字母下划线@.的字符
     * @param  {String} text 需要校验处理的字符串
     * @return {String}
     * @author: huasenjio
     */

    inputMail(text) {
      return text.replace(/[^0-9a-zA-Z_@\\.]/g, '');
    },

    /**
     * @description: 去除非数字字母下划线的字符
     * @param  {String} text 需要校验处理的字符串
     * @return {String}
     * @author: huasenjio
     */

    inputNormal(text) {
      return text.replace(/[^\w]/g, '');
    },

    // 登陆处理
    loginHandle() {
      let errText = checkParamsByRules([
        {
          value: this.user.id,
          rules: [
            {
              strategy: 'isNoEmpty',
              errMsg: '邮箱不能为空',
            },
            {
              strategy: 'minLength：5',
              errMsg: '账号请长度不小于5',
            },
            {
              strategy: 'maxLength：20',
              errMsg: '账号请长度不大于20',
            },
            {
              strategy: 'isEmail',
              errMsg: '账号请输入邮箱',
            },
          ],
        },
        {
          value: this.user.password,
          rules: [
            {
              strategy: 'isNoEmpty',
              errMsg: '密码不能为空',
            },
            {
              strategy: 'minLength：5',
              errMsg: '账号请长度不小于5',
            },
            {
              strategy: 'maxLength：20',
              errMsg: '账号请长度不大于20',
            },
          ],
        },
      ]);
      if (errText) {
        this.$notify({
          title: '警告',
          message: errText,
          type: 'warning',
          position: 'top-left',
          duration: 2000,
        });
        return;
      }
      let params = {
        id: this.user.id,
        password: this.user.password,
      };
      this.API.login(params);
    },
    registerHandle() {
      let errText = checkParamsByRules([
        {
          value: this.user.id,
          rules: [
            {
              strategy: 'isNoEmpty',
              errMsg: '邮箱不能为空',
            },
            {
              strategy: 'minLength：5',
              errMsg: '账号请长度不小于5',
            },
            {
              strategy: 'maxLength：20',
              errMsg: '账号请长度不大于20',
            },
            {
              strategy: 'isEmail',
              errMsg: '账号请输入邮箱',
            },
          ],
        },
        {
          value: this.user.password,
          rules: [
            {
              strategy: 'isNoEmpty',
              errMsg: '密码不能为空',
            },
            {
              strategy: 'minLength：5',
              errMsg: '账号请长度不小于5',
            },
            {
              strategy: 'maxLength：20',
              errMsg: '账号请长度不大于20',
            },
          ],
        },
        {
          value: this.user.mailCode,
          rules: [
            {
              strategy: 'isNoEmpty',
              errMsg: '验证码不能为空',
            },
          ],
        },
      ]);
      if (errText) {
        this.$notify({
          title: '警告',
          message: errText,
          type: 'warning',
          position: 'top-left',
          duration: 2000,
        });
        return;
      }
      let params = {
        id: this.user.id,
        password: this.user.password,
        mailCode: this.user.mailCode,
      };
      this.API.register(params);
    },
  },
  destroyed() {
    clearInterval(this.timer); // 防止页面刷新之后定时任务仍在继续
  },
};
</script>

<style lang="scss" scoped>
.sign {
  width: 350px;
  padding: 10px;
  margin: 0 auto;
  border-radius: 3px;
  background-color: white;
  .banner {
    img {
      width: 100%;
      border-radius: 3px;
      vertical-align: middle;
    }
  }
  .tab {
    ul {
      display: flex;
      justify-content: space-around;
      li {
        width: 50%;
        padding: 10px 0;
        text-align: center;
        cursor: pointer;
        color: black !important;
        border-bottom: 3px solid white;
      }
      .active {
        background-color: white;
        border-bottom: 3px solid #ef5350;
      }
    }
    section {
      form {
        display: flex;
        flex-direction: column;
        padding: 10px;
        input {
          padding: 15px 10px;
          border-radius: 0px;
          outline: medium;
          border: none;
          border-bottom: 1px solid #c5c5c5;
        }
        .buttom {
          border-radius: 28px;
          margin: 34px 5px;
          padding: 10px 5px;
          font-size: 1.2rem;
          text-align: center;
          color: white;
          background-color: #ef5350;
          cursor: pointer;
        }
      }
      .mail-code {
        display: flex;
        justify-content: space-between;
        margin: 20px 0;
        input {
          width: 65%;
        }
        div {
          width: 25%;
          display: flex;
          justify-content: center;
          align-items: center;
          color: black;
          border-bottom: 3px solid #ef5350;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
