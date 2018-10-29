<script>
  import { mapGetters, mapActions } from 'vuex';
  import font from '../../assets/js/font.js';
  import piechart from '../ui/piechart'

  export default {
    
    data() {
        return {
            doc: null,
            label_img: 'data:image/png;base64,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',

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
            
            fdi2014: 0,
            fdi2015: 0,
			fdi2016: 0,
			fdi2017: 0,
            fdi2018: 0,
            
            tv2014: 0,
            tv2015: 0,
			tv2016: 0,
			tv2017: 0,
			tv2018: 0,
        };
    },

    components: {
        piechart,
    },

    computed: {
        ...mapGetters([
            'lang',
            'zones',
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
            'investments_sum',
        ]),

        diagram_data: async () => {
            await this.set_sectors();
			var ongoing=0, 
				underway=0;
			await this.sectors.forEach(sector => {
				this.zones.forEach(zone => {
					if (zone.id == sector.zone_id) {
						switch(sector.project_type) {
							case 1:
								ongoing++;
								break;
							case 2:
								underway++;
								break;
							default:
								break;
						}
					}
				});
			});
			return [
                    { key: 'Действующие проекты', val: ongoing },
                    { key: 'Проекты на стадии реализации', val: underway },
			    ];
        }
    },

    methods: {
        ...mapActions([
            'set_sectors',
            'set_foreign_investments',
            'set_investments',
            'set_investment',
			'set_number_jobs',
			'set_production',
			'set_taxes',
        ]),

        async get_investemnts() {
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
            
            this.fdi2014 = 0;
            this.fdi2015 = 0;
			this.fdi2016 = 0;
			this.fdi2017 = 0;
            this.fdi2018 = 0;
            
            this.tv2014 = 0;
            this.tv2015 = 0;
			this.tv2016 = 0;
			this.tv2017 = 0;
            this.tv2018 = 0;
            
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();

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
            }
		},

        async generate_pdf() {
            await this.get_investemnts();

            const jsPDF = require('jspdf');
            require('jspdf-autotable');

            this.doc = new jsPDF(
                "portrait",
                "px",
                [595, 842]
            );

            const PTSans = font();
            this.doc.addFileToVFS("PTSans.ttf", PTSans);
            this.doc.addFont('PTSans.ttf', 'PTSans', 'normal');
            this.doc.setFont('PTSans');
            
            // header
            this.header_pdf(this.doc);        

            switch(this.active_level.id) {
                case 1:
                    this.doc.text(this.lang == 'ru' ? 'Объем затраченных средств\r\nиз бюджета на инфраструктуру по РК:' : this.lang == 'kz' ? 'ҚР инфрақұрылымға бюджеттен жұмсалған қаражат көлемі:' : 'The amount of funds spent from the budget for infrastructure in the RK:', 30, 510);
                    this.doc.text(this.investments_sum.toLocaleString('en') + (this.lang == 'ru' ? ' Тенге' : this.lang == 'kz' ? ' Теңге' : ' Tenge'), 430, 510);

                    this.doc.text(this.lang == 'ru' ? 'Информация по количеству проектов:' : this.lang == 'kz' ? 'Жобалар саны туралы ақпарат:' : 'Information on the number of projects:', 30, 565);
                    this.doc.
                    break;
                case 2:
                    this.doc.text(this.lang == 'ru' ? 'Наименование Компании – участника:' : this.lang == 'kz' ? 'Қоғамның атауы - қатысушы:' : 'Name of the Company - participant:', 30, 67);
                    var ttl = this.selected_zone['title_' + this.lang].split(' ');
                    if (ttl.length >= 2) {
                        var ttl_text = '';
                        ttl.forEach((el, i) => {
                            if (i%2 == 0) {
                                ttl_text += el+'\n';
                            } else {
                                ttl_text += el+' ';
                            }
                        });
                        this.doc.text(ttl_text, 400, 67);
                    } else {
                        this.doc.text(ttl, 400, 67);
                    }

                    this.doc.setDrawColor('#D2D2D2');
                    this.doc.setLineWidth(1);
                    this.doc.line(30, 97, 565, 97);
                    
                    this.doc.text(this.lang == 'ru' ? 'Доля выделенного финансирования по отношению\r\nк общей сумме финансирования СЭЗ/ИЗ РК:' : this.lang == 'kz' ? 'ҚР АЭА/ИА қаржыландырудың жалпы сомасына қатысты бөлінетін қаржыландыру үлесі:' : 'The share of funding allocated in relation to the total amount of financing of the SEZ/IZ:', 30, 510);

                    break;
            }

            // header
            this.header_pdf(this.doc);

            this.doc.text(this.lang == 'ru' ? 'Объем вложанных инвестиций по годам:' : this.lang == 'kz' ? 'Жылына салынған инвестициялар көлемі:' : 'The volume of investments by year:', 30,112);
            this.doc.text(this.lang == 'ru' ? 'Объем производства по годам:' : this.lang == 'kz' ? 'Жыл сайынғы өнім көлемі:' : 'The volume of production by year:', 30, 190);
            this.doc.text(this.lang == 'ru' ? 'Прямые иностранные инвестиций по годам:' : this.lang == 'kz' ? 'Жыл сайын шетелдік тікелей инвестициялар:' : 'Foreign direct investment by year:', 30, 265);
            this.doc.text(this.lang == 'ru' ? 'Количество рабочих мест по годам:' : this.lang == 'kz' ? 'Жыл сайын жұмыс орындарының саны:' : 'Number of jobs by year:', 30, 340);
            this.doc.text(this.lang == 'ru' ? 'Объем налоговых отчислений по проектам по годам:' : this.lang == 'kz' ? 'Жыл бойынша салық аударымдарының сомасы:' : 'The amount of tax deductions by year:', 30, 420);

            // table Объем вложанных инвестиций по годам:
            const columns = [2014, 2015, 2016, 2017, 2018];
            
            var data = [[
                this.iv2014.toLocaleString('en') != 0 ? this.iv2014.toLocaleString("en") : '-',
                this.iv2015.toLocaleString('en') != 0 ? this.iv2015.toLocaleString("en") : '-',
                this.iv2016.toLocaleString('en') != 0 ? this.iv2016.toLocaleString("en") : '-',
                this.iv2017.toLocaleString('en') != 0 ? this.iv2017.toLocaleString("en") : '-',
                this.iv2018.toLocaleString('en') != 0 ? this.iv2018.toLocaleString("en") : '-',
                ]];
            this.doc.autoTable(columns, data, {startY: 120});

            // table Объем производства по годам:
            data = [[
                this.pv2014.toLocaleString('en') != 0 ? this.pv2014.toLocaleString("en") : '-',
                this.pv2015.toLocaleString('en') != 0 ? this.pv2015.toLocaleString("en") : '-',
                this.pv2016.toLocaleString('en') != 0 ? this.pv2016.toLocaleString("en") : '-',
                this.pv2017.toLocaleString('en') != 0 ? this.pv2017.toLocaleString("en") : '-',
                this.pv2018.toLocaleString('en') != 0 ? this.pv2018.toLocaleString("en") : '-',
                ]];
            this.doc.autoTable(columns, data, {startY: this.doc.autoTable.previous.finalY + 45});

            // tbale Прямые иностранные инвестиций по годам:
            data = [[
                this.fdi2014.toLocaleString('en') != 0 ? this.fdi2014.toLocaleString("en") : '-',
                this.fdi2015.toLocaleString('en') != 0 ? this.fdi2015.toLocaleString("en") : '-',
                this.fdi2016.toLocaleString('en') != 0 ? this.fdi2016.toLocaleString("en") : '-',
                this.fdi2017.toLocaleString('en') != 0 ? this.fdi2017.toLocaleString("en") : '-',
                this.fdi2018.toLocaleString('en') != 0 ? this.fdi2018.toLocaleString("en") : '-',
                ]];
            this.doc.autoTable(columns, data, {startY: this.doc.autoTable.previous.finalY + 45});

            // table Количество рабочих мест по годам:
            data = [[
                this.njc2014.toLocaleString('en') != 0 ? this.njc2014.toLocaleString("en") : '-',
                this.njc2015.toLocaleString('en') != 0 ? this.njc2015.toLocaleString("en") : '-',
                this.njc2016.toLocaleString('en') != 0 ? this.njc2016.toLocaleString("en") : '-',
                this.njc2017.toLocaleString('en') != 0 ? this.njc2017.toLocaleString("en") : '-',
                this.njc2018.toLocaleString('en') != 0 ? this.njc2018.toLocaleString("en") : '-',
                ]];
            this.doc.autoTable(columns, data, {startY: this.doc.autoTable.previous.finalY + 45});

            // table Объем налоговых отчислений по проектам по годам:
            data = [[
                this.tv2014.toLocaleString('en') != 0 ? this.tv2014.toLocaleString("en") : '-',
                this.tv2015.toLocaleString('en') != 0 ? this.tv2015.toLocaleString("en") : '-',
                this.tv2016.toLocaleString('en') != 0 ? this.tv2016.toLocaleString("en") : '-',
                this.tv2017.toLocaleString('en') != 0 ? this.tv2017.toLocaleString("en") : '-',
                this.tv2018.toLocaleString('en') != 0 ? this.tv2018.toLocaleString("en") : '-',
                ]];
            this.doc.autoTable(columns, data, {startY: this.doc.autoTable.previous.finalY + 45});

            this.doc.setFont('PTSans');

            this.doc.setDrawColor('#D2D2D2');
            this.doc.setLineWidth(1);
            this.doc.line(30, this.doc.autoTable.previous.finalY + 25, 565, this.doc.autoTable.previous.finalY + 25);
            this.doc.line(30, this.doc.autoTable.previous.finalY + 85, 565, this.doc.autoTable.previous.finalY + 85);

            this.doc.save('pdf.pdf');
        },

        header_pdf(doc) {

            this.doc.setFillColor('#03A0E3');
            this.doc.rect(0, 0, 595, 40, 'F');
            this.doc.addImage(this.label_img, 'PNG', 30, 9, 22, 22);
            this.doc.setFillColor('#FFFFFF');
            this.doc.setFontSize(18);
            this.doc.setTextColor(255);
            switch(this.active_level.id) {
                case 1:
                    this.doc.text(this.lang == 'ru' ? 'Отчет по общей информации СЭЗ/ИЗ' : this.lang == 'kz' ? 'АЭА/ИА жалпы ақпарат туралы есеп' : 'SEZ/IZ General Information Report', 62, 25)
                    break;
                case 2:
                    this.doc.text(this.lang == 'ru' ? 'Отчет по цифровым показателям и инфраструктурам' : this.lang == 'kz' ? 'Сандық өнімділік және инфрақұрылым туралы есеп' : 'Digital Indicator and Infrastructure Report', 62, 25)
                    break;
            }

            this.doc.setFontSize(16);
            this.doc.setTextColor('#484D5E');
        },

        generate_excel() {
            
        },
    }

  }
</script>

// :class="{ 'pdf--active': !passport_content ? false : passport_content ==.passport_content }"
<template>
	<div
        class="pdf"
        @click="generate_pdf(),
            generate_excel()"
        v-text="'PDF'">
        <piechart
			:sectors="diagram_data"
		></piechart>
    </div>
</template>


<style>
  .pdf {
    border: none;
    width: 100%;
    outline: none;
    white-space: pre-line;
    border-bottom: 1px solid #eee;
    padding: 15px;
    transition: all 200ms;
    cursor: pointer;
    color: #03A0E3;
    transition: all 200ms;
    font-size: 18px;
  }

  .pdf-sum {
    white-space: pre-line;
    font-size: 18px;
    color: #03A0E3;
  }

  .pdf-title {
    white-space: pre-line;
    font-size: 14px;
    color: #949494;
  }

  .pdf--active {
    background: #50C7F9;
    color: #fff;
  }
  .pdf:hover {
    background: #f5f5f5;
  }
  .pdf.pdf--active:hover {
    background: #50C7F9;
  }
</style>
