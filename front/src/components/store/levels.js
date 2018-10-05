export default {
  state: () => ({
    levels: [{ 
      id: 1, 
      title_ru: 'Карта Казахстана',
      title_kz: 'Қазақстан картасы',
      title_en: 'Кazakhstan Map',
    }],
  }),
  
  getters: {
    // активный левел всегда будет последним элементом из массива levels
    // т.е. сейчас есть только уровень 1 (id:1, Карта Каз.), значит
    // это и есть активный уровнь
    levels: state => state.levels,
    active_level: state => state.levels[state.levels.length - 1],
  },

  mutations: {
   set_level(state, level) {
    if (level.id != state.levels[state.levels.length - 1].id) {
      if (level.id == state.levels[state.levels.length - 1].id) {
        state.levels.pop();
      }
      state.levels.push(level);
    } 
   },

   set_level_b(state, level) {
     if (level.id != state.levels[state.levels.length - 1].id) {
      switch(level.id) {
        case 1:
          state.levels = [{ 
            id: 1, 
            title_ru: 'Карта Казахстана',
            title_kz: 'Қазақстан картасы',
            title_en: 'Кazakhstan Map',
          }];
          break;
        case 2:
          state.levels.pop();
      }
     }
   },
  },

  actions: {
    set_level({commit}, level) {
      commit('set_level', level);
    },
    set_level_b({commit}, level) {
      commit('set_level_b', level);
    }
  },
};