import fetcher from '../../util/fetcher';

export default {
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
      }).then(({ msg, sessiontoken }) => {
        console.log(msg);
        if (
          msg == 'userid and password aren\'t exists' ||
          msg == 'user not found or not verified'
        ) {
          return ;
        }
        localStorage.setItem('sessiontoken', sessiontoken);
        this.dispatch('set_profile');
      });
    }
  },
};