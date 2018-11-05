export default {
  state: () => ({
    signup_signin_modal: false,
    feedback_modal: false,
    image_modal: false,
    video_modal: false,
    passport: false,// паспорт объекта, "sector" - название из базы
    passport_anal: false,
    passport_anal_data: null,
    passport_anal_bar: false,
    passport_anal_bar_data: null,
    passport_content: '',// временно
    passport_title: '',// временно
    passport_anal_title: '',// временно
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
    set_passport_anal_title (state, passport_anal_title) {
      state.passport_anal_title = passport_anal_title;
    },
    set_passport_anal_data (state, passport_anal_data) {
      state.passport_anal_data = passport_anal_data;
    },
    set_passport_anal_bar_data (state, passport_anal_bar_data) {
      state.passport_anal_bar_data = passport_anal_bar_data;
    },
  },

  getters: {
    signup_signin_modal: state => state.signup_signin_modal,
    feedback_modal: state => state.feedback_modal,
    video_modal: state => state.video_modal,
    image_modal: state => state.image_modal,
    passport: state => state.passport,
    passport_content: state => state.passport_content,
    passport_title: state => state.passport_title,
    passport_anal_title: state => state.passport_anal_title,
    passport_anal: state => state.passport_anal,
    passport_anal_data: state => state.passport_anal_data,
    passport_anal_bar: state => state.passport_anal_bar,
    passport_anal_bar_data: state => state.passport_anal_bar_data,
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
    set_passport_anal_title({ commit }, passport_anal_title) {
      commit('set_passport_anal_title', passport_anal_title);
    },
    set_passport_anal_data({ commit }, passport_anal_data) {
      commit('set_passport_anal_data', passport_anal_data);
      console.log(passport_anal_data)
      console.log(this.getters.passport_anal_data)
    },
    set_passport_anal_bar_data({ commit }, passport_anal_bar_data) {
      commit('set_passport_anal_bar_data', passport_anal_bar_data);
    },
  },
};