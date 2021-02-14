<template>
  <v-container>
    <v-card class="pa-5">
      <v-data-table :headers="headers" :items="users" :search="search">
        <template #top>
          <v-card-title>
            <v-spacer />

            <v-flex xs3 class="mb-n6">
              <v-text-field
                v-model="search"
                append-icon="mdi-magnify"
                placeholder="Search"
                filled
                dense
              />
            </v-flex>
          </v-card-title>
          <div class="py-2">
            <v-divider />
          </div>
        </template>

        <template #body="{ items }">
          <tbody>
            <tr v-for="(item, index) in items" :key="index">
              <td>{{ index + 1 }}</td>
              <td>{{ item.username }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.u_name }}</td>
              <td>{{ item.phone }}</td>
              <td align="right">
                <v-btn
                  v-if="item.activate !== 1"
                  :loading="loading"
                  :disabled="loading"
                  @click="activate(item.u_id)"
                  v-text="'Activate'"
                />
                <v-icon v-else color="success">
                  mdi-check-circle-outline
                </v-icon>
              </td>
            </tr>
          </tbody>
        </template>

        <template #no-results>
          <div>
            <span>NO RESULTS HERE!</span>
            <v-btn color="primary" @click="getallusers">
              Reset
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-card>
  </v-container>
</template>

<script>
export default {
  name: 'User',
  layout: 'dashboard',
  middleware: ['Admin'],
  data: () => ({
    headers: [
      {
        text: '#',
        align: 'start',
        value: 'index'
      },
      {
        text: 'Username ',
        value: 'username'
      },
      {
        text: 'Email',
        value: 'email'
      },
      {
        text: 'Name',
        value: 'u_name'
      },
      {
        text: 'Phone',
        value: 'phone'
      },
      {
        text: 'Activate',
        value: 'activate',
        sortable: false,
        align: 'right'
      }
    ],
    users: [],
    search: '',
    loading: false
  }),
  head () {
    return { title: 'Users' }
  },
  mounted () {
    this.getallusers()
  },
  methods: {
    async getallusers () {
      await this.$axios.$post('/users').then((res) => {
        if (res.success) {
          this.users = res.users
        }
      })
    },
    async activate (id) {
      this.$store.commit('LOADIND_DIALOG', true)
      this.loading = true
      await this.$axios.$post('/user/activateID', { id }).then((res) => {
        setTimeout(() => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Activate User success')
          } else {
            this.$store.commit('SET_ERROR', 'erorr Activate')
          }
          this.getallusers()
          this.loading = false
          this.$store.commit('LOADIND_DIALOG', false)
        }, 3000)
      })
    }
  }
}
</script>
