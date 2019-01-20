const pkg = require('./package')
import webpack from 'webpack'

module.exports = {
  mode: 'universal',
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    baseApi: 'http://localhost:3000' + "/api"
  },
  router: {
    base: '/'
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [

      { rel: 'stylesheet', href: '/css/style.css' },
      { rel: 'stylesheet', href: '/css/colors/blue.css' }

    ],
    // ,
    script: [
      { src: '/js/jquery-3.3.1.min.js' },
      { src: '/js/jquery-migrate-3.0.0.min.js' },
      { src: '/js/tippy.all.min.js' },
      { src: '/js/simplebar.min.js' },
      { src: '/js/bootstrap-slider.min.js' },
      { src: '/js/snackbar.js' },
      { src: '/js/clipboard.min.js' },
      { src: '/js/counterup.min.js' },
      { src: '/js/magnific-popup.min.js' },
      { src: '/js/slick.min.js' },
      { src: '/js/custom.js' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */

  /*
  ** Plugins to load before mounting the App
  */

  plugins: [
    '~plugins/filters.js'
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios',
    // Doc: https://bootstrap-vue.js.org/docs/
    ['bootstrap-vue/nuxt', { css: false }],
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
      })],
    extractCSS: true,
    extend (config, { isClient }) {
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
