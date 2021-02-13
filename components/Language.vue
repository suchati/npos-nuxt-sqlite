<template>
  <v-btn-toggle value="$i18n.locale">
    <v-btn :to="switchLocalePath('en')" small>
      EN
    </v-btn>
    <v-btn :to="switchLocalePath('th')" small>
      TH
    </v-btn>
  </v-btn-toggle>
</template>
