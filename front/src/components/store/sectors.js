import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    sectors: null,
    selected_sector: null,
  }),

  mutations: {
    set_sectors(state, sectors) {
      state.sectors = sectors;
    },
    set_selected_sector(state, selected_sector) {
      state.selected_sector = selected_sector;
    },
  },

  getters: {
    sectors: state => state.sectors,
    selected_sector: state => state.selected_sector,
  },

  actions: {

    set_sectors ({ commit }, zone_id) {
      // return fetcher({
      //   path: this.getters.api_path + '/back/api/sectors' 
      //     + (zone_id ? '?zone_id=' + zone_id : ''),
      // }).then(sectors => {
      //   commit('set_sectors', sectors);
      //   return;
      // });
        const path = this.getters.api_path + '/back/api/sectors'
          + (this.getters.selected_zone ? '?zone_id=' + this.getters.selected_zone.id : '') +
          (this.getters.earth_list.filter(it => !it.selected).length > 0
            ? ('&legend_filter=[' + this.getters.earth_list.filter(it => !it.selected).map(it => it.project_type) + ']') : '');
        console.log('>>>>', path)
        return fetcher({
          path,
        }).then(sectors => {
        commit('set_sectors', sectors.map(sector => ({
          ...sector,
          color: this.getters.earth_list
            .filter(earth_item => sector.project_type == earth_item.project_type)
            .map(it => it.color)[0],
        })));
          console.log(this.getters.sectors)

        return;
      });
    },



    // Повторный запрос на сектор нужен для того, чтобы в будущем была возможность делать джоин
    set_selected_sector ({ commit }, selected_sector) {
      return fetcher({
        path: this.getters.api_path + `/back/api/sectors/${selected_sector.id}`,
      }).then(sector => {
        commit('set_selected_sector', sector[0]);
        return;
      });
    },
    reset_sector ({ commit }, selected_sector) {
      commit('set_sectors', null);
      commit('set_selected_sector', null);
    },
  },
};