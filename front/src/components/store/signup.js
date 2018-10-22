import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    signup_success: false,
  }),
  getters: {
    signup_success: state => state.signup_success,
  },
  mutations: {
    set_success (state) {
      state.signup_success = true;
    },
  },
  actions: {
    signup (_, user_model) {
      return fetcher({
        method: 'post',
        path: this.getters.api_path + '/back/api/signup',
        body: { ...user_model },
      }).then(({ msg }) => {
        console.log(msg);
      });
    },
    set_success ({ commit }) {
      commit('set_success');
    },
  },
};