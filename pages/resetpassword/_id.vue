<template>
  <v-layout fill-height align-center justify-center>
    <app-bar />
    <v-card class="pa-5 rounded-lg" width="320">
      <v-form ref="form_reset" @submit.prevent="reset_password">
        <v-card-title class="title justify-center mb-5">
          <span class="text-h5 font-weight-bold page-title">
            {{ $t("reset_title") }}
          </span>
        </v-card-title>
        <v-card-text class="pb-0">
          <div class="text--secondary body-1">
            {{ $t("code_lbl") }}
          </div>
          <v-row no-gutters class="mb-n1 mt-1">
            <v-col cols="2">
              <v-text-field
                id="code-1"
                ref="code1"
                v-model="code.c1"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                validate-on-blur
                class="code-reset font-weight-black"
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c1, $refs.code2, $refs.code1)"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                id="code-2"
                ref="code2"
                v-model="code.c2"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                class="code-reset font-weight-black"
                validate-on-blur
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c2, $refs.code3, $refs.code1)"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                id="code-3"
                ref="code3"
                v-model="code.c3"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                class="code-reset font-weight-black"
                validate-on-blur
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c3, $refs.code4, $refs.code2)"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                id="code-4"
                ref="code4"
                v-model="code.c4"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                class="code-reset font-weight-black"
                validate-on-blur
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c4, $refs.code5, $refs.code3)"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                id="code-5"
                ref="code5"
                v-model="code.c5"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                class="code-reset font-weight-black"
                validate-on-blur
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c5, $refs.code6, $refs.code4)"
              />
            </v-col>

            <v-col cols="2">
              <v-text-field
                id="code-6"
                ref="code6"
                v-model="code.c6"
                v-mask="code_mask"
                placeholder="0"
                outlined
                dense
                class="code-reset font-weight-black"
                validate-on-blur
                :rules="[(v) => !!v || '']"
                @keyup="enter_code(code.c6, $refs.new_password, $refs.code5)"
              />
            </v-col>
          </v-row>

          <v-text-field
            ref="new_password"
            v-model="new_password"
            :label="$t('pass_new')"
            :rules="[
              (v) => !!v || $t('val_password'),
              (v) => v.length >= 8 || $t('val_min8'),
            ]"
            :append-icon="show_pass ? 'mdi-eye' : 'mdi-eye-off'"
            :type="show_pass ? 'text' : 'password'"
            min="8"
            counter
            outlined
            validate-on-blur
            @click:append="show_pass = !show_pass"
          />

          <v-text-field
            ref="new_pass_try"
            v-model="new_pass_try"
            :label="$t('pass_try')"
            :rules="[
              (v) => !!v || $t('val_password'),
              (v) => v.length >= 8 || $t('val_min8'),
              confirm_password || $t('some_value'),
            ]"
            append-icon="mdi-key"
            type="password"
            min="8"
            outlined
            validate-on-blur
            counter
          />
        </v-card-text>
        <v-card-actions class="px-5 mb-5">
          <v-btn
            color="primary"
            dark
            block
            rounded
            large
            type="submit"
          >
            {{ $t("save") }}
          </v-btn>
        </v-card-actions>
      </v-form>
    </v-card>
  </v-layout>
</template>

<script>
export default {
  name: 'Resetpassword',
  middleware: ['NoAuth'],
  data: () => ({
    code: {
      c1: '',
      c2: '',
      c3: '',
      c4: '',
      c5: '',
      c6: ''
    },
    code_mask: '#',
    new_password: '',
    new_pass_try: '',
    show_pass: false,
    show_pass_try: false,
    Time: 120,
    id: ''
  }),
  head () {
    return {
      title: 'RESET PASSWORD'
    }
  },
  computed: {
    confirm_password () {
      return this.new_pass_try === this.new_password
    }
  },
  mounted () {
    if (!this.$route.params.id) {
      return this.$router.push(this.localePath('/login'))
    }
    setTimeout(() => {
      this.$refs.code1.focus()
    }, 100)
  },
  methods: {
    enter_code (code, co1, co2) {
      const evt = code || window.event
      const Code = evt.which ? evt.which : evt.keyCode
      if (Code > 31 && (Code < 48 || Code > 57) && Code !== 46) {
        evt.preventDefault()
      } else if (code === '') {
        co2.focus()
      } else {
        co1.focus()
      }
    },
    async reset_password () {
      if (this.$refs.form_reset.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        const codereset =
          this.code.c1 +
          this.code.c2 +
          this.code.c3 +
          this.code.c4 +
          this.code.c5 +
          this.code.c6
        const Data = {
          id: this.$route.params.id,
          code: codereset,
          password: this.new_password
        }
        await this.$axios.$post('/reset_password', Data).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit(
                'SET_SUCCESS', 'Your password has been changed successfully. Please login with the new password.'
              )
              setTimeout(() => {
                this.$router.push(this.localePath('/login'))
              }, 1000)
            } else {
              this.code.c1 = ''
              this.code.c2 = ''
              this.code.c3 = ''
              this.code.c4 = ''
              this.code.c5 = ''
              this.code.c6 = ''
              this.new_password = ''
              this.new_pass_try = ''
              this.$refs.code1.focus()
              this.$store.commit('SET_ERROR', 'erroe code')
            }
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    }
  }
}
</script>

<style>
.code-reset {
  margin-left: 0.5px !important;
  margin-right: 0.5px !important;
}
input#code-1,
input#code-2,
input#code-3,
input#code-4,
input#code-5,
input#code-6 {
  text-align: center;
  font-size: 20px;
}
</style>
