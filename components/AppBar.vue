<template>
  <v-app-bar color="transparent" dense flat absolute>
    <v-spacer />
    <v-btn icon class="mr-3" @click="$vuetify.theme.dark=!$vuetify.theme.dark">
      <v-icon>mdi-invert-colors</v-icon>
    </v-btn>
    <language />
  </v-app-bar>
</template>

<script>
export default {
  watch: {
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('dark', val)
    }
  }
}
</script>
