export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s',
    title: 'pos',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  loading: {
    color: '#00cd81'
  },
  ssr: false,
  loadingIndicator: {
    name: 'rectangle-bounce',
    color: 'white',
    background: '#121212'
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/vue-plugins.js'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    'nuxt-i18n',
    'cookie-universal-nuxt'
  ],

  // Server Middleware
  serverMiddleware: [
    { path: '/server', handler: '~/server' }
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.NODE_ENV === 'production' ? 'https://neeb-npos.herokuapp.com/server/' : 'http://localhost:3000/server/'
  },

  auth: {
    strategies: {
      local: {
        token: {
          maxAge: 28800,
          property: 'token'
        },
        user: {
          property: 'user'
        },
        endpoints: {
          login: { url: '/login', method: 'post' },
          user: { url: '/user/me', method: 'post' }
        }
      }
    }
  },

  i18n: {
    locales: [
      {
        code: 'en',
        name: 'TH',
        file: 'en.js'
      },
      {
        code: 'th',
        name: 'EN',
        file: 'th.js'
      }
    ],
    lazy: true,
    langDir: 'locales/',
    defaultLocale: 'en',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'language'
    }
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  vuetify: {
    theme: {
      dark: true
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
