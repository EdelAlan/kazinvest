<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import editmap from '../logic/editmap';
  import filebase64 from '../../util/filebase64';
  import reset_sector_map from '../logic/editpanel_reset_sector_map';
  import basemaps from '../logic/basemaps';

  export default {
    data () {
      return {
        zonemodel: {
          id: null,
          title_ru: null,
          title_kz: null,
          title_en: null,
          description_ru: null,
          description_kz: null,
          description_en: null,
          region_description_ru: null,
          region_description_kz: null,
          region_description_en: null,
          contacts_ru: null,
          contacts_kz: null,
          contacts_en: null,
          files: null,
          videos: null,
          photos: null,
          physic_photo: {
            ru: null,
            kz: null,
            en: null,
          },

          budget_allocated: null,
          budget_need: null,
          level: null,
          infrastructures: null,
          objects: null,
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
      'edited_zone',
    ]),

    methods: {
      ...mapActions([
        'update_zone',
        'set_basemap',
      ]),
  
      set_photo ({ target: { files }}, lang) {
        if (!files.length) {
          console.log('empty')
          return;
        }
        filebase64(files[0])
        .then(result => {
          this.zonemodel.physic_photo[lang] = result;
          return;
        }).then(_ => {
          console.log(this.zonemodel.physic_photo);
        })
      },

    },


    mounted () {
      Object.keys(this.zonemodel).filter(it => it != 'physic_photo').forEach(it => {
        if (it == 'title_ru' || it == 'title_kz' || it == 'title_en') {
          this.zonemodel[it] = this.edited_zone[it].slice(4);
          return;
        }
        this.zonemodel[it] = this.edited_zone[it];
      });
    }

  }
</script>


<template>
  <div class="editpanel_editzone">

    <h2 class="editpanel_editzone-title" v-text="edited_zone['title_' + lang]"></h2>
    <button v-on:click="update_zone(zonemodel)" 
      v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
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
      
      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure': 'Инфрақұрылым'"
          ></span>
        </span>        
      </span>



      <div class="editpanel_editzone-tab" slot="tab_0">
        <h3 class="editpanel_editzone-tab-title" v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'"></h3>
        <input class="editpanel_editzone-input"
          v-model="zonemodel['title_' + lang]"
        />
        <h3 class="editpanel_editzone-tab-title"
           v-text="lang == 'ru' ? 'Описание' : lang == 'en' ? 'Description' : 'Сипаттама'"
        ></h3>
        <textarea style="width: 100%; height: 100px;"
          v-model="zonemodel['description_' + lang]">
        </textarea>
        <h3 class="editpanel_editzone-tab-title"
           v-text="lang == 'ru' ? 'Описание региона' : lang == 'en' ? 'Region description' : 'Аймақтың сипаттамасы'"
        ></h3>
        <textarea style="width: 100%; height: 100px;"
          v-model="zonemodel['region_description_' + lang]">
        </textarea>
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Маркетинговые материалы' : lang == 'en' ? 'Merketing materials' : 'Маркетингтік материалдар'"
        ></h3>
        <div class="sidebar-market_wrap">
          <div v-for="photo in zonemodel.photos" class="sidebar-passport_photo">
            <img :src="photo['src_' + lang]" />
          </div>




          <div style="clear: both">
          <div class="editpanel_editzone-add">
            <input id="zone_photo_input" type="file" v-on:change="set_photo($event, 'ru')" />
            <span class="editpanel_editzone-lang">RU</span>
          </div>
          <div class="editpanel_editzone-add">
            <input id="zone_photo_input" type="file" v-on:change="set_photo($event, 'kz')" />
            <span class="editpanel_editzone-lang">KZ</span>
          </div>
          <div class="editpanel_editzone-add">
            <input id="zone_photo_input" type="file" v-on:change="set_photo($event, 'en')" />
            <span class="editpanel_editzone-lang">EN</span>
          </div>
          </div>
      
      
      
      
      
      
      
      
      
        </div>
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'en' ? 'Video' : 'Видео'"
        ></h3>
        <div class="sidebar-market_wrap">
          <div v-for="video in zonemodel.videos" class="sidebar-passport_video"></div>
        </div>
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files' : 'Файлдар'"
        ></h3>
        <div class="sidebar-market_file">
          <a v-for="file in zonemodel.files" :href="file['src_' + lang]" target="_blank">
            <div class="sidebar-market_pdf"></div>
            <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
          </a>
        </div>
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
        ></h3>
        <div class="sidebar-passport_padding">
          <textarea style="width: 100%; height: 100px;"
            v-model="zonemodel['contacts_' + lang]">
          </textarea>
        </div>

      </div>

      <div class="editpanel_editzone-tab" slot="tab_1">
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Объем затраченных средств из бюджета на инфраструктуру' : lang == 'en' ? 'Budget infrastructural expenses' : 'Бюджеттен инфрақұрылымға жұмсалған қаражаттар'"
        ></h3>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="zonemodel.budget_need"/>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="zonemodel.budget_allocated"/>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Соотношение свободных и занятых земель' : lang == 'en' ? 'Free and taken land share' : 'Бос және қабылданған жер үлесі'"></p>
        <input type="number" min="0"
          class="editpanel_editzone-tab-input"
          v-model="zonemodel.level"/>
      </div>

      <div class="editpanel_editzone-tab" slot="tab_2">
        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Infrastructure' : 'Инфрақұрылым'"
        ></h3>
        <div
          v-for="infrastructure in zonemodel.infrastructures"
        >
          <p class="editpanel_editzone-tab-input_title" 
            v-text="infrastructure['title_' + lang]"></p>

          <div class="editpanel_editzone-tab-input_subtitle" 
            v-text="'Атрибут'"></div>
          <input class="editpanel_editzone-input" type="text"
            v-model="infrastructure.capacity"/>
          <div class="editpanel_editzone-tab-input_subtitle" 
            v-text="'Единица измерения'"></div>
          <input class="editpanel_editzone-input" type="text"
            v-model="infrastructure.unit"/>
        </div>

        <h3 class="editpanel_editzone-tab-title"
          v-text="lang == 'ru' ? 'Объекты' : lang == 'en' ? 'Objects' : 'Объектілер'"
        ></h3>
        <div
          v-for="object in zonemodel.objects"
        >
          <p class="editpanel_editzone-tab-input_title" 
            v-text="object['title_' + lang]"></p>

          <div class="editpanel_editzone-tab-input_subtitle" 
            v-text="'Атрибут'"></div>
          <input class="editpanel_editzone-input" type="text"
            v-model="object.capacity"/>
          <div class="editpanel_editzone-tab-input_subtitle" 
            v-text="'Единица измерения'"></div>
          <input class="editpanel_editzone-input" type="text"
            v-model="object.unit"/>
        </div>

        <!-- <editmap class="editpanel_editzone-map"/>
        <reset_sector_map />
        <basemaps class="editpanel_editzone-basemaps" :style="{ top: '385px' }"
          v-on:click="set_basemap"/> -->
      </div>
    </tabs>
  </div>
</template>

<style>

  .editpanel_editzone {
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

  .editpanel_editzone-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editzone-tab {
    padding: 0 20px;
  }

  .editpanel_editzone-tab-input {
    width: 150px; 
    height: 25px; 
    border: none; 
    border-bottom: 1px solid #ccc; 
    outline: none;
    font-size: 14px;
    margin: 0 0 30px 0;
  }

  .editpanel_editzone-tab-input_title {
    font-weight: normal;
    font-size: 16px;
    color: #50C7F9;
  }

  .editpanel_editzone-tab-input_subtitle {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editzone-tab-title {
    font-weight: normal;
    font-size: 20px;
    color: #03A0E3;
  }

  .editpanel_editzone-add {
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
  .editpanel_editzone-lang {
    position: absolute;
    top: 0;
    color: #fff;
    left: 5px;
    z-index: 2;
    font-size: 12px;
  }
  .editpanel_editzone-add::before {
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

  .editpanel_editzone-map {
    height: 100%;
    width: 50%;
    right: 0;
    top: 126px
  }

  .editpanel_editzone-input {
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

  .editpanel_editzone-basemaps {
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
