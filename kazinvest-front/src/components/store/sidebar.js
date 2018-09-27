export default {
  state: () => ({
    expanded: false,
  }),

  mutations: {
    toggle_sidebar (state) {
      state.expanded = !state.expanded;
    },
  },

  getters: {
    sidebar: state => state.expanded,
  },

  actions: {
    toggle_sidebar({ commit }) {
      commit('toggle_sidebar');
    },
  },
};