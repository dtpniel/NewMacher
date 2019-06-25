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
  components: { SingleJob },
  validate({ params }) {
    // Must be a number
    return /^\d+$/.test(params.id);
  },
  methods: {
    show: function() {}
  },

  computed: {
    ...mapState("jobs", {
      metaTags: state => state.metaTags
    })
  },

  async asyncData({ app, params, store }) {
    var id = params.id;
    var query = app.context.route.query;
    var archive = query.archive;
    if (!archive) archive = 0;

    var jobParams = { archive: archive, id: id };
    await store.dispatch("jobs/getSingleJob", {
      jobParams
    });
  },

  head() {
    return {
      title: this.metaTags.title,
      link: [{ rel: "canonical", href: this.metaTags.canonical }],
      meta:this.createMetaTags(this.metaTags)
    };
  }
};
</script>
