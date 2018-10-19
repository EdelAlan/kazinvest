import fetcher from '../../util/fetcher';
export default {
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
  },
};