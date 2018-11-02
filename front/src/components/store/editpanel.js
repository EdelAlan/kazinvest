import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zone_sectors: null,
    edited_zone: null,
    edited_sector: null,
    views: [{
      active: true,
      id: 'sectors',
      title_ru: 'Участки',
      title_kz: 'Аумақтар',
      title_en: 'Zones',
    }, {
      active: false,
      id: 'members',
      title_ru: 'Участники',
      title_kz: 'Қатысушылар',
      title_en: 'Participants',
    }],
  }),

  mutations: {
    set_views(state, views) {
      state.views = views;
    },
    set_zone_sectors(state, zone_sectors) {
      state.zone_sectors = zone_sectors;
    },
    set_edited_zone(state, zone) {
      console.log(zone)
      state.edited_zone = zone;
      console.log(state.edited_zone);
    },
    set_edited_sector(state, sector) {
      console.log(sector)
      state.edited_sector = sector;
      console.log(state.edited_sector);
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
    edited_zone: state => state.edited_zone,
    edited_sector: state => state.edited_sector,
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
          sectors: getters.sectors.filter(sector => sector.zone_id == zone.id).map(sector => {
            return {
              ...sector,
              investments2014: getters.investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              investments2015: getters.investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              investments2016: getters.investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              investments2017: getters.investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              investments2018: getters.investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,

              production2014: getters.production.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.production.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              production2015: getters.production.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.production.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              production2016: getters.production.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.production.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              production2017: getters.production.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.production.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              production2018: getters.production.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.production.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,

              foreign_investments2014: getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              foreign_investments2015: getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              foreign_investments2016: getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              foreign_investments2017: getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              foreign_investments2018: getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,

              number_jobs2014: getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              number_jobs2015: getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              number_jobs2016: getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              number_jobs2017: getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              number_jobs2018: getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.number_jobs.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,
              
              taxes2014: getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              taxes2015: getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              taxes2016: getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              taxes2017: getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              taxes2018: getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.taxes.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,
            }
          }),
          infrastructures: getters.all_infrastructures.filter(it => it.zone_id == zone.id),
          objects: getters.all_objects.filter(it => it.zone_id == zone.id),
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
    },
    set_edited_zone({ commit }, zone) {
      commit('set_edited_zone', zone);
    },
    set_edited_sector({ commit }, sector) {
      commit('set_edited_sector', sector);
    },
    
    update_zone ({ commit }, zone) {
      const path = this.getters.api_path + `/back/api/zones/${zone.id}`;
      console.log(path);
      return fetcher({ 
        method: 'put',
        path,
        body: zone,
      }).then(res => {
        console.log(res)
      });
    },
    update_sector ({ commit }, sector) {
      const path = this.getters.api_path + `/back/api/sectors/${sector.id}`;
      console.log(path);
      return fetcher({ 
        method: 'put',
        path,
        body: sector,
      }).then(res => {
        console.log(res)
      });
    },
  },
};