<template>
  <v-layout fill-height align-center justify-center>
    <app-bar />
    <v-card class="pa-5 rounded-lg" width="320">
      <v-form ref="form_login" @submit.prevent="check_login">
        <v-card-title class="title justify-center mb-5">
          <span class="text-h4 font-weight-bold page-title">
            {{ $t("login") }}
          </span>
        </v-card-title>
        <v-card-text>
          <v-text-field
            ref="username"
            v-model="username"
            :label="$t('username')"
            append-icon="mdi-account"
            validate-on-blur
            :rules="[(v) => !!v || $t('val_username')]"
          />

          <v-text-field
            ref="password"
            v-model="password"
            :label="$t('password')"
            min="8"
            validate-on-blur
            :append-icon="showpass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="showpass ? 'text' : 'password'"
            :rules="[
              (v) => !!v || $t('val_password'),
              (v) => v.length >= 8 || $t('val_min8'),
            ]"
            counter
            @click:append="() => (showpass = !showpass)"
          />
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
            {{ $t("login") }}
            <v-icon class="ml-1">
              mdi-arrow-right-bold-circle-outline
            </v-icon>
          </v-btn>
        </v-card-actions>
        <v-row justify="space-around" class="my-5">
          <v-btn
            text
            small
            class="grey--text caption"
            :to="localePath('/forgotpassword')"
          >
            <v-icon small class="mr-1">
              mdi-account-key-outline
            </v-icon>
            {{ $t("forgot") }}
          </v-btn>

          <v-btn
            text
            small
            class="grey--text caption"
            :to="localePath('/register')"
          >
            <v-icon small class="mr-1">
              mdi-account-edit-outline
            </v-icon>
            {{ $t("register") }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Login',
  auth: 'guest',
  data: () => ({
    username: '',
    password: '',
    showpass: false
  }),
  head () {
    return {
      title: 'LOGIN'
    }
  },
  computed: {},
  mounted () {
    setTimeout(() => {
      this.$refs.username.focus()
    }, 100)
  },
  methods: {
    async check_login () {
      if (this.$refs.form_login.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        const data = { username: this.username, password: this.password }
        await this.$axios.$post('/login', data).then((res) => {
          setTimeout(() => {
            if (res.errorusername) {
              this.username = ''
              this.$refs.username.focus()
              this.$store.commit('SET_ERROR', 'ERROR Username')
            } else if (res.noactivate) {
              this.password = ''
              this.username = ''
              this.$refs.username.focus()
              this.$store.commit('SET_ERROR', 'This is Username NO Activate')
            } else if (res.errorpassword) {
              this.password = ''
              this.$refs.password.focus()
              this.$store.commit('SET_ERROR', 'Login.P_no_match')
            } else if (res.success) {
              this.$auth.loginWith('local', { data })
                .then(() => this.$router.push(this.localePath('/sales')))
            } else {
              this.username = ''
              this.password = ''
              this.$refs.username.focus()
              this.$store.commit('SET_ERROR', 'error')
            }
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    }
  }
}
</script>
