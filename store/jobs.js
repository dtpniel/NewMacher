
import axios from 'axios'
import { getField, updateField } from 'vuex-map-fields';

var dataIndex = {
  jobs: 0,
  states: 1,
  cities: 2,
  mainCategories: 3,
  categories: 4
};





export const state = () => ({
  jobs: [],
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
    sortBy: {}
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
  filterDefinition: [
    {
      name: "stateId",
      multiple: false,
      server: false,
      resetSubCategory: true,
      subCategory: "cityId"
    },
    {
      name: "cityId",
      multiple: true,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "mainCategoryId",
      multiple: false,
      server: false,
      resetSubCategory: true,
      subCategory: "categoryId"
    },
    {
      name: "categoryId",
      multiple: true,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "freelance",
      multiple: false,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "partTime",
      multiple: false,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "temporary",
      multiple: false,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "fromHome",
      multiple: false,
      server: true,
      resetSubCategory: false,
      subCategory: ""
    },
    {
      name: "freeText",
      multiple: false,
      server: false,
      resetSubCategory: false,
      subCategory: ""
    }],

  stateIdData: [],
  mainCategoryIdData: [],
  cityIdData: [],
  categoryIdData: [],
  freelanceData: [{ name: "Freelance", id: 1 }],
  fromHomeData: [{ name: "From Home", id: 1 }],
  partTimeData: [{ name: "Part Time", id: 1 }],
  internshipData: [{ name: "Internship", id: 1 }],
  temporaryData: [{ name: "Temporary", id: 1 }],
});

export const mutations = {
  setJobs(state, data) {
    var results = data.data.recordsets;
    state.jobs = results[dataIndex.jobs];
    state.stateIdData = results[dataIndex.states];
    state.cityIdData = results[dataIndex.cities];
    state.mainCategoryIdData = results[dataIndex.mainCategories];
    state.categoryIdData = results[dataIndex.categories];
  },

  setFilter(state, filter) {
    state.filter = Object.assign({}, state.filter, filter)
  },

  updateFilter(state, field) {
    updateField(state.filter, field);
  },

  resetFilter(state) {
    Object.assign(state.filter, state.filterDefault);
  }

};

export const getters = {
  filteredJobs: state => {
    var filter = state.filter;
    return state.jobs
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
      .sort((a, b) => {
        var direction = state.filter.sortBy.direction;
        var sortBy = state.filter.sortBy.value;
        if (sortBy == "type") {
          if (b.type > a.type) return 1;
          else if (a.type > b.type) return -1;
        }
        if (direction == "desc") return new Date(b.date) - new Date(a.date);
        else return new Date(a.date) - new Date(b.date);
      }
      )
      .slice(filter.start, filter.max);
  },


  getFilter: state => {
    return getField(state.filter)
  }
};


export const actions = {

  async getJobs({ commit }) {
    return axios.post(process.env.baseApi + "/jobs", { filter: state.filter })
      .then(jobs => { commit("setJobs", jobs.data) }
      )
  },
  async resetFilter({ mutations }) {
    mutations.resetFilter(state)
  }
  // async getJobsClient() {
  //   return new Promise((resolve, reject) => {
  //     return getters.filteredJobs();
  //   });
  // },

  // async getJobs({dispatch}) {
  //   if (client)
  //     return dispatch("getJobsClient");
  //   else
  //     return dispatch("getJobsServer")
  // },
}
export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};