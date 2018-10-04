import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    objects: [],
  }),

  mutations: {
    set_objects(state, objects) {
      state.objects = objects;
    },
  },

  getters: {
    objects: state => state.objects,
  },

  actions: {

    set_objects ({ commit }, zone_id) {
      console.log(zone_id)
      return fetcher({
        path: 'http://localhost:5000/back/api/objects' 
          + (zone_id ? '?zone_id=' + zone_id : ''),
      }).then(objects => {
        commit('set_objects', objects);
        return;
      });
    },
  },
};