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
    async set_zones({ commit, dispatch }) {
      this.dispatch('reset_sector');
      // await this.dispatch('set_industries');
      let industries_filter = this.state.filters.industries_filter.filter(it => it.checked).map(it => it.checked ? it.id : null);
      let zone_filter = this.state.filters.zone_filter.filter(it => it.checked).map(it => it.id);
      return fetcher({
        method: 'get',
        path: 'http://localhost:5000/back/api/zones?' + 
          (zone_filter.length != 0  ? `zone_filter=[${zone_filter}]` : '') + 
          (industries_filter.length != 0 ? `&industries_filter=[${industries_filter}]` : ''),
      }).then(zones => {
        commit('set_zones', zones);
        return;
      });
    },
  },
};