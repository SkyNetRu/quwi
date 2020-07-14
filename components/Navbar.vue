<template>
  <div>
  <nav class="app-navbar m-guest">
    <a href="/" class="app-quwi">
      <img src="~assets/img/quwi-logo.png" width="25px" height="25px">
    </a>
    <div class="b-menu" v-if="$store.state.auth.user">
      <a href="#" class="" @click="logout">Logout</a>
    </div>
  </nav>
  </div>
</template>

<script>
  export default {
    name: "Navbar",
    data() {
      return {

      };
    },
    methods: {
      async logout () {
        await this.$auth.logout()
        this.$router.push('/login')
      }
    }
  }
</script>

<style scoped>

</style>
