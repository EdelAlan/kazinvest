import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    provinces: [],
  }),

  mutations: {
    set_provinces (state, provinces) {
      state.provinces = provinces;
    },
  },

  getters: {
    provinces: state => state.provinces,
  },

  actions: {
    set_provinces ({ commit }, { query, not_selected }) {
      const provinces_filter = (query && query.provinces_filter) ? JSON.parse(query.provinces_filter) : null;
      return fetcher({
        path: this.getters.api_path + '/back/api/provinces',
      }).then(provinces => {
        this.dispatch('set_provinces_filter', 
          provinces.map(({ id, title_ru, title_kz, title_en }) => {
            return {
              id,
              title_ru,
              title_kz,
              title_en,
              checked: not_selected ? false : (provinces_filter ? (provinces_filter.includes(id) ? false : true) : true),
            };
          }));
        commit('set_provinces', provinces);
      });
    },
  },
};