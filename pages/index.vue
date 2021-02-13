<template>
  <div>
    <v-app-bar color="transparent" dense flat absolute>
      <v-spacer />
      <v-dialog v-model="cus_dialog" max-width="400">
        <template #activator="{ on, attrs }">
          <v-btn
            text
            v-bind="attrs"
            v-on="on"
          >
            register
          </v-btn>
        </template>
        <v-card class="">
          <v-form ref="form_add" @submit.prevent="save">
            <v-card-title class="px-5">
              <span class="headline">Register Customer</span>
              <v-spacer />
              <v-btn icon @click="cus_dialog=false">
                <v-icon>
                  mdi-close
                </v-icon>
              </v-btn>
            </v-card-title>
            <v-divider />
            <v-card-text class="px-10">
              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="cus.name"
                    label="Name"
                    prepend-inner-icon="mdi-account"
                    :rules="[v => !!v||'enter_cus_name']"
                    outlined
                    validate-on-blur
                  />
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    ref="cusemail"
                    v-model="cus.email"
                    label="EmailAddress"
                    prepend-inner-icon="mdi-at"
                    :rules="emailRules"
                    clearable
                    outlined
                    validate-on-blur
                  />
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="cus.phone"
                    v-mask="mask_phone"
                    validate-on-blur
                    label="Phone"
                    outlined
                    prepend-inner-icon="mdi-phone"
                    :rules="[v => !!v || 'enter_phone']"
                  />
                </v-flex>
              </v-layout>

              <v-layout wrap>
                <v-flex xs12>
                  <v-text-field
                    v-model="cus.address"
                    label="address"
                    outlined
                    prepend-inner-icon="mdi-home"
                  />
                </v-flex>
              </v-layout>
            </v-card-text>
            <v-divider />
            <v-card-actions class="pb-5 px-10">
              <v-spacer />
              <v-btn color="primary" type="submit">
                Create
              </v-btn>
            </v-card-actions>
          </v-form>
        </v-card>
      </v-dialog>
      <v-btn icon class="mr-3" @click="$vuetify.theme.dark=!$vuetify.theme.dark">
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <language />
    </v-app-bar>
    <v-container>
      <v-row justify="center" class="mt-12 mb-5">
        <div>
          <h1>Welcome to NPOS</h1>
        </div>
      </v-row>
      <div v-if="showpage">
        <v-row justify="center">
          <v-col cols="12" md="5" sm="6">
            <v-form ref="form_customer" @submit.prevent="findcustomer">
              <v-text-field
                id="customerID"
                v-model="search"
                placeholder="Search Customer ID"
                outlined
                clearable
                validate-on-blur
                class="rounded-pill"
                :error-messages="messages"
              >
                <template #append>
                  <v-divider class="mx-2 my-n2" vertical />
                  <v-icon class="mx-2">
                    mdi-magnify
                  </v-icon>
                </template>
              </v-text-field>
            </v-form>
          </v-col>
        </v-row>

        <v-slide-y-transition>
          <v-row v-if="customers.cus_id" justify="center">
            <v-col cols="12" md="5" sm="6">
              <v-card>
                <v-list>
                  <v-list-item>
                    <v-list-item-avatar>
                      <v-icon large class="grey lighten-1" dark>
                        mdi-account
                      </v-icon>
                    </v-list-item-avatar>

                    <v-list-item-content>
                      <v-list-item-title>{{ customers.cus_name }}</v-list-item-title>
                      <v-list-item-subtitle>ID : {{ changcode(customers.cus_code) }}</v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon />
                    <v-list-item-content>
                      <v-list-item-title>
                        {{ customers.cus_cash | currency('฿ ') }}
                      </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                      <v-btn dark color="primary" @click="topup(customers)">
                        TOP UP
                      </v-btn>
                    </v-list-item-icon>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon />
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Email : {{ changmail(customers.cus_email) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item>
                    <v-list-item-icon />
                    <v-list-item-content>
                      <v-list-item-subtitle>
                        Phone : {{ changphone(customers.cus_phone) }}
                      </v-list-item-subtitle>
                    </v-list-item-content>
                  </v-list-item>

                  <v-divider inset />

                  <v-list-item @click="show_history">
                    <v-list-item-icon>
                      <v-icon>mdi-history</v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                      <v-list-item-title>History</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
        </v-slide-y-transition>
      </div>

      <v-dialog v-model="dialog_history" max-width="600">
        <v-card class="pa-3">
          <v-data-table
            :items="listshistory"
          >
            <template #top>
              <v-card-title>
                <span>History</span>
                <v-spacer />
                <v-btn icon dack class="mr-n5 mt-n8" @click="dialog_history=false">
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-card-title>
              <v-divider />
            </template>

            <template #body="{ items }">
              <thead>
                <tr>
                  <th>#</th>
                  <th>OrderNO</th>
                  <th>Total</th>
                  <th>Get</th>
                  <th>Change</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(item, index) in items" :key="index">
                  <td>{{ index+1 }}</td>
                  <td>{{ item.s_order }}</td>
                  <td>{{ item.s_total }}</td>
                  <td>{{ item.s_get }}</td>
                  <td>{{ item.s_change }}</td>
                  <td>{{ item.s_date }}</td>
                </tr>
              </tbody>
            </template>
          </v-data-table>
        </v-card>
      </v-dialog>

      <v-dialog v-model="dialog_topup" max-width="400">
        <v-card>
          <v-card-title>
            <span>TOPUP</span>
            <v-spacer />
            <v-btn icon dack class="mr-n4 mt-n3" @click="dialog_topup=false">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </v-card-title>
          <v-divider />
          <v-window v-model="step">
            <v-window-item :value="1">
              <v-card-text class="pa-5">
                <v-text-field
                  v-model="cash"
                  placeholder="0000"
                  suffix="฿"
                  prepend-inner-icon="mdi-cash"
                />
                <v-row justify="center">
                  <v-chip-group
                    mandatory
                  >
                    <v-chip
                      v-for="size in sizes"
                      :key="size"
                      :value="size"
                      filter
                      outlined
                      @click="cashvalue (size)"
                    >
                      {{ size }}
                    </v-chip>
                  </v-chip-group>
                  <!-- <v-btn color="primary" @click="cashvalue (10)">
                    10
                  </v-btn>
                  <v-btn color="primary" @click="cashvalue (20)">
                    20
                  </v-btn>
                  <v-btn color="primary" @click="cashvalue (50)">
                    50
                  </v-btn>
                  <v-btn color="primary" @click="cashvalue (100)">
                    100
                  </v-btn>
                  <v-btn color="primary" @click="cashvalue (500)">
                    500
                  </v-btn> -->
                </v-row>
              </v-card-text>
            </v-window-item>

            <v-window-item :value="2">
              <v-card-text>
                <v-list>
                  <v-list-item>
                    ID : {{ cus_code }}
                  </v-list-item>
                  <v-list-item>
                    Cash : {{ cash }}
                  </v-list-item>
                  <v-list-item>
                    Totle : {{ cash }} + {{ customers.cus_cash }} = {{ cash + customers.cus_cash | currency('฿ ') }}
                  </v-list-item>
                </v-list>
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
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data: () => ({
    search: '',
    customers: {},
    dialog_history: false,
    dialog_topup: false,
    listshistory: [],
    step: 1,
    cus_code: '',
    messages: '',
    cus_dialog: false,
    cus: {
      name: '',
      email: '',
      phone: '',
      address: ''
    },
    mask_phone: '###-####-####',
    emailRules: [
      v => !!v || 'E-mail is required',
      v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
    ],
    cash: '',
    sizes: [10, 20, 50, 100, 500, 1000]
  }),
  head () {
    return { title: 'NPOS' }
  },
  computed: {
    showpage () {
      if (this.dialog_topup) {
        return false
      } else if (this.dialog_history) {
        return false
      } else {
        return true
      }
    }
  },
  watch: {
    messages (val) {
      if (val) {
        setTimeout(() => {
          this.messages = ''
        }, 3000)
      }
    },
    search (val) {
      if (!val) {
        this.customers = {}
      }
    },
    cus_dialog (val) {
      if (!val) {
        this.cus = {}
      }
    },
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('dark', val)
    }
  },
  mounted () {
  },
  methods: {
    async findcustomer () {
      if (!this.search) {
        this.messages = 'Please Enter Customer ID'
      } else {
        await this.$axios.$post('/customer/findID', { code: this.search }).then((res) => {
          if (res.success) {
            this.messages = ''
            this.customers = res.data
          } else {
            this.customers = {}
            this.messages = 'NO DATA Customer'
            this.search = ''
          }
        })
      }
    },
    topup (data) {
      this.cus_code = data.cus_code
      this.dialog_topup = true
    },
    topupsubmit () {},
    async show_history () {
      await this.$axios.$post('/customer/history', { id: this.customers.cus_id })
        .then((res) => {
          if (res.success) {
            if (res.data.length > 0) {
              this.dialog_history = true
              this.listshistory = res.data
            } else {
              this.listshistory = []
              this.$store.commit('SET_ERROR', 'NO DATA History')
            }
          }
        })
    },
    async save () {
      if (this.$refs.form_add.validate()) {
        this.$store.commit('LOADIND_DIALOG', true)
        await this.$axios.$post('/customer/create', this.cus).then((res) => {
          setTimeout(() => {
            if (res.success) {
              this.$store.commit('SET_SUCCESS', 'Create success')
              this.cus_dialog = false
              this.cus = {}
            } else if (res.error_email) {
              this.$store.commit('SET_ERROR', 'ERROR EMAIL')
              this.cus.email = ''
              this.$refs.cusemail.focus()
            } else {
              this.$store.commit('SET_ERROR', 'ERROR Create')
            }
            this.$store.commit('LOADIND_DIALOG', false)
          }, 1000)
        })
      }
    },
    cashvalue (val) {
      this.cash = val
    },
    changmail (email) {
      if (email) {
        return email.replace(email.substr(2, email.search('@')), '*****')
      }
    },
    changphone (phone) {
      if (phone) {
        return phone.replace(phone.substr(5, 5), '*****')
      }
    },
    changcode (code) {
      if (code) {
        return code.replace(code.substr(5, 5), '*******')
      }
    }
  }
}
</script>
<style>
#customerID {
  margin-left: 10px;
}
</style>
