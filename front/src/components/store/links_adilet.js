import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    links_adilet: [],
  }),

  mutations: {
    set_links_adilet (state, links_adilet) {
      state.links_adilet = links_adilet;
    },
  },

  getters: {
    links_adilet: state => state.links_adilet,
  },

  actions: {
    set_links_adilet ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/links_adilet',
      }).then(links_adilet => {
        commit('set_links_adilet', links_adilet);
      });
    },
  },
};