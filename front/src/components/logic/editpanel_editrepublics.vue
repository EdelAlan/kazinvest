<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  
  import filebase64 from '../../util/filebase64';

  export default {
    data () {
      return {
        sezmodel: {
          advantages_en: null,
          advantages_kz: null,
          advantages_ru: null,
          allocated: null,
          common_en: null,
          common_kz: null,
          common_ru: null,
          contacts_en: null,
          contacts_kz: null,
          contacts_ru: null,
          demand: null,
          files: null,
          id: null,
          photos: null,
          title_en: null,
          title_kz: null,
          title_ru: null,
          type: null,
          videos: null,
        },

        izmodel: {
          advantages_en: null,
          advantages_kz: null,
          advantages_ru: null,
          allocated: null,
          common_en: null,
          common_kz: null,
          common_ru: null,
          contacts_en: null,
          contacts_kz: null,
          contacts_ru: null,
          demand: null,
          files: null,
          id: null,
          photos: null,
          title_en: null,
          title_kz: null,
          title_ru: null,
          type: null,
          videos: null,
        },

        adilet: null,

      }
    },

    components: {
      tabs,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'republics',
      'links_adilet',
    ]),

    methods: {
      ...mapActions([
        'set_republics',
        'set_links_adilet',
        'update_republic',
        'update_links_adilet',
        'update_contacts',
      ]),

    },


    async mounted () {
      await this.set_republics({query: 'rep'});
      await this.set_links_adilet();
      this.adilet = this.links_adilet;
      this.sezmodel = this.republics.filter(it => it.id == 1)[0];
      this.izmodel = this.republics.filter(it => it.id == 2)[0];
    }

  }
</script>


<template>
  <div class="editpanel_editrepublics">

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
            v-text="lang == 'ru' ? 'СЭЗ РК' : lang == 'en' ? 'SEZ RK': 'АЭА ҚР'"
          ></span>
        </span>
      </span>
      
      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'ИЗ РК' : lang == 'en' ? 'IZ RK': 'ИА ҚР'"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="{
              'title_ru': 'Общие положения СЭЗ/ИЗ РК',
              'title_kz': 'Жалпы ережелер ИЗ/СЭЗ ҚР',
              'title_en': 'General provisions of IZ/SEZ RK',
            }['title_' + lang]"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_3">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="{
              'title_ru': 'Контакты АО «НК «KAZAKH INVEST»',
              'title_kz': 'JSC «НК «KAZAKH INVEST» contacts',
              'title_en': 'АҚ «НК «KAZAKH INVEST» байланыстары',
            }['title_' + lang]"
          ></span>
        </span>        
      </span>
      



      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_0">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_republic(sezmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editzone_reconciliation-tab-title" 
          v-text="{
            'title_ru': 'Преимущества', 
            'title_kz': 'Benefits',
            'title_en': 'Артықшылық',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="sezmodel['advantages_' + lang]" />

        <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="{
            'title_ru': 'Описание',
            'title_kz': 'Description',
            'title_en': 'Сипаттама',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="sezmodel['common_' + lang]" />
        
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="sezmodel.demand"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="sezmodel.allocated"/>

        <!-- <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="{
            'title_ru': 'Маркетинговые материалы',
            'title_kz': 'Marketing materials',
            'title_en': 'Маркетингтік материалдар',
          }['title_' + lang]"
        ></h3>
        <div>
          <h2 v-if="sezmodel.photos.length"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="sezmodel.photos.length"
            <div v-for="photo in sezmodel.photos">
              <img :src="photo['src_' + lang]"/>            
            </div>          
          </div>
          <h2 v-if="sezmodel.videos.length"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="sezmodel.videos.length">
            <div v-for="video in sezmodel.videos">
            </div>
          </div>
          <h2 v-if="sezmodel.files.length"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div 
            v-if="sezmodel.files.length"
            v-for="file in sezmodel.files"
          >
          </div>
        </div> -->


      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_1">
        
        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_republic(izmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editzone_reconciliation-tab-title" 
          v-text="{
            'title_ru': 'Преимущества', 
            'title_kz': 'Benefits',
            'title_en': 'Артықшылық',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="izmodel['advantages_' + lang]" />

        <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="{
            'title_ru': 'Описание',
            'title_kz': 'Description',
            'title_en': 'Сипаттама',
          }['title_' + lang]"
        ></h3>
        <wysiwyg v-model="izmodel['common_' + lang]" />

        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="izmodel.demand"/>
        <p class="editpanel_editzone_reconciliation-tab-title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input class="editpanel_editzone-input" type="number" min="0"
          v-model="izmodel.allocated"/>

        <!-- <h3 class="editpanel_editzone_reconciliation-tab-title"
           v-text="{
            'title_ru': 'Маркетинговые материалы',
            'title_kz': 'Marketing materials',
            'title_en': 'Маркетингтік материалдар',
          }['title_' + lang]"
        ></h3>
        <div>
          <h2 v-if="izmodel.photos.length"
            v-text="lang == 'ru' ? 'Фото' : lang == 'en' ? 'Photo': 'Сурет'"
          ></h2>
          <div v-if="izmodel.photos.length"
            <div v-for="photo in izmodel.photos">
              <img :src="photo['src_' + lang]"/>            
            </div>          
          </div>
          <h2 v-if="izmodel.videos.length"
            v-text="lang == 'ru' ? 'Видео' : lang == 'en' ? 'Video': 'Бейне сурет'"
          ></h2>
          <div v-if="izmodel.videos.length">
            <div v-for="video in izmodel.videos">
            </div>
          </div>
          <h2 v-if="izmodel.files.length"
            v-text="lang == 'ru' ? 'Файлы' : lang == 'en' ? 'Files': 'Файлдар'"
          ></h2>
          <div 
            v-if="izmodel.files.length"
            v-for="file in izmodel.files"
          >
          </div>
        </div> -->


      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_2">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_links_adilet(adilet)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>

        <div
          v-for="item in adilet"
        >

          <h3 
            class="editpanel_editsector_reconciliation-tit"
            v-text="{
              'title_ru': 'Ссылка ' + item.id, 
              'title_kz': 'Сілтеме ' + item.id,
              'title_en': 'Link ' + item.id,
            }['title_' + lang]">
          </h3>
          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="{
              'title_ru': 'Ссылка на портал', 
              'title_kz': 'Порталға сілтеме',
              'title_en': 'Link to the portal',
            }['title_' + lang]"
          ></p>
          <input 
            class="editpanel_editzone-input"
            v-model="item['link_' + lang]" />

          <p class="editpanel_editzone_reconciliation-tab-title" 
            v-text="{
              'title_ru': 'Заголовок', 
              'title_kz': 'Тақырып',
              'title_en': 'Headline',
            }['title_' + lang]"
          ></p>
          <input 
            class="editpanel_editzone-input"
            v-model="item['text_' + lang]" />

          <p class="editpanel_editzone_reconciliation-tab-title"
            v-text="{
              'title_ru': 'Описание',
              'title_kz': 'Description',
              'title_en': 'Сипаттама',
            }['title_' + lang]"
          ></p>
          <textarea
            class="editpanel_editzone-input"
            v-model="item['subtext_' + lang]" />
        </div>

      </div>

      <div class="editpanel_editrepublics-tab editpanel_editrepublics-container" slot="tab_3">

        <div class="editpanel_editzone_reconciliation-buttons"
          :style="{ top: '40px' }"
        >
          <button class="editpanel_editzone_reconciliation-button" v-on:click="update_contacts(sezmodel)" 
            v-text="lang == 'ru' ? 'Сохранить' : lang == 'en' ? 'Save' : 'Cақтау'"
          ></button>
        </div>
      
        <h3 class="editpanel_editzone_reconciliation-tab-title"
          v-text="lang == 'ru' ? 'Контакты' : lang == 'en' ? 'Contacts' : 'Байланыс'"
        ></h3>
        <wysiwyg v-model="sezmodel['contacts_' + lang]" />

      </div>

    </tabs>
  </div>
</template>

<style>

  .left-col-inf {
    width: 100%;
    bottom: 0;
  }

  .map-container-inf {
    position: absolute;
    top: 103px;
    right: 0;
    bottom: 250px;
    background: #eee;
    width: 100%;
  }

  .editpanel_editrepublics {
    position: absolute;
    z-index: 10;
    width: calc(100% - 60px);
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    padding: 0;
    margin: 30px;
  }

  .editpanel_editrepublics-container {
    padding: 0 20px 20px 20px;
    border-top: 1px solid #eee;
    overflow-y: auto;
    height: calc(100vh - 165px);
  }

  .editpanel_editrepublics-title {
    font-size: 18px;
    color: #555;
    font-weight: normal;
    padding: 20px;
    margin: 0;
  }

  .editpanel_editrepublics-tab {
    padding: 0 20px;
  }

  .editpanel_editrepublics-tab-input_subtitle {
    font-weight: normal;
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editrepublics-add {
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
  .editpanel_editrepublics-lang {
    position: absolute;
    top: 0;
    color: #fff;
    left: 5px;
    z-index: 2;
    font-size: 12px;
  }
  .editpanel_editrepublics-add::before {
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

  .editpanel_editrepublics-map {
    right: 0;
    left: 0;
    top: 0;
    bottom: 0;
  }

  .mapboxgl-canvas {
    height: 100%;
    width: 100%;
  }

  .editpanel_editrepublics-input {
    border: none;
    font-size: 13px;
    outline: none;
    border-bottom: 2px solid #50C7F9;
    width: 100%;
  }

  .editpanel_editrepublics-basemaps {
    z-index: 100;
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

  .editpanel_editzone_reconciliation-tab-title-active:hover {
    text-decoration: underline;
    cursor: pointer;
  }
 
</style>
