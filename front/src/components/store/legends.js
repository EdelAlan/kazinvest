import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    infrastructures_list: [],
    objects_list: [],
    // earth_list: [], 
  }),

  getters: {
    infrastructures_list: state => state.infrastructures_list.map(it => ({ ...it, objects_type: 'line' })),
    objects_list: state => state.objects_list.map(it => ({ ...it, objects_type: 'circle' })),
  },

  mutations: {
    set_infrastructures_list (state, list) {
      state.infrastructures_list = list;
    },
    set_objects_list (state, list) {
      state.objects_list = list;
    },
  },

  actions: {
    set_infrastructures_list ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/infrastructures_list?zone_id=' + this.getters.selected_zone.id,
      }).then(spec_zone_infrastructures => {
        commit('set_infrastructures_list', spec_zone_infrastructures);
        this.dispatch('set_infrastructures');
        return;
      });
    },
    set_objects_list ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/objects_list?zone_id=' + this.getters.selected_zone.id,
      }).then(spec_zone_objects => {
        commit('set_objects_list', spec_zone_objects);
        this.dispatch('set_objects');
        return;
      });
    },

    set_new_infrastructures ({ commit }, updated_list) {
      commit('set_infrastructures_list', updated_list);
    }, 
    set_new_objects ({ commit }, updated_list) {
      commit('set_objects_list', updated_list);
    }, 
  },
};