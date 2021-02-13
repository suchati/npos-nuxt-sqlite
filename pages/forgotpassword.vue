<template>
  <v-layout fill-height align-center justify-center>
    <app-bar />
    <v-card class="pa-5 rounded-lg" width="320">
      <v-form ref="form_forgot" @submit.prevent="forgot">
        <v-card-title class="title justify-center mb-5">
          <span class="text-h5 font-weight-bold page-title">
            {{ $t('forgot') }}
          </span>
        </v-card-title>
        <v-alert
          v-model="forgot_alert_success"
          dense
          text
          type="success"
        >
          The code and link has been sent to {{ email_text }}.
          <br>
          Please check your email.
        </v-alert>
        <v-card-text>
          <v-text-field
            ref="email"
            v-model="email"
            :label="$t('email')"
            :placeholder="$t('email')"
            clearable
            outlined
            validate-on-blur
            append-icon="mdi-email"
            type="email"
            :rules="[
              v=>!!v || $t('val_data'),
              v => /.+@.+\..+/.test(v) || $t('val_email')
            ]"
          />
          <span class="caption grey--text text--darken-1">
            {{ $t('sub_email') }}
          </span>
        </v-card-text>
        <v-card-actions class="px-5">
          <v-btn
            color="primary"
            dark
            block
            rounded
            large
            type="submit"
          >
            {{ $t('send') }}
            <v-icon class="ml-1">
              mdi-send-outline
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="center" class="my-5">
          <v-btn
            text
            small
            class="grey--text caption"
            :to="localePath('/login')"
          >
            <v-icon small class="mr-1">
              mdi-login
            </v-icon>
            {{ $t('login') }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Forgotpassword',
  middleware: ['NoAuth'],
  data: () => ({
    email: '',
    email_text: '',
    forgot_alert_success: false
  }),
  head () {
    return {
      title: 'FORGOTPASSWORD'
    }
  },
  computed: {
  },
  mounted () {
    setTimeout(() => {
      this.$refs.email.focus()
    }, 100)
  },
  methods: {
    async forgot () {
      if (this.$refs.form_forgot.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        await this.$axios.$post('/forgot_password', { email: this.email }).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.email_text = this.email
              this.email = ''
              this.forgot_alert_success = true
            } else if (res.noactivate) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'This is Username NO Activate')
            } else if (res.notgmail) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'No_GMAIL')
            } else if (res.nosend) {
              this.email = ''
              this.$refs.email.focus()
              this.$store.commit('SET_ERROR', 'No_Send')
            } else {
              this.$store.commit('SET_ERROR', 'NO_User')
              this.email = ''
              this.$refs.email.focus()
            }
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    }
  }
}
</script>
