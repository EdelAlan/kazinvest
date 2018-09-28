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
    sidebar_expanded: state => state.expanded,
  },

  actions: {
    toggle_sidebar({ commit }) {
      commit('toggle_sidebar');
    },
  },
};