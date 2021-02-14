<template>
  <v-layout fill-height align-center justify-center>
    <app-bar />
    <v-card class="px-5 rounded-lg" width="350">
      <v-card-text v-if="register_success">
        <v-alert
          dense
          text
          type="success"
        >
          The Password has been sent to {{ email }}.
          <br>
          Please check your email and cilck Activate
        </v-alert>
      </v-card-text>
      <v-form v-if="!register_success" ref="form_register" @submit.prevent="register">
        <v-card-title class="title justify-center mb-5">
          <span class="text-h4 font-weight-bold page-title">
            {{ $t("register") }}
          </span>
        </v-card-title>
        <v-card-text class="pb-0">
          <v-text-field
            ref="username"
            v-model="user.username"
            :label="$t('username')"
            prepend-inner-icon="mdi-account"
            :rules="[(v) => !!v || $t('val_username')]"
            outlined
            validate-on-blur
          />
          <v-text-field
            ref="email"
            v-model="user.email"
            :label="$t('email')"
            prepend-inner-icon="mdi-at"
            :rules="[
              (v) => !!v || $t('val_data'),
              (v) => /.+@.+\..+/.test(v) || $t('val_email'),
            ]"
            clearable
            outlined
            validate-on-blur
          />
          <v-text-field
            ref="name"
            v-model="user.name"
            :label="$t('name')"
            prepend-inner-icon="mdi-account"
            :rules="[(v) => !!v || $t('val_data')]"
            outlined
            validate-on-blur
          />
          <v-text-field
            ref="phone"
            v-model="user.phone"
            v-mask="mask_phone"
            :label="$t('phone')"
            validate-on-blur
            outlined
            prepend-inner-icon="mdi-phone"
            :rules="[(v) => !!v || $t('val_data')]"
          />
          <v-text-field
            ref="address"
            v-model="user.address"
            :label="$t('address')"
            outlined
            prepend-inner-icon="mdi-home"
            validate-on-blur
          />
        </v-card-text>
        <v-card-actions class="px-5 pt-0">
          <v-btn
            color="primary"
            dark
            block
            rounded
            large
            type="submit"
          >
            {{ $t("register") }}
          </v-btn>
        </v-card-actions>
        <v-row justify="center" class="my-4">
          <v-btn
            text
            small
            class="grey--text caption"
            :to="localePath('/login')"
          >
            <v-icon small class="mr-1">
              mdi-login
            </v-icon>
            {{ $t("login") }}
          </v-btn>
        </v-row>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Register',
  auth: 'guest',
  data: () => ({
    user: {
      name: '',
      username: '',
      email: '',
      phone: '',
      address: ''
    },
    mask_phone: '###-####-####',
    register_success: false,
    email: ''
  }),
  head () {
    return {
      title: 'REGISTER'
    }
  },
  methods: {
    async register () {
      if (this.$refs.form_register.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        await this.$axios.$post('/users/register', this.user).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'success')
              this.register_success = true
              this.email = this.user.email
              this.reset_form()
            } else if (res.erorr_user) {
              this.$store.commit('SET_ERROR', 'erorr_user')
              this.user.username = ''
              this.$refs.username.focus()
            } else if (res.notgmail) {
              this.$store.commit('SET_ERROR', 'erorr_Gmail')
              this.user.email = ''
              this.$refs.email.focus()
            } else if (res.erorr_email) {
              this.$store.commit('SET_ERROR', 'erorr_email')
              this.user.email = ''
              this.$refs.email.focus()
            } else {
              this.$store.commit('SET_ERROR', 'erorr')
            }
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    },
    reset_form () {
      this.user = {
        name: '',
        username: '',
        email: '',
        phone: '',
        address: ''
      }
    }
  }
}
</script>

<style>
</style>
