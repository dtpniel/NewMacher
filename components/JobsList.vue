<template>
  <div class="container">
    <div class="row">
      <div
        class="modal fade modal-fullscreen modal-fullscreen-bottom-footer"
        id="modalBottom"
        tabindex="-1"
        role="dialog"
        aria-labelledby="modalBottomLabel"
        aria-hidden="true"
        v-if="isMobile"
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBottomLabel">Refine Results</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <jobs-filter-mobile v-if="isMobile"/>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-default" id="btnSave" @click="serach()">
                <span class="d-none d-md-inline">Show Results</span>
                <span class="d-md-none">Show Results</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- breadcrumbd -->
      <!-- <breadcrumbs/> -->
      <!-- filter -->
      <div class="col-xl-3 col-lg-4">
        <jobs-filter v-if="!isMobile"/>
      </div>

      <!-- results -->
      <div class="col-xl-9 col-lg-8 content-left-offset">
        <h3 class="page-title">Search Results ({{sum}})</h3>
        <div class="notify-box margin-top-15">
          <div class="switch-container">
            <label class="switch">
              <input type="checkbox">
              <span class="switch-button"></span>
              <span class="switch-text">Turn on email alerts for this search</span>
            </label>
          </div>

          <div class="sort-by">
            <span>Sort by:</span>

            <select class="selectpicker hide-tick" @change="sort($event)">
              <option v-for="item in sortByList" :value="item.id" :key="item.id">{{item.name}}</option>
            </select>
          </div>
        </div>
        <premium-jobs :jobs="jobs" v-if="!isMobile"/>
        <!-- <button
          type="button"
          class="button ripple-effect"
          data-toggle="modal"
          data-target="#modalBottom"
          v-if="isMobile"
        >Refine Results</button> -->


          <button class="enable-filters-button" v-if="isMobile" data-toggle="modal" data-target="#modalBottom">
            <i class="enable-filters-button-icon"></i>
            <span class="show-text">Show Filters</span>
            <span class="hide-text">Hide Filters</span>
          </button>
     

        <!-- results -->
        <jobs-results/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import JobsResults from "~/components/JobsResults";
import JobsFilter from "~/components/JobsFilter";
import JobsFilterMobile from "~/components/JobsFilterMobile";
import PremiumJobs from "~/components/PremiumJobs";
import { mapGetters, mapState } from "vuex";

export default {
  name: "JobsList",
  components: {
    JobsFilter,
    JobsFilterMobile,
    JobsResults,
    PremiumJobs
  },
  data: function() {
    return {
      title: "Jobs",
      sortByList: [
        { value: "type", direction: "desc", name: "Relevance", id: 1 },
        { value: "date", direction: "desc", name: "Newest", id: 2 },
        { value: "date", direction: "asc", name: "Oldest", id: 3 }
      ],
      initialFilter: {}
    };
  },
  computed: {
    ...mapGetters({
      sum: "jobs/sum",
      isMobile: "isMobile"
    })
  },

  methods: {
    sort: function($event) {
      var id = $event.target.value;
      var sortBy = this.sortByList.find(x => x.id == id);
      this.$store.commit("jobs/setFilter", { sortBy });
    },
    serach: function() {
      $nuxt.$root.$loading.start();
      this.$store.dispatch("jobs/getJobsMobile").then(() => {
        $nuxt.$root.$loading.finish();
      });
    },
    errorCaptured: function(error) {
      console.log(error);
    }
    // discard: function() {
    //   this.$store.commit("jobs/setFilter", this.initialFilter);
    // },
    // saveInitialFilter: function() {
    //   //store intialfilter to perform discard on mobile filter
    //   var initialFilter = this.$store.state.jobs.filter;
    //   Object.assign(this.initialFilter, initialFilter);
    // }
  },

  mounted() {
    if (process.browser) {
      initialCustom();
    }
  }
};
</script>
