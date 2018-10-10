export default {
  state: () => ({
    signup_signin_modal: false,
    passport: false,// паспорт объекта, "sector" - название из базы
    passport_content: '',// временно
    passport_title: '',// временно
  }),

  mutations: {
    change_ui_visibility (state, { ui_component, ui_component_state }) {
      state[ui_component] = ui_component_state;
    },
    set_passport_content (state, passport_content) {
      state.passport_content = passport_content;
    },
    set_passport_title (state, passport_title) {
      state.passport_title = passport_title;
    },
  },

  getters: {
    signup_signin_modal: state => state.signup_signin_modal,
    passport: state => state.passport,
    passport_content: state => state.passport_content,
    passport_title: state => state.passport_title,
  },

  actions: {
    change_ui_visibility ({ commit }, ui_component_state) {
      commit('change_ui_visibility', ui_component_state);
    },
    set_passport_content({ commit }, passport_content) {
      commit('set_passport_content', passport_content);
    },
    set_passport_title({ commit }, passport_title) {
      commit('set_passport_title', passport_title);
    },
  },
};