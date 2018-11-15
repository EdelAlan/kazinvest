<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import filebase64 from '../../util/filebase64';
  import basemaps from '../logic/basemaps';
  import save_geom from '../logic/save_geom';
  import * as jsdiff from 'diff';

  export default {
    data () {
      return {
        new_data: null,
        old_data: null,
      }
    },

    components: {
      tabs,
      editmap,
      basemaps,
      save_geom,
    },

    computed: {
      ...mapGetters([
        'lang',
        'edited_zone',
        'zones',
      ]),
    },

    methods: mapActions([
      'set_basemap',
      'show_on_map',
      'update_zone',
      'reject_data',
      'set_zone',
    ]),

    async mounted () {
      this.old_data = this.edited_zone.old_data;
      this.new_data = this.edited_zone.new_data;

      [{
        old: String(this.old_data.contacts_ru),
        new: String(this.new_data.contacts_ru),
        el: '#compare_contact_ru',
      }, {
        old: String(this.old_data.contacts_kz),
        new: String(this.new_data.contacts_kz),
        el: '#compare_contact_kz',
      }, {
        old: String(this.old_data.contacts_en),
        new: String(this.new_data.contacts_en),
        el: '#compare_contact_en',
      }, {
        old: String(this.old_data.description_ru),
        new: String(this.new_data.description_ru),
        el: '#compare_description_ru',
      }, {
        old: String(this.old_data.description_kz),
        new: String(this.new_data.description_kz),
        el: '#compare_description_kz',
      }, {
        old: String(this.old_data.description_en),
        new: String(this.new_data.description_en),
        el: '#compare_description_en',
      }, {
        old: String(this.old_data.title_ru),
        new: String(this.new_data.title_ru),
        el: '#compare_title_ru',
      }, {
        old: String(this.old_data.title_kz),
        new: String(this.new_data.title_kz),
        el: '#compare_title_kz',
      }, {
        old: String(this.old_data.title_en),
        new: String(this.new_data.title_en),
        el: '#compare_title_en',
      }, {
        old: String(this.old_data.budget_allocated),
        new: String(this.new_data.budget_allocated),
        el: '#compare_budget_allocated',
      }, {
        old: String(this.old_data.budget_need),
        new: String(this.new_data.budget_need),
        el: '#compare_budget_need',
      }, {
        old: String(this.old_data.level),
        new: String(this.new_data.level),
        el: '#compare_level',
      }].forEach(it => {
        let color = '', 
          span = null,
          diff = jsdiff.diffWords(it.old, it.new),
          display = document.querySelector(it.el),
          fragment = document.createDocumentFragment();
        diff.forEach(part => {
          span = document.createElement('span');
          span.style.background = part.added ? '#0ACF00' : part.removed ? '#FF6440' : '#fff';
          span.style.color = part.added ? '#fff' : part.removed ? '#fff' : '#000';
          span.appendChild(document.createTextNode(part.value));
          fragment.appendChild(span);
        });
        display.appendChild(fragment);
      });
   
    },
  }
</script>


<template>
  <div class="editpanel_editzone_reconciliation">

    <h2 class="editpanel_editzone_reconciliation-title" 
      v-text="edited_zone.member_firstname + ' ' + edited_zone.member_lastname + 
        ' (' + edited_zone.member_id + ') ' 
      + edited_zone.timestamp.replace('T', ' ').slice(0, 19)"
    ></h2>
    <h3 class="editpanel_editzone-last_title" 
      v-text="'Предыдущее согласование: ' + edited_zone.last_updated_member + ', ' 
      + edited_zone.last_updated_date.replace('T', ' ').slice(0, 19)"
    ></h3>
    <div class="editpanel_editzone_reconciliation-buttons">
      <button class="editpanel_editzone_reconciliation-button" v-on:click="update_zone(new_data)" 
        v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
      ></button>
      <button class="editpanel_editzone_reconciliation-button" v-on:click="reject_data(edited_zone)" 
        v-text="lang == 'ru' ? 'Отклонить' : lang == 'en' ? 'Reject' : 'Қабылдамау'"
      ></button>
    </div>

    <div class="editpanel_editzone_reconciliation-container">
      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'"></h3>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_title_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_title_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_title_en"></div>
      
 
      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="(lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description' : 'Сипаттама') + ' (рус, қаз, eng)'"></h3>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_description_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_description_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_description_en"></div>


      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="(lang == 'ru' ? 'Описание региона' : lang == 'en' ? 'Region description' : 'Аймақтың сипаттамасы') + ' (рус, қаз, eng)'"></h3>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_region_description_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_region_description_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_region_description_en"></div>
    
      
      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="(lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс') + ' (рус, қаз, eng)'"></h3>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'рус'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_contact_ru"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'қаз'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_contact_kz"></div>
      <h4 class="editpanel_editzone_reconciliation-tab-sub_title" v-text="'eng'"></h4>
      <div class="editpanel_editzone_reconcilation-value" id="compare_contact_en"></div>
     
 
      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></h3>
      <div class="editpanel_editzone_reconcilation-value" id="compare_budget_need"></div>

      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></h3>
      <div class="editpanel_editzone_reconcilation-value" id="compare_budget_allocated"></div>
      

      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Соотношение свободных и занятых земель' : lang == 'en' ? 'Free and taken land share' : 'Бос және қабылданған жер үлесі'"></h3>
      <div class="editpanel_editzone_reconcilation-value" id="compare_level"></div>


<!--
      <h3 class="editpanel_editzone_reconciliation-tab-title" v-text="lang == 'ru' ? 'Объем затраченных средств из бюджета на инфраструктуру' : lang == 'en' ? 'Budget infrastructural expenses' : 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар'"></h3>


      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'ru' ? 'Маркетинговые материалы' : lang == 'en' ? 'Merketing materials' : 'Маркетингтік материалдар'"></h3>
      <div class="sidebar-market_wrap">
        <div v-for="photo in new_data.photos" class="sidebar-passport_photo">
          <img :src="photo['src_' + lang]" />
        </div>
      </div>
      

      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'en' ? 'Video' : 'Видео'"></h3>
      <div class="sidebar-market_wrap">
        <div v-for="video in new_data.videos" class="sidebar-passport_video"></div>
      </div>
      

      <h3 class="editpanel_editzone_reconciliation-tab-title"
        v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files' : 'Файлдар'"></h3>
      <div class="sidebar-market_file">
        <a v-for="file in new_data.files" :href="file['src_' + lang]" target="_blank">
          <div class="sidebar-market_pdf"></div>
          <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
        </a>
      </div> -->
      
    </div>
  </div>
</template>

<style>

  .editpanel_editzone_reconciliation-tab-sub_title {
    font-size: 12px;
    color: #03A0E3;
    margin: 5px 0 0 0;
  }

  .editpanel_editzone_reconciliation {
    z-index: 10;
    background: #fff;
    position: absolute;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    top: 60px;
    right: 30px;
    left: 30px;
    bottom: 30px;

  }

  .editpanel_editzone_reconcilation-separator {
    height: 20px;
  }

  .editpanel_editzone_reconcilation-value {
    font-size: 13px;
    max-height: 100px;
    overflow-y: auto;
    border: 1px solid #f1f1f1;
    border-radius: 2px;
    padding: 5px;
  }

  .editpanel_editzone_reconciliation-title {
    font-size: 16px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editzone_reconciliation-container {
    padding: 0 20px 20px 20px;
    border-top: 1px solid #eee;
    overflow-y: auto;
    position: absolute;
    top: 100px;
    left: 0;
    bottom: 0;
    right: 0;
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


  .editpanel_editzone_reconciliation-tab-title-infrastructure {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editzone_reconciliation-tab-title-infrastructure:hover {
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
    font-size: 16px;
    margin: 25px 0 5px 0;
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
  .editpanel_editzone_reconciliation-button {
    padding: 8px 15px;
    color: #777;
    margin-left: 10px;
    background: #f1f1f1;
    font-size: 12px;
    transition: 200ms;
    cursor: pointer;
    border: none;

  }
  .editpanel_editzone_reconciliation-button:hover {
    background: #50C7F9;
    color: #fff;
  }
  .editpanel_editzone_reconciliation-buttons {
    z-index: 10;
    position: absolute;
    right: 20px;
    top: 15px;
  }
  .editpanel_editzone_reconciliation-date {
    position: absolute;
    top: 41px;
    left: 20px;
    color: #bbb;
    font-size: 12px;
  }

 
</style>
