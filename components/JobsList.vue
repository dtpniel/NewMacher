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
      >
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="modalBottomLabel">Fine Results</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">Hi Diti</div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
              <button type="button" class="btn btn-default">
                <span class="d-none d-md-inline">Save changes</span>
                <span class="d-md-none">Save</span>
              </button>
              <button type="button" class="btn btn-default">
                <span class="d-none d-md-inline">Discard changes</span>
                <span class="d-md-none">Discard</span>
              </button>
              <button type="button" class="btn btn-default">
                <span class="d-none d-md-inline">Reload Data</span>
                <span class="d-md-none">Reload</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- filter -->
      <div class="col-xl-3 col-lg-4">
        <jobs-filter/>
      </div>

      <!-- results -->
      <div class="col-xl-9 col-lg-8 content-left-offset">
        <h3 class="page-title">Search Results</h3>
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
        <button
          type="button"
          class="button ripple-effect"
          data-toggle="modal"
          data-target="#modalBottom"
        >Fine Results</button>
        <!-- results -->
        <jobs-results/>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
//import $ from "jquery";
import JobsResults from "~/components/JobsResults";
import JobsFilter from "~/components/JobsFilter";

export default {
  name: "JobsList",
  components: {
    JobsFilter,
    JobsResults
  },
  data: function() {
    return {
      title: "Jobs",
      sortByList: [
        { value: "type", direction: "desc", name: "Relevance", id: 1 },
        { value: "date", direction: "desc", name: "Newest", id: 2 },
        { value: "date", direction: "asc", name: "Oldest", id: 3 }
      ]
    };
  },

  methods: {
    sort: function($event) {
      var id = $event.target.value;
      sortBy = this.sortByList.find(x => x.id == id);
      this.$store.commit("jobs/setFilter", { sortBy });
    },

    errorCaptured: function(error) {
      console.log(error);
    }
  },

  mounted() {
    if (process.browser) {
      initialCustom();
    }
  }
};
</script>
