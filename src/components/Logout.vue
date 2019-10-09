<template>
  <div>
    <button @click=logoutSubmit>Logout</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import router from '../router'

export default {
  computed: {
    ...mapGetters([
      'getAuthorizationToken'
    ])
  },
  methods: {
    ...mapActions([
      'doLogout'
    ]),
    logoutSubmit(){
      this.doLogout({
        authorizationToken: this.getAuthorizationToken,
      })
    }
  }
}
</script>