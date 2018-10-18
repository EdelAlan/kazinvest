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
    set_industries ({ commit }, { query, not_selected }) {
      const industries_filter = (query && query.industries_filter) ? JSON.parse(query.industries_filter) : null;
      return fetcher({
        path: this.getters.api_path + '/back/api/industries',
      }).then(industries => {
        this.dispatch('set_industries_filter', 
          industries.map(({ id, title_ru, title_kz, title_en }) => {
            return {
              id,
              title_ru,
              title_kz,
              title_en,
              checked: not_selected ? false : (industries_filter ? (industries_filter.includes(id) ? false : true) : true),
            };
          }));
        commit('set_industries', industries);
      });
    },
  },
};