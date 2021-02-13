<template>
  <v-dialog v-model="dialog_topup" max-width="400">
    <v-card>
      <v-card-title>
        <span>TOPUP</span>
        <v-spacer />
        <v-btn icon dack class="mr-n4 mt-n3" @click="dialog_topup=false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-card-title>
      <v-window v-model="step">
        <v-window-item :value="1">
          <v-card-text>
            <v-text-field
              v-model="customer.cus_code"
              label="Email"
              value="john@vuetifyjs.com"
            />
            <span class="caption grey--text text--darken-1">
              This is the email you will use to login to your Vuetify account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="2">
          <v-card-text>
            <v-text-field
              label="Password"
              type="password"
            />
            <v-text-field
              label="Confirm Password"
              type="password"
            />
            <span class="caption grey--text text--darken-1">
              Please enter a password for your account
            </span>
          </v-card-text>
        </v-window-item>

        <v-window-item :value="3">
          <div class="pa-4 text-center">
            <v-img
              class="mb-4"
              contain
              height="128"
              src="https://cdn.vuetifyjs.com/images/logos/v.svg"
            />
            <h3 class="title font-weight-light mb-2">
              Welcome to Vuetify
            </h3>
            <span class="caption grey--text">Thanks for signing up!</span>
          </div>
        </v-window-item>
      </v-window>

      <v-divider />

      <v-card-actions>
        <v-btn
          :disabled="step === 1"
          text
          @click="step--"
        >
          Back
        </v-btn>
        <v-spacer />
        <v-btn
          :disabled="step === 3"
          color="primary"
          depressed
          @click="step++"
        >
          Next
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog_topup: false,
    mode: '',
    customer: {
      cus_code: '',
      cus_cas: ''
    },
    step: 1
  }),
  computed: {
  },
  methods: {
    open (mode, data) {
      this.dialog_topup = true
      this.mode = mode
      if (data) {
        this.customer = { ...data }
      }
    },
    close () {
      this.dialog_topup = false
    },
    save () {
      if (this.$refs.form_topup.validate()) {
        this.$emit(this.mode, this.customer)
      }
    }
  }

}
</script>
