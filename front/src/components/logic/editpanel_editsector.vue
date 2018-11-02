<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import reset_sector_map from '../logic/editpanel_reset_sector_map';
  import basemaps from '../logic/basemaps';

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
          user_updated: null,
          
          photos: null,
          videos: null,
          files: null,

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
      }
    },

    components: {
      tabs,
      editmap,
      reset_sector_map,
      basemaps,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_sector',
      'edited_sector_geom',
    ]),

    watch: {
      edited_sector_geom: 'assign_geom',
    },

    methods: {
      ...mapActions([
        'update_sector',
        'set_basemap',
      ]),

      assign_geom() {
        this.sectormodel.geom = this.edited_sector_geom;
      },

    },

    mounted () {
      console.log(this.edited_sector)
      Object.keys(this.sectormodel).forEach(it => {
        this.sectormodel[it] = this.edited_sector[it];
      });

    }
  }
</script>


<template>
  <div class="editpanel_editsector">

    <h2 class="editpanel_editsector-title" v-text="sectormodel['title_' + lang]"></h2>
    <button v-on:click="update_sector(sectormodel)">Сохранить</button>

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
      
      <span slot="tab_title_2">
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
      </span>















      <div class="editpanel_editsector-tab" slot="tab_0">
        <h3 class="editpanel_editsector-tab-title"
           v-text="lang == 'ru' ? 'Общая информация' : lang == 'en' ? 'General information': 'Жалпы ақпарат'"
        ></h3>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Название компании участника' : lang == 'en' ? 'Participant\'s company name': 'Қатысушының компания атауы'"
        ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['title_'+lang]"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description': 'Сипаттама'"
        ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['title_project_'+lang]"/>

        <p class="editpanel_editsector-tab-input_title-oi"
          v-text="lang == 'ru' ? 'Тип проекта' : lang == 'en' ? 'Project type': 'Жобаның түрі'"
        ></p>
        <select 
          class="editpanel_editsector-tab-input-oi"
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

        <p class="editpanel_editsector-tab-input_title-oi"
          v-if="sectormodel.project_type == 3" 
          v-text="lang == 'ru' ? 'Делимый' : lang == 'en' ? 'Divisible': 'Бөліседі'"
        ></p>
        <select 
          class="editpanel_editsector-tab-input-oi"
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

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Стоимость проекта' : lang == 'en' ? 'Project price': 'Жобаның құны'"
        ></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel.project_price"/>
      
        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Текущий статус' : lang == 'en' ? 'Current status': 'Ағымдағы күй'"
        ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['current_status_' + lang]"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Год' : lang == 'en' ? 'Year': 'Жыл'"
        ></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel.project_date"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Продукция' : lang == 'en' ? 'Products': 'Өнімдер'"
        ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['products_' + lang]"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Сроки реализации' : lang == 'en' ? 'Implementation period': 'Іске асыру мерзімі'"
      ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['time_realization_' + lang]"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Рабочие места' : lang == 'en' ? 'Workplaces': 'Жұмыс орындары'"
        ></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel.plan_jobs"/>

        <p class="editpanel_editsector-tab-input_title-oi" 
          v-text="lang == 'ru' ? 'Мощность' : lang == 'en' ? 'Power': 'Қуат'"
        ></p>
        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel.power"/>


        <h3 class="editpanel_editsector-tab-title"
          v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
        ></h3>

        <input type="text"
          class="editpanel_editsector-tab-input-oi"
          v-model="sectormodel['contacts_' + lang]"/>

        <editmap class="editpanel_editsector-map"/>
        <reset_sector_map />
        <basemaps class="editpanel_editsector-basemaps" :style="{ top: '385px' }"
          v-on:click="set_basemap"/>

      </div>

      <div class="editpanel_editsector-tab" slot="tab_1">
        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Объем вложенных инвестиций' : lang == 'en' ? 'Investments volume' : 'Инвестициялар көлемі'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.investments2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.investments2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.investments2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.investments2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.investments2018"/>



        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Объем производства' : lang == 'en' ? 'Production volume' : 'Өндіріс көлемі'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.production2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.production2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.production2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.production2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.production2018"/>



        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Прямые иностранные инвестиции' : lang == 'en' ? 'Foreign direct investments' : 'Шетелдік тікелей инвестициялар'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.foreign_investments2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.foreign_investments2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.foreign_investments2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.foreign_investments2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.foreign_investments2018"/>



        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Количество созданных рабочих' : lang == 'en' ? 'Number of jobs created' : 'Жасалған жұмыс орындарының саны'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.number_jobs2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.number_jobs2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.number_jobs2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.number_jobs2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.number_jobs2018"/>



        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Объем налоговых отчислений' : lang == 'en' ? 'Tax volume' : 'Салықтық аударымдардың сомасы'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.taxes2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.taxes2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.taxes2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.taxes2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.taxes2018"/>


        
        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Объем экспорта' : lang == 'en' ? 'Export volume' : 'Экспорттың көлемі'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.exports_volume2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.exports_volume2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.exports_volume2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.exports_volume2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.exports_volume2018"/>
        



        <h3 class="editpanel_editsector-tab-title"
        v-text="lang == 'ru' ? 'Привлечено иностранных инвестиций на 1 тг., затраченных бюджетом' : lang == 'en' ? 'Attracted foreign investments for 1 tenge spent by the budget' : 'Бюджеттен жұмсалған 1 теңгеге шетелдік инвестициялар тартылды'"></h3>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2014"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.spent_foreign_investments2014"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2015"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.spent_foreign_investments2015"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2016"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.spent_foreign_investments2016"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2017"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.spent_foreign_investments2017"/>

        <p class="editpanel_editsector-tab-input_title" 
          v-text="2018"></p>
        <input type="number" min="0"
          class="editpanel_editsector-tab-input"
          v-model="sectormodel.spent_foreign_investments2018"/>

      </div>

      <div slot="tab_2">
        <h3>Маркетинговые материалы</h3>
      </div>

      <div slot="tab_3">
        <h3>Видео</h3>

        <h3>Фото</h3>
      </div>

    </tabs>
  </div>
</template>

<style>

  .editpanel_editsector {
    position: absolute;
    z-index: 10;
    width: calc(100% - 60px);
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    overflow-y: auto;
    padding: 0;
    margin: 30px;
    height: calc(100vh - 60px);
  }

  .editpanel_editsector-map {
    height: 100%;
    width: 50%;
    right: 0;
    top: 126px
  }

  .editpanel_editsector-basemaps {
    z-index: 1000;
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

  .editpanel_editsector-tab-title {
    font-weight: normal;
    font-size: 16px;
    color: #03A0E3;
  }

  .editpanel_editsector-tab-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editsector-tab-input-oi {
    width: 450px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editsector-tab-input_title {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }
 
</style>
