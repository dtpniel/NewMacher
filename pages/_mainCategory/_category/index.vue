<template>
  <div>
    <div class="margin-top-90"></div>
    <jobs-list/>
  </div>
</template>

<script>
import Route from "vue-router";
import JobsList from "~/components/Jobslist.vue";
import { mapState } from "vuex";

import axios from "axios";

export default {
  data: function() {
    return {
      mainCategory: this.$route.params.mainCategory,
      category: this.$route.params.category
    };
  },

  computed: {
    ...mapState("jobs", {
      metaTags: state => state.metaTags
    })
  },

  components: {
    JobsList
  },
  // async fetch({ store, params }) {
  //   var qstring = {};
  //   qstring = {
  //     qstring: { mainCategory: params.mainCategory, category: params.category }
  //   };
  //   await store.dispatch("jobs/getJobsQueryString", qstring);
  // },

  async asyncData({ app, params, store }) {
    var qstring = {};
    var query = app.context.route.query;
    var stateId = query.stateId ? query.stateId : 0;
    var cityId = query.cityId ? query.cityId : "";
    var mainCategory = params.mainCategory ? params.mainCategory : 0;
    var category = params.category ? params.category : "";

    qstring = {
      qstring: {
        mainCategory: mainCategory,
        category: category,
        stateId: stateId,
        cityId: cityId
      }
    };
    await store.dispatch("jobs/getJobsQueryString", qstring);
  },

  head() {
    return {
      title: this.metaTags.title,
      meta: [
        // hid is used as unique identifier. Do not use `vmid` for it as it will not work
        {
          hid: "description",
          name: "description",
          content: this.metaTags.description
        },
        { rel: "canonical", href: this.metaTags.canonical, id: "canonical" },
        {
          hid: "og:title",
          name: "og:title",
          content: this.metaTags.socialTitle
        },
        {
          hid: "og:description",
          name: "og:description",
          content: this.metaTags.socialDescription
        },
        {
          hid: "og:url",
          name: "og:url",
          content: this.metaTags.canonical
        }
      ]
    };
  },
  methods: {
    show: function() {}
  }
};
</script>
