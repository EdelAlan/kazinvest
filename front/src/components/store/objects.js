import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    objects: [],
    all_objects: [],
  }),

  getters: {
    objects: state => state.objects,
    all_objects: state => state.all_objects,
  },

  mutations: {
    set_objects (state, objects) {
      state.objects = objects;
    },
    set_all_objects (state, all_objects) {
      state.all_objects = all_objects;
    },
  },

  actions: {
    set_objects ({ commit }) {
      const path = this.getters.api_path + '/back/api/objects?zone_id=' +
        this.getters.selected_zone.id +
        (this.getters.objects_list.filter(it => !it.selected).length > 0
        ? ('&legend_filter=[' + this.getters.objects_list.filter(it => !it.selected).map(it => it.type) + ']') : '');
      console.log(path);
      return fetcher({
        path,
      }).then(objects => {
        
        commit('set_objects', objects.map(obj => ({
          ...obj,
          color: this.getters.objects_list
            .filter(legend_item => obj.type == legend_item.type)
            .map(it => it.color)[0],
        })));
        return;
      });
    },
    set_all_objects ({ commit }) {
      const path = this.getters.api_path + '/back/api/objects';
      return fetcher({
        path,
      }).then(objects => {
        commit('set_all_objects', objects.map(obj => ({
          ...obj,
          color: this.getters.objects_list
            .filter(legend_item => obj.type == legend_item.type)
            .map(it => it.color)[0],
        })));
        return;
      });
    },
  },
};