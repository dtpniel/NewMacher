<template>
  <div class="container">
    <div class="row">
      <!-- filter -->
      <div class="col-xl-3 col-lg-4">
        <div class="sidebar-container">
          <!-- filter items -->
          <div class="row">
            <div v-html="filterItems"></div>
            <div class="clearfix"></div>
          </div>
          <!-- Location -->
          <div class="sidebar-widget">
            <h3>Location</h3>
            <select
              class="selectpicker"
              data-selected-text-format="count"
              data-size="7"
              title="All States"
              @change="search(dataIndex.states)"
              v-model="filter.stateId"
            >
              <option
                v-for="item in states"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
            
            <select
              :disabled="!cities.length"
              class="selectpicker margin-top-20"
              data-selected-text-format="count"
              data-size="7"
              title="All Cities"
              multiple
              @change="search(dataIndex.cities)"
              v-model="filter.cityId"
            >
              <option
                v-for="item in cities"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
          </div>

          <!-- Keywords -->
          <div class="sidebar-widget">
            <h3>Keywords</h3>
            <div class="keywords-container">
              <div class="keyword-input-container">
                <input type="text" class="keyword-input" placeholder="e.g. job title">
                <button class="keyword-input-button ripple-effect" @click="displayFilterItems">
                  <i class="icon-material-outline-add"></i>
                </button>
              </div>
              <div class="keywords-list" style="height: auto;">
                <!-- keywords go here -->
              </div>
              <div class="clearfix"></div>
            </div>
          </div>

          <!-- Category -->
          <div class="sidebar-widget">
            <h3>Category</h3>
            <select
              class="selectpicker"
              data-selected-text-format="count"
              data-size="7"
              title="All Categories"
              v-model="filter.mainCategoryId"
              @change="search(dataIndex.mainCategories)"
            >
              <option
                v-for="item in mainCategories"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
            <!-- Sub Categories -->
            <select
              :disabled="!categories.length"
              class="selectpicker margin-top-20"
              data-selected-text-format="count"
              data-size="7"
              title="All Sub Categories"
              multiple
              v-model="filter.categoryId"
              @change="search(dataIndex.categories)"
            >
              <option
                v-for="item in categories"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
          </div>

          <!-- Job Types -->
          <div class="sidebar-widget">
            <h3>Job Type</h3>

            <div class="switches-list">
              <div class="switch-container">
                <label class="switch">
                  <input type="checkbox" v-model="filter.freelance" value="1">
                  <span class="switch-button"></span> Freelance
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input type="checkbox" v-model="filter.fullTime" value="2">
                  <span class="switch-button"></span> Full Time
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input type="checkbox" v-model="filter.partTime" value="3">
                  <span class="switch-button"></span> Part Time
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input type="checkbox" v-model="filter.internship" value="4">
                  <span class="switch-button"></span> Internship
                </label>
              </div>
              <div class="switch-container">
                <label class="switch">
                  <input type="checkbox" v-model="filter.temporary" value="5">
                  <span class="switch-button"></span> Temporary
                </label>
              </div>
            </div>
          </div>
        </div>
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
            
            <select class="selectpicker hide-tick">
              <option>Relevance</option>
              <option>Newest</option>
              <option>Oldest</option>
              <option>Random</option>
            </select>
          </div>
        </div>

        <div class="listings-container compact-list-layout margin-top-35">
          <!-- Job Listing -->
          <a v-for="item in jobs" :key="item.id" href="single-job-page.html" class="job-listing">
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
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import $ from "jquery";
var dataIndex = {
  jobs: 0,
  states: 1,
  cities: 2,
  mainCategories: 3,
  categories: 4
};
export default {
  name: "JobsList",
  props: {
    data: {
      type: Array,
      required: true
    }
  },
  data: function() {
    return {
      dataIndex: dataIndex,
      title: "Jobs",
      jobs: this.data[dataIndex.jobs],
      states: this.data[dataIndex.states],
      mainCategories: this.data[dataIndex.mainCategories],
      cities: {},
      categories: {},
      filter: {
        start: 1,
        max: 25,
        categoryId: [0],
        mainCategoryId: 0,
        cityId: [0],
        stateId: 0,
        freelance: 0,
        fullTime: 0,
        partTime: 0,
        internship: 0,
        temporary: 0,
        freeText: "",
        OrderBy: "da_type desc,da_date desc"
      },
      filterItems: ""
    };
  },

  methods: {
    removeFilterItem: function(item) {
      console.log("remove item: " + item);
    },
    search: function(index) {
      var self = this;
      this.$nuxt.$loading.start();

      return axios
        .post(process.env.baseApi + "/jobs", { filter: this.filter })
        .then(res => {
          if (res.data.error) self.errorCaptured(data);
          let data = res.data.data.recordsets;
          self.jobs = data[dataIndex.jobs];

          if (index === dataIndex.states) {
            self.mainCategories = data[dataIndex.mainCategories];
            self.cities = data[dataIndex.cities];
          }
          if (index === dataIndex.mainCategories) {
            self.states = data[dataIndex.states];
            self.categories = data[dataIndex.categories];
          }

          displaySelectedItems();
          setTimeout(() => this.$nuxt.$loading.finish(), 500);
        })
        .catch(e => {
          setTimeout(() => this.$nuxt.$loading.finish(), 500);
          console.log(e.message);
        });
    },

    displayFilterItems: function() {
      var item = "New York";
      var itemid = 12;
      var $item = $(
        "<div><span class='keyword'><span @click.native='removeFilterItem' class='keyword-remove'></span><span class='keyword-text'>" +
          item +
          "</span></span></div>"
      );
      this.filterItems = $item.html();
    }
  },
  errorCaptured: function(error) {
    console.log(error);
  },
  updated: function() {
    this.$nextTick(function() {
      $(".selectpicker").selectpicker("refresh");
    });
  },

  mounted() {
    if (process.browser) {
      require("bootstrap-select");
    }
  }
};
</script>
