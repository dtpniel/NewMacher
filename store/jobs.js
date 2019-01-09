import Axios from 'axios'

export const state = () => ({
  jobs: [],
  job: {}
})

export const mutations = {
  SET_JOBS(jobs) {
    state.jobs = jobs
  }

}
export const actions = {
  getAll({ mutations }) {
    Axios.get("")
      .then(jobs => jobs.data)
      .then(jobs => { mutations.SET_JOBS(jobs) })
  }
}