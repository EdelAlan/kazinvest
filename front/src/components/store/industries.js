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
    set_industries ({ commit, dispatch }) {
      return fetcher({
        path: 'http://localhost:5000/back/api/industries',
      }).then(industries => {
        this.dispatch('set_industries_filter', 
          industries.map(({ id, title_ru, title_kz, title_en }) => {
            return {
              id,
              title_ru,
              title_kz,
              title_en,
              checked: true
            };
          }));
        commit('set_industries', industries);
      });
    },
  },
};