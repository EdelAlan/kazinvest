import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    foreign_investments: [],
    investments: [],
    investment: [],
    number_jobs: [],
    production: [],
    taxes: [],
    exports_volume: [],
    spent_foreign_investments: [],
  }),

  mutations: {
    set_foreign_investments (state, foreign_investments) {
      state.foreign_investments = foreign_investments;
    },
    set_investments (state, investments) {
      state.investments = investments;
    },
    set_investment (state, investment) {
      state.investment = investment;
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
    set_exports_volume (state, exports_volume) {
      state.exports_volume = exports_volume;
    },
    set_spent_foreign_investments (state, spent_foreign_investments) {
      state.spent_foreign_investments = spent_foreign_investments;
    },
  },

  getters: {
    foreign_investments: state => state.foreign_investments,
    investments: state => state.investments,
    investment: state => {
      var sum = 0;
      state.investment.forEach(el => {
        sum += parseInt(el.val,10);
      });
      return sum;
    },
    number_jobs: state => state.number_jobs,
    production: state => state.production,
    taxes: state => state.taxes,
    exports_volume: state => state.exports_volume,
    spent_foreign_investments: state => state.spent_foreign_investments,
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
    set_investment ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/investments',
      }).then(investment => {
        commit('set_investment', investment);
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
    set_exports_volume ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/exports_volume' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(exports_volume => {
        commit('set_exports_volume', exports_volume);
      });
    },
    set_spent_foreign_investments ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/spent_foreign_investments' + (this.getters.selected_sector ? '?parent_id=' + this.getters.selected_sector.id : ''),
      }).then(spent_foreign_investments => {
        commit('set_spent_foreign_investments', spent_foreign_investments);
      });
    },
  },
};