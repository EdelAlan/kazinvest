import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    views: [{
      active: true,
      title_ru: 'Участки',
      title_kz: 'Участки',
      title_en: 'Участки',
    }, {
      active: false,
      title_ru: 'Участники',
      title_kz: 'Участники',
      title_en: 'Участники',
    }],
  }),

  mutations: {
    set_views(state, views) {
      state.views = views;
    },
  },

  getters: {
    views(state, getters) {
      return state.views.filter(it => {
        return getters.profile.member_role == 'superadmin' ? it : it.id != 'members';
      });
    },
  },

  actions: {
    set_view ({ commit, state }, idx) {
      commit('set_views', state.views.map((it, key) => ({
        ...it,
        active: key == idx ? true : false,
      })));
    },
  },
};