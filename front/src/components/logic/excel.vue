<script>
    import { mapGetters, mapActions } from 'vuex';
    import XLSX from 'xlsx';

  export default {
    
    data() {
        return {
            investments_sum: 0,
            production_sum: 0,
            foreign_investments_sum: 0,
            number_jobs_sum: 0,
            taxes_sum: 0,
            exports_volume_sum: 0,
            spent_foreign_investments_sum: 0,

            iv2014: 0,
            iv2015: 0,
			iv2016: 0,
			iv2017: 0,
            iv2018: 0,

            pv2014: 0,
            pv2015: 0,
			pv2016: 0,
			pv2017: 0,
            pv2018: 0,

            fdi2014: 0,
            fdi2015: 0,
			fdi2016: 0,
			fdi2017: 0,
            fdi2018: 0,
            
            njc2014: 0,
            njc2015: 0,
			njc2016: 0,
			njc2017: 0,
            njc2018: 0,
            
            tv2014: 0,
            tv2015: 0,
			tv2016: 0,
			tv2017: 0,
            tv2018: 0,
            
            ev2014: 0,
            ev2015: 0,
            ev2016: 0,
            ev2017: 0,
            ev2018: 0,

            sfi2014: 0,
            sfi2015: 0,
            sfi2016: 0,
            sfi2017: 0,
            sfi2018: 0,
        };
    },

    computed: {
        ...mapGetters([
            'lang',
            'zones',
            'all_zones',
            'sectors',
            'selected_sector',
            'active_level',
            'selected_zone',
            'investments',
            'investment',
            'production',
            'foreign_investments',
            'number_jobs',
            'taxes',
            'exports_volume',
            'spent_foreign_investments',
            'zone_sector',
            'infrastructures',
        ]),
    },

    methods: {
        ...mapActions([
            'set_all_zones',
            'set_sectors',
            'set_zone_sector',
            'set_foreign_investments',
            'set_investments',
            'set_investment',
			'set_number_jobs',
			'set_production',
            'set_taxes',
            'set_exports_volume',
            'set_spent_foreign_investments',
        ]),

        async get_zone_sector() {
            switch (this.active_level.id) {
                case 1:
                    await this.set_all_zones();
                    await this.set_sectors();
                    await this.set_zone_sector();
                    this.investments_sum = 0;
                    this.foreign_investments_sum = 0;
                    this.production_sum = 0;
                    this.number_jobs_sum = 0;
                    this.taxes_sum = 0;
                    this.exports_volume_sum = 0;
                    this.spent_foreign_investments_sum = 0;
                    this.zone_sector.forEach( zone => {
                        zone.sectors.forEach(sector => {
                        this.investments_sum += sector.investments.length != 0 ? sector.investments.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.production_sum += sector.production.length != 0 ? sector.production.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.foreign_investments_sum += sector.foreign_investments.length != 0 ? sector.foreign_investments.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.number_jobs_sum += sector.number_jobs.length != 0 ? sector.number_jobs.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.taxes_sum += sector.taxes.length != 0 ? sector.taxes.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.exports_volume_sum += sector.exports_volume.length != 0 ? sector.exports_volume.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;

                        this.spent_foreign_investments_sum += sector.spent_foreign_investments.length != 0 ? sector.spent_foreign_investments.reduce( (a, it) => {
                            return a + parseInt(it.val,10) 
                        }, 0) : 0;
                        });
                    });
                    break; 
                case 2:
                    this.investments_sum = 0;
                    this.foreign_investments_sum = 0;
                    this.production_sum = 0;
                    this.number_jobs_sum = 0;
                    this.taxes_sum = 0;
                    this.exports_volume_sum = 0;
                    this.spent_foreign_investments_sum = 0;
                    this.sectors.forEach(sector => {
                        this.investments.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.investments_sum += parseInt(el.val,10);
                        }
                        });
                        
                        this.foreign_investments.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.foreign_investments_sum += parseInt(el.val,10);
                        }
                        });

                        this.production.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.production_sum += parseInt(el.val,10);
                        }
                        });

                        this.number_jobs.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.number_jobs_sum += parseInt(el.val,10);
                        }
                        });

                        this.taxes.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.taxes_sum += parseInt(el.val,10);
                        }
                        });

                        this.exports_volume.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.exports_volume_sum += parseInt(el.val,10);
                        }
                        });

                        this.spent_foreign_investments.forEach(el => {
                        if (sector.id == el.parent_id) {
                            this.spent_foreign_investments_sum += parseInt(el.val,10);
                        }
                        });
                    });
                    break;
                }
        },

        async get_all_investments() {
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();
            await this.set_exports_volume();
            await this.set_spent_foreign_investments();
        },

        async get_investments() {
            this.iv2014 = 0;
            this.iv2015 = 0;
            this.iv2016 = 0;
            this.iv2017 = 0;
            this.iv2018 = 0;

            this.pv2014 = 0;
            this.pv2015 = 0;
            this.pv2016 = 0;
            this.pv2017 = 0;
            this.pv2018 = 0;

            this.fdi2014 = 0;
            this.fdi2015 = 0;
            this.fdi2016 = 0;
            this.fdi2017 = 0;
            this.fdi2018 = 0;

            this.njc2014 = 0;
            this.njc2015 = 0;
            this.njc2016 = 0;
            this.njc2017 = 0;
            this.njc2018 = 0;

            this.tv2014 = 0;
            this.tv2015 = 0;
            this.tv2016 = 0;
            this.tv2017 = 0;
            this.tv2018 = 0;

            this.ev2014 = 0;
            this.ev2015 = 0;
            this.ev2016 = 0;
            this.ev2017 = 0;
            this.ev2018 = 0;

            this.sfi2014 = 0;
            this.sfi2015 = 0;
            this.sfi2016 = 0;
            this.sfi2017 = 0;
            this.sfi2018 = 0;

            await this.get_all_investments();
            await this.get_zone_sector();

           switch(this.active_level.id) {
                case 1:
                        this.investments.forEach(el => {
                            this.put_data(el, 'iv');
                        });
                        this.production.forEach(el => {
                            this.put_data(el, 'pv');
                        });
                        this.foreign_investments.forEach(el => {
                            this.put_data(el, 'fdi');
                        });
                        this.number_jobs.forEach(el => {
                            this.put_data(el, 'njc');
                        });
                        this.taxes.forEach(el => {
                            this.put_data(el, 'tv');
                        });
                        this.exports_volume.forEach(el => {
                            this.put_data(el, 'ev');
                        });
                        this.spent_foreign_investments.forEach(el => {
                            this.put_data(el, 'sfi');
                        });
                        break;
                case 2:
                    this.investments.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'iv');
                            }
                        });
                    });
                    this.production.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'pv');
                            }
                        });
                    });
                    this.foreign_investments.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'fdi');
                            }
                        });
                    });
                    this.number_jobs.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'njc');
                            }
                        });
                    });
                    this.taxes.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'tv');
                            }
                        });
                    });
                    this.exports_volume.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'ev');
                            }
                        });
                    });
                    this.spent_foreign_investments.forEach(el => {
                        this.sectors.forEach(sector => {
						    if (sector.id == el.parent_id) {
                                this.put_data(el, 'sfi');
                            }
                        });
                    });
                    break;
            }
        },

        put_data(el, row) {
            switch(row) {
                case 'iv':
                    switch(el.year) {
                        case 2014:
                            this.iv2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.iv2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.iv2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.iv2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.iv2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'pv':
                    switch(el.year) {
                        case 2014:
                            this.pv2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.pv2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.pv2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.pv2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.pv2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'fdi':
                    switch(el.year) {
                        case 2014:
                            this.fdi2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.fdi2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.fdi2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.fdi2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.fdi2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'njc':
                    switch(el.year) {
                        case 2014:
                            this.njc2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.njc2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.njc2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.njc2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.njc2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'tv':
                    switch(el.year) {
                        case 2014:
                            this.tv2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.tv2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.tv2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.tv2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.tv2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'ev':
                    switch(el.year) {
                        case 2014:
                            this.ev2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.ev2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.ev2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.ev2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.ev2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
                case 'sfi':
                    switch(el.year) {
                        case 2014:
                            this.sfi2014 += parseInt(el.val, 10);
                            break;
                        case 2015:
                            this.sfi2015 += parseInt(el.val, 10);
                            break;
                        case 2016:
                            this.sfi2016 += parseInt(el.val, 10);
                            break;
                        case 2017:
                            this.sfi2017 += parseInt(el.val, 10);
                            break;
                        case 2018:
                            this.sfi2018 += parseInt(el.val, 10);
                            break;
                    }
                    break;
            }
        },

        async generate_excel() {
            await this.get_investments();

            let general_data;
            let header;

            let sectors_data_header;
            let sectors_data;

            let active_sectors;

            let underway_sectors;

            let infrastructure;
            switch(this.active_level.id) {
                case 1:
                    header = [[
                        this.lang == 'ru' ? 'Объем затраченных средств\r\nиз бюджета на инфраструктуру по РК:' : this.lang == 'kz' ? 'ҚР инфрақұрылымға бюджеттен жұмсалған қаражат көлемі:' : 'The amount of funds spent from the budget for infrastructure in the RK:',
                    ]];
                    general_data = [{
                        A: this.investments_sum.toLocaleString('en') + (this.lang == 'ru' ? ' Тенге' : this.lang == 'kz' ? ' Теңге' : ' Tenge'),
                    }];
                break;
                case 2:
                    header = [[
                        this.lang == 'ru' ? 'Наименование Компании – участника:' : this.lang == 'kz' ? 'Қоғамның атауы - қатысушы:' : 'Name of the Company - participant:',
                        this.lang == 'ru' ? 'Период действия зоны:' : this.lang == 'kz' ? 'Аймақтың әрекет ету мерзімі:' : 'Zone validity period:',
                        this.lang == 'ru' ? 'Отрасль зоны:' : this.lang == 'kz' ? 'Аймақ өнеркәсібі:' : 'Zone industry:',
                        this.lang == 'ru' ? 'Доля свободной площади зоны:' : this.lang == 'kz' ? 'Бос аймақтың үлесі:' : 'The share of free zone area:',
                        this.lang == 'ru' ? 'Доля выделенного финансирования по отношению\r\nк общей сумме финансирования СЭЗ/ИЗ РК:' : this.lang == 'kz' ? 'ҚР АЭА/ИА қаржыландырудың жалпы сомасына\r\nқатысты бөлінетін қаржыландыру үлесі:' : 'The share of funding allocated in relation to the\r\ntotal amount of financing of the SEZ/IZ:',
                        this.lang == 'ru' ? 'Контакты:' : this.lang == 'kz' ? 'Байланыс:' : 'Contacts:',
                    ]];

                    let industry;
                    switch(this.selected_zone.industries_id) {
                        case 1:
                            industry = this.lang == 'ru' ? 'Химия' : this.lang == 'kz' ? 'Химия' : 'Chemistry';
                            break;
                        case 2:
                            industry = this.lang == 'ru' ? 'Нефтехимия' : this.lang == 'kz' ? 'Мұнай-химия' : 'Petrochemistry';
                            break;
                        case 3:
                            industry = this.lang == 'ru' ? 'Металлургия' : this.lang == 'kz' ? 'Металлургия' : 'Metallurgy';
                            break;
                        case 4:
                            industry = this.lang == 'ru' ? 'Машиностроение' : this.lang == 'kz' ? 'Машина жасау' : 'Engineering';
                            break;
                        case 5:
                            industry = this.lang == 'ru' ? 'Логистика' : this.lang == 'kz' ? 'Логистика' : 'Logistics';
                            break;
                        case 6:
                            industry = this.lang == 'ru' ? 'Нефтесервис' : this.lang == 'kz' ? 'Нефтесервис' : 'Petroservice';
                            break;
                        case 7:
                            industry = this.lang == 'ru' ? 'Текстиль' : this.lang == 'kz' ? 'Тоқыма' : 'Textile';
                            break;
                        case 8:
                            industry = this.lang == 'ru' ? 'ИКТ и НИОКР' : this.lang == 'kz' ? 'АКТ' : 'ICT & R&D';
                            break;
                        case 9:
                            industry = this.lang == 'ru' ? 'Продукты питания' : this.lang == 'kz' ? 'Тамақ өнімдері' : 'Food';
                            break;
                        case 10:
                            industry = this.lang == 'ru' ? 'Туризм' : this.lang == 'kz' ? 'Туризм' : 'Tourism';
                            break;
                        case 11:
                            industry = this.lang == 'ru' ? 'Смешанная' : this.lang == 'kz' ? 'Аралас' : 'Mixed';
                            break;
                        case 12:
                            industry = this.lang == 'ru' ? 'Торговля' : this.lang == 'kz' ? 'Сауда' : 'Trade';
                            break;
                    }
                    await this.set_all_zones();
                    var budget_allocated_sum = 0;
                    this.all_zones.forEach(zone => {
                        budget_allocated_sum += zone.budget_allocated ? parseInt(zone.budget_allocated, 10) : 0;
                    });
                    var bap = ((parseInt(this.selected_zone.budget_allocated, 10) * 100)/budget_allocated_sum).toFixed(2)+'%\r\n(' + parseInt(this.selected_zone.budget_allocated, 10).toLocaleString('en') + '/' + budget_allocated_sum.toLocaleString('en')+')';
                    general_data = [{
                        title: this.selected_zone['title_' + this.lang],
                        zone_time: this.selected_zone.zone_time ? this.selected_zone.zone_time : '-',
                        industry: industry,
                        level: (100 - this.selected_zone.level)+'%',
                        bap: this.selected_zone.budget_allocated ? bap : '-',
                        contacts: this.selected_zone['contacts_'+this.lang].replace(new RegExp('<br />', 'g'), '\n'),
                    }];

                    sectors_data_header = [[
                        this.lang == 'ru' ? 'Общее количество проектов:' : this.lang == 'en' ? 'Total number of projects:' : 'Жобалардың жалпы саны:',
                        this.lang == 'ru' ? 'Действующие проекты:' : this.lang == 'kz' ? 'Ағымдағы жобалар:' : 'Active projects:',
                        this.lang == 'ru' ? 'Проекты на стадии реализации:' : this.lang == 'kz' ? 'Жүзеге асырылуда жобалар:' : 'Underway projects:',
                    ]];
                    let total = this.sectors.filter(sector => sector.project_type == 1 || sector.project_type == 2);
                    sectors_data = [{
                        total: total.length,
                        active: total.filter(sector => sector.project_type == 1).length,
                        underway: total.filter(sector => sector.project_type == 2).length,
                    }];

                    active_sectors = [];
                    underway_sectors = [];
                    total.forEach( (sector, i) => {
                        if (sector.project_type == 1) {
                            active_sectors.push([sector['title_'+this.lang]]);
                        }
                        if (sector.project_type == 2) {
                            underway_sectors.push([sector['title_'+this.lang]]);
                        }
                    });

                    infrastructure = [];
                    this.infrastructures.forEach(it => {
                        infrastructure.push([it['title_'+this.lang] + '    ' + (it.capacity ? it.capacity+'/' : '') + (it.unit ? it.unit : '')]);
                    });
                break;
            }

            let investments = [{
                2014: this.iv2014.toLocaleString("en") != 0 ? this.iv2014.toLocaleString("en") : '-',
                2015: this.iv2015.toLocaleString("en") != 0 ? this.iv2015.toLocaleString("en") : '-',
                2016: this.iv2016.toLocaleString("en") != 0 ? this.iv2016.toLocaleString("en") : '-',
                2017: this.iv2017.toLocaleString("en") != 0 ? this.iv2017.toLocaleString("en") : '-',
                2018: this.iv2018.toLocaleString("en") != 0 ? this.iv2018.toLocaleString("en") : '-',
            }];
            let productions = [{
                2014: this.pv2014.toLocaleString("en") != 0 ? this.pv2014.toLocaleString("en") : '-',
                2015: this.pv2015.toLocaleString("en") != 0 ? this.pv2015.toLocaleString("en") : '-',
                2016: this.pv2016.toLocaleString("en") != 0 ? this.pv2016.toLocaleString("en") : '-',
                2017: this.pv2017.toLocaleString("en") != 0 ? this.pv2017.toLocaleString("en") : '-',
                2018: this.pv2018.toLocaleString("en") != 0 ? this.pv2018.toLocaleString("en") : '-',
            }];
            let foreign_investments = [{
                2014: this.fdi2014.toLocaleString("en") != 0 ? this.fdi2014.toLocaleString("en") : '-',
                2015: this.fdi2015.toLocaleString("en") != 0 ? this.fdi2015.toLocaleString("en") : '-',
                2016: this.fdi2016.toLocaleString("en") != 0 ? this.fdi2016.toLocaleString("en") : '-',
                2017: this.fdi2017.toLocaleString("en") != 0 ? this.fdi2017.toLocaleString("en") : '-',
                2018: this.fdi2018.toLocaleString("en") != 0 ? this.fdi2018.toLocaleString("en") : '-',
            }];
            let new_jobs_created = [{
                2014: this.njc2014.toLocaleString("en") != 0 ? this.njc2014.toLocaleString("en") : '-',
                2015: this.njc2015.toLocaleString("en") != 0 ? this.njc2015.toLocaleString("en") : '-',
                2016: this.njc2016.toLocaleString("en") != 0 ? this.njc2016.toLocaleString("en") : '-',
                2017: this.njc2017.toLocaleString("en") != 0 ? this.njc2017.toLocaleString("en") : '-',
                2018: this.njc2018.toLocaleString("en") != 0 ? this.njc2018.toLocaleString("en") : '-',
            }];
            let taxes = [{
                2014: this.tv2014.toLocaleString("en") != 0 ? this.tv2014.toLocaleString("en") : '-',
                2015: this.tv2015.toLocaleString("en") != 0 ? this.tv2015.toLocaleString("en") : '-',
                2016: this.tv2016.toLocaleString("en") != 0 ? this.tv2016.toLocaleString("en") : '-',
                2017: this.tv2017.toLocaleString("en") != 0 ? this.tv2017.toLocaleString("en") : '-',
                2018: this.tv2018.toLocaleString("en") != 0 ? this.tv2018.toLocaleString("en") : '-',
            }];
            let exports_value = [{
                2014: this.ev2014.toLocaleString("en") != 0 ? this.ev2014.toLocaleString("en") : '-',
                2015: this.ev2015.toLocaleString("en") != 0 ? this.ev2015.toLocaleString("en") : '-',
                2016: this.ev2016.toLocaleString("en") != 0 ? this.ev2016.toLocaleString("en") : '-',
                2017: this.ev2017.toLocaleString("en") != 0 ? this.ev2017.toLocaleString("en") : '-',
                2018: this.ev2018.toLocaleString("en") != 0 ? this.ev2018.toLocaleString("en") : '-',
            }];
            let sfi = [{
                2014: this.sfi2014.toLocaleString("en") != 0 ? this.sfi2014.toLocaleString("en") : '-',
                2015: this.sfi2015.toLocaleString("en") != 0 ? this.sfi2015.toLocaleString("en") : '-',
                2016: this.sfi2016.toLocaleString("en") != 0 ? this.sfi2016.toLocaleString("en") : '-',
                2017: this.sfi2017.toLocaleString("en") != 0 ? this.sfi2017.toLocaleString("en") : '-',
                2018: this.sfi2018.toLocaleString("en") != 0 ? this.sfi2018.toLocaleString("en") : '-',
            }];

            let workbook = XLSX.utils.book_new();
            workbook.Props = {
                Title: this.active_level.id == 1 ? 'SEZ_IZ' : this.selected_zone.title_en,
                Subject: this.active_level.id == 1 ? (this.lang == 'ru' ? 'Отчет по общей информации СЭЗ/ИЗ' : this.lang == 'kz' ? 'АЭА/ИА жалпы ақпарат туралы есеп' : 'SEZ/IZ General Information Report') : (this.lang == 'ru' ? 'Отчет по цифровым показателям и инфраструктурам' : this.lang == 'kz' ? 'Сандық өнімділік және инфрақұрылым туралы есеп' : 'Digital Indicator and Infrastructure Report'),
                CreatedDate: new Date(),
            };

            let worksheet1 = XLSX.utils.aoa_to_sheet(header);
            XLSX.utils.sheet_add_json(worksheet1, general_data, { skipHeader: true, origin: -1});
            let worksheet2 = XLSX.utils.json_to_sheet(investments);
            let worksheet3 = XLSX.utils.json_to_sheet(productions);
            let worksheet4 = XLSX.utils.json_to_sheet(foreign_investments);
            let worksheet5 = XLSX.utils.json_to_sheet(new_jobs_created);
            let worksheet6 = XLSX.utils.json_to_sheet(taxes);
            let worksheet7 = XLSX.utils.json_to_sheet(exports_value);
            let worksheet8 = XLSX.utils.json_to_sheet(sfi);
            let worksheet9 = XLSX.utils.aoa_to_sheet(sectors_data_header);
            XLSX.utils.sheet_add_json(worksheet9, sectors_data, { skipHeader: true, origin: -1});
            let worksheet10 = XLSX.utils.aoa_to_sheet(active_sectors);
            let worksheet11 = XLSX.utils.aoa_to_sheet(underway_sectors);
            let worksheet12 = XLSX.utils.aoa_to_sheet(infrastructure);
            
            XLSX.utils.book_append_sheet(workbook, worksheet1, this.active_level.id == 1 ? (this.lang == 'ru' ? 'Общая информация по СЭЗ ИЗ' : this.lang == 'kz' ? 'АЭА ИА жалпы ақпарат' : 'SEZ IZ General Information') : (this.lang == 'ru' ? 'Цифровые показатели' : this.lang == 'kz' ? 'Сандық өнімділік' : 'Digital Indicator'));
            XLSX.utils.book_append_sheet(workbook, worksheet2, this.lang == "ru" ? "Инвестиции" : this.lang == "kz" ? "Инвестициялар" : "Investments");
            XLSX.utils.book_append_sheet(workbook, worksheet3, this.lang == "ru" ? "Объем производства" : this.lang == "kz" ? "Өнім көлемі" : "Production volume");
            XLSX.utils.book_append_sheet(workbook, worksheet4, this.lang == "ru" ? "Иностранные инвестиции" : this.lang == "kz" ? "Шетелдік инвестициялар" : "Foreign investmentы");
            XLSX.utils.book_append_sheet(workbook, worksheet5, this.lang == "ru" ? "Рабочие места" : this.lang == "kz" ? "Жұмыс орындары" : "Workplaces");
            XLSX.utils.book_append_sheet(workbook, worksheet6, this.lang == "ru" ? "Налоговые отчисления" : this.lang == "kz" ? "Салық аударымдар" : "Tax");
            XLSX.utils.book_append_sheet(workbook, worksheet7, this.lang == "ru" ? "Объем экспорта" : this.lang == "en" ? "Export volume" : "Экспорттың көлемі");
            XLSX.utils.book_append_sheet(workbook, worksheet8, this.lang == "ru" ? "Привлечено иностр. инвестиций" : this.lang == "en" ? "Attracted foreign investments" : "Шетелдік инвестициялар тартылды");
            XLSX.utils.book_append_sheet(workbook, worksheet9, this.lang == 'ru' ? 'Количество проектов' : this.lang == 'kz' ? 'Жобалар саны' : 'Number of projects');
            XLSX.utils.book_append_sheet(workbook, worksheet10, this.lang == 'ru' ? 'Активные проекты' : this.lang == 'kz' ? 'Белсенді жобалар' : 'Active projects');
            XLSX.utils.book_append_sheet(workbook, worksheet11, this.lang == 'ru' ? 'На стадии реализации' : this.lang == 'kz' ? 'Іске асыру сатысында' : 'Underway projects');
            XLSX.utils.book_append_sheet(workbook, worksheet12, this.lang == 'ru' ? 'Инфраструктура' : this.lang == 'kz' ? 'Инфрақұрылым' : 'Infrastructure');

            XLSX.writeFile(workbook, this.active_level.id == 1 ? 'SEZ_IZ.xlsx' : this.selected_zone['title_' + this.lang] + ".xlsx");
        },

    }

  }
</script>

<template>
	<div
        class="excel"
        v-on:click="generate_excel"
        v-text="lang == 'ru' ? 'Экспорт Excel' : lang == 'en' ? 'Export Excel' : 'Excel экспорттау'">
    </div>
</template>


<style>
  .excel {
    white-space: pre-line;
    border-bottom: 1px solid #eee;
    padding: 15px;
    transition: all 200ms;
    cursor: pointer;
    color: #03A0E3;
    transition: all 200ms;
  }

  .excel-sum {
    white-space: pre-line;
    font-size: 18px;
    color: #03A0E3;
  }

  .excel-title {
    white-space: pre-line;
    font-size: 14px;
    color: #949494;
  }

  .excel:hover {
    background: #f5f5f5;
  }
</style>
