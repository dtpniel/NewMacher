<template>
  <div>
    <single-job/>
  </div>
</template>

<script>
import SingleJob from "~/components/SingleJob";
import { Route } from "vue-router";
import { mapState } from "vuex";

export default {
  data: function() {
    return {
      title: this.$route.params.ad,
      id: this.$route.params.id
    };
  },
    computed: {
    ...mapState("jobs", {
      metaTags: state => state.metaTags
    })
  },

  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  async asyncData({ app, params, store }) {
    var id = app.context.route.id;

    await store.dispatch("jobs/getSingleJob", {
      id: id
    });
  },

  head() {
    return {
      title: this.metaTags.title,
      link: [{ rel: "canonical", href: this.metaTags.canonical }],
      meta: this.createMetaTags(this.metaTags)
    };
  },

  methods: {
    show: function() {}
  }
};
</script>
