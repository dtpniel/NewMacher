<template>
  <div class="listings-container compact-list-layout margin-top-35">
    <!-- Job Listing -->
    <a v-for="item in jobs" :key="item.da_id" href="single-job-page.html" class="job-listing">
      <!-- <a href="single-job-page.html" class="job-listing"> -->
      <!-- Job Listing Details -->
      <div class="job-listing-details">
        <!-- Logo -->
        <div class="job-listing-company-logo">
          <img src="images/company-logo-01.png" alt>
        </div>

        <!-- Details -->
        <div class="job-listing-description">
          <h3 class="job-listing-title">{{item.title | truncate(50)}}</h3>

          <!-- Job Listing Footer -->
          <div class="job-listing-footer">
            <ul>
              <li>
                <i class="icon-material-outline-business"></i> Hexagon
                <!-- <div
                  class="verified-badge"
                  data-tippy-placement="top"
                  data-tippy
                  data-original-title="Verified Employer"
                ></div>-->
              </li>
              <li>
                <i class="icon-material-outline-location-on"></i>
                {{item.cityName=="Other"? item.stateName : item.cityName}}
              </li>
              <li>
                <i class="icon-material-outline-business-center"></i>
                {{item.partTime==1?"Part Time" : "Full Time"}}
              </li>
              <li>
                <i class="icon-material-outline-access-time"></i>
                {{item.date | formatDate}}
              </li>
            </ul>
          </div>
        </div>

        <!-- Bookmark -->
        <span class="bookmark-icon"></span>
      </div>
    </a>
  </div>
</template>
<script>
export default {
  name: "results",
  props: ["jobs"],
  data: function() {
    return {
      title: "Jobs"
    };
  },
  methods: {}
};
</script>
