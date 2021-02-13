<template>
  <v-app dark>
    <loading-dialog />
    <snackbar />
    <v-main :class="!$vuetify.theme.dark && 'light-green lighten-5'">
      <nuxt />
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'Default',
  beforeCreate () {
    this.$vuetify.theme.dark = (this.$cookies.get('dark') === true)
  }
}
</script>
<style>
html {
  overflow-y: auto
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.page-title{
  opacity: 0.7 !important;
}
</style>
