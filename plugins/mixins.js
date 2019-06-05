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
          // {
          //   hid: "description",
          //   name: "description",
          //   content: metaTags.description
          // },
          {
            vmid: "og:title",
            property: "og:title",
            content: metaTags.socialTitle
          },
          {
            vmid: "og:description",
            property: "og:description",
            content: metaTags.socialDescription
          },
          {
            vmid: "og:url",
            property: "og:url",
            content: metaTags.canonical
          },
          ,
          {
            vmid: "og:site_name",
            property: "og:site_name",
            content: metaTags.siteName
          },
          {
            vmid: "twitter:card",
            name: "twitter:card",
            content: metaTags.title
          },
          {
            vmid: "twitter:site",
            name: "twitter:site",
            content: metaTags.twitter
          },
          {
            vmid: "twitter:creator",
            name: "twitter:creator",
            content: metaTags.twitter
          },
          { itemprop: 'name', content: metaTags.title },
          { itemprop: 'description', content: metaTags.description }
        ];
      return metaTags;
    }
  }
})