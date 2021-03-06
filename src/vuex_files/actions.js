import axios from 'axios'
import router from '../router'

//const siteUrl = "https://reqres.in/api/"
const siteUrl = "http://localhost:8000/api/auth/"

let actions = {
	doLogin({ commit, dispatch }, loginData) {
    commit('loginStart')
    /* Axios header config */
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    };
    var authenticationResult = axios.post(siteUrl+'login', {
      ...loginData
    }, axiosConfig)
    .then((response) => {
      //commit('loginStop', null)
      //console.log(response)
      if(response.data.success) {
        commit('updateAccessToken', {
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
          expiresAt: response.data.expires_at
        })
        return {
          success: response.data.success,
          accessToken: response.data.access_token,
          tokenType: response.data.token_type,
          expiresAt: response.data.expires_at,
          userName: response.data.username,
          userEmail: response.data.useremail,
        }
      } else {
        commit('updateAccessToken', {
          'accessToken': null,
          'tokenType': null,
          'expiresAt': null
        })
        return {
          'success': response.data.success,
          'errors': response.data.errors
        }
      }
    })
    .catch(error => {
      commit('updateAccessToken', {
        'accessToken': null,
        'tokenType': null,
        'expiresAt': null
      })
    })
    return authenticationResult
  },
  loginStop({ commit }, params) {
    commit('loginStop', {
      'loginError': params.loginError, 
      'loginErrorMessages': params.loginErrorMessages
    })
  },
  logout({ commit, dispatch }) {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('tokenType')
    localStorage.removeItem('expiresAt')
    dispatch('removeUserInfo')
    commit('logout')
    router.push('/login')
  },
  doLogout({ commit, dispatch }, params) {
    let axiosConfig = {
      headers: {
        'Authorization': params.authorizationToken
      }
    };
    axios.get(siteUrl+'logout', axiosConfig)
    .then(response => {
      if(response.status == 200) {
        localStorage.removeItem('accessToken')
        localStorage.removeItem('tokenType')
        localStorage.removeItem('expiresAt')
        dispatch('removeUserInfo')
        commit('logout')
        router.push('/login')
      }
    })
    .catch(error => {
      console.log(error)
    })
    return {success: true}
  },
  fetchAccessToken({ commit, dispatch }, params) {
    var accessToken = localStorage.getItem('accessToken')
    var tokenType = localStorage.getItem('tokenType')
    var expiresAt = localStorage.getItem('expiresAt')
    /*
     * Check if the Access Token is valid
     */
    var verify = false//true
    if(params !== null && typeof params !== "undefined") {
      if(params.verify !== null && typeof params.verify !== "undefined") {
        verify = params.verify
      }
    }
    if(verify) {
      if(accessToken !== null && typeof accessToken !== "undefined") {
        dispatch('verifyAccessToken', {
          accessToken
        }).then((res) => {
          if(!res) {
            localStorage.removeItem('accessToken')
            router.push('/login')
          }
        })
      } 
    }
      
    commit('updateAccessToken', {
      accessToken,
      tokenType, 
      expiresAt
    })
  },
  verifyAccessToken({ commit }, params) {
    /*
     * Hard coded, must check with API
     */
    console.log("verifing the AccessToken: "+params.accessToken)
    if(params.accessToken === "QpwL5tke4Pnpja7X4") {
      return true
    }
    console.log("should not be here")
    return false
  },
  fetchUserInfo({ commit }) {
    commit('updateUserInfo', {
      'userName': localStorage.getItem('userName'), 
      'userEmail': localStorage.getItem('userEmail')
    })
  },
  removeUserInfo({ commit }) {
    localStorage.removeItem('userName')
    localStorage.removeItem('userEmail')
    commit('updateUserInfo', {
      'userName': null, 
      'userEmail': null
    })
  },
  doRegistration({ commit, dispatch }, registrationData) {
    commit('registrationStart')

    /* Axios header config */
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'Accept': 'application/json'
      }
    };

    /* Try to register the new user */
    var authenticationResult = axios.post(siteUrl+'signup', {
      ...registrationData
    }, axiosConfig)
    .then(res => {
      return res.data
    })
    .catch(err => {
      console.log(err)
      console.log(err.response)
      commit('registrationStop', {
        'registrationError': err.response, 
        'registrationErrorMessages': null
      })
      return {
        success: false,
        networkError: true
      }
      /**
       * The following also works.
       * But this was abondend to handle status code 422.
       */
      // var errorMessages = {}
      // var errorMessage = ""
      // var errors = err.response.data.errors
      // for(var key in errors) {
      //   var errorObj = errors[key]
      //   for (let prop in errorObj) {
      //     errorMessage += errorObj[prop]
      //   }
      //   errorMessages[key] = errorMessage
      //   errorMessage = ""
      // }
      // commit('registrationStop', {
      //   'registrationError': 'Please fix the errors', 
      //   'registrationErrorMessages': errorMessages
      // })
    })
    return authenticationResult
  },
  registrationStop({ commit }, params) {
    commit('registrationStop', {
      'registrationError': params.registrationError, 
      'registrationErrorMessages': params.registrationErrorMessages
    })
  },
  getUserInfo({ commit, dispatch }, params) {
    /* Axios header config */
    let axiosConfig = {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': params.authorizationToken,
        'Accept': 'application/json'
      }
    };
    let userInfo = axios.get(siteUrl+'user', axiosConfig)
    .then(response => {
      return response
    })
    .catch(error => {
      console.log(error.response.data)
    })
    return userInfo
  }
}

export default actions;