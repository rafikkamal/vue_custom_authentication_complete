let getters = {
  tokenType: state => {
    return state.tokenType
  },
  accessToken: state => {
    return state.accessToken
  },
  getAuthorizationToken: state => {
    return state.tokenType+' '+state.accessToken
  }
}

export default getters;