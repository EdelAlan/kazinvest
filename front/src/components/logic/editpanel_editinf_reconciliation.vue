<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import filebase64 from '../../util/filebase64';
  import basemaps from '../logic/basemaps';

  export default {
    data () {
      return {
        infmodel: null,
      }
    },

    components: {
      tabs,
      editmap,
      basemaps,
    },

    computed: mapGetters([
      'lang',
      'edited_inf',
      'zones',
    ]),

    methods: {
      ...mapActions([
        'set_basemap',
        'show_on_map',
        'update_zone',
        'reject_data',
        'save_geom',
        'send_geom',
      ]),
    },

    mounted () {
      this.infmodel = this.edited_inf.new_data;
      this.save_geom({
        ...this.edited_inf.new_data,
      });
    },

  }
</script>


<template>
  <div>

    <div class="editpanel_editinf_reconciliation">

      <h2 class="editpanel_editinf_reconciliation-title" 
        v-text="({
          title_ru: 'Новые данные: ', 
          title_kz: 'Жана деректер: ', 
          title_en: 'New data: '
        }['title_' + lang])
        + edited_inf.member_firstname + ' ' 
        + edited_inf.member_lastname + 
        ' (' + edited_inf.member_id + '), ' + edited_inf.timestamp.replace('T', ' ').slice(0, 19)"
      ></h2>
      <h3 class="editpanel_editzone-last_title" 
        v-text="'Предыдущее согласование: ' + edited_inf.last_updated_member + ', ' 
        + edited_inf.last_updated_date.replace('T', ' ').slice(0, 19)"
      ></h3>
      <div class="editpanel_editzone_reconciliation-buttons">
        <button 
          class="editpanel_editzone_reconciliation-button"
          v-on:click="send_geom"
          v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
        ></button>
        <button class="editpanel_editzone_reconciliation-button" v-on:click="reject_data(edited_inf)" 
          v-text="lang == 'ru' ? 'Отклонить' : lang == 'en' ? 'Reject' : 'Қабылдамау'"
        ></button>
      </div>

      <div class="editpanel_editzone_reconciliation-container">
        <h3 class="editpanel_editinf_reconciliation-tab-title"
          v-text="edited_inf.new_data.st_asgeojson.geometry.type == 'MultiLineString' ? (lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure' : 'Инфрақұрылым') : (lang == 'ru' ? 'Объекты' : lang == 'en' ? 'Objects' : 'Объектілер')"
        ></h3>
        <div>
          <p class="editpanel_editinf_reconciliation-tab-input_title-infrastructure" 
            v-text="edited_inf.new_data['title_'+lang]"></p>

          <div class="editpanel_editinf_reconciliation-tab-input_subtitle" 
            v-text="{
              title_ru: 'Атрибут', 
              title_kz: 'Атрибут', 
              title_en: 'Capacity'
            }['title_' + lang]"></div>
          <span class="editpanel_editinf_reconciliation-input" type="text"
            v-text="edited_inf.new_data.capacity ? edited_inf.new_data.capacity : '-'"/>
          <div class="editpanel_editinf_reconciliation-tab-input_subtitle" 
            v-text="{
              title_ru: 'Единица измерения', 
              title_kz: 'Өлшем бірлігі', 
              title_en: 'Unit'
            }['title_' + lang]"></div>
          <span class="editpanel_editinf_reconciliation-input" type="text"
            v-text="edited_inf.new_data.unit ? edited_inf.new_data.unit : '-'"/>
        </div>

        <editmap class="editpanel_editsector_reconciliation-map"
          :is_sector="'infrastructure'"
        />
        <!-- :style="{ top: '350px', right: '40px' }" -->
        <basemaps
          class="editpanel_editsector_reconciliation-basemaps"
          v-on:click="set_basemap"
        />
      </div>

      <!-- <tabs
        :titles_style="{
          'font-size': '14px',
          'padding': '10px',
        }"
        :active_page="0">

        <span slot="tab_title_0">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title"
              v-text="lang == 'ru' ? 'Карта' : lang == 'en' ? 'Map': 'Карта'"
            ></span>
          </span>
        </span>



        <div class="editpanel_editinf_reconciliation-tab" slot="tab_0">
          <h3 class="editpanel_editinf_reconciliation-tab-title"
            v-text="edited_inf.new_data.st_asgeojson.geometry.type == 'MultiLineString' ? (lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure' : 'Инфрақұрылым') : (lang == 'ru' ? 'Объекты' : lang == 'en' ? 'Objects' : 'Объектілер')"
          ></h3>
          <div>
            <p class="editpanel_editinf_reconciliation-tab-input_title-infrastructure" 
              v-text="edited_inf.new_data['title_'+lang]"></p>

            <div class="editpanel_editinf_reconciliation-tab-input_subtitle" 
              v-text="{
                title_ru: 'Атрибут', 
                title_kz: 'Атрибут', 
                title_en: 'Capacity'
              }['title_' + lang]"></div>
            <span class="editpanel_editinf_reconciliation-input" type="text"
              v-text="edited_inf.new_data.capacity ? edited_inf.new_data.capacity : '-'"/>
            <div class="editpanel_editinf_reconciliation-tab-input_subtitle" 
              v-text="{
                title_ru: 'Единица измерения', 
                title_kz: 'Өлшем бірлігі', 
                title_en: 'Unit'
              }['title_' + lang]"></div>
            <span class="editpanel_editinf_reconciliation-input" type="text"
              v-text="edited_inf.new_data.unit ? edited_inf.new_data.unit : '-'"/>
          </div>

          <editmap class="editpanel_editinf_reconciliation-map"
            :is_sector="'infrastructure'"
          />
          <basemaps
            class="editpanel_editinf_reconciliation-basemaps"
            :style="{ top: '350px', right: '40px' }"
            v-on:click="set_basemap"
          />
        </div>

      </tabs> -->
    </div>
  </div>
</template>

<style>

  /* .editpanel_editinf_reconciliation {
    top: 60px;
    right: 30px;
    bottom: 30px;
    position: absolute;
    left: 30px;    
    z-index: 10;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    overflow-y: auto;
  } */

  .editpanel_editinf_reconciliation-title {
    font-size: 16px;
    color: #555;
    font-weight: normal;
    padding: 10px 20px 0px 20px;
    margin: 0;
  }

  .editpanel_editinf_reconciliation-tab {
    padding: 0 20px;
  }

  .editpanel_editinf_reconciliation-tab-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editinf_reconciliation-tab-input_title {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editinf_reconciliation-tab-input_title-infrastructure {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editinf_reconciliation-tab-input_subtitle {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editinf_reconciliation-tab-title {
    font-weight: normal;
    font-size: 20px;
    color: #03A0E3;
  }

  .editpanel_editinf_reconciliation-add {
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
  .editpanel_editinf_reconciliation-lang {
    position: absolute;
    top: 0;
    color: #fff;
    left: 5px;
    z-index: 2;
    font-size: 12px;
  }
  .editpanel_editinf_reconciliation-add::before {
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

  .editpanel_editinf_reconciliation-map {
    position: absolute;
    height: 645px;
    width: 50%;
    right: 0px;
    top: 140px
  }

  .mapboxgl-canvas {
    height: 100%;
    width: 100%;
  }

  .editpanel_editinf_reconciliation-input {
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

  .editpanel_editinf_reconciliation-basemaps {
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
  .editpanel_editinf_reconciliation-button {
    padding: 5px;
    color: #777;
    background: #fff;
    border: 1px solid #eee;
  }
  .editpanel_editinf_reconciliation-buttons {
    position: fixed;
    top: 60px;
    z-index: 10;
    right: 40px;
  }
  .editpanel_editinf_reconciliation-date {
    position: absolute;
    left: 20px;
    color: #bbb;
    font-size: 12px;
  }
 
</style>
