<template>
  <div class="main-jobs">
    <div class="margin-top-30"></div>
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

  async asyncData({ app, params, store }) {
    var qstring = {};
    var query = app.context.route.query;
    var stateId = query.stateId ? query.stateId : 0;
    var cityId = query.cityId ? query.cityId : "";
    var mainCategory = params.mainCategory ? params.mainCategory : "";
    var category = params.category ? params.category : "";
    var isMobile = store.state.isMobile;
    qstring = {
      qstring: {
        mainCategory: mainCategory,
        category: category,
        stateId: stateId,
        cityId: cityId,
        isMobile: isMobile
      }
    };
    await store.dispatch("jobs/getJobsQueryString", {
      qstring: qstring,
      route: app.context.route
    });
  },

  head() {
    return {
      title: this.metaTags.title,
      link: [{ rel: "canonical", href: this.metaTags.canonical }],
      meta: this.createMetaTags(this.metaTags)
    };
  }
};
</script>
