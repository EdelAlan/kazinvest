import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    industries: [],
  }),

  mutations: {
    set_industries (state, industries) {
      state.industries = industries;
    },
  },

  getters: {
    industries: state => state.industries,
  },

  actions: {
    set_industries({ commit, dispatch }) {
      return fetcher({
        path: 'http://localhost:5000/back/api/industries',
      }).then(industries => {
        //FIXME: плохая практика
        this.dispatch('set_industries_filter', industries.map(it => {
          return { ...it, checked: true };
        }));
        commit('set_industries', industries);
      });
    },
  },
};