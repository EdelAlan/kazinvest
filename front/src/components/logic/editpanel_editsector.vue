<script>
  import filebase64 from '../../util/filebase64';
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import reset_sector_map from '../logic/editpanel_reset_sector_map';
  import basemaps from '../logic/basemaps';
  import modal from "../ui/modal";

  export default {
    data () {
      return {
        sectormodel: {
          id: null,
          zone_id: null,
          area: null,
          comment: null,
          contacts_en: null,
          contacts_kz: null,
          contacts_ru: null,
          current_status_en: null,
          current_status_kz: null,
          current_status_ru: null,
          divisible: null,
          foreign_participation: null,
          indicators_en:null,
          indicators_kz:null,
          indicators_ru:null,
          infrastructural_en:null,
          infrastructural_kz:null,
          infrastructural_ru:null,
          plan_jobs: null,
          power: null,
          products_en: null,
          products_kz: null,
          products_ru: null,
          project_date: null,
          project_price: null,
          project_type: null,
          sef: null,
          st_asgeojson: null,
          geom: null,
          status: null,
          time_realization_en: null,
          time_realization_kz: null,
          time_realization_ru: null,
          title_en: null,
          title_kz: null,
          title_ru: null,
          title_project_en: null,
          title_project_kz: null,
          title_project_ru: null,
          
          photos: null,
          videos: null,
          files: null,

          new_photos: {
            ru: [],
            kz: [],
            en: [],
          },
          new_video: {
            name_ru: '',
            name_kz: '',
            name_en: '',
            src_ru: '',
            src_kz: '',
            src_en: '',
          },
          new_files: {
            ru: [],
            kz: [],
            en: [],
          },

          investments2014: null,
          investments2015: null,
          investments2016: null,
          investments2017: null,
          investments2018: null,

          production2014: null,
          production2015: null,
          production2016: null,
          production2017: null,
          production2018: null,

          foreign_investments2014: null,
          foreign_investments2015: null,
          foreign_investments2016: null,
          foreign_investments2017: null,
          foreign_investments2018: null,

          number_jobs2014: null,
          number_jobs2015: null,
          number_jobs2016: null,
          number_jobs2017: null,
          number_jobs2018: null,

          taxes2014: null,
          taxes2015: null,
          taxes2016: null,
          taxes2017: null,
          taxes2018: null,

          exports_volume2014: null,
          exports_volume2015: null,
          exports_volume2016: null,
          exports_volume2017: null,
          exports_volume2018: null,

          spent_foreign_investments2014: null,
          spent_foreign_investments2015: null,
          spent_foreign_investments2016: null,
          spent_foreign_investments2017: null,
          spent_foreign_investments2018: null,
        },

        selected_image: '',
        selected_video: '',
      }
    },

    components: {
      tabs,
      editmap,
      reset_sector_map,
      basemaps,
      modal,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_sector',
      'edited_sector_geom',
      'image_modal',
      'video_modal',
    ]),

    watch: {
      edited_sector_geom: 'assign_geom',
    },

    methods: {
      ...mapActions([
        'update_sector',
        'set_basemap',
        'set_reset_sector',
        'set_zone',
        'change_ui_visibility',
      ]),

      assign_geom() {
        this.sectormodel.geom = this.edited_sector_geom;
      },

       select_image(src) {
        this.selected_image = src;
      },

      select_video(src) {
        this.selected_video = src;
      },

      set_photo ({ target: { files }}, lang) {
        if (!files.length) {
          console.log('empty')
          return;
        }
        Object.keys(files).map((key, idx) => {
          filebase64(files[key])
          .then(result => {
            this.sectormodel.new_photos[lang].push(result);
          });
        });
      },

      set_files ({ target: { files }}, lang) {
        if (!files.length) {
          console.log('empty')
          return;
        }
        Object.keys(files).map((key, idx) => {
          filebase64(files[key])
          .then(result => {
            this.sectormodel.new_files[lang].push(result);
          });
        });
      },

    },

    mounted () {
      console.log(this.edited_sector)
      Object.keys(this.sectormodel).filter(it => it != 'new_photos' && it != 'new_video' && it != 'new_files').forEach(it => {
        this.sectormodel[it] = this.edited_sector[it];
      });
      this.set_zone(this.edited_sector.zone_id);
    }
  }
</script>


<template>
  <div class="editpanel_editsector">

    <modal
      v-if="video_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'video_modal',
        ui_component_state: false,
      })">
      <iframe style="border: none" width="520" height="305"
        :src="selected_video">
      </iframe>
    </modal>

    <modal
      v-if="image_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'image_modal',
        ui_component_state: false,
      })">
      <img
        style="object-fit: cover;"
        width="100%"
        height="100%"
        :src="selected_image"
      />
    </modal>

    <h2 class="editpanel_editsector-title" v-text="sectormodel['title_' + lang]"></h2>

    <div class="editpanel_editzone_reconciliation-buttons">
      <button class="editpanel_editzone_reconciliation-button" v-on:click="update_sector(sectormodel)" 
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
    </div>

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
            v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
          ></span>
        </span>
      </span>
      
      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Цифровые показатели' : lang == 'en' ? 'Digital indicators': 'Сандық көрсеткіштер'"
          ></span>
        </span>        
      </span>
      
      <!-- <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Галерея' : lang == 'en' ? 'Gallery': 'Галерея'"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_3">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Файлы для скачивания' : lang == 'en' ? 'Files to download': 'Жүктелетін файлдар'"
          ></span>
        </span>        
      </span> -->











      <div class="editpanel_editsector-tab editpanel_editsector-container" slot="tab_0">
        <div class="left-col">
          <h3 class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
          ></h3>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['title_'+lang]"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['title_project_'+lang]"/>

          <p class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Тип проекта' : lang == 'en' ? 'Project type': 'Жобаның түрі'"
          ></p>
          <select 
            class="editpanel_editzone-input"
            v-model="sectormodel.project_type"
          >
            <option 
              value=1
              :selected="sectormodel.project_type == 1"
              v-text="lang == 'ru' ? 'Действующий' : lang == 'kz' ? 'Ағымдағы жоба' : 'Ongoing'"
            ></option> 
            <option 
              value=2
              :selected="sectormodel.project_type == 2"
              v-text="lang == 'ru' ? 'На стадии реализации' : lang == 'kz' ? 'Iске асырылуда' : 'Underway'"
            ></option>
            <option 
              value=3
              :selected="sectormodel.project_type == 3"
              v-text="lang == 'ru' ? 'Свободный' : lang == 'kz' ? 'Бос' : 'Free'"
            ></option>
          </select>

          <p class="editpanel_editzone_reconciliation-tab-title"
            v-if="sectormodel.project_type == 3" 
            v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
          ></p>
          <select 
            class="editpanel_editzone-input"
            v-if="sectormodel.project_type == 3" 
            v-model="sectormodel.divisible"
          >
            <option 
              value=1
              :selected="sectormodel.divisible == 1"
              v-text="lang == 'ru' ? 'Да' : lang == 'kz' ? 'Иә' : 'Yes'"
            ></option> 
            <option 
              value=0
              :selected="sectormodel.divisible == 0"
              v-text="lang == 'ru' ? 'Нет' : lang == 'kz' ? 'Жоқ' : 'No'"
            ></option>
          </select>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Стоимость проекта' : lang == 'en' ? 'Project price': 'Жобаның құны'"
          ></p>
          <input type="number" min="0"
            class="editpanel_editzone-input"
            v-model="sectormodel.project_price"/>
        
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['current_status_' + lang]"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"
          ></p>
          <input type="number" min="0"
            class="editpanel_editzone-input"
            v-model="sectormodel.project_date"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['products_' + lang]"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['time_realization_' + lang]"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"
          ></p>
          <input type="number" min="0"
            class="editpanel_editzone-input"
            v-model="sectormodel.plan_jobs"/>

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"
          ></p>
          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel.power"/>


          <h3 class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
          ></h3>

          <input type="text"
            class="editpanel_editzone-input"
            v-model="sectormodel['contacts_' + lang]"
          />
        
          <h3 class="editpanel_editsector_reconciliation-tit"
           v-text="{
            'title_ru': 'Маркетинговые материалы',
            'title_kz': 'Marketing materials',
            'title_en': 'Маркетингтік материалдар',
          }['title_' + lang]"
        ></h3>
        <div>
          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></p>
          <div class="sidebar-market_wrap">
            <div 
              class="sidebar-passport_photo"
               v-if="sectormodel.photos.length"
              v-for="photo in sectormodel.photos"
            >
              <img 
                :src="photo['src_' + lang]"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_image(photo['src_' + lang])"
              />            
            </div>

            <div style="clear: both">
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'ru')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'kz')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_photo($event, 'en')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>

          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></p>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-if="sectormodel.videos.length"
            v-text="lang == 'ru' ? 'Существующие видеоролики' : lang == 'en' ? 'Existing videos' : 'Бар бейне'"></p>
          <div class="sidebar-market_wrap" v-if="sectormodel.videos.length">
            <div
              v-for="video in sectormodel.videos">
              <div 
                class="sidebar-passport_video"
                v-on:click="
                  change_ui_visibility({
                    ui_component: 'video_modal',
                    ui_component_state: true,
                  }),
                  select_video(video['src_' + lang])"
              >
              </div>
              <div style="clear: both">
                <p class="editpanel_editzone_reconciliation-tab-title" 
                  v-text="lang == 'ru' ? 'Название видеоролика' : lang == 'en' ? 'Title of the video' : 'Бейне атауы'"></p>
                <input class="editpanel_editzone-input" type="text"
                  v-model="video['name_'+lang]"/>
                <p class="editpanel_editzone_reconciliation-tab-title"
                  :style="{ margin: '0' }"
                  v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
                <input class="editpanel_editzone-input" type="text"
                  v-model="video['src_'+lang]"/>
              </div>
            </div>
          </div>
          <p class="editpanel_editzone_reconciliation-tab-title" 
              :style="{ margin: 0 }"
              v-text="lang == 'ru' ? 'Добавить видеоролик' : lang == 'en' ? 'Add video' : 'Бейнені қосу'"></p>
          <div class="sidebar-market_wrap">
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Название видеоролика' : lang == 'en' ? 'Title of the video' : 'Бейне атауы'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="sectormodel.new_video['name_'+lang]"/>
            <p class="editpanel_editzone_reconciliation-tab-title" 
              v-text="lang == 'ru' ? 'Ссылка на видео' : lang == 'en' ? 'Link to video' : 'Бейне сілтемесі'"></p>
            <input class="editpanel_editzone-input" type="text"
              v-model="sectormodel.new_video['src_'+lang]"/>
          </div>

          <p class="editpanel_editsector_reconciliation-tit"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></p>
          <div v-if="sectormodel.files.length" class="sidebar-market_file" v-for="file in sectormodel.files">
            <a :href="file['src_' + lang]" download>
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <div style="clear: both">
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'ru')" />
                <span class="editpanel_editzone-lang">RU</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'kz')" />
                <span class="editpanel_editzone-lang">KZ</span>
              </div>
              <div class="editpanel_editzone-add">
                <input id="zone_photo_input" type="file" multiple v-on:change="set_files($event, 'en')" />
                <span class="editpanel_editzone-lang">EN</span>
              </div>
            </div>
        </div>

        </div>
        
        <div class="map-container">

          <editmap class="editpanel_editsector-map"
            :is_sector="'sector'"
          />
          <reset_sector_map
            :style="{ top: '220px', right: '10px', position: 'absolute' }"
            v-on:click="set_reset_sector"
          />
          <basemaps class="editpanel_editsector-basemaps"
            :style="{ bottom: '10px', right: '10px' }"
            v-on:click="set_basemap"/>
        </div>
      </div>

      <div class="editpanel_editsector-tab editpanel_editsector-container" slot="tab_1">
        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Объем вложенных инвестиций' : lang == 'en' ? 'Investments volume' : 'Инвестициялар көлемі'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.investments2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.investments2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.investments2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.investments2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.investments2018"/>



        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Объем производства' : lang == 'en' ? 'Production volume' : 'Өндіріс көлемі'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.production2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.production2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.production2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.production2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.production2018"/>



        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Прямые иностранные инвестиции' : lang == 'en' ? 'Foreign direct investments' : 'Шетелдік тікелей инвестициялар'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.foreign_investments2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.foreign_investments2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.foreign_investments2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.foreign_investments2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.foreign_investments2018"/>



        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Количество созданных рабочих' : lang == 'en' ? 'Number of jobs created' : 'Жасалған жұмыс орындарының саны'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.number_jobs2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.number_jobs2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.number_jobs2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.number_jobs2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.number_jobs2018"/>



        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Объем налоговых отчислений' : lang == 'en' ? 'Tax volume' : 'Салықтық аударымдардың сомасы'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.taxes2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.taxes2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.taxes2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.taxes2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.taxes2018"/>


        
        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Объем экспорта' : lang == 'en' ? 'Export volume' : 'Экспорттың көлемі'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.exports_volume2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.exports_volume2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.exports_volume2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.exports_volume2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.exports_volume2018"/>
        



        <h3 class="editpanel_editsector_reconciliation-tit"
        v-text="lang == 'ru' ? 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом' : lang == 'en' ? 'Attracted foreign investments for 1 tenge spent by the budget' : 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды'"></h3>

        <p class="editpanel_editzone-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.spent_foreign_investments2014"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.spent_foreign_investments2015"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.spent_foreign_investments2016"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.spent_foreign_investments2017"/>

        <p class="editpanel_editzone-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editzone-input"
          v-model="sectormodel.spent_foreign_investments2018"/>

      </div>

<!--
      <div class="editpanel_editsector-container" slot="tab_2">
        <h3>Маркетинговые материалы</h3>
      </div>

      <div class="editpanel_editsector-container" slot="tab_3">
        <h3>Видео</h3>

        <h3>Фото</h3>
      </div>
-->
    </tabs>
  </div>
</template>

<style>

  .left-col {
    width: 45%;
    padding-bottom: 20px;
  }

  .map-container {
    position: fixed;
    top: 145px;
    bottom: 45px;
    background: #eee;
    right: 45px;
    width: 35%;
  }

  .editpanel_editsector {
    position: absolute;
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    padding: 0;
    margin: 30px;
    width: calc(100% - 60px);
  }

  .editpanel_editsector-map {
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .editpanel_editsector-container {
    padding: 0 20px 20px 20px;
    border-top: 1px solid #eee;
    overflow-y: auto;
    height: calc(100vh - 165px);
  }

  .editpanel_editsector-basemaps {
    z-index: 100;
  }

  .editpanel_editsector-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editsector-tab {
    padding: 0 20px;
  }

  .editpanel_editsector_reconciliation-tit {
    font-weight: normal;
    font-size: 16px;
    color: #03A0E3;
  }

  .editpanel_editzone-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editzone-input {
    border: none;
    font-size: 13px;
    outline: none;
    border-bottom: 2px solid #50C7F9;
    width: 100%;
  }

  .editpanel_editzone-input_title {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }
 
</style>
