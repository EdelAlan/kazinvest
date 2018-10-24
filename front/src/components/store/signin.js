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
        this.dispatch('change_ui_visibility', {
          ui_component: 'signup_signin_modal',
          ui_component_state: false,
        })
        localStorage.setItem('sessiontoken', sessiontoken);
        this.dispatch('set_profile');
        return msg;
      });
    }
  },
};