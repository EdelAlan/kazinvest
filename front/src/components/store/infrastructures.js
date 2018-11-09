import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    infrastructures: [],
    all_infrastructures: [],
  }),

  getters: {
    infrastructures: state => state.infrastructures,
    all_infrastructures: state => state.all_infrastructures,
  },

  mutations: {
    set_infrastructures (state, infrastructures) {
      state.infrastructures = infrastructures;
    },
    set_all_infrastructures (state, all_infrastructures) {
      state.all_infrastructures = all_infrastructures;
    },
  },

  actions: {
    set_infrastructures ({ commit }) {
      const path = this.getters.api_path + '/back/api/infrastructures?zone_id=' +
        this.getters.selected_zone.id +
        (this.getters.infrastructures_list.filter(it => !it.selected).length > 0
        ? ('&legend_filter=[' + this.getters.infrastructures_list.filter(it => !it.selected).map(it => it.type) + ']') : '');
      return fetcher({
        path,
      }).then(infrastructures => {
        commit('set_infrastructures', infrastructures.map(obj => ({
          ...obj,
          color: this.getters.infrastructures_list
            .filter(legend_item => obj.type == legend_item.type)
            .map(it => it.color)[0],
        })));        
        return;
      });
    },
    set_all_infrastructures ({ commit }) {
      const path = this.getters.api_path + '/back/api/infrastructures';
      return fetcher({
        path,
      }).then(infrastructures => {
        commit('set_all_infrastructures', infrastructures.map(obj => ({
          ...obj,
          color: this.getters.infrastructures_list
            .filter(legend_item => obj.type == legend_item.type)
            .map(it => it.color)[0],
        })));        
        return;
      });
    },
  },
};