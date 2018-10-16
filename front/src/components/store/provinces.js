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
    set_provinces ({ commit }) {
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
              checked: true
            };
          }));
        commit('set_provinces', provinces);
      });
    },
  },
};