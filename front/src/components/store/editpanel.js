import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    editzone_state: false,
    editsector_state: false,
    zone_sectors: null,
    edited_zone: null,
    edited_sector: null,
    edited_inf: null,
    new_data: null,
    selected_tab: 1,
    crumbs_admin: [{
      active: true,
      id: 'sectors',
      level: 1,
      title_ru: 'Участки',
      title_kz: 'Аумақтар',
      title_en: 'Zones',
    }],
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
    }, {
      active: false,
      id: 'republics',
      title_ru: 'Общая информация по СЭЗ/ИЗ',
      title_kz: 'АЭА/ИА туралы жалпы ақпарат',
      title_en: 'SEZ/IZ general info',
    }],
  }),

  mutations: {
    set_editzone_state(state, editzone_state) {
      state.editzone_state = editzone_state;
    },
    set_editsector_state(state, editsector_state) {
      state.editsector_state = editsector_state;
    },
    set_views(state, views) {
      state.views = views;
    },
    set_zone_sectors(state, zone_sectors) {
      state.zone_sectors = zone_sectors;
    },
    set_edited_zone(state, zone) {
      state.edited_zone = zone;
    },
    set_edited_sector(state, sector) {
      state.edited_sector = sector;
    },
    set_edited_inf(state, inf) {
      state.edited_inf = inf;
    },
    set_new_data(state, new_data) {
      state.new_data = new_data;
    },
    set_crumbs_admin(state, crumbs_admin) {
      state.crumbs_admin = crumbs_admin;
    },
    set_selected_tab(state, selected_tab) {
      state.selected_tab = selected_tab;
    },
  },

  getters: {
    views(state, getters) {
      return state.views.filter(it => {
        if (getters.profile) {
          return getters.profile.member_role == 'superadmin' ? it : it.id != 'members' && it.id != 'feedback' && it.id != 'rejected' && it.id != 'allowed' && it.id != 'reconciliation' && it.id != 'republics';
        }
      });
    },

    editzone_state: state => state.editzone_state,
    editsector_state: state => state.editsector_state,
    zone_sectors: state => state.zone_sectors,
    edited_zone: state => state.edited_zone,
    edited_sector: state => state.edited_sector,
    edited_inf: state => state.edited_inf,
    new_data: state => state.new_data,
    crumbs_admin: state => state.crumbs_admin,
    selected_tab: state => state.selected_tab,
  },

  actions: {
    set_view ({ commit, state }, id) {
      commit('set_views', state.views.map(it => ({
        ...it,
        active: it.id == id ? true : false,
      })));
    },

    set_editzone_state({ commit }, bool) {
      commit('set_editzone_state', bool);
    },
    set_editsector_state({ commit }, bool) {
      commit('set_editsector_state', bool);
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
    set_edited_inf({ commit }, inf) {
      commit('set_edited_inf', inf);
    },
    set_crumbs_admin({ commit }, crumbs_admin) {
      commit('set_crumbs_admin', crumbs_admin);
    },
    set_selected_tab({ commit }, selected_tab) {
      commit('set_selected_tab', selected_tab);
    },
    set_crumb_first({ commit, dispatch }, data) {
      if (data.id == 'reconciliation') {
        commit('set_new_data', '');
        dispatch('set_new_data', this.getters.selected_tab);
      }
      if (data.level == 1) {
        commit('set_crumbs_admin', [this.getters.crumbs_admin[0]]);
        commit('set_edited_zone', false);
        commit('set_edited_sector', false);
        commit('set_edited_inf', false);
        commit('set_editzone_state', false);
        commit('set_editsector_state', false);
      }
    },
    
    update_zone ({ commit, dispatch }, new_data) {
      if (this.getters.profile.member_role != 'superadmin') {
        const path = this.getters.api_path + `/back/api/new_data/zone`;
        return fetcher({ 
          method: 'put',
          path,
          body: {
            zone: {
              new_data,
              old_data: {
                ...this.getters.edited_zone,
                last_updated_date: undefined,
                last_updated_member: undefined,
                sectors: undefined,
                collapsed: undefined,
              },
              last_updated_member: this.getters.edited_zone.last_updated_member,
              last_updated_date: this.getters.edited_zone.last_updated_date,
              origin_title_en: this.getters.edited_zone.title_en,
              origin_title_ru: this.getters.edited_zone.title_ru,
              origin_title_kz: this.getters.edited_zone.title_kz,
            },
            member: {
              member_firstname: this.getters.profile.member_firstname,
              member_lastname: this.getters.profile.member_lastname,
              member_id: this.getters.profile.member_id,
            },
          },
        }).then(res => {
          console.log(res)
        });
      } else {
        const path = this.getters.api_path + `/back/api/zones/${new_data.id}?who=${this.getters.profile.member_id}`;
        return fetcher({ 
          method: 'put',
          path,
          body: new_data,
        }).then(async res => {
          console.log(res)
          const path = this.getters.api_path + `/back/api/new_data/allow/${this.getters.edited_zone.id}`;
          await fetcher({ method: 'put', path}).then(res => {
            console.log(res);
          });
          commit('set_new_data', '');
          dispatch('set_new_data', this.getters.selected_tab);
          commit('set_edited_zone', false);
          commit('set_edited_sector', false);
        });
      }
    },
    update_sector ({ commit, dispatch }, new_data) {
      if (this.getters.profile.member_role != 'superadmin') {
        const path = this.getters.api_path + `/back/api/new_data/sector`;
        return fetcher({ 
          method: 'put',
          path,
          body: {
            sector: {
              new_data,
              old_data: {
                ...this.getters.edited_sector,
                last_updated_date: undefined,
                last_updated_member: undefined,
              },
              last_updated_member: this.getters.edited_sector.last_updated_member,
              last_updated_date: this.getters.edited_sector.last_updated_date,
              origin_title_en: this.getters.edited_sector.title_en,
              origin_title_ru: this.getters.edited_sector.title_ru,
              origin_title_kz: this.getters.edited_sector.title_kz,
            },
            member: {
              member_firstname: this.getters.profile.member_firstname,
              member_lastname: this.getters.profile.member_lastname,
              member_id: this.getters.profile.member_id,
            },
          },
        }).then(res => {
          console.log(res)
        });
      } else {
        const path = this.getters.api_path + `/back/api/sectors/${new_data.id}?who=${this.getters.profile.member_id}`;
        return fetcher({ 
          method: 'put',
          path,
          body: new_data,
        }).then(async res => {
          console.log(res)
          const path = this.getters.api_path + `/back/api/new_data/reject/${this.getters.edited_sector.id}`;
          await fetcher({ method: 'put', path}).then(res => {
            console.log(res);
          });
          commit('set_new_data', '');
          dispatch('set_new_data', this.getters.selected_tab);
          commit('set_edited_zone', false);
          commit('set_edited_sector', false);
        })
      }
    },
    set_new_data({ commit }, selected_tab) {
      const path = this.getters.api_path + `/back/api/new_data/${selected_tab}`;
      return fetcher({
        path
      }).then(new_data => commit('set_new_data', new_data));
    },
    reject_data({ commit, dispatch }, data) {
      const path = this.getters.api_path + `/back/api/new_data/${data.id}`;
      return fetcher({ 
        method: 'put',
        path,
      }).then(res => {
        console.log(res)
        commit('set_new_data', '');
        dispatch('set_new_data', this.getters.selected_tab);
        commit('set_edited_zone', false);
        commit('set_edited_sector', false);
        commit('set_edited_inf', false);
      });
    },
    update_republic ({ commit }, republicmodel) {
      const path = this.getters.api_path + `/back/api/republics/`;
      return fetcher({ 
        method: 'put',
        path,
        body: republicmodel,
      }).then(async res => {
        console.log(res);
      });
    },
    update_contacts ({ commit }, sezmodel) {
      const path = this.getters.api_path + `/back/api/republics/contacts`;
      return fetcher({ 
        method: 'put',
        path,
        body: {
          contacts_ru: sezmodel.contacts_ru,
          contacts_kz: sezmodel.contacts_kz,
          contacts_en: sezmodel.contacts_en,
        },
      }).then(async res => {
        console.log(res);
      });
    },
    update_links_adilet ({ commit }, links_adilet) {
      const path = this.getters.api_path + `/back/api/links_adilet/`;
      return fetcher({ 
        method: 'put',
        path,
        body: links_adilet,
      }).then(async res => {
        console.log(res);
      });
    },

  },
};