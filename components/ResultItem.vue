<template>
  <div>
    <!-- Job Listing -->
    <a
      :href="'single-job-page.html?id=' + item.id"
      class="job-listing"
      :class="{  'job-listing-mobile' :isMobile}"
      @click.prevent="showItem=!showItem"
    >
      <!-- <a href="single-job-page.html" class="job-listing"> -->
      <!-- Job Listing Details -->

      <div class="job-listing-details">
        <!-- Logo -->
        <div class="job-listing-company-logo">
          <img src="images/centers.png" alt>
          <!-- <img src="images/company-logo-05.png" alt>  -->
        </div>

        <!-- Details -->
        <div class="job-listing-description">
          <h3 class="job-listing-title">{{item.title | truncate(200)}}</h3>

          <!-- Job Listing Footer -->
          <div class="job-listing-footer">
            <ul>
              <li>
                <i class="icon-material-outline-business"></i> Centers Health Care
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
              <li>
                <mark> 
                  View {{showItem?"Less":"More"}}
                  <i class="icon-feather-arrow-right"></i>
                </mark>
              </li>
            </ul>
          </div>
        </div>

        <!-- Bookmark -->
        <span class="bookmark-icon"></span>
      </div>
    </a>

    <transition name="fade">
      <single-job :item="item" v-if="showItem"/>
    </transition>
  </div>
</template>
<script>
import SingleJob from "~/components/SingleJob";
import { mapGetters, mapMutations } from "vuex";

export default {
  props: ["item"],
  components: { SingleJob },
  data: function() {
    return {
      showItem: false
    };
  },
  computed: {
    ...mapGetters({
      isMobile: "isMobile"
    })
  }
};
</script>

