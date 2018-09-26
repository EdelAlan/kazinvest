export default {
  state: () => ({
    signup_signin_modal: false,
  }),

  mutations: {
    change_ui_visibility (state, { ui_component, ui_component_state }) {
      state[ui_component] = ui_component_state;
    },
  },

  getters: {
    signup_signin_modal: state => state.signup_signin_modal,
  },

  actions: {
    change_ui_visibility({ commit }, ui_component_state) {
      commit('change_ui_visibility', ui_component_state);
    },
  },
};