import fetcher from '../../util/fetcher';

export default {
    state: () => ({
        is_geom_update: false,
        geom: null,
    }),

    mutations: {
        set_geom(state, geom) {
            state.geom = geom;
        },

        geom_update(state, bool) {
            state.is_geom_update = bool;
        },
    },

    getters: {
        geom: state => state.geom,
        is_geom_update: state => state.is_geom_update,
    },

    actions: {
        save_geom({ commit }, geom) {
            commit('set_geom', geom);
        },

        set_active({ commit }, bool) {
            commit('geom_update', bool);
        },

        send_geom({ commit }) {
            this.getters.infrastructures.forEach(it => {
                if (it.id == this.getters.geom.id) {
                    return fetcher({
                        method: 'post',
                        path: this.getters.api_path + '/back/api/save_geom',
                        body: { 
                            ...this.getters.geom,
                            capacity: it.capacity,
                            unit: it.unit,
                        },
                    }).then(({
                        msg
                    }) => {
                        if (msg == 'geom updated') {
                            commit('geom_update', false);
                            console.log(msg + ' infra');
                        }
                    });
                }
            });
            this.getters.objects.forEach(it => { 
                if (it.id == this.getters.geom.id) {
                    return fetcher({
                        method: 'post',
                        path: this.getters.api_path + '/back/api/save_geom',
                        body: { 
                            ...this.getters.geom,
                            capacity: it.capacity,
                            unit: it.unit,
                        },
                    }).then(({
                        msg
                    }) => {
                        if (msg == 'geom updated') {
                            commit('geom_update', false);
                            console.log(msg + ' objects');
                        }
                    });
                }
            });
        },

    },
};