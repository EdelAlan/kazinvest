import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zone_type: // 3 - cэз/из, 1 - сэз, 2 - из
      { id: '3', name: { ru: 'CЭЗ/ИЗ', kk: 'CЭЗ/ИЗ' } }, 
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
    async set_zone_type({ commit, dispatch }, zone_type) {
      await commit('set_zone_type', zone_type);
      dispatch('set_zones');
    },

    set_zones({ commit, state }) {
      return fetcher({
        method: 'get',
        path: 'http://localhost:5000/back/api/zones?zone_type=' + state.zone_type.id,
      }).then(zones => {
        commit('set_zones', zones);
        return;
      });
    },
  },
};