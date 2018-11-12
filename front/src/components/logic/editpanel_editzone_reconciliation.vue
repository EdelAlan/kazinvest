<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import filebase64 from '../../util/filebase64';
  import basemaps from '../logic/basemaps';
  import save_geom from '../logic/save_geom';

  export default {
    data () {
      return {
        zonemodel: null,
      }
    },

    components: {
      tabs,
      editmap,
      basemaps,
      save_geom,
    },

    computed: mapGetters([
      'lang',
      'edited_zone',
      'zones',
    ]),

    methods: {
      ...mapActions([
        'set_basemap',
        'show_on_map',
        'update_zone',
        'reject_data',
        'set_zone',
      ]),

    },

    async mounted () {
      this.zonemodel = JSON.parse(this.edited_zone.model);
      await this.set_zone(this.zonemodel.id);
    },

  }
</script>


<template>
  <div>
    <div class="editpanel_editzone_reconciliation">

      <h2 class="editpanel_editzone_reconciliation-title" 
        v-text="{
          'title_ru': 'Существующие данные', 
          'title_kz': 'Бар деректер', 
          'title_en': 'Existing data'
        }['title_' + lang]"
      ></h2>

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
              v-text="lang == 'ru' ? 'Справочная информация' : lang == 'en' ? 'Refernce information': 'Анықтамалық ақпарат'"
            ></span>
          </span>
        </span>
        
        <span slot="tab_title_1">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Диаграммы' : lang == 'en' ? 'Diagrams': 'Диаграммалар'"
            ></span>
          </span>        
        </span>



        <div class="editpanel_editzone_reconciliation-tab" slot="tab_0">

          <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'"></h3>
          <span class="editpanel_editzone_reconciliation-input"
            v-text="this.zones[0]['title_' + lang]"
          />
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description' : 'Сипаттама'"
          ></h3>
          <span style="width: 100%; height: 100px;"
            v-text="this.zones[0]['description_' + lang]">
          </span>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Описание региона' : lang == 'en' ? 'Region description' : 'Аймақтың сипаттамасы'"
          ></h3>
          <span style="width: 100%; height: 100px;"
            v-text="this.zones[0]['region_description_' + lang]">
          </span>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Маркетинговые материалы' : lang == 'en' ? 'Merketing materials' : 'Маркетингтік материалдар'"
          ></h3>
          <div class="sidebar-market_wrap">
            <div v-for="photo in this.zones[0].photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]" />
            </div>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'en' ? 'Video' : 'Видео'"
          ></h3>
          <div class="sidebar-market_wrap">
            <div v-for="video in this.zones[0].videos" class="sidebar-passport_video"></div>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files' : 'Файлдар'"
          ></h3>
          <div class="sidebar-market_file">
            <a v-for="file in this.zones[0].files" :href="file['src_' + lang]" target="_blank">
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
          ></h3>
          <div class="sidebar-passport_padding">
            <span style="width: 100%; height: 100px;"
              v-text="this.zones[0]['contacts_' + lang]">
            </span>
          </div>

        </div>

        <div class="editpanel_editzone_reconciliation-tab" slot="tab_1">
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Объем затраченных средств из бюджета на инфраструктуру' : lang == 'en' ? 'Budget infrastructural expenses' : 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар'"
          ></h3>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
          <span class="editpanel_editzone_reconciliation-input" type="number" min="0"
            v-text="this.zones[0].budget_need"/>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
          <span class="editpanel_editzone_reconciliation-input" type="number" min="0"
            v-text="this.zones[0].budget_allocated"/>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Соотношение свободных и занятых земель' : lang == 'en' ? 'Free and taken land share' : 'Бос және қабылданған жер үлесі'"></p>
          <span type="number" min="0"
            class="editpanel_editzone_reconciliation-tab-input"
            v-text="this.zones[0].level"/>
        </div>

      </tabs>
    </div>

    <div class="editpanel_editzone_reconciliation editpanel_editzone_reconciliation-new">

      <h2 class="editpanel_editzone_reconciliation-title" 
        v-text="{
          'title_ru': 'Новые данные', 
          'title_kz': 'Жана деректер', 
          'title_en': 'New data'
        }['title_' + lang]"
      ></h2>
      <button v-on:click="update_zone(zonemodel)" 
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
      <button v-on:click="reject_data(edited_zone)" 
        v-text="lang == 'ru' ? 'Отклонить' : lang == 'en' ? 'Reject' : 'Қабылдамау'"
      ></button>

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
              v-text="lang == 'ru' ? 'Справочная информация' : lang == 'en' ? 'Refernce information': 'Анықтамалық ақпарат'"
            ></span>
          </span>
        </span>
        
        <span slot="tab_title_1">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Диаграммы' : lang == 'en' ? 'Diagrams': 'Диаграммалар'"
            ></span>
          </span>        
        </span>



        <div class="editpanel_editzone_reconciliation-tab" slot="tab_0">

          <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'"></h3>
          <span class="editpanel_editzone_reconciliation-input"
            v-text="zonemodel['title_' + lang]"
          />
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description' : 'Сипаттама'"
          ></h3>
          <span style="width: 100%; height: 100px;"
            v-text="zonemodel['description_' + lang]">
          </span>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Описание региона' : lang == 'en' ? 'Region description' : 'Аймақтың сипаттамасы'"
          ></h3>
          <span style="width: 100%; height: 100px;"
            v-text="zonemodel['region_description_' + lang]">
          </span>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Маркетинговые материалы' : lang == 'en' ? 'Merketing materials' : 'Маркетингтік материалдар'"
          ></h3>
          <div class="sidebar-market_wrap">
            <div v-for="photo in zonemodel.photos" class="sidebar-passport_photo">
              <img :src="photo['src_' + lang]" />
            </div>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'en' ? 'Video' : 'Видео'"
          ></h3>
          <div class="sidebar-market_wrap">
            <div v-for="video in zonemodel.videos" class="sidebar-passport_video"></div>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files' : 'Файлдар'"
          ></h3>
          <div class="sidebar-market_file">
            <a v-for="file in zonemodel.files" :href="file['src_' + lang]" target="_blank">
              <div class="sidebar-market_pdf"></div>
              <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
            </a>
          </div>
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
          ></h3>
          <div class="sidebar-passport_padding">
            <span style="width: 100%; height: 100px;"
              v-text="zonemodel['contacts_' + lang]">
            </span>
          </div>

        </div>

        <div class="editpanel_editzone_reconciliation-tab" slot="tab_1">
          <h3 class="editpanel_editzone_reconciliation-tab-title"
            v-text="lang == 'ru' ? 'Объем затраченных средств из бюджета на инфраструктуру' : lang == 'en' ? 'Budget infrastructural expenses' : 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар'"
          ></h3>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
          <span class="editpanel_editzone_reconciliation-input" type="number" min="0"
            v-text="zonemodel.budget_need"/>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
          <span class="editpanel_editzone_reconciliation-input" type="number" min="0"
            v-text="zonemodel.budget_allocated"/>
          <p class="editpanel_editzone_reconciliation-tab-input_title" 
            v-text="lang == 'ru' ? 'Соотношение свободных и занятых земель' : lang == 'en' ? 'Free and taken land share' : 'Бос және қабылданған жер үлесі'"></p>
          <span type="number" min="0"
            class="editpanel_editzone_reconciliation-tab-input"
            v-text="zonemodel.level"/>
        </div>

      </tabs>
    </div>
  </div>
</template>

<style>

  .editpanel_editzone_reconciliation {
    position: absolute;
    z-index: 10;
    width: 47%;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    overflow-y: auto;
    padding: 0;
    margin: 30px;
    height: calc(100vh - 60px);
  }

  .editpanel_editzone_reconciliation-new {
    right: 0px;
  }

  .editpanel_editzone_reconciliation-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editzone_reconciliation-tab {
    padding: 0 20px;
  }

  .editpanel_editzone_reconciliation-tab-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editzone_reconciliation-tab-input_title {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editzone_reconciliation-tab-input_title-infrastructure {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editzone_reconciliation-tab-input_title-infrastructure:hover {
    cursor: pointer;
    text-decoration: underline;
  }

  .editpanel_editzone_reconciliation-tab-input_subtitle {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editzone_reconciliation-tab-title {
    font-weight: normal;
    font-size: 20px;
    color: #03A0E3;
  }

  .editpanel_editzone_reconciliation-add {
    width: 92px;
    height: 53px;
    background: #555;
    float: left;
    margin: 5px;
    overflow: hidden;
    color: transparent;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
  }
  .editpanel_editzone_reconciliation-lang {
    position: absolute;
    top: 0;
    color: #fff;
    left: 5px;
    z-index: 2;
    font-size: 12px;
  }
  .editpanel_editzone_reconciliation-add::before {
    content: '';
    background-image: url("../../assets/images/add-plus-button.svg");
    position: absolute;
    top: 50%;
    opacity: .8;
    transform: translate(-50%, -50%);
    height: 25PX;
    width: 25PX;
    background-size: contain;
    left: 50%;
  }
  #zone_photo_input {
    opacity: 0;
    cursor: pointer;
    width: 92px;
    height: 53px;
    background: #aaa;
    overflow: hidden;
    color: transparent;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
  }

  input[type=file], /* FF, IE7+, chrome (except button) */
  input[type=file]::-webkit-file-upload-button { /* chromes and blink button */
      cursor: pointer; 
  }

  .editpanel_editzone_reconciliation-map {
    position: fixed;
    height: 100%;
    width: 40%;
    right: 35px;
    top: 157px
  }

  .mapboxgl-canvas {
    height: 100%;
    width: 100%;
  }

  .editpanel_editzone_reconciliation-input {
    border: none;
    border-bottom: 1px solid #aaa;
  }

  /* .mapboxgl-map {
    height: 100%;
    width: 50%;
    position: absolute;
    right: 0;
    top: 126px;
  } */

  .editpanel_editzone_reconciliation-basemaps {
    position: fixed;
    z-index: 1000;
  }

  .sidebar-passport_photo_meta {
    position: absolute;
    top: 50%;
    left: 50%;
    color: #fff;
    font-size: 10px;
    transform: translate(-50%, -50%);
    text-align: center;
    line-height: 13px;
  }
 
</style>
