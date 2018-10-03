import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    industries: [],
  }),

  mutations: {
    set_industries (state, industries) {
      state.industries = industries;
    },
  },

  getters: {
    industries: state => state.industries,
  },

  actions: {
    set_industries ({ commit }) {
      return fetcher({
        path: 'http://localhost:5000/back/api/industries',
      }).then(industries => commit('set_industries', industries));
    },
  },
};