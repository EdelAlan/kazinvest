import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zones: [],
    all_zones: [],
    selected_zone: null,
    zone_sector: null,
  }),

  mutations: {
    set_zone_type (state, zone_type) {
      state.zone_type = zone_type;
    },
    set_zones (state, zones) {
      state.zones = zones;
    },
    set_all_zones (state, all_zones) {
      state.all_zones = all_zones;
    },
    set_selected_zone (state, selected_zone) {
      state.selected_zone = selected_zone;
    },
    set_zone_sector (state, zone_sector) {
      state.zone_sector = zone_sector;
    },
  },

  getters: {
    zone_type: state => state.zone_type,
    zones: state => state.zones,
    all_zones: state => state.all_zones,
    selected_zone: state => state.selected_zone,
    zone_sector: state => state.zone_sector,
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
      this.dispatch('change_ui_visibility', {
        ui_component: 'passport_anal',
        ui_component_state: false,
      });
      this.dispatch('change_ui_visibility', {
        ui_component: 'passport_anal_bar',
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
    async set_all_zones({ commit }) {
      const path = this.getters.api_path 
        + '/back/api/zones';
      return fetcher({ path }).then(all_zones => {
        commit('set_all_zones', all_zones);
      });
    },
    set_zone_sector ({ commit, getters }) {
      commit('set_zone_sector', getters.all_zones.map(zone => {
        return {
          ...zone,
          collapsed: true,
          sectors: getters.sectors.filter(sector => sector.zone_id == zone.id).map(sector => {
            return {
              ...sector,
              investments: getters.investments.filter(el => el.parent_id == sector.id),
              production: getters.production.filter(el => el.parent_id == sector.id),
              foreign_investments: getters.foreign_investments.filter(el => el.parent_id == sector.id),
              number_jobs: getters.number_jobs.filter(el => el.parent_id == sector.id),
              taxes: getters.taxes.filter(el => el.parent_id == sector.id),
              exports_volume: getters.exports_volume.filter(el => el.parent_id == sector.id),
              spent_foreign_investments: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id),
            }
          }),
        }
      }));
    },
  },
};