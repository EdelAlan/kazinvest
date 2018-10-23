import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    foreign_investments: [],
    investments: [],
    number_jobs: [],
    production: [],
    taxes: [],
  }),

  mutations: {
    set_foreign_investments (state, foreign_investments) {
      state.foreign_investments = foreign_investments;
    },
    set_investments (state, investments) {
      state.investments = investments;
    },
    set_number_jobs (state, number_jobs) {
      state.number_jobs = number_jobs;
    },
    set_production (state, production) {
      state.production = production;
    },
    set_taxes (state, taxes) {
      state.taxes = taxes;
    },
  },

  getters: {
    foreign_investments: state => state.foreign_investments,
    investments: state => state.investments,
    number_jobs: state => state.number_jobs,
    production: state => state.production,
    taxes: state => state.taxes,
    investments_sum: state => {
      var sum = 0;
      state.investments.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;

    },
    foreign_investments_sum: state => {
      var sum = 0;
      state.foreign_investments.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;

    },
    number_jobs_sum: state => {
      var sum = 0;
      state.number_jobs.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;

    },
    production_sum: state => {
      var sum = 0;
      state.production.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;

    },
    taxes_sum: state => {
      var sum = 0;
      state.taxes.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;

    },
  },

  actions: {
    set_foreign_investments ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/foreign_investments' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(foreign_investments => {
        commit('set_foreign_investments', foreign_investments);
      });
    },
    set_investments ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/investments' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(investments => {
        commit('set_investments', investments);
      });
    },
    set_number_jobs ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/number_jobs' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(number_jobs => {
        commit('set_number_jobs', number_jobs);
      });
    },
    set_production ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/production' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(production => {
        commit('set_production', production);
      });
    },
    set_taxes ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/taxes' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(taxes => {
        commit('set_taxes', taxes);
      });
    },
  },
};