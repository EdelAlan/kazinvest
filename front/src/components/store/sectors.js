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

    set_sectors ({ commit }, selected_zone) {
      console.log(selected_zone.id)
      if (!selected_zone) {
        return commit('set_sectors', []);
      }
      return fetcher({
        path: 'http://localhost:5000/back/api/sectors' 
          + (selected_zone.id ? '?zone_id=' + selected_zone.id : ''),
      }).then(sectors => {
        commit('set_sectors', sectors);
        return;
      });
    },
    // Повторный запрос на сектор нужен для того, чтобы в будущем была возможность делать джоин
    set_selected_sector ({ commit }, selected_sector) {
      console.log(selected_sector)
      console.log(selected_sector.id)
      return fetcher({
        path: `http://localhost:5000/back/api/sectors/${selected_sector.id}`,
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