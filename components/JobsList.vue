<template>
  <div class="container">
    <div class="row">
      <!-- filter -->
      <div class="col-xl-3 col-lg-4">
        <div class="sidebar-container">
          <!-- filter items -->
          <div class="row">
            <filtered-items
              :items="filteredItems"
              @reset="reset"
              @removeFilterItem="removeFilterItem"
            />
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
              id="stateId"
              @change="search($event)"
              v-model="filter.stateId"
            >
              <option
                v-for="item in stateIdData"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
            
            <select
              :disabled="!filter.stateId"
              class="selectpicker margin-top-20"
              data-selected-text-format="count"
              data-size="7"
              title="All Cities"
              multiple
              id="cityId"
              @change="search($event)"
              v-model="filter.cityId"
            >
              <option
                v-for="item in cityIdData"
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
                <input
                  type="text"
                  class="keyword-input"
                  v-model="filter.freeText"
                  placeholder="e.g. job title"
                >
                <button
                  class="keyword-input-button ripple-effect"
                  @click="search($event,'freeText')"
                >
                  <i class="icon-material-outline-add" id="freeText"></i>
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
              id="mainCategoryId"
              v-model="filter.mainCategoryId"
              @change="search($event)"
            >
              <option
                v-for="item in mainCategoryIdData"
                :value="item.id"
                :key="item.id"
              >{{item.name}} ({{item.sum}})</option>
            </select>
            <!-- Sub Categories -->
            <select
              :disabled="!filter.mainCategoryId"
              class="selectpicker margin-top-20"
              data-selected-text-format="count"
              data-size="7"
              title="All Sub Categories"
              multiple
              id="categoryId"
              v-model="filter.categoryId"
              @change="search($event)"
            >
              <option
                v-for="item in categoryIdData"
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
                  <input
                    type="checkbox"
                    id="freelance"
                    v-model="filter.freelance"
                    @change="search($event)"
                  >
                  <span class="switch-button"></span> Freelance
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input
                    type="checkbox"
                    id="fromHome"
                    v-model="filter.fromHome"
                    @change="search($event)"
                  >
                  <span class="switch-button"></span> From Home
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input
                    type="checkbox"
                    id="partTime"
                    v-model="filter.partTime"
                    @change="search($event)"
                  >
                  <span class="switch-button"></span> Part Time
                </label>
              </div>

              <div class="switch-container">
                <label class="switch">
                  <input
                    type="checkbox"
                    id="internship"
                    v-model="filter.internship"
                    @change="search($event)"
                  >
                  <span class="switch-button"></span> Internship
                </label>
              </div>
              <div class="switch-container">
                <label class="switch">
                  <input
                    type="checkbox"
                    id="temporary"
                    v-model="filter.temporary"
                    @change="search($event)"
                  >
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

        <div class="listings-container compact-list-layout margin-top-35 margin-bottom-35">
          <div
            v-if="!filteredJobs.length"
            class="alert alert-danger"
            role="alert"
          >No results match your search criteria</div>

          <!-- Job Listing -->
          <a
            v-for="item in filteredJobs"
            :key="item.id"
            href="single-job-page.html"
            class="job-listing"
          >
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
                      <i class="icon-material-outline-business"></i> Hamaspik
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
import FilteredItems from "~/components/FilteredItems";

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
  components: {
    FilteredItems
  },
  data: function() {
    return {
      dataIndex: dataIndex,
      title: "Jobs",
      jobs: this.data ? this.data[dataIndex.jobs] : [],
      filteredJobs: this.data ? this.data[dataIndex.jobs].slice(0, 25) : [],
      stateIdData: this.data ? this.data[dataIndex.states] : [],
      mainCategoryIdData: this.data ? this.data[dataIndex.mainCategories] : [],
      cityIdData: {},
      categoryIdData: {},
      freelanceData: [{ name: "Freelance", id: 1 }],
      fromHomeData: [{ name: "From Home", id: 1 }],
      partTimeData: [{ name: "Part Time", id: 1 }],
      internshipData: [{ name: "Internship", id: 1 }],
      temporaryData: [{ name: "Temporary", id: 1 }],
      filter: {
        stateId: 0,
        cityId: [],
        mainCategoryId: 0,
        categoryId: [],
        freelance: 0,
        partTime: 0,
        internship: 0,
        temporary: 0,
        fromHome: 0,
        freeText: "",
        start: 0,
        max: 25,
        OrderBy: "da_type desc,da_date desc"
      },
      filterDefault: {
        stateId: 0,
        cityId: [],
        mainCategoryId: 0,
        categoryId: [],
        freelance: 0,
        partTime: 0,
        internship: 0,
        temporary: 0,
        fromHome: 0,
        freeText: ""
      },
      filteredItems: [],
      filterDefinition: [
        {
          name: "stateId",
          multiple: false,
          clientSearch: false,
          resetSubCategory: true,
          subCategory: "cityId"
        },
        {
          name: "cityId",
          multiple: true,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "mainCategoryId",
          multiple: false,
          clientSearch: false,
          resetSubCategory: true,
          subCategory: "categoryId"
        },
        {
          name: "categoryId",
          multiple: true,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "freelance",
          multiple: false,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "partTime",
          multiple: false,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "temporary",
          multiple: false,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "fromHome",
          multiple: false,
          clientSearch: true,
          resetSubCategory: false,
          subCategory: ""
        },
        {
          name: "freeText",
          multiple: false,
          clientSearch: false,
          resetSubCategory: false,
          subCategory: ""
        }
      ]
    };
  },

  methods: {
    removeFilterItem: function(item) {
      var arr = this.filteredItems;

      //remove filter item
      const index = arr.findIndex(x => x.id == item.id && x.name == item.name);
      if (index > -1) arr.splice(index, 1);

      //remove filter id
      var filter = this.filter[item.name];
      if (filter.constructor == Array) {
        const i = filter.findIndex(x => x == item.id);
        if (i > -1) filter.splice(i, 1);
      } else if (filter.constructor == Number) {
        this.filter[item.name] = 0;
      } else {
        this.filter[item.name] = "";
      }

      //search again based on new filter
      this.search(undefined, item.name);
    },

    addSingleFilterItem: function(id, name) {
      //don't add item when it's undefined
      if (!id) return;

      var arr = this[name + "Data"];

      var text = arr
        ? this[name + "Data"].filter(x => x.id == id)[0].name
        : name;

      if (name == "freeText") text = id;

      var item = {
        id: id,
        text: text,
        name: name
      };
      this.filteredItems.push(item);
    },

    addFilterItem: function(filterItemDef) {
      if (!filterItemDef.multiple) {
        var id = this.filter[filterItemDef.name];
        var arr = this.filteredItems;
        //remove existing filter item
        this.filteredItems = arr.filter(x => x.name !== filterItemDef.name);

        this.addSingleFilterItem(id, filterItemDef.name);
      } else {
        var ids = this.filter[filterItemDef.name];
        var arr = this.filteredItems.filter(x => x.name == filterItemDef.name);

        ids.forEach(id => {
          var index = arr.findIndex(x => x.id == id);

          //add filter item that is not existed yet on filter items
          if (index == -1) this.addSingleFilterItem(id, filterItemDef.name);
        });

        //remove filter item when it's not exist on filter ids (when unselect)
        arr.forEach(x => {
          var index = ids.findIndex(id => id == x.id);
          if (index == -1) this.removeFilterItem(x);
        });
      }
    },

    errorCaptured: function(error) {
      console.log(error);
    },

    filterServer: function() {
      var self = this;
      this.$nuxt.$loading.start();
      return axios
        .post(process.env.baseApi + "/jobs", { filter: this.filter })
        .then(res => {
          if (res.data.error) self.errorCaptured(data);
          let data = res.data.data.recordsets;
          self.jobs = data[dataIndex.jobs];
          self.filteredJobs = data[dataIndex.jobs].slice(
            self.filter.start,
            self.filter.max
          );

          self.stateIdData = data[dataIndex.states];
          self.cityIdData = data[dataIndex.cities];
          self.mainCategoryIdData = data[dataIndex.mainCategories];
          self.categoryIdData = data[dataIndex.categories];

          setTimeout(() => this.$nuxt.$loading.finish(), 200);
        })
        .catch(e => {
          setTimeout(() => this.$nuxt.$loading.finish(), 500);
          console.log(e.message);
        });
    },

    fitlerClient: function() {
      try {
        this.$nuxt.$loading.start();
        var filter = this.filter;
        this.filteredJobs = this.jobs
          .filter(x => {
            return (
              (filter.cityId.length == 0 ||
                filter.cityId.indexOf(x.cityId) > -1) &&
              (filter.categoryId.length == 0 ||
                filter.categoryId.indexOf(x.categoryId) > -1) &&
              filter.freelance == x.freelance &&
              filter.fullTime == x.fullTime &&
              filter.partTime == x.partTime &&
              filter.fromHome == x.fromHome &&
              filter.internship == x.internship &&
              filter.temporary == x.temporary
            );
          })
          .slice(this.filter.start, this.filter.max);
        setTimeout(() => this.$nuxt.$loading.finish(), 200);
      } catch (error) {
        console.log(error.message);
        setTimeout(() => this.$nuxt.$loading.finish(), 200);
      }
    },
    reset: function() {
      this.filteredItems = [];
      Object.assign(this.filter, this.filterDefault);
      this.filterServer();
    },

    search: function($event, name) {
      this.$nuxt.$loading.start();
      var self = this;
      var name = $event && $event.target.id ? $event.target.id : name;
      var filterItemDef = this.filterDefinition.find(x => x.name == name);

      //reset sub category id and city id when main category or state is selected
      if (filterItemDef.resetSubCategory) {
        this.filter[filterItemDef.subCategory] = [];
        var item = this.filterDefinition.find(
          x => x.name == filterItemDef.subCategory
        );
        this.addFilterItem(item);
      }

      if (filterItemDef.clientSearch) {
        this.fitlerClient();
        this.addFilterItem(filterItemDef);
      } else {
        this.filterServer().then(function() {
          self.addFilterItem(filterItemDef);
        });
      }
    }
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
