import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    zone_sectors: null,
    edited_zone: null,
    edited_sector: null,
    new_data: null,
    views: [{
      active: true,
      id: 'sectors',
      title_ru: 'Участки',
      title_kz: 'Аумақтар',
      title_en: 'Zones',
    }, {
      active: false,
      id: 'members',
      title_ru: 'Пользователи',
      title_kz: 'Пайдаланушылар',
      title_en: 'Users',
    }, {
      active: false,
      id: 'reconciliation',
      title_ru: 'Согласование данных',
      title_kz: 'Деректерді салыстырып тексеру',
      title_en: 'Data reconciliation',
    }, {
      active: false,
      id: 'feedback',
      title_ru: 'Обратная связь',
      title_kz: 'Кері байланыс',
      title_en: 'Feedback',
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
    set_new_data(state, new_data) {
      state.new_data = new_data;
    },
  },

  getters: {
    views(state, getters) {
      return state.views.filter(it => {
        if (getters.profile) {
        return getters.profile.member_role == 'superadmin' ? it : it.id != 'members' && it.id != 'feedback' && it.id != 'reconciliation';
        }
      });
    },

    zone_sectors: state => state.zone_sectors,
    edited_zone: state => state.edited_zone,
    edited_sector: state => state.edited_sector,
    new_data: state => state.new_data,
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

              exports_volume2014: getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              exports_volume2015: getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              exports_volume2016: getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              exports_volume2017: getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              exports_volume2018: getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.exports_volume.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,
              
              spent_foreign_investments2014: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0] ? getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2014)[0].val : 0,
              spent_foreign_investments2015: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0] ? getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2015)[0].val : 0,
              spent_foreign_investments2016: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0] ? getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2016)[0].val : 0,
              spent_foreign_investments2017: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0] ? getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2017)[0].val : 0,
              spent_foreign_investments2018: getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0] ? getters.spent_foreign_investments.filter(el => el.parent_id == sector.id && el.year == 2018)[0].val : 0,
            }
          })
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
    
    update_zone ({ commit, dispatch }, zone) {
      if (this.getters.profile.member_role != 'superadmin') {
        const path = this.getters.api_path + `/back/api/new_data/zone`;
        return fetcher({ 
          method: 'put',
          path,
          body: zone,
        }).then(res => {
          console.log(res)
        });
      } else {
        const path = this.getters.api_path + `/back/api/zones/${zone.id}`;
        return fetcher({ 
          method: 'put',
          path,
          body: zone,
        }).then(res => {
          console.log(res)
          commit('set_new_data', '');
          dispatch('set_new_data');
          const path = this.getters.api_path + `/back/api/new_data/reject/${this.getters.edited_zone.id}`;
          fetcher({ method: 'put', path}).then(res => {
            console.log(res);
          });
          commit('set_edited_zone', false);
          commit('set_edited_sector', false);
        });
      }
    },
    update_sector ({ commit, dispatch }, sector) {
      if (this.getters.profile.member_role != 'superadmin') {
        const path = this.getters.api_path + `/back/api/new_data/sector`;
        return fetcher({ 
          method: 'put',
          path,
          body: sector,
        }).then(res => {
          console.log(res)
        });
      } else {
        const path = this.getters.api_path + `/back/api/sectors/${sector.id}`;
        return fetcher({ 
          method: 'put',
          path,
          body: sector,
        }).then(res => {
          console.log(res)
          commit('set_new_data', '');
          dispatch('set_new_data');
          const path = this.getters.api_path + `/back/api/new_data/reject/${this.getters.edited_sector.id}`;
          fetcher({ method: 'put', path}).then(res => {
            console.log(res);
          });
          commit('set_edited_zone', false);
          commit('set_edited_sector', false);
        })
      }
    },
    set_new_data({ commit }) {
      return fetcher({
        path: this.getters.api_path + '/back/api/new_data'
      }).then(new_data => commit('set_new_data', new_data));
    },

    reject_data({ commit, dispatch }, data) {
      const path = this.getters.api_path + `/back/api/new_data/reject/${data.id}`;
      return fetcher({ 
        method: 'put',
        path,
      }).then(res => {
        console.log(res)
        commit('set_new_data', '');
        dispatch('set_new_data');
        commit('set_edited_zone', false);
        commit('set_edited_sector', false);
        // commit('set_edited_inf', false);
      });
    },
  },
};