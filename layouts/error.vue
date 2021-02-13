<template>
  <v-app dark>
    <v-main :class="!$vuetify.theme.dark && 'light-green lighten-5'">
      <v-layout align-center justify-center fill-height>
        <v-container class="mx-auto text-center">
          <h1 v-if="error.statusCode === 404" class="text-h3">
            {{ pageNotFound }}
          </h1>
          <h1 v-else class="text-h3">
            {{ otherError }}
          </h1>
          <br>
          <v-btn color="primary" to="/">
            Home page
          </v-btn>
        </v-container>
      </v-layout>
    </v-main>
  </v-app>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      pageNotFound: '404 Not Found',
      otherError: 'An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>
