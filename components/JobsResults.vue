<template>
  <div class="listings-container compact-list-layout margin-top-15 margin-bottom-35">
    <div
      v-if="!jobs.length"
      class="alert alert-danger"
      role="alert"
    >No results match your search criteria</div>
    <div class="job-listing-container" v-for="(item,index) in jobs" :key="item.id">
      <h4 v-if="((index)%perPage)==0||index==0" class="page-number">
        <span class="icon-feather-arrow-right"></span>
        Page {{Math.floor((index+1)/perPage)+1}}
      </h4>

      <!-- Job Listing -->
      <result-item :item="item"/>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import ResultItem from "~/components/ResultItem";

export default {
  name: "JobsResults",
  components: { ResultItem },
  data: function() {
    return {
      selectedId: 0
    };
  },
  computed: {
    ...mapGetters({
      jobs: "jobs/filteredJobsSliced",
      sum: "jobs/sum",
      perPage: "jobs/perPage",
      isMobile: "isMobile"
    })
  },
  methods: {
    page: function(index) {
      return this.sum % this.perPage;
    },
    viewMore: function(id) {
      this.selectedId = id;
      return false;
    }
  }
};
</script>
