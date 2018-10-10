export default {
    state: () => ({
      basemap: false,
      tip: null,
    }),

    mutations: {
      set_basemap (state) {
        state.basemap = !state.basemap;
      },
      show_tip (state, tip) {
        state.tip = tip;
      },
    },
  
    actions: {
      set_basemap ({ commit }) {
        commit('set_basemap');
      },
      show_tip({ commit }, tip) {
        commit('show_tip', tip);
      },
    },
  
    getters: {
      basemap: state => state.basemap,
      tip: state => state.tip,
    },
  };