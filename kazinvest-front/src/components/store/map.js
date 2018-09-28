export default {
    state: () => ({
      basemap: false,
    }),

    mutations: {
      set_basemap (state) {
        state.basemap = !state.basemap;
      },
    },
  
    actions: {
      set_basemap ({ commit }) {
        commit('set_basemap');
      },
    },
  
    getters: {
      basemap: state => state.basemap,
    },
  };