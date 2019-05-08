export default {
    head () {
      return {
        title: this.meta.title,
        meta:
        [
          {
            hid: "description",
            name: "description",
            content: this.meta.description
          },
          {
            hid: "og:title",
            property: "og:title",
            content: this.meta.socialTitle
          },
          {
            hid: "og:description",
            property: "og:description",
            content: this.meta.socialDescription
          },
          {
            hid: "og:url",
            property: "og:url",
            content: this.meta.canonical
          },
          ,
          {
            hid: "og:site_name",
            property: "og:site_name",
            content: this.meta.siteName
          },
          {
            hid: "twitter:card",
            name: "twitter:card",
            content: this.meta.title
          },
          {
            hid: "twitter:site",
            name: "twitter:site",
            content: this.meta.twitter
          },
          {
            hid: "twitter:creator",
            name: "twitter:creator",
            content: this.meta.twitter
          },
          { itemprop: 'name', content: this.meta.title },
          { itemprop: 'description', content: this.meta.description }
        ]
      }
    }
  }