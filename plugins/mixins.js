import Vue from 'vue'

Vue.mixin({
  methods: {
    // isMobile() {
    //   // if (process.browser) {
    //   //   var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
    //   //   if (width < 990)
    //   //     return true;
    //   //   else
    //   //     return false;
    //   // }
    //   var MobileDetect = require('mobile-detect'),
    //     md = new MobileDetect(req.headers['user-agent']);
    //   console.log(md);

    //   return false;

    // },
    isHomePage() {
      if (this.$router.currentRoute.path.toString() == '/')
        return true;
      else
        return false;
    },
    createMetaTags(metaTags) {
      var metaTags =
        [
          {
            hid: "description",
            name: "description",
            content: metaTags.description
          },
          {
            property: "og:title",
            content: metaTags.socialTitle
          },
          {
            property: "og:description",
            content: metaTags.socialDescription
          },
          {
            property: "og:url",
            content: metaTags.canonical
          },
          ,
          {
            property: "og:site_name",
            content: metaTags.siteName
          },
          {
            name: "twitter:card",
            content: metaTags.title
          },
          {
            name: "twitter:site",
            content: metaTags.twitter
          },
          {
            name: "twitter:creator",
            content: metaTags.twitter
          }

        ];
      return metaTags[0];
    }
  }
})