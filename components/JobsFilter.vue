<template>
  <div class="sidebar-container">
    <!-- filter items -->
    <div class="row">
      <filtered-items :items="filteredItems" @reset="reset" @removeFilterItem="removeFilterItem"/>
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
        @change="setFilter($event)"
        v-model="stateId"
      >
        <option
          v-for="item in stateIdData"
          :value="item.id"
          :key="item.id"
        >{{item.name}} ({{item.sum}})</option>
      </select>
      
      <select
        :disabled="!stateId"
        class="selectpicker margin-top-20"
        data-selected-text-format="count"
        data-size="7"
        title="All Cities"
        multiple
        id="cityId"
        @change="setFilter($event)"
        v-model="cityId"
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
          <input type="text" class="keyword-input" v-model="freeText" placeholder="e.g. job title">
          <button class="keyword-input-button ripple-effect" @click="setFilter($event,'freeText')">
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
        v-model="mainCategoryId"
        @change="setFilter($event)"
      >
        <option
          v-for="item in mainCategoryIdData"
          :value="item.id"
          :key="item.id"
        >{{item.name}} ({{item.sum}})</option>
      </select>
      <!-- Sub Categories -->
      <select
        :disabled="!mainCategoryId"
        class="selectpicker margin-top-20"
        data-selected-text-format="count"
        data-size="7"
        title="All Sub Categories"
        multiple
        id="categoryId"
        v-model="categoryId"
        @change="setFilter($event)"
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
            <input type="checkbox" id="freelance" v-model="freelance" @change="setFilter($event)">
            <span class="switch-button"></span> Freelance
          </label>
        </div>

        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" id="fromHome" v-model="fromHome" @change="setFilter($event)">
            <span class="switch-button"></span> From Home
          </label>
        </div>

        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" id="partTime" v-model="partTime" @change="setFilter($event)">
            <span class="switch-button"></span> Part Time
          </label>
        </div>

        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" id="internship" v-model="internship" @change="setFilter($event)">
            <span class="switch-button"></span> Internship
          </label>
        </div>
        <div class="switch-container">
          <label class="switch">
            <input type="checkbox" id="temporary" v-model="temporary" @change="setFilter($event)">
            <span class="switch-button"></span> Temporary
          </label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import FilteredItems from "~/components/FilteredItems";
import { createNamespacedHelpers } from "vuex";
import { mapMutations, mapActions, mapState } from "vuex";
import { createHelpers } from "vuex-map-fields";
const { mapFields } = createHelpers({
  getterType: "getFilter",
  mutationType: "updateFilter"
});

export default {
  name: "JobsFilter",

  data: function() {
    return {
      title: "Jobs",
      filteredItems: []
    };
  },
  computed: {
    ...mapState("jobs", {
      stateIdData: state => state.stateIdData,
      mainCategoryIdData: state => state.mainCategoryIdData,
      cityIdData: state => state.cityIdData,
      categoryIdData: state => state.categoryIdData,
      freelanceData: state => state.freelanceData,
      fromHomeData: state => state.fromHomeData,
      partTimeData: state => state.partTimeData,
      internshipData: state => state.internshipData,
      temporaryData: state => state.temporaryData,
      filterDefinition: state => state.filterDefinition
    }),
    ...mapFields("jobs", [
      "stateId",
      "cityId",
      "mainCategoryId",
      "categoryId",
      "freelance",
      "partTime",
      "temporary",
      "fromHome",
      "internship",
      "freeText"
    ])
  },

  components: {
    FilteredItems
  },

  methods: {
    removeFilterItem: function(item) {
      var arr = this.filteredItems;
      var name = item.name;
      //remove filter item
      const index = arr.findIndex(x => x.id == item.id && x.name == item.name);
      if (index > -1) arr.splice(index, 1);

      //remove filter id
      var filterItem = this[item.name];
      if (filterItem.constructor == Array) {
        {
          const i = filterItem.findIndex(x => x == item.id);
          if (i > -1) {
            var newFilterItem = filterItem.slice();
            newFilterItem.splice(i, 1);
            this.updateFilter({ [name]: newFilterItem });
          }
        }
      } else if (filterItem.constructor == Number) {
        {
          this.updateFilter({ [name]: 0 });
        }
      } else {
        {
          this.updateFilter({ [name]: "" });
        }
      }

      //search again based on new filter
      this.setFilter(undefined, item.name);
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

    reset: function() {
      this.filteredItems = [];
      this.resetFilter();
      this.search();
    },

    addFilterItem: function(filterItemDef) {
      if (!filterItemDef.multiple) {
        var id = this[filterItemDef.name];
        var arr = this.filteredItems;
        //remove existing filter item
        this.filteredItems = arr.filter(x => x.name !== filterItemDef.name);

        this.addSingleFilterItem(id, filterItemDef.name);
      } else {
        var ids = this[filterItemDef.name];
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
    setFilter: function($event, name) {
      var self = this;
      var name = $event && $event.target.id ? $event.target.id : name;
      var filterItemDef = this.filterDefinition.find(x => x.name == name);

      //reset sub category id and city id when main category or state is selected
      if (filterItemDef.resetSubCategory) {
        this[filterItemDef.subCategory] = [];
        var item = this.filterDefinition.find(
          x => x.name == filterItemDef.subCategory
        );
        this.addFilterItem(item);
      }

      this.addFilterItem(filterItemDef);
      if (filterItemDef.server) {
        this.search();
      }
    },
    ...mapActions("jobs", {
      search: "getJobs",
      resetFilter: "resetFilter"
    }),
    ...mapMutations("jobs", { updateFilter: "setFilter" })
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
