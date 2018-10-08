import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    objects_handbook_type_1: [],
    objects_handbook_type_2: [],
  }),

  mutations: {
    set_objects_handbook_type_1 (state, objects_handbook) {
      state.objects_handbook_type_1 = objects_handbook;
    },
    set_objects_handbook_type_2 (state, objects_handbook) {
      state.objects_handbook_type_2 = objects_handbook;
    },
  },

  getters: {
    objects_handbook_type_1: state => state.objects_handbook_type_1,
    objects_handbook_type_2: state => state.objects_handbook_type_2,
  },

  actions: {

    set_objects_handbook ({ commit }, { type }) {
      console.log(type)
      return fetcher({
        path: this.getters.api_path + '/back/api/objects_handbook' 
          + (type ? '?type=' + type : ''),
      }).then(objects_handbook => {
        commit('set_objects_handbook_type_' + type, 
          objects_handbook.map(it => ({
            ...it, selected: true
          })));
        return;
      });
    },
  },
};