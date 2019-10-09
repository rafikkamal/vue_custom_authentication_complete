<template>
  <div>
    <h2>User Information From Database</h2>
    <p>User ID    : {{ user.id }}</p>
    <p>User Name  : {{ user.name }}</p>
    <p>User Email : {{ user.email }}</p>
    <Logout/>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import Logout from '../components/Logout.vue'
import router from '../router'

export default {
  components: {
    Logout
  },
  data() {
    return {
      title: 'User Information',
      user: {}
    }
  },
  methods: {
    ...mapActions([
      'getUserInfo',
      'fetchUserInfo'
    ]),
  },
  computed: {
    ...mapGetters([
      'getAuthorizationToken'
    ])
  },
  created() {
    this.user = this.getUserInfo({
      authorizationToken: this.getAuthorizationToken,
    }).then(res => {
      this.user = res.data
      this.fetchUserInfo({
        'userName': res.userName,
        'userEmail': res.userEmail
      })
    })
  }
}
</script>