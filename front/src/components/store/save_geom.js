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

        send_geom({ commit, dispatch }) {
            this.getters.infrastructures.forEach(it => {
                if (it.id == this.getters.geom.id) {
                    if (this.getters.profile.member_role == 'superadmin') {
                        return fetcher({
                            method: 'post',
                            path: this.getters.api_path + `/back/api/save_geom`,
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
                                dispatch('reject_data', this.getters.geom);
                            }
                        });
                    } else {
                        const path = this.getters.api_path + `/back/api/new_data/infrastructure`;
                        return fetcher({ 
                            method: 'put',
                            path,
                            body: {
                                infrastructure: {
                                    new_data: this.getters.geom,
                                    old_data: {},
                                    last_updated_member: 'none',
                                    last_updated_date: new Date(),
                                    origin_title_en: it.title_en,
                                    origin_title_ru: it.title_ru,
                                    origin_title_kz: it.title_kz,
                                },
                                member: {
                                    member_firstname: this.getters.profile.member_firstname,
                                    member_lastname: this.getters.profile.member_lastname,
                                    member_id: this.getters.profile.member_id,
                                },
                            },
                        }).then(({msg}) => {
                            if (msg == 'new data infrastructure updated') {
                                commit('geom_update', false);
                            }
                        });
                    }
                }
            });
            this.getters.objects.forEach(it => { 
                if (it.id == this.getters.geom.id) {
                    if (this.getters.profile.member_role == 'superadmin') {
                        return fetcher({
                            method: 'post',
                            path: this.getters.api_path + (this.getters.profile.member_role == 'superadmin' ? `/back/api/save_geom` : `/back/api/new_data/infrastructure`),
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
                                console.log(this.getters.geom)
                                dispatch('reject_data', this.getters.edited_inf);
                            }
                        });
                    } else {
                        const path = this.getters.api_path + `/back/api/new_data/infrastructure`;
                        return fetcher({ 
                            method: 'put',
                            path,
                            body: {
                                infrastructure: {
                                    new_data: this.getters.geom,
                                    old_data: {},
                                    last_updated_member: 'none',
                                    last_updated_date: new Date(),
                                    origin_title_en: it.title_en,
                                    origin_title_ru: it.title_ru,
                                    origin_title_kz: it.title_kz,
                                },
                                member: {
                                    member_firstname: this.getters.profile.member_firstname,
                                    member_lastname: this.getters.profile.member_lastname,
                                    member_id: this.getters.profile.member_id,
                                },
                            },
                        }).then(({msg}) => {
                            if (msg == 'new data infrastructure updated') {
                                commit('geom_update', false);
                            }
                        });
                    }
                }
            });
        },

    },
};