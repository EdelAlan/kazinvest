<script>
  import sidebar_header from './sidebar_header';
  import tabs from '../ui/tabs';
  import modal from '../ui/modal';
  import passport from './passport';
  import legends from './legends';
  import reference from './reference';
  import passport_anal from './passport_anal';
  import passport_anal_bar from './passport_anal_bar';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: {
      tabs,
      modal,
      sidebar_header,
      legends,
      passport,
      reference,
      passport_anal,
      passport_anal_bar,
    },

    data () {
      return {
        selected_video: '',
      }
    },

    computed: {
      ...mapGetters([
        'sidebar_expanded',
        'zones',
        'sectors',
        'lang',
        'selected_sector',
        'passport_anal',
        'passport_anal_bar',
        'passport',
        'zone_filter',
        'republics',
        'active_level',
        'selected_zone',
        'passport_content',
        'profile',
        'investments_sum',
        'production_sum',
        'foreign_investments_sum',
        'number_jobs_sum',
        'taxes_sum',
        'investments',
        'production',
        'foreign_investments',
        'number_jobs',
        'taxes',
        'video_modal',
      ]),

      investments_sum_iz: state => {
        var sum = 0;
        state.investments.forEach( el => {
          state.zones.forEach(zone => {
            state.sectors.forEach(sector => {
              if (zone.id == sector.zone_id && sector.id == el.parent_id && zone.zone_type == 2) {
                sum += parseInt(el.val,10);
              }
            });
          });
        });
        return sum;
      },
      foreign_investments_sum_iz: state => {
        var sum = 0;
        state.foreign_investments.forEach( el => {
          state.zones.forEach(zone => {
            state.sectors.forEach(sector => {
              if (zone.id == sector.zone_id && sector.id == el.parent_id && zone.zone_type == 2) {
                sum += parseInt(el.val,10);
              }
            });
          });
        });
        return sum;
      },
      production_sum_iz: state => {
        var sum = 0;
        state.production.forEach( el => {
          state.zones.forEach(zone => {
            state.sectors.forEach(sector => {
              if (zone.id == sector.zone_id && sector.id == el.parent_id && zone.zone_type == 2) {
                sum += parseInt(el.val,10);
              }
            });
          });
        });
        return sum;
      },
      number_jobs_sum_iz: state => {
        var sum = 0;
        state.number_jobs.forEach( el => {
          state.zones.forEach(zone => {
            state.sectors.forEach(sector => {
              if (zone.id == sector.zone_id && sector.id == el.parent_id && zone.zone_type == 2) {
                sum += parseInt(el.val,10);
              }
            });
          });
        });
        return sum;
      },
      taxes_sum_iz: state => {
        var sum = 0;
        state.taxes.forEach( el => {
          state.zones.forEach(zone => {
            state.sectors.forEach(sector => {
              if (zone.id == sector.zone_id && sector.id == el.parent_id && zone.zone_type == 2) {
                sum += parseInt(el.val,10);
              }
            });
          });
        });
        return sum;
      },

      investments_sum_level2: state => {
        var sum = 0;
        state.investments.forEach(el => {
					state.sectors.forEach(sector => {
						if (sector.id == el.parent_id) {
              sum += parseInt(el.val,10);
						}
					});
        });
        return sum;
      },
      foreign_investments_sum_level2: state => {
        var sum = 0;
        state.foreign_investments.forEach(el => {
					state.sectors.forEach(sector => {
						if (sector.id == el.parent_id) {
              sum += parseInt(el.val,10);
						}
					});
        });
        return sum;
      },
      production_sum_level2: state => {
        var sum = 0;
        state.production.forEach(el => {
					state.sectors.forEach(sector => {
						if (sector.id == el.parent_id) {
              sum += parseInt(el.val,10);
						}
					});
        });
        return sum;
      },
      number_jobs_sum_level2: state => {
        var sum = 0;
        state.number_jobs.forEach(el => {
					state.sectors.forEach(sector => {
						if (sector.id == el.parent_id) {
              sum += parseInt(el.val,10);
						}
					});
        });
        return sum;
      },
      taxes_sum_level2: state => {
        var sum = 0;
        state.taxes.forEach(el => {
					state.sectors.forEach(sector => {
						if (sector.id == el.parent_id) {
              sum += parseInt(el.val,10);
						}
					});
        });
        return sum;
      },

    },

    methods: {
      select_video (youtube_id) {
        this.selected_video = youtube_id;
      },  
      ...mapActions([
        'set_level',
        'set_passport_title',
        'set_passport_content',
        'change_ui_visibility',
        'set_passport_anal_data',
        'set_passport_anal_bar_data',
        'set_sectors',
        'set_foreign_investments',
				'set_investments',
				'set_number_jobs',
				'set_production',
				'set_taxes',
      ]),

      async get_investments() {
        switch(this.passport_content) {
          case 'level_1:sez:numeric':
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();
            break;
          case 'level_1:iz:numeric':
            await this.set_sectors();
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();
            break;
          case 'level_2:numeric':
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();
            break;
          case 'level_3:numeric':
            await this.set_investments();
            await this.set_foreign_investments();
            await this.set_production();
            await this.set_number_jobs();
            await this.set_taxes();
            break;
        }
      }
    },

    watch: {
      passport_content: 'get_investments',
    }
  }
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">

    <modal
      v-if="video_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'video_modal',
        ui_component_state: false,
      })">
      <iframe style="border: none" width="520" height="305"
        :src="'https://www.youtube.com/embed/' + selected_video">
      </iframe>
    </modal>

    
    <sidebar_header class="sidebar-header"></sidebar_header>

    <div class="sidebar-scroll_section">
      <div class="sidebar-section"
        v-if="active_level.id == 2 || active_level.id == 3">
        <legends class="sidebar-legends"></legends>
      </div>

      <div class="sidebar-section sidebar-section--main_content">
        <tabs
          :titles_style="{
            'font-size': '14px',
            'padding': '10px',
          }"
          :active_page="0"
        >
          <span slot="tab_title_0">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title"
                v-text="lang == 'ru' ? 'Справка' : lang == 'en' ? 'Information': 'Анықтама'"
              ></span>
            </span>
          </span>
          <span slot="tab_title_1">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title"
                v-text="lang == 'ru' ? 'Cписок' : lang == 'en' ? 'List': 'Тізім'"
              ></span>
            </span>        
          </span>
          
          <template v-if="profile">
            <span slot="tab_title_2">
              <span class="sidebar-tab">
                <span class="sidebar-tab_icon"></span>
                <span class="sidebar-tab_title"
                  v-text="lang == 'ru' ? 'Показатели' : lang == 'en' ? 'Indicators': 'Көрсеткіштер'"
                ></span>
              </span>        
            </span>
          </template>

          <div slot="tab_0">
            <template 
              v-if="active_level.id == 1"> 
              <reference
                v-if="zone_filter.length ? zone_filter[0].checked : null"
                :menu="[{
                  title_ru: 'Преимущества ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Benefits ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Артықшылық ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_advantages',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Общие положения СЭЗ/ИЗ РК',
                  title_kz: 'Жалпы ережелер ИЗ/СЭЗ ҚР',
                  title_en: 'General provisions of IZ/SEZ RK',
                  passport_content: 'level_1:sez_iz_polozh',
                }]"
              />
              <reference
                v-if="zone_filter.length ? zone_filter[0].checked : null"
                :menu="[{
                  title_ru: 'Описание ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Description ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Сипаттама ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_common',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republics[0]['title_' + lang] + ' РК',
                  title_en: 'Marketing materials ' + republics[0]['title_' + lang] + ' RK',
                  title_kz: 'Маркетингтік материалдар ' + republics[0]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:sez_market',
                }]"
              />
              <reference
                v-if="zone_filter.length ? zone_filter[1].checked : null"
                :menu="[{
                  title_ru: 'Преимущества ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Benefits ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Артықшылық ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_advantages',
                }, {
                  title_ru: 'Описание ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Description ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Сипаттама ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_common',
                }, {
                  title_ru: 'Маркетинговые материалы ' + republics[1]['title_' + lang] + ' РК',
                  title_en: 'Marketing materials ' + republics[1]['title_' + lang] + ' RK',
                  title_kz: 'Маркетингтік материалдар ' + republics[1]['title_' + lang] + ' ҚР',
                  passport_content: 'level_1:iz_market',
                }]"
              />
              <reference
                :menu="[{
                  title_ru: 'Контакты АО «НК «KAZAKH INVEST»',
                  title_en: 'JSC «НК «KAZAKH INVEST» contacts',
                  title_kz: 'АҚ «НК «KAZAKH INVEST» байланыстары',
                  passport_content: 'level_1:sez_iz_contacts',
                }]"
              />
            </template>

            <reference
              v-if="active_level.id == 2"
              :menu="[{
                title_ru: 'Описание ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Description ' + selected_zone['title_' + lang] + ' RK',
                title_kz: 'Сипаттама ' + selected_zone['title_' + lang] + ' ҚР',
                passport_content: 'level_2:zone_description',
              }, {
                title_ru: 'Галерея зоны ' + selected_zone['title_' + lang] + ' РК',
                title_en: 'Zone gallery ' + selected_zone['title_' + lang] + ' RK',
                title_kz: 'Аумақ галереясы ' + selected_zone['title_' + lang] + ' ҚР',
                passport_content: 'level_2:zone_gallery',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Marketing materials',
                title_kz: 'Маркетингтік материалдар',
                passport_content: 'level_2:zone_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Contacts',
                title_kz: 'Байланыс',
                passport_content: 'level_2:zone_contacts',
              }]"
            />

            <reference
              v-if="active_level.id == 3"
              :menu="[{
                title_ru: 'Общая информация',
                title_en: 'General information',
                title_kz: 'Жалпы ақпарат',
                passport_content: 'level_3:sector_common',
              }, {
                title_ru: 'Галерея сектора',
                title_en: 'Sector gallery',
                title_kz: 'Сектор галереясы',
                passport_content: 'level_3:sector_gallery',
              }, {
                title_ru: 'Маркетинговые материалы',
                title_en: 'Marketing materials',
                title_kz: 'Маркетингтік материалдар',
                passport_content: 'level_3:sector_market',
              }, {
                title_ru: 'Контакты',
                title_en: 'Contacts',
                title_kz: 'Байланыс',
                passport_content: 'level_3:sector_contacts',
              }]"
            />
          </div>

          <div slot="tab_1">
            <div class="sidebar-item"
              v-for="zone in zones"
              v-if="!sectors"
              @click="
                set_passport_content(''),
                zone.object_count > 0 ? set_level({
                  id: 2,
                  title_ru: zone.title_ru,
                  title_en: zone.title_en,
                  title_kz: zone.title_kz,
                  properties: zone
                }) : null
              ">
              <span class="sidebar-item_title" 
                :title="zone['title_' + lang]"
                v-text="zone['title_' + lang]"></span>
              <span class="sidebar-item_desc" 
                :title="zone.object_count + ' объектов'"
                v-text="zone.object_count + ' объектов'"></span>
            </div>
            <div class="sidebar-item"
              v-if="sectors"
              v-for="sector in sectors"
              :class="{ 'sidebar-item--active': selected_sector && selected_sector.id == sector.id  }"
              @click="
                set_passport_content(''),
                set_passport_title(sector.title_ru),
                set_level({
                  id: 3,
                  title_ru: sector.title_ru,
                  title_en: sector.title_en,
                  title_kz: sector.title_kz,
                  properties: sector
                })
              ">
              <span class="sidebar-item_title"
                :style="{ 
                  'color': sector.color,
                  'filter': 'brightness(80%)',
                }"
                :title="sector['title_' + lang]"
                v-text="sector['title_' + lang]"></span>
              <span class="sidebar-item_desc"
                :title="sector['title_project_' + lang]"
                v-text="sector['title_project_' + lang] || '-'"></span>
            </div>
          </div>

          <template v-if="profile">
            <div slot="tab_2">
              <reference
                v-if="zone_filter[key].checked && active_level.id == 1"
                v-for="republic, key in republics"
                :menu="[{
                  title_ru: 'Цифровые показатели ' + republic['title_' + lang],
                  title_en: 'Digital indicators ' + republic['title_' + lang],
                  title_kz: 'Сандық көрсеткіштер ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':numeric',
                }, {
                  title_ru: 'Диаграммы ' + republic['title_' + lang],
                  title_en: 'Diagrams ' + republic['title_' + lang],
                  title_kz: 'Диаграммалар ' + republic['title_' + lang],
                  passport_content: 'level_1:' + republic.type + ':diagramm',
                }]"
              />
              <reference
                v-if="active_level.id == 2"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_2:numeric',
                }, {
                  title_ru: 'Диаграммы',
                  title_en: 'Diagrams',
                  title_kz: 'Диаграммалар',
                  passport_content: 'level_2:diagramm',
                }]"
              />
              <reference
                v-if="active_level.id == 3"
                :menu="[{
                  title_ru: 'Цифровые показатели',
                  title_en: 'Digital indicators',
                  title_kz: 'Сандық көрсеткіштер',
                  passport_content: 'level_3:numeric',
                }]"
              />
            </div>
          </template>
          <reference
            v-if="zone_filter[key].checked && active_level.id == 1"
            v-for="republic, key in republics"
            :menu="[{
              title_ru: 'Цифровые показатели ' + republic['title_' + lang],
              title_en: 'Digital indicators ' + republic['title_' + lang],
              title_kz: 'Сандық көрсеткіштер ' + republic['title_' + lang],
              passport_content: 'level_1:' + republic.type + ':numeric',
            }, {
              title_ru: 'Диаграммы ' + republic['title_' + lang],
              title_en: 'Diagrams ' + republic['title_' + lang],
              title_kz: 'Диаграммалар ' + republic['title_' + lang],
              passport_content: 'level_1:' + republic.type + ':diagramm',
            }]"
          />
          <reference
            v-if="active_level.id == 2"
            :menu="[{
              title_ru: 'Цифровые показатели',
              title_en: 'Digital indicators',
              title_kz: 'Сандық көрсеткіштер',
              passport_content: 'level_2:numeric',
            }, {
              title_ru: 'Диаграммы',
              title_en: 'Diagrams',
              title_kz: 'Диаграммалар',
              passport_content: 'level_2:diagramm',
            }]"
          />
          <reference
            v-if="active_level.id == 3"
            :menu="[{
              title_ru: 'Цифровые показатели',
              title_en: 'Digital indicators',
              title_kz: 'Сандық көрсеткіштер',
              passport_content: 'level_3:numeric',
            }]"
          />
          
        </tabs>
      </div>
    </div>

    <passport class="sidebar-passport"
      v-if="passport && sidebar_expanded">
      <!-- Инфа о СЭЗ или ИЗ 1 уровнь -->
      <template v-if="active_level.id == 1">
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_advantages'">
          <div v-html="republics[0]['advantages_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_common'">
          <div v-html="republics[0]['common_' + lang]"></div>
        </div>
        <div class="" slot="body" v-if="passport_content == 'level_1:sez_market'">
          <h2 class="sidebar-passport_subtitle">Фото</h2>
          <div class="sidebar-market_wrap">
            <div v-for="video in republics[0].videos" class="sidebar-passport_video">
              <img :src="'http://img.youtube.com/vi/' + video.video + '/mqdefault.jpg'" />
            </div>
          </div>
          <h2 class="sidebar-passport_subtitle">Видео</h2>
          <div class="sidebar-market_wrap">
            <div v-for="video in republics[0].videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video.video)
              "
            >
              <img :src="'http://img.youtube.com/vi/' + video.video + '/mqdefault.jpg'" />
            </div>


          </div>
          <h2 class="sidebar-passport_subtitle">Презентации</h2>
          <div class="sidebar-market_file" v-for="file in republics[0].files">
            <a :href="file.file_name" target="_blank">
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>          
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_advantages'">
          <div v-html="republics[1]['advantages_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:iz_common'">
          <div v-html="republics[1]['common_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_iz_polozh'">
          <h3>Законодательная база СЭЗ РК</h3>
          <a class="sidebar-link" :href="'http://adilet.zan.kz/' + (lang == 'ru' ? 'rus' : lang == 'kz' ? 'kaz' : 'eng') + '/docs/Z1100000469'" target="_blank">
            <h4>Закон о СЭЗ</h4>
            <p>
              Настоящий Закон регулирует общественные отношения, возникающие при создании, функционировании и упразднении специальных экономических зон на территории Республики Казахстан
            </p>
          </a>
          <a class="sidebar-link" :href="'http://adilet.zan.kz/' + (lang == 'ru' ? 'rus' : lang == 'kz' ? 'kaz' : 'eng') + '/docs/K1700000120'" target="_blank">
            <h4>Налоговый кодекс</h4>
            <p>
              Глава 79. НАЛОГООБЛОЖЕНИЕ ЛИЦ, ОСУЩЕСТВЛЯЮЩИХ ДЕЯТЕЛЬНОСТЬ НА ТЕРРИТОРИЯХ СПЕЦИАЛЬНЫХ ЭКОНОМИЧЕСКИХ ЗОН
            </p>
          </a>
          <a class="sidebar-link" :href="'http://adilet.zan.kz/' + (lang == 'ru' ? 'rus' : lang == 'kz' ? 'kaz' : 'eng') + '/docs/K1500000375'" target="_blank">
            <h4>Предпринимательский кодекс</h4>
            <p>
              Настоящий Кодекс определяет правовые, экономические и социальные условия и гарантии, обеспечивающие свободу предпринимательства в Республике Казахстан, регулирует общественные отношения, возникающие в связи с взаимодействием субъектов предпринимательства             
            </p>
          </a>
          <br>
          <a :href="'http://adilet.zan.kz?lang=' + (lang == 'ru' ? 'rus' : lang == 'kz' ? 'kaz' : 'eng')" target="_blank">
            <p>Ссылка на закон</p>
          </a>
        </div>
        <div slot="body" v-if="passport_content == 'level_1:iz_market'">
          <h2 class="sidebar-passport_subtitle">Фото</h2>
          <div class="sidebar-market_wrap">
            <div v-for="video in republics[1].videos" class="sidebar-passport_video">
              <img :src="'http://img.youtube.com/vi/' + video.video + '/mqdefault.jpg'" />
            </div>
          </div>
          <h2 class="sidebar-passport_subtitle">Видео</h2>
          <div class="sidebar-market_wrap">
            <div v-for="video in republics[1].videos" class="sidebar-passport_video"
              v-on:click="
                change_ui_visibility({
                  ui_component: 'video_modal',
                  ui_component_state: true,
                }),
                select_video(video.video)
              "
            >
              <img :src="'http://img.youtube.com/vi/' + video.video + '/mqdefault.jpg'" />
            </div>
          </div>
          <h2 class="sidebar-passport_subtitle">Презентации</h2>
          <div class="sidebar-market_file" v-for="file in republics[1].files">
            <a :href="file.file_name" target="_blank">
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_1:sez_iz_contacts'">
          <div v-html="republics[0]['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном СЭЗ или ИЗ 2 уровнь -->
      <template v-if="active_level.id == 2">
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_description'">
          <div v-html="selected_zone['description_' + lang]"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_2:zone_contacts'">
          <div v-html="selected_zone['contacts_' + lang]"></div>
        </div>
      </template>

      <!-- Инфа о конкретном Сектор 3 уровнь -->
      <template v-if="active_level.id == 3">
        <!-- общая инфа -->
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_gallery'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_market'">
          <div v-html="'Данных пока нет'"></div>
        </div>
        <div class="sidebar-passport_padding" slot="body" v-if="passport_content == 'level_3:sector_contacts'">
          <div v-html="selected_sector['contacts_' + lang]"></div>
        </div>
      </template>




      <!-- Общая инфа о секторе -->
      <div class="sidebar-passport_padding" slot="body" v-if="
        selected_sector 
        && active_level.id == 3 
        && passport_content != 'level_3:numeric'
        && passport_content != 'level_3:sector_gallery'
        && passport_content != 'level_3:sector_market'
        && passport_content != 'level_3:sector_contacts'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:sez:diagramm'
        && passport_content != 'level_1:sez:numeric'
        && passport_content != 'level_1:iz:diagramm'
      ">
        <div class="passport-body_item">
          <span class="passport-body_item_key">Название компании участника</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Описание</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['title_project_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Стоимость проекта</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.project_price"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Площадь занимаемого участка</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.area"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Текущий статус</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['current_status_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Год</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.project_date"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Продукция</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['products_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Сроки реализации</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector['time_realization_' + lang]"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">План работы</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.plan_jobs"></span>
        </div>
        <div class="passport-body_item">
          <span class="passport-body_item_key">Мощность</span>
          <span class="passport-body_item_val" 
            v-text="selected_sector.power"></span>
        </div>
      </div>



      <!-- Показатели -->
      <div slot="body" v-if="passport_content == 'level_1:sez:numeric'">
        <div class="reference-item"
          @click="
          set_passport_anal_bar_data(item.id),
          change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'sez_iv',
            title_ru: 'Объем вложанных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Объем вложанных инвестиций',
            sum: investments_sum,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Объем производства',
            sum: production_sum,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Прямые иностранные инвестиции',
            sum: foreign_investments_sum,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'sez_njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Количество созданных рабочих мест',
            sum: number_jobs_sum,
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'sez_tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Объем налоговых отчислений',
            sum: taxes_sum,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:numeric'">
        <div class="reference-item"
          @click="
            set_passport_anal_bar_data(item.id),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iz_iv',
            title_ru: 'Объем вложанных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Объем вложанных инвестиций',
            sum: investments_sum_iz,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Объем производства',
            sum: production_sum_iz,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Прямые иностранные инвестиции',
            sum: foreign_investments_sum_iz,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'iz_njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Количество созданных рабочих мест',
            sum: number_jobs_sum_iz,
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'iz_tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Объем налоговых отчислений',
            sum: taxes_sum_iz,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:sez:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'sez_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфаструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'sez_sqi',
            title_ru: 'Информация по количеству участков',
            title_en: 'Sectors quantity information',
            title_kz: 'Жер телімі сандық көрсеткіштер',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_1:iz:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iz_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфаструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'iz_sqi',
            title_ru: 'Информация по количеству участков',
            title_en: 'Sectors quantity information',
            title_kz: 'Жер телімі сандық көрсеткіштер',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>


      <div slot="body" v-if="passport_content == 'level_2:diagramm'">
        <div class="reference-item"
          @click="
          set_passport_anal_data(item.id),
          change_ui_visibility({
            ui_component: 'passport_anal',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'sez_bie',
            title_ru: 'Объем затраченных средств из бюджета на инфаструктуру',
            title_en: 'Budget infrastructural expenses',
            title_kz: 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар',
          }, {
            id: 'sez_sqi',
            title_ru: 'Информация по количеству участков',
            title_en: 'Sectors quantity information',
            title_kz: 'Жер телімі сандық көрсеткіштер',
          }]"
          v-text="item['title_' + lang]"
        ></div>
      </div>

      <div slot="body" v-if="passport_content == 'level_2:numeric'">
        <div class="reference-item"
          @click="
            set_passport_anal_bar_data(item.id),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iv',
            title_ru: 'Объем вложанных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Объем вложанных инвестиций',
            sum: investments_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Объем производства',
            sum: production_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Прямые иностранные инвестиции',
            sum: foreign_investments_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Количество созданных рабочих мест',
            sum: number_jobs_sum_level2,
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Объем налоговых отчислений',
            sum: taxes_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>


      <div slot="body" v-if="passport_content == 'level_3:numeric'">
        <div class="reference-item"
          @click="set_passport_anal_bar_data(item.id),
            change_ui_visibility({
            ui_component: 'passport_anal_bar',
            ui_component_state: true,
          })"
          :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
          v-for="item in [{
            id: 'iv',
            title_ru: 'Объем вложанных инвестиций',
            title_en: 'Investments volume',
            title_kz: 'Объем вложанных инвестиций',
            sum: investments_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'pv',
            title_ru: 'Объем производства',
            title_en: 'Production volume',
            title_kz: 'Объем производства',
            sum: production_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'fdi',
            title_ru: 'Прямые иностранные инвестиции',
            title_en: 'Foreign direct investments',
            title_kz: 'Прямые иностранные инвестиции',
            sum: foreign_investments_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }, {
            id: 'njc',
            title_ru: 'Количество созданных рабочих мест',
            title_en: 'Number of jobs created',
            title_kz: 'Количество созданных рабочих мест',
            sum: number_jobs_sum_level2,
            tenge_ru: '',
            tenge_en: '',
            tenge_kz: '',
          }, {
            id: 'tv',
            title_ru: 'Объем налоговых отчислений',
            title_en: 'Tax volume',
            title_kz: 'Объем налоговых отчислений',
            sum: taxes_sum_level2,
            tenge_ru: ' Тенге',
            tenge_en: ' Tenge',
            tenge_kz: ' Теңге',
          }]"
        >
          <span class="reference-item-sum" v-text="item.sum + item['tenge_' + lang]+'\n'"></span>
          <span class="reference-item-title" v-text="item['title_' + lang]"></span>
        </div>
      </div>

    </passport>


    <passport_anal
      class="sidebar-passport_analytics"
      v-if="passport_anal && sidebar_expanded"
    />

    <passport_anal_bar
      class="sidebar-passport_analytics"
      v-if="passport_anal_bar && sidebar_expanded"
    />
  </div>
</template>


<style>
  .sidebar {
    position: absolute;
    z-index: 10;
    width: 320px;
    height: 100vh;
  }
  .sidebar-scroll_section {
    height: calc(100vh - 235px);
    overflow-y: scroll;
    margin-top: 5px;
  }
  .sidebar-passport {
    position: absolute;
    left: 325px;
    top: 60px;
  }
  .sidebar-passport_analytics {
    position: absolute;
    left: 640px;
    top: 60px;
  }
  .sidebar-header {
    margin: 5px 5px 0 5px;
    border-radius: 3px;
    width: 306px;
  }
  .sidebar-section {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 5px 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
  .sidebar-section--main_content {
  }
  .sidebar-passport_subtitle {
    color: #0075A7;
    font-weight: normal;
    margin: 15px 0 0 10px;
    font-size: 16px;
  }
  .sidebar-passport_video {
    width: 92px;
    height: 53px;
    float: left;
    margin: 5px;
    overflow: hidden;
    border-radius: 2px;
    cursor: pointer;

  }
  .sidebar-market_wrap {
    padding: 5px;
    overflow: hidden;
  }
  .sidebar-market_file {
    overflow: hidden;
    cursor: pointer;
    padding: 10px;
  }
  .sidebar-market_file:hover {
    background: #f1f1f1;
  }
  .sidebar-market_pdf {
    width: 40px;
    float: left;
    height: 40px;
    background: url('../../assets/images/pdf.png');
  }
  .sidebar-market_pdf_text {
    padding-top: 8px;
  }
  .sidebar-passport_video img {
    width: 100%;
    height: 100%;
  }
  .sidebar-item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    transition: all 200ms;
    cursor: pointer;
  }
  .sidebar-item:hover {
    background: #f5f5f5;
  }
  .sidebar-item_title {
    font-size: 16px;
    color: #03A0E3;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: block;
  }
  .sidebar-passport_padding {
    padding: 10px;
  }
  .sidebar-item_desc {
    font-size: 14px;
    margin-top: 5px;
    color: #888;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .sidebar-info_wrap {
    padding: 0 15px;
  }
  .sidebar-item--active {
    background: #50C7F9;
  }
  .sidebar-item--active .sidebar-item_title {
    color: #fff !important;
    filter: none !important;
  }
  .sidebar-item--active .sidebar-item_desc {
    color: #fff;
  }
  .sidebar-item--active:hover {
    background: #50C7F9;
  }
</style>
