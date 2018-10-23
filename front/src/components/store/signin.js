import fetcher from '../../util/fetcher';

export default {
  actions: {
    sign_in (_, {
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
        if (
          msg == 'userid and password in body aren\'t exists' ||
          msg == 'user not found or not verified' ||
          msg == 'user wrong password'
        ) {
          return console.error(msg);
        }
        console.log(msg);
        localStorage.setItem('sessiontoken', sessiontoken);
        this.dispatch('set_profile');
      });
    }
  },
};