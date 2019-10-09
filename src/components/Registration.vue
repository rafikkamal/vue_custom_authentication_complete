<template>
  <div class="register">
    <h2>{{ title }}</h2>
    <hr/>
    <div v-if="registeringIn" class="container-loading">
      <img src="../loading.gif" alt="Loading Icon">
    </div>
    
    <h4 v-if="registrationError" class="error-message">{{ registrationError }}</h4>

    <form @submit.prevent="registrationSubmit">
      <input type="text" placeholder="Username" v-model="username">
      <p v-if="registrationErrorMessages" class="error-message">
        {{ registrationErrorMessages['name'] }}
      </p>

      <input type="email" placeholder="Email" v-model="email">
      <p v-if="registrationErrorMessages" class="error-message">
        {{ registrationErrorMessages['email'] }}
      </p>

      <input type="password" placeholder="Password" v-model="password">
      <p v-if="registrationErrorMessages" class="error-message">
        {{ registrationErrorMessages['password'] }}
      </p>

      <input type="password" placeholder="Confirm Password" v-model="confirm_password">
      <p v-if="registrationErrorMessages" class="error-message">
        {{ registrationErrorMessages['password_confirmation'] }}
      </p>

      <button type="submit">{{ button_title }}</button>
    </form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import router from '../router'

export default {
	data() {
	  return {
      title: 'Registation Form',
      button_title: 'Register',
      username: 'Rafik',
	    email: 'rafik@gmail.com',
	    password: '123',
      confirm_password: '1'
	  }
	},
	computed: {
	  ...mapState([
	    'registeringIn',
	    'registrationError',
      'registrationErrorMessages'
	  ])
	},
	methods: {
	  ...mapActions([
	    'doRegistration',
      'registrationStop'
	  ]),
	  registrationSubmit() {
	    this.doRegistration({
        name: this.username,
	      email: this.email,
        password: this.password,
        password_confirmation: this.confirm_password
	    })
      .then((response) => {
        if(response.success) {
          this.registrationStop({
            'registrationError': null, 
            'registrationErrorMessages': null
          })
          router.push('/login')
        } else {
          if(response.networkError) {
            this.registrationStop({
              'registrationError': 'Network Error',
              'registrationErrorMessages': null
            })
          } else {
            var errorMessages = this.getFormValidationErrorMessages(response.errors)
            this.registrationStop({
              'registrationError': 'Please fix the errors',
              'registrationErrorMessages': errorMessages
            })
          }
        }
      }) 
      .catch(err => {
        console.log(err)
        console.log("got an error")
      })
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
  .register {
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