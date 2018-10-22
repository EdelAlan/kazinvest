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

    async signout({ dispatch, state }) {
      await localStorage.removeItem('sessiontoken');
      return fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/signout',
        body: {
          userid: state.profile.member_id,
        },
      }).then(resp => {
        console.log(resp);
        return dispatch('set_profile');
      });
    },

  },
};