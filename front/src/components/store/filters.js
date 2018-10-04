import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zone_filter: [{
      checked: true,
      id: '1',
      title_ru: 'СЭЗ',
      title_kz: 'СЭЗ',
      title_en: 'СЭЗ',
    }, {
      checked: true,
      id: '2',
      title_ru: 'ИЗ',
      title_kz: 'ИЗ',
      title_en: 'ИЗ',
    }],
    industries_filter: [], // заполнятся из s:industries экшшоном set_industries
  }),

  getters: {
    zone_filter: state => state.zone_filter,
    industries_filter: state => state.industries_filter,
  },

  mutations: {
    set_zone_filter (state, filter_list) {
      state.zone_filter = filter_list;
    },
    set_industries_filter (state, filter_list) {
      state.industries_filter = filter_list;
    },
  },

  actions: {
    set_zone_filter ({ commit }, filter_list) {
      return commit('set_zone_filter', filter_list);
    },
    set_industries_filter ({ commit }, filter_list) {
      return commit('set_industries_filter', filter_list);
    },
  
  },
};