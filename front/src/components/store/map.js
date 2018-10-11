export default {
    state: () => ({
      basemap: false,
      tip: null,
      popup: null,
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
    },
  
    getters: {
      basemap: state => state.basemap,
      tip: state => state.tip,
      popup: state => state.popup,
    },
  };