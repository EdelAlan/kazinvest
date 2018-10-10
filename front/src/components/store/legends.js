import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    infrastructures_list: [],
    objects_list: [],
    earth_list: [], 
  }),

  getters: {
    infrastructures_list: state => state.infrastructures_list.map(it => ({ ...it, objects_type: 'line' })),
    objects_list: state => state.objects_list.map(it => ({ ...it, objects_type: 'circle' })),
    earth_list: state => state.earth_list.map(it => ({ ...it, objects_type: 'polygon' })),
  },

  mutations: {
    set_infrastructures_list (state, list) {
      state.infrastructures_list = list;
    },
    set_objects_list (state, list) {
      state.objects_list = list;
    },
    set_earth_list (state, list) {
      state.earth_list = list;
    },
  },

  actions: {
    set_infrastructures_list ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/infrastructures_list?zone_id=' + this.getters.selected_zone.id,
      }).then(spec_zone_infrastructures => {
        commit('set_infrastructures_list', spec_zone_infrastructures);
        return;
      });
    },
    set_objects_list ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/objects_list?zone_id=' + this.getters.selected_zone.id,
      }).then(spec_zone_objects => {
        return commit('set_objects_list', spec_zone_objects);
      });
    },
    set_earth_list ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/earth_list?zone_id=' + this.getters.selected_zone.id,
      }).then(spec_zone_earths => {
        return commit('set_earth_list', spec_zone_earths);
      });
    },

    set_new_infrastructures_list ({ commit }, updated_list) {
      commit('set_infrastructures_list', updated_list);
    }, 
    set_new_objects_list ({ commit }, updated_list) {
      commit('set_objects_list', updated_list);
    }, 
    set_new_earth_list ({ commit }, updated_list) {
      commit('set_earth_list', updated_list);
    }, 
  },
};