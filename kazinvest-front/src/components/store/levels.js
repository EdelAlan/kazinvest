export default {
  state: () => ({
    levels: [
      { id: 1, name: { ru: 'Карта Казахстана' } }, // по-умолчанию
      { id: 2, name: { ru: 'Астана-Технополис ТОО Tau-Ken Temir' } },
      { id: 3, name: { ru: 'Астана-Технополис ТОО Tau-Ken Temir' } },
      { id: 4, name: { ru: 'Астана-Технополис ТОО Tau-Ken Temir' } },
      { id: 5, name: { ru: 'Астана-Технополис ТОО Tau-Ken Temir' } },
      { id: 6, name: { ru: 'Астана-Технополис ТОО Tau-Ken Temir' } },

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
    state.levels.push({
      id: level.id,
      name: level.name
    })
   }
  },

  actions: {
    set_level({commit}, level) {
      commit('set_level', level);
    }
  },
};