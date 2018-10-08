import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    infrastructures: [],
  }),

  getters: {
    infrastructures: state => state.infrastructures,
  },

  mutations: {
    set_infrastructures (state, infrastructures) {
      state.infrastructures = infrastructures;
    },
  },

  actions: {
    set_infrastructures ({ commit }) {
      const path = this.getters.api_path + '/back/api/infrastructures?zone_id=' +
        this.getters.selected_zone.id +
        (this.getters.infrastructures_list.filter(it => it.selected).length > 0
        ? ('&legend_filter=[' + this.getters.infrastructures_list.filter(it => it.selected).map(it => it.type) + ']') : '');
      console.log('>>>>', path)
      return fetcher({
        path,
      }).then(infrastructures => {
        commit('set_infrastructures', infrastructures);
        return;
      });
    },
  },
};