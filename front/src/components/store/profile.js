import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    profile: null,
  }),

  mutations: {
    set_profile (state, profile) {
      state.profile = profile;
    },
  },

  getters: {
    profile: state => state.profile,
  },

  actions: {
    
    async set_profile ({ commit }) {
      const { sessiontoken } = localStorage;
      if (!sessiontoken) {
        console.log('token is not exist, clear profile')
        return commit('set_profile', null);
      }
      await fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/sessionverification',
        body: { sessiontoken },
      }).then(profile => {
        console.log(profile);
        commit('set_profile', profile.user);
      });
    },

    signout ({ commit }) {
      localStorage.removeItem('sessiontoken');
      commit('set_profile', null);
    },

  },
};