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
        if (msg == 'userid and password aren\'t exists') {
          return console.log(msg)
        }
        if (msg == 'user not found') {
          return console.log(msg)
        }
        localStorage.setItem('sessiontoken', sessiontoken);
        this.dispatch('set_profile');
        return console.log(msg)
      });
    }
  },
};