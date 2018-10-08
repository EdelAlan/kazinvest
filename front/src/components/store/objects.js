import fetcher from '../../util/fetcher';

export default {
  state: () => ({
    objects: [],
  }),

  getters: {
    objects: state => state.objects,
  },

  mutations: {
    set_objects (state, objects) {
      state.objects = objects;
    },
  },

  actions: {
    set_objects ({ commit }) {
      const path = this.getters.api_path + '/back/api/objects?zone_id=' +
        this.getters.selected_zone.id +
        (this.getters.objects_list.filter(it => it.selected).length > 0
        ? ('&legend_filter=[' + this.getters.objects_list.filter(it => it.selected).map(it => it.type) + ']') : '');
      console.log('>>>>', path)
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
  },
};