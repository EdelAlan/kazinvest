import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zone_sectors: null,
    views: [{
      active: true,
      id: 'sectors',
      title_ru: 'Участки',
      title_kz: 'Участки',
      title_en: 'Участки',
    }, {
      active: false,
      id: 'members',
      title_ru: 'Участники',
      title_kz: 'Участники',
      title_en: 'Участники',
    }],
  }),

  mutations: {
    set_views(state, views) {
      state.views = views;
    },
    set_zone_sectors(state, zone_sectors) {
      state.zone_sectors = zone_sectors;
    },
  },

  getters: {
    views(state, getters) {
      return state.views.filter(it => {
        if (getters.profile) {
          return getters.profile.member_role == 'superadmin' ? it : it.id != 'members';
        }
      });
    },

    zone_sectors: state => state.zone_sectors,
  },

  actions: {
    set_view ({ commit, state }, idx) {
      commit('set_views', state.views.map((it, key) => ({
        ...it,
        active: key == idx ? true : false,
      })));
    },
    set_zone_sectors ({ commit, getters }) {
      commit('set_zone_sectors', getters.zones.map(zone => {
        return {
          ...zone,
          collapsed: true,
          sectors: getters.sectors.filter(sector => sector.zone_id == zone.id),
        }
      }));
    },
    collapse_zone_sectors ({ commit, getters }, zoneid) {
      commit('set_zone_sectors', getters.zone_sectors.map(zone => {
        return {
          ...zone,
          collapsed: zone.id == zoneid ? !zone.collapsed : zone.collapsed,
        }
      }));
    }
  },
};