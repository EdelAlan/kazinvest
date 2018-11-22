import fetcher from '../../util/fetcher';

export default {
    state: () => ({
        is_geom_update: false,
        geom: null,
        new_infrastructure: [],
    }),

    mutations: {
        set_geom(state, geom) {
            state.geom = geom;
        },

        geom_update(state, bool) {
            state.is_geom_update = bool;
        },

        add_new_infrastructure(state, new_infrastructure) {
            state.new_infrastructure.push(new_infrastructure);
        },

        remove_new_infrastructure(state, idx) {
            state.new_infrastructure.splice(idx, 1);
        },
        
        remove_all_new_infrastructure(state) {
            state.new_infrastructure = [];
        },
    },

    getters: {
        geom: state => state.geom,
        is_geom_update: state => state.is_geom_update,
        new_infrastructure: state => state.new_infrastructure,
    },

    actions: {
        save_geom({ commit }, geom) {
            commit('set_geom', geom);
        },

        set_active({ commit }, bool) {
            commit('geom_update', bool);
        },

        add_new_infrastructure({ commit }) {
            commit('add_new_infrastructure', {
                title_ru: '',
                title_en: '',
                title_kz: '',
                type: 'inf',
                capacity: '',
                unit: '',
                geom: '',
            });
        },

        remove_new_infrastructure({ commit }, idx) {
            commit('remove_new_infrastructure', idx);
        },

        remove_all_new_infrastructure({ commit }) {
            commit('remove_all_new_infrastructure');
        },

        set_new_infrastructure({ commit }, new_infrastructure) {
            commit('set_new_infrastructure', new_infrastructure);
        },

        send_geom({ commit, dispatch }) {
            if (this.getters.geom.type == 'inf' || this.getters.geom.type == 'obj') {
                if (this.getters.profile.member_role == 'superadmin') {
                    return fetcher({
                        method: 'post',
                        path: this.getters.api_path + `/back/api/save_geom/new`,
                        body: { 
                            ...this.getters.geom,
                        },
                    }).then( async ({
                        msg
                    }) => {
                        if (msg == 'geom created') {
                            console.log(msg);
                            commit('geom_update', false);
                            const path = this.getters.api_path + `/back/api/new_data/allow/${this.getters.edited_inf.id}`;
                            await fetcher({ method: 'put', path}).then(res => {
                                console.log(res);
                                commit('set_new_data', '');
                                dispatch('set_new_data', this.getters.selected_tab);
                                commit('set_edited_zone', false);
                                commit('set_edited_sector', false);
                                commit('set_edited_inf', false);
                            });
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
                                origin_title_en: this.getters.new_infrastructure[this.getters.geom.id].title_en,
                                origin_title_ru: this.getters.new_infrastructure[this.getters.geom.id].title_ru,
                                origin_title_kz: this.getters.new_infrastructure[this.getters.geom.id].title_kz,
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
            } else {
                this.getters.infrastructures.forEach(it => {
                    if (it.id == this.getters.geom.id) {
                        if (this.getters.profile.member_role == 'superadmin') {
                            console.log({ 
                                ...this.getters.geom,
                                capacity: it.capacity,
                                unit: it.unit,
                            })
                            return fetcher({
                                method: 'post',
                                path: this.getters.api_path + `/back/api/save_geom`,
                                body: { 
                                    ...this.getters.geom,
                                    capacity: it.capacity,
                                    unit: it.unit,
                                },
                            }).then( async ({
                                msg
                            }) => {
                                if (msg == 'geom updated') {
                                    commit('geom_update', false);
                                    const path = this.getters.api_path + `/back/api/new_data/allow/${this.getters.edited_inf.id}`;
                                    await fetcher({ method: 'put', path}).then(res => {
                                        console.log(res);
                                        commit('set_new_data', '');
                                        dispatch('set_new_data', this.getters.selected_tab);
                                        commit('set_edited_zone', false);
                                        commit('set_edited_sector', false);
                                        commit('set_edited_inf', false);
                                    });
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
                            }).then( async ({
                                msg
                            }) => {
                                if (msg == 'geom updated') {
                                    commit('geom_update', false);
                                    const path = this.getters.api_path + `/back/api/new_data/allow/${this.getters.edited_inf.id}`;
                                    await fetcher({ method: 'put', path}).then(res => {
                                        console.log(res);
                                        commit('set_new_data', '');
                                        dispatch('set_new_data', this.getters.selected_tab);
                                        commit('set_edited_zone', false);
                                        commit('set_edited_sector', false);
                                        commit('set_edited_inf', false);
                                    });
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
            }
        },

    },
};