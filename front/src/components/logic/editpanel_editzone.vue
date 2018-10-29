<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  

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
          contacts_ru: null,
          contacts_kz: null,
          contacts_en: null,
          files: null,
          videos: null,
          photos: null,

          // alan объявить поле для показателей
        },
      }
    },

    components: {
      tabs,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_zone',
    ]),

    methods: {
      ...mapActions([
        'update_zone',
      ]),
    },

    mounted () {
      console.log(this.edited_zone)
      Object.keys(this.zonemodel).forEach(it => {
        this.zonemodel[it] = this.edited_zone[it];
      });
    }
  }
</script>


<template>
  <div class="editpanel_editzone">

    <h2 class="editpanel_editzone-title" v-text="zonemodel['title_' + lang]"></h2>
    <button v-on:click="update_zone(zonemodel)">Сохранить</button>

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
            v-text="lang == 'ru' ? 'Справочная информация' : lang == 'en' ? 'Справочная информация': 'Справочная информация'"
          ></span>
        </span>
      </span>

      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Цифровые показатели' : lang == 'en' ? 'Цифровые показатели': 'Цифровые показатели'"
          ></span>
        </span>        
      </span>
      
      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Диаграммы' : lang == 'en' ? 'Диаграммы': 'Диаграммы'"
          ></span>
        </span>        
      </span>
      
      <span slot="tab_title_3">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Инфраструктура': 'Инфраструктура'"
          ></span>
        </span>        
      </span>















      <div class="editpanel_editzone-tab" slot="tab_0">
        <h3>Описание</h3>
        <textarea style="width: 100%; height: 100px;"
          v-model="zonemodel['description_' + lang]">
        </textarea>
        <h3>Маркетинговые материалы</h3>
        <div class="sidebar-market_wrap">
          <div v-for="photo in zonemodel.photos" class="sidebar-passport_photo">
            <img :src="photo['src_' + lang]" />
          </div>
        </div>
        <h3>Видео</h3>
        <div class="sidebar-market_wrap">
          <div v-for="video in zonemodel.videos" class="sidebar-passport_video"></div>
        </div>
        <h3>Файлы</h3>
        <div class="sidebar-market_file">
          <a v-for="file in zonemodel.files" :href="file['src_' + lang]" target="_blank">
            <div class="sidebar-market_pdf"></div>
            <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
          </a>
        </div>
        <h3>Контакты</h3>
        <div class="sidebar-passport_padding">
          <textarea style="width: 100%; height: 100px;"
            v-model="zonemodel['contacts_' + lang]">
          </textarea>
        </div>

      </div>

      <div slot="tab_1">
      1
      </div>
      <div slot="tab_2">
      2
      </div>
      <div slot="tab_3">
      3
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
 
</style>
