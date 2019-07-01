const pkg = require('./package')
import webpack from 'webpack'

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    baseApi: 'http://localhost:3000' + "/api"
  },
  router: {
    base: '/',
    prefetchLinks: true

  },


  auth: {
    strategies: {
      local: {
        endpoints: {
          login: { url: 'login', method: 'post', propertyName: 'data.token' },
          user: { url: 'me', method: 'get', propertyName: 'data' },
          logout: false
        }
      }
    }
  },


  toast: {
    position: 'top-center',
    register: [ // Register custom toasts
      {
        name: 'my-error',
        message: 'Oops...Something went wrong',
        options: {
          type: 'error'
        }
      }
    ]
  },

  /*
  ** Headers of the page
  */
  head: {
    title: "Jewish Jobs on Macher: The Largest Jewish Classifieds Website in the US",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: "The largest jewish jobs website in NYC, Brooklyn, Boro Park, Five Towns, Crown Heights, Woodmere, Monsey, Lakewood and more." }
    ],
    link: [
      { rel: 'stylesheet', href: '/css/style.css' },
      { rel: 'stylesheet', href: '/css/colors/blue.css' },
      { rel: 'stylesheet', href: '/css/modal.css' },
      { rel: 'stylesheet', href: '/css/bootstrap-fs-modal.css' }
    ],
    // ,
    script: [
      { src: '/js/jquery-3.3.1.min.js' },
      { src: '/js/jquery-migrate-3.0.0.min.js' },
      { src: '/js/mmenu.min.js' },
      { src: '/js/tippy.all.min.js' },
      { src: '/js/simplebar.min.js' },
      { src: '/js/bootstrap-slider.min.js' },
      //{ src: '/js/bootstrap-select.min.js' },
      //{ src: '/node_modules/vue-bootstrap-selectpicker/dist/js/vue-bootstrap-selectpicker.js' },
      { src: '/js/snackbar.js' },
      { src: '/js/clipboard.min.js' },
      { src: '/js/counterup.min.js' },
      { src: '/js/magnific-popup.min.js' },
      { src: '/js/slick.min.js' },
      { src: '/js/custom.1.js' },
      { src: '/js/popper.min.js' },
      { src: '/js/util.js' },
      { src: '/js/modal.js' }

    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: "~/components/Loading.vue",

  /*
  ** Global CSS
  */

  /*
  ** Plugins to load before mounting the App
  */

  plugins: [
    '~plugins/filters.js',
    '~plugins/mixins.js'
    //   { src: '~plugins/vue-select', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // Doc: https://bootstrap-vue.js.org/docs/
    ['bootstrap-vue/nuxt', { css: false }],
    '@nuxtjs/toast'

  ],
  serverMiddleware: ['~/api/index.js'],
  /*
  ** Axios module configuration
  */
  axios: {

    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    plugins: [
      new webpack.ProvidePlugin({
        '$': 'jquery',
        'jQuery': 'jquery',
        'window.jQuery': 'jquery'
      })
      // ,
      // new webpack.ProvidePlugin({
      //   'select': 'bootstrap-select'
      // })
    ],
    extractCSS: true,
    extend(config, { isClient }) {
      // config.devtool = 'source-map'
      // return Object.assign({}, config, {
      //   devtool: 'source-map'
      // })
      if (isClient)
        config.devtool = 'eval-source-map'
      else
        config.devtool = "inline-source-map"

    }
  }
}
