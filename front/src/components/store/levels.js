const LEVEL_1 = {
  id: 1,
  title_ru: 'Карта Казахстана',
  title_kz: 'Қазақстан картасы',
  title_en: 'Кazakhstan Map',
};

export default {
  state: () => ({
    levels: [LEVEL_1],
  }),
  
  getters: {
    levels: state => state.levels,
    active_level: state => state.levels[state.levels.length - 1],
  },

  mutations: {
    set_level (state, updated_levels) {
      state.levels = updated_levels;
    },
  },

  actions: {
    async set_level({ commit, state }, level) {
      const show_active_element = () => {
        let item_count = 0;
        for (let i = 0; i < this.getters.sectors.length; i++) {
          if (this.getters.sectors[i].id == level.properties.id) {
            let scrl_section = document.querySelector('.sidebar-scroll_section');
            let treenode = document.querySelector('.sidebar-legends');
            scrl_section.scrollTop = 67 * item_count + 39 + treenode.clientHeight + 5;
            return;
          }
          item_count++;
        }
      }
      let updated_levels = state.levels.slice();
      switch (level.id) {
        case 2:
          await this.dispatch('set_selected_zone', level.properties);
          await this.dispatch('set_infrastructures_list');
          await this.dispatch('set_objects_list');
          await this.dispatch('set_earth_list');
          updated_levels = await updated_levels.slice(0, 1);
          this.dispatch('set_sectors', level.properties.id);
          break;
        case 3:
          show_active_element();
          updated_levels = updated_levels.slice(0, 2);
          this.dispatch('set_selected_sector', level.properties);
          this.dispatch('change_ui_visibility', {
            ui_component: 'sector_passport',
            ui_component_state: true,
          });
      }
      commit('set_level', [...updated_levels, level]);
    },


    set_level_b ({commit, state}, level) {
      if (level.id == this.getters.active_level.id) {
        return;
      }
      switch (level.id) {
        case 1:
          this.dispatch('set_selected_zone', null);
          this.dispatch('change_ui_visibility', {
            ui_component: 'sector_passport',
            ui_component_state: false,
          });
          this.dispatch('reset_sector');
          this.dispatch('set_zones');
          commit('set_level', [LEVEL_1]);
          break;
        case 2:
          this.commit('set_selected_sector', {});
          this.dispatch('change_ui_visibility', {
            ui_component: 'sector_passport',
            ui_component_state: false,
          });
          commit('set_level', state.levels.slice(0, level.id));
      }
    }
  }
}