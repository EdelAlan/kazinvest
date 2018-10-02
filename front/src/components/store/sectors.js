import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    sectors: [],
    // selected_sector: {},
  }),

  mutations: {
    set_sectors(state, sectors) {
      state.sectors = sectors;
    },
    // set_selected_sector(state, selected_sector) {
    //   state.selected_sector = selected_sector;
    // },
  },

  getters: {
    sectors: state => state.sectors,
    // selected_sector: state => state.selected_sector,
  },

  actions: {
    // async set_selected_sector ({ commit }, sector) {
      // console.log(sector)
      // await commit('set_sectors', sector)
      // dispatch('set_sectors', sector_id);
    // },

    set_sectors ({ commit }, selected_zone) {
      console.log(selected_zone.id)
      return fetcher({
        path: 'http://localhost:5000/api/sectors/' + selected_zone.id,
      }).then(sectors => {
        console.log(sectors);
        commit('set_sectors', sectors);
        return;
      });
    },
  },
};