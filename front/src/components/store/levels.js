export default {
  state: () => ({
    levels: [
      { id: 1, name: { ru: 'Карта Казахстана' } }, // по-умолчанию

      // при погружении в карте или через навигацию, сюда добавляются
      // следующие уровни:
      // { id: 2, name: { ru: 'Астана-Технополис ТОО 'Tau-Ken Temir' } },
      // ... и т.д.

      // Возможно, что в этих объектах помимо id и name будут лежать
      // еще какие-нибудь данные, возможно геометрия, цвет, любая мета-инфа
    ],
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
    if (level.name.ru != state.levels[state.levels.length - 1].name.ru) {
      state.levels.push({
        id: level.id,
        name: { 
          ru: level.name.ru
        }
      })
    }
    
   },
   set_level_b(state, level) {
     if (level.name.ru != state.levels[state.levels.length - 1].name.ru) {
      switch(level.id) {
        case 1:
          state.levels = [{ id: 1, name: { ru: 'Карта Казахстана' } }]
          break;
        case 2:
          state.levels.pop();
      }
     }
   }
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