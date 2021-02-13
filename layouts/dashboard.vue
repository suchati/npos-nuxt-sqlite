<template>
  <v-app dark>
    <v-app-bar dense app>
      <v-app-bar-nav-icon @click.stop="mini = !mini">
        <v-icon v-if="mini">
          mdi-format-indent-increase
        </v-icon>
        <v-icon v-else>
          mdi-format-indent-decrease
        </v-icon>
      </v-app-bar-nav-icon>
      <v-divider class="mx-3" inset vertical />
      <v-toolbar-title>Dashboard</v-toolbar-title>

      <v-spacer />

      <notification />

      <v-divider class="mx-2" inset vertical />

      <language />

      <v-divider class="mx-2" inset vertical />

      <v-btn icon @click="setting_Drawer = true">
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer
      app
      permanent
      :dark="barColor !== 'rgba(228, 226, 226, 1), rgba(255, 255, 255, 0.7)'"
      :mini-variant="mini"
      v-bind="$attrs"
    >
      <template v-if="offonImage" #img="props">
        <v-img
          :src="require(`assets/images/sidebar/sidebar-${barImage}.jpg`)"
          :gradient="`to bottom, ${barColor}`"
          v-bind="props"
        />
      </template>
      <v-list-item :class="mini ? 'px-2' : ''">
        <v-list-item-avatar>
          <v-img src="/LOGO.png" />
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title class="title">
            username
          </v-list-item-title>
          <v-list-item-subtitle> email </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
      <v-divider />

      <menu-drawer :offon="offoncolor" :mini="mini" :color="color" />

      <template #append>
        <v-menu
          v-model="sidebarsetting"
          :close-on-content-click="false"
          offset-x
          transition="slide-x-transition"
        >
          <template #activator="{ on, attrs }">
            <v-divider />
            <v-list-item v-bind="attrs" v-on="on">
              <v-list-item-icon :class="!mini && 'pl-2'">
                <v-icon>mdi-cog-outline</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Setting</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>
          <v-card height="500" width="260">
            <v-card-title>
              Setting
              <v-spacer />
              <v-btn icon @click="sidebarsetting = false">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>

            <v-divider />

            <v-list>
              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Dark Mode </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="$vuetify.theme.dark"
                    :label="$vuetify.theme.dark ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Link Color </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="offoncolor"
                    :label="offoncolor ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
              <v-list-item v-if="offoncolor">
                <v-list-item-content>
                  <v-item-group
                    v-model="color"
                    class="d-flex justify-space-between mb-3"
                  >
                    <v-item
                      v-for="(co, index) in colors"
                      :key="index"
                      :value="co"
                      class="mx-1"
                    >
                      <template #default="{ active }">
                        <v-avatar
                          size="30"
                          :color="co"
                          :class="active && 'v-settings__item--active'"
                          class="d-inline-block v-settings__item"
                          @click="color = co"
                        />
                      </template>
                    </v-item>
                  </v-item-group>
                </v-list-item-content>
              </v-list-item>

              <v-divider />

              <v-list-item>
                <v-list-item-content>
                  <v-list-item-title> Background </v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-switch
                    v-model="offonImage"
                    :label="offonImage ? 'ON' : 'OFF'"
                    class="ma-0 pa-0"
                    inset
                    hide-details
                  />
                </v-list-item-icon>
              </v-list-item>
              <v-divider />
              <v-list-item v-if="offonImage">
                <v-list-item-content>
                  <v-item-group
                    v-model="image"
                    class="d-flex justify-space-between mb-3"
                  >
                    <v-item
                      v-for="(img, index) in images"
                      :key="index"
                      :value="img"
                      class="mx-1"
                    >
                      <template #default="{ active, toggle }">
                        <v-sheet
                          :class="active && 'v-settings__item--active'"
                          class="d-inline-block v-settings__item rounded-lg"
                          @click="toggle((barImage = img))"
                        >
                          <v-img
                            class="rounded-lg"
                            :src="
                              require(`assets/images/sidebar/sidebar-${img}.jpg`)
                            "
                            height="100"
                            width="43"
                          />
                        </v-sheet>
                      </template>
                    </v-item>
                  </v-item-group>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card>
        </v-menu>
      </template>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="setting_Drawer" app temporary right>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">
            <strong>Setting </strong>
          </v-list-item-title>
        </v-list-item-content>
        <v-spacer />
        <v-btn icon @click="setting_Drawer = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider />

      <v-list>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Dark Mode </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <v-switch
              v-model="$vuetify.theme.dark"
              inset
              :label="$vuetify.theme.dark ? 'ON' : 'OFF'"
              class="ma-0 pa-0"
              hide-details
            />
          </v-list-item-icon>
        </v-list-item>

        <v-divider />

        <v-list-item>
          <v-list-item-content>
            <v-list-item-title> Language </v-list-item-title>
          </v-list-item-content>
          <v-list-item-icon>
            <!-- <language /> -->
            <v-btn-toggle tile>
              <v-btn small :to="switchLocalePath('en')">
                EN
              </v-btn>
              <v-btn small :to="switchLocalePath('th')">
                TH
              </v-btn>
            </v-btn-toggle>
          </v-list-item-icon>
        </v-list-item>
        <v-divider />
        <v-divider />
        <v-list-group>
          <template #activator>
            <v-list-item-content>
              <v-list-item-title> Backup </v-list-item-title>
            </v-list-item-content>
          </template>
          <v-divider />
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title> Database </v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-btn :loading="backuploading" color="primary" @click="backup">
                Start
              </v-btn>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <v-divider />
      </v-list>

      <template #append>
        <v-dialog v-model="dialog_logout" width="400">
          <template #activator="{ on, attrs }">
            <div class="pa-2">
              <v-btn block dark color="red" v-bind="attrs" v-on="on">
                <v-icon>mdi-logout-variant</v-icon>
                <span class="ml-2">LOGOUT</span>
              </v-btn>
            </div>
          </template>

          <v-card>
            <v-card-title class="headline">
              Logout
            </v-card-title>
            <v-divider />
            <v-card-text>
              Lorem ipsum dolor sit amet, consectetur.
            </v-card-text>

            <v-divider />

            <v-card-actions>
              <v-spacer />
              <v-btn color="error" @click="Logout()">
                yes
              </v-btn>
              <v-btn color="success" @click="dialog_logout = false">
                no
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </template>
    </v-navigation-drawer>

    <v-main :class="!$vuetify.theme.dark && 'light-green lighten-5'">
      <nuxt />
    </v-main>
    <loading-dialog />
    <snackbar />
  </v-app>
</template>

<script>
export default {
  name: 'DashboardLayout',
  data: () => ({
    setting_Drawer: false,
    sidebarsetting: false,
    mini: true,
    offonImage: true,
    barImage: '1',
    barColor: 'rgba(0, 0, 0, .6), rgba(0, 0, 0, .8)',
    image: '1',
    images: ['1', '2', '3', '4'],
    offoncolor: false,
    color: '',
    colors: ['primary', 'success', 'pink', 'red', 'teal', 'amber'],
    dialog_logout: false,
    backuploading: false
  }),
  watch: {
    '$vuetify.theme.dark' (val) {
      this.$cookies.set('dark', val)
    }
  },
  beforeCreate () {
    this.$vuetify.theme.dark = (this.$cookies.get('dark') === true)
  },
  methods: {
    async backup () {
      this.backuploading = true
      await this.$axios.$post('/home/backupDB/').then((res) => {
        setTimeout(() => {
          if (res.success) {
            this.$store.commit('SET_SUCCESS', 'Backup success')
          } else {
            this.$store.commit('SET_ERROR', 'erorr Backup')
          }
          this.backuploading = false
        }, 2000)
      })
    },
    Logout () {
      this.$auth.logout()
      this.$router.push('/login')
    }
  }
}
</script>

<style>
html {
  overflow-y: auto;
}
.page-enter-active,
.page-leave-active {
  transition: opacity 0.5s;
}
.page-enter,
.page-leave-to {
  opacity: 0;
}
.v-settings.v-item-group > * {
  cursor: pointer;
}
.v-settings__item {
  border-width: 3px;
  border-style: solid;
  border-color: transparent !important;
}
.v-avatar.v-settings__item.v-settings__item--active,
.v-settings__item--active {
  border-color: #00cae3 !important;
}
</style>
