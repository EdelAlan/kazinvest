import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    search_string: '',
    zone_filter: [], // from republics
    industries_filter: [], 
  }),

  getters: {
    zone_filter: state => state.zone_filter,
    industries_filter: state => state.industries_filter,
    search_string: state => state.search_string,
  },

  mutations: {
    set_zone_filter (state, filter_list) {
      state.zone_filter = filter_list;
    },
    set_industries_filter (state, filter_list) {
      state.industries_filter = filter_list;
    },
    set_search_string (state, str) {
      state.search_string = str;
    },
  },

  actions: {
    set_zone_filter ({ commit }, filter_list) {
      return commit('set_zone_filter', filter_list);
    },
    set_industries_filter ({ commit }, filter_list) {
      return commit('set_industries_filter', filter_list);
    },
    set_search_string ({ commit }, e) {
      return commit('set_search_string', e.target.value);
    },
  },
};