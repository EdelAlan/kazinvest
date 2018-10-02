export default {
  state: () => ({
    lang: 'ru',
  }),

  mutations: {
    select_lang (state, lang) {
      state.lang = lang;
    },
  },

  getters: {
    lang: state => state.lang,
  },

  actions: {
    select_lang({ commit }, lang) {
      commit('select_lang', lang);
    },
  },
};