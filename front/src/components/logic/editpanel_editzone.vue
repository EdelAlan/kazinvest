<script>
  import { mapGetters, mapActions } from 'vuex';  
  import tabs from '../ui/tabs';  

  export default {
    components: {
      tabs,
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_zone',
    ]),

    methods: mapActions([
    ]),

  }
</script>


<template>
  <div class="editpanel_editzone">

    <h2 class="editpanel_editzone-title" v-text="edited_zone['title_' + lang]"></h2>

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

          <div slot="tab_0">
          0
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
 
</style>
