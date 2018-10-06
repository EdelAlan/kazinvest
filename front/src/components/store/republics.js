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
    set_republics ({ commit, dispatch }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/republics',
      }).then(republics => {
        this.dispatch('set_zone_filter', 
          republics.map(({ id, title_ru, title_kz, title_en }) => {
            return { 
              id,
              title_ru,
              title_kz,
              title_en,
              checked: true 
            };
          }));
        commit('set_republics', republics);
      });
    },
  },
};