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
          budget_allocated: null,
          budget_need: null,
          level: null,
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
      set_photo ({ target: { files }}) {
        this.zonemodel.physic_photos = files[0];
      },
    },

    mounted () {
      Object.keys(this.zonemodel).forEach(it => {
        if (
          it == 'title_ru' || 
          it == 'title_kz' || 
          it == 'title_en'
        ) {
          this.zonemodel[it] = this.edited_zone[it].slice(4);
          return;
        }
        this.zonemodel[it] = this.edited_zone[it];
      });
      this.zonemodel.physic_photos = {
        0: null,
      };
    }
  }
</script>


<template>
  <div class="editpanel_editzone">

    <h2 class="editpanel_editzone-title" v-text="edited_zone['title_' + lang]"></h2>
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
            v-text="lang == 'ru' ? 'Диаграммы' : lang == 'en' ? 'Диаграммы': 'Диаграммы'"
          ></span>
        </span>        
      </span>
      
      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Инфраструктура' : lang == 'en' ? 'Инфраструктура': 'Инфраструктура'"
          ></span>
        </span>        
      </span>















      <div class="editpanel_editzone-tab" slot="tab_0">
        <h3 class="editpanel_editsector-tab-title">Название</h3>
        <input
          v-model="zonemodel['title_' + lang]"
        />
        <h3 class="editpanel_editsector-tab-title">Описание</h3>
        <textarea style="width: 100%; height: 100px;"
          v-model="zonemodel['description_' + lang]">
        </textarea>
        <h3 class="editpanel_editsector-tab-title">Маркетинговые материалы</h3>
        <div class="sidebar-market_wrap">
          <div v-for="photo in zonemodel.photos" class="sidebar-passport_photo">
            <img :src="photo['src_' + lang]" />
          </div>
          <input type="file" v-on:change="set_photo" />
        </div>
        <h3 class="editpanel_editsector-tab-title">Видео</h3>
        <div class="sidebar-market_wrap">
          <div v-for="video in zonemodel.videos" class="sidebar-passport_video"></div>
        </div>
        <h3 class="editpanel_editsector-tab-title">Файлы</h3>
        <div class="sidebar-market_file">
          <a v-for="file in zonemodel.files" :href="file['src_' + lang]" target="_blank">
            <div class="sidebar-market_pdf"></div>
            <div class="sidebar-market_pdf_text">{{file['name_' + lang]}}</div>
          </a>
        </div>
        <h3 class="editpanel_editsector-tab-title">Контакты</h3>
        <div class="sidebar-passport_padding">
          <textarea style="width: 100%; height: 100px;"
            v-model="zonemodel['contacts_' + lang]">
          </textarea>
        </div>

      </div>

      <div class="editpanel_editzone-tab" slot="tab_1">
        <h3 class="editpanel_editsector-tab-title">Объем затраченных средств из бюджета на инфаструктуру</h3>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Потребность' : lang == 'en' ? 'Budget need' : 'Мұқтаждық'"></p>
        <input type="number" min="0"
          class="editpanel_editzone-tab-input"
          v-model="zonemodel.budget_need"/>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Выделено' : lang == 'en' ? 'Budget allocated' : 'Белгіленген'"></p>
        <input type="number" min="0"
          class="editpanel_editzone-tab-input"
          v-model="zonemodel.budget_allocated"/>
        <p class="editpanel_editzone-tab-input_title" 
          v-text="lang == 'ru' ? 'Доля выделенного финансирования по отношению к общей сумме финансирования СЭЗ РК' : lang == 'en' ? 'The share of funding allocated in relation to the total amount of financing of the SEZ/IZ of RK' : 'ҚР АЭА/ИА қаржыландырудың жалпы сомасына қатысты бөлінетін қаржыландыру үлесі'"></p>
        <input type="number" min="0"
          class="editpanel_editzone-tab-input"
          v-model="zonemodel.level"/>
      </div>

      <div slot="tab_2">
      2
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
    font-size: 12px;
    color: #747474;
  }

  .editpanel_editsector-tab-title {
    font-weight: normal;
    font-size: 16px;
    color: #03A0E3;
  }
 
</style>
