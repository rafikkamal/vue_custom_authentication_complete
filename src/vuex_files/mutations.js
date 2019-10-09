let mutations = {
  loginStart: state => state.loggingIn = true,
  loginStop: (state, params) => {
    state.loggingIn = false
    state.loginError = params.loginError
    state.loginErrorMessages = params.loginErrorMessages
  },
  updateAccessToken: (state, params) => {
    state.accessToken = params.accessToken
    state.tokenType = params.tokenType
    state.expiresAt = params.expiresAt
  },
  updateUserInfo: (state, params) => {
    //console.log(params)
    state.userName = params.userName
    state.userEmail = params.userEmail
  },
  logout: (state) => {
    state.accessToken = null
    state.tokenType = null
    state.expiresAt = null
  },
  registrationStart: state => state.registeringIn = true,
  registrationStop: (state, params) => {
    state.registeringIn = false
    state.registrationError = params.registrationError
    state.registrationErrorMessages = params.registrationErrorMessages
  },
}

export default mutations;