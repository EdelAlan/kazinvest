import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zones: [],
  }),

  mutations: {
    set_zone_type (state, zone_type) {
      state.zone_type = zone_type;
    },
    set_zones (state, zones) {
      state.zones = zones;
    },
  },

  getters: {
    zone_type: state => state.zone_type,
    zones: state => state.zones,
  },

  actions: {
    async set_zones({ commit }) {
      this.dispatch('change_ui_visibility', {
        ui_component: 'sector_passport',
        ui_component_state: false,
      });
      this.dispatch('reset_sector');
      const { lang } = this.state.lang;
      const { search_string } = this.state.filters;
      const industries_filter = this.state.filters.industries_filter.filter(it => it.checked).map(it => it.id);
      const zone_filter = this.state.filters.zone_filter.filter(it => it.checked).map(it => it.id);
      const path = this.getters.api_path + '/back/api/zones?' +
        (zone_filter.length != 0 ? `zone_filter=[${zone_filter}]` : '') +
        (industries_filter.length != 0 ? `&industries_filter=[${industries_filter}]` : '') +
        (search_string != '' ? `&search_string=${search_string}` : '') +
        (lang != '' ? `&lang=${lang}` : '');
      console.log(path);
      return fetcher({ path }).then(zones => commit('set_zones', zones));
    },
  },
};