import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    user: {
      userid: '',
      password: '',
    },
  }),
  
  getters: {
    user: state => state.user,
  },

  mutations: {
    set_userid (state, password) {
      state.user.password = password;
    },
    set_password (state, userid) {
      state.user.userid = userid;
    },
  },

  actions: {
    sign_in ({ commit }, {
      userid,
      password,
    }) {
      return fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/signin',
        body: {
          userid,
          password,
        },
      }).then(({ msg }) => {
        if (msg == 'user not enter') {
          return msg;
        }
        commit('set_userid', userid);
        commit('set_password', password);
        return msg;
      });
    }
  },
};