import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zones: [],
    selected_zone: null,
  }),

  mutations: {
    set_zone_type (state, zone_type) {
      state.zone_type = zone_type;
    },
    set_zones (state, zones) {
      state.zones = zones;
    },
    set_selected_zone (state, selected_zone) {
      state.selected_zone = selected_zone;
    },
  },

  getters: {
    zone_type: state => state.zone_type,
    zones: state => state.zones,
    selected_zone: state => state.selected_zone,
  },

  actions: {
    set_selected_zone ({ commit }, zone) {
      commit('set_selected_zone', zone);
    },
    async set_zones({ commit }, { filter }) {
      this.dispatch('change_ui_visibility', {
        ui_component: 'passport',
        ui_component_state: false,
      });
      this.dispatch('reset_sector');
      const { lang } = this.state.lang;
      const { search_string } = this.state.filters;
      const path = this.getters.api_path 
        + '/back/api/zones?'
        + (filter ?
          this.getters.search_query
        + (search_string != '' ? `&search_string=${search_string}` : '')
        + (lang != '' ? `&lang=${lang}` : '') : '');
      console.log(path);
      return fetcher({ path }).then(zones => commit('set_zones', zones));
    },
  },
};