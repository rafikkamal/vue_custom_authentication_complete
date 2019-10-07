<template>
  <div>
    <h3>{{ title }}</h3>
    <p>User ID: {{ $route.params.id }}</p>
    <p>Username: {{ userName }} </p>
    <p>Useremail: {{ userEmail }} </p>
    <button @click=logout>Logout</button>

    <button @click=logoutSubmit>Logout Submit</button>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';

export default {
  data() {
    return {
      title: 'User Information'
    }
  },
  computed: {
    ...mapState([
      'userName',
      'userEmail'
    ]),
    ...mapGetters([
      'getAuthorizationToken'
    ])
  },
  methods: {
    ...mapActions([
      'logout',
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