import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    members: [],
  }),

  mutations: {
    set_members(state, members) {
      state.members = members;
    },
  },

  getters: {
    members: state => state.members,
  },

  actions: {
    set_members ({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/members'
      }).then(members => commit('set_members', members));
    },
    update_member ({ dispatch }, member) {
      return fetcher({
        method: 'put',
        path: this.getters.api_path + '/back/api/members/' + member.member_id,
        body: member,
      }).then(res => {
        console.log(res);
        dispatch('set_members');
      });
    },
  },
};