<template>
  <div class="login">
    <h2>{{ title }}</h2>
    <hr/>
    
    <div v-if="loggingIn" class="container-loading">
      <img src="../loading.gif" alt="Loading Icon">
    </div>
    
    <h4 v-if="loginError" class="error-message">{{ loginError }}</h4>

    <form @submit.prevent="loginSubmit">
      <input type="email" placeholder="E-Mail" v-model="email">
      <p v-if="loginErrorMessages" class="error-message">
        {{ loginErrorMessages['email'] }}
      </p>

      <input type="password" placeholder="Password" v-model="password">
      <p v-if="loginErrorMessages" class="error-message">
        {{ loginErrorMessages['password'] }}
      </p>

      <div>
        <span>Remeber me </span>
        <input type="checkbox" v-model="remember_me"></div>
      <button type="submit">Login</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'

export default {
	data() {
	  return {
      title: 'Login',
	    email: 'rafik@gmail.com',
	    password: '123123',
      remember_me: false
	  }
	},
	computed: {
	  ...mapState([
	    'loggingIn',
	    'loginError',
      'loginErrorMessages'
	  ])
	},
	methods: {
	  ...mapActions([
	    'doLogin',
      'fetchUserInfo',
      'fetchAccessToken',
      'loginStop'
	  ]),
	  loginSubmit() {
	    this.doLogin({
	      email: this.email,
	      password: this.password,
        remember_me: this.remember_me
	    })
      .then((res) => {
        if(res.success) {
          this.loginStop({
            'loginError': null, 
            'loginErrorMessages': null
          })
          this.setLocaleStorageInfo(res)
          this.fetchUserInfo({
            'userName': res.userName,
            'userEmail': res.userEmail
          })
          router.push('/user')
        } else {
          this.loginStop({
            'loginError': 'Please Enter Corrent Email / Password', 
            'loginErrorMessages': this.getFormValidationErrorMessages(res.errors)
          })
        }
      })
      .catch((err) => {
        console.log(err)
      })
	  },
    setLocaleStorageInfo: (res) => {
      localStorage.setItem('accessToken', res.accessToken)
      localStorage.setItem('tokenType', res.tokenType)
      localStorage.setItem('expiresAt', res.expiresAt)
      localStorage.setItem('userName', res.userName)
      localStorage.setItem('userEmail', res.userEmail)
    },
    getFormValidationErrorMessages(errors) {
      var errorMessages = {}
      var errorObjs = errors
      var errorMessage = ""
      for(var key in errorObjs) {
        var errorObj = errorObjs[key]
        for (let prop in errorObj) {
          errorMessage += errorObj[prop]
        }
        errorMessages[key] = errorMessage
        errorMessage = ""
      }
      return errorMessages
    }
	}
}
</script>
<style scoped lang="scss">
  .login {
    border: 1px solid black;
    border-radius: 5px;
    padding: 1.5rem;
    width: 300px;
    margin-left: auto;
    margin-right: auto;
    position: relative;
    overflow: hidden;
    .container-loading {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: rgba(0,0,0,.3);
      img {
        width: 4rem;
        height: 4rem;
      }
    }
    hr {
      margin-bottom:25px;
    }
    form {
      display: flex;
      flex-flow: column;
      *:not(:last-child) {
        margin-bottom: 1rem;
      }
      input {
        padding: .5rem;
      }
      button {
        padding: .5rem;
        background-color: lightgray;
        border: 1px solid gray;
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          background-color: lightslategray;
        }
      }
      div {
        display: inline-block;
        text-align: left;
        span {
          font-size: 12px;
        }
        input {
          position: absolute;
          margin-left: 10px;
        }
      }
    }
    .error-message {
      text-align: left;
      color: red;
      margin-top: 0px;
    }
    p.error-message {
      font-size: 12px;
    }
  }
</style>