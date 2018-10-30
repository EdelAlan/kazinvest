export default {
    state: () => ({
      basemap: false,
      tip: null,
      popup: null,
      is_reset_sector: false,
      edited_sector_geom: false,
    }),

    mutations: {
      set_basemap (state) {
        state.basemap = !state.basemap;
      },
      show_tip (state, tip) {
        state.tip = tip;
      },
      show_popup (state, popup) {
        state.popup = popup;
      },
      set_reset_sector (state) {
        state.is_reset_sector = !state.is_reset_sector;
      },
      set_edited_sector_geom (state, geom) {
        state.edited_sector_geom = geom;
      },
    },
  
    actions: {
      set_basemap ({ commit }) {
        commit('set_basemap');
      },
      show_tip({ commit }, tip) {
        commit('show_tip', tip);
      },
      show_popup({ commit }, popup) {
        commit('show_popup', popup);
      },
      set_map_edited_sector ({ commit }, map_edited_sector) {
        commit('set_map_edited_sector', map_edited_sector);
      },
      set_reset_sector ({ commit }) {
        commit('set_reset_sector');
      },
      set_edited_sector_geom ({ commit }, geom) {
        commit('set_edited_sector_geom', geom);
      },
    },
  
    getters: {
      basemap: state => state.basemap,
      tip: state => state.tip,
      popup: state => state.popup,
      map_edited_sector: state => state.map_edited_sector,
      edited_sector_geom: state => state.edited_sector_geom,
      is_reset_sector: state => state.is_reset_sector,
    },
  };