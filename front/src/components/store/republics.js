import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    republics: [], //sez/iz
  }),

  mutations: {
    set_republics (state, republics) {
      state.republics = republics;
    },
  },

  getters: {
    republics: state => state.republics,
  },

  actions: {
    async set_republics ({ commit }, { query, not_selected }) {
      console.log(not_selected)

      const zone_filter = (query && query.zone_filter) ? JSON.parse(query.zone_filter) : null;
      return fetcher({
        path: this.getters.api_path + '/back/api/republics',
      }).then(republics => {
        commit('set_republics', republics);
        this.dispatch('set_zone_filter', 
          republics.map(({ id, title_ru, title_kz, title_en }) => {
            return { 
              id,
              title_ru,
              title_kz,
              title_en,
              checked: not_selected ? false : (zone_filter ? (zone_filter.includes(id) ? false : true) : true),
            };
          }));
      });
    },
  },
};