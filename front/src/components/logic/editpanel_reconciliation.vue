<script>
  import { mapGetters, mapActions } from 'vuex';  
  import editpanel_editzone_reconciliation from './editpanel_editzone_reconciliation';
  import editpanel_editsector_reconciliation from './editpanel_editsector_reconciliation';
  import editpanel_editinf_reconciliation from './editpanel_editinf_reconciliation';
  import tabs from '../ui/tabs';

  export default {
    components: {
      editpanel_editzone_reconciliation,
      editpanel_editsector_reconciliation,
      editpanel_editinf_reconciliation,
      tabs,
    },

    data () {
      return {
        editzone_state: false,
        editsector_state: false,
        editinf_state: false,
      }
    },

    computed: mapGetters([
      'new_data',
      'edited_sector',
      'edited_zone',
      'edited_inf',
      'zones',
      'lang',
      'crumbs_admin',
      'selected_tab',
    ]),

    async mounted () {
    },

    methods: {
      ...mapActions([
        'set_new_data',
        'collapse_zone_sectors',
        'set_edited_zone',
        'set_edited_sector',
        'set_edited_inf',
        'set_zone',
        'set_infrastructures_list',
        'set_objects_list',
        'set_infrastructures',
        'set_objects',
        'set_crumbs_admin',
        'set_selected_tab',
      ]),

      select_tab() {
        this.editzone_state = false;
        this.editsector_state = false;
        this.editinf_state = false;
      },

      async edit_state(data) {
        switch(data.type) {
          case 'zone':
            this.set_edited_zone(data);
            this.editzone_state = true;
            this.set_crumbs_admin([this.crumbs_admin[0],{
              level: 2,
              title_ru: 'Согласование зоны',
              title_kz: 'Аймақты салыстырып тексеру',
              title_en: 'Zone reconciliation',
            }]);
          break;
          case 'sector':
            this.set_edited_sector(data);
            this.editsector_state = true;
            this.set_crumbs_admin([this.crumbs_admin[0],{
              level: 2,
              title_ru: 'Согласование сектора',
              title_kz: 'Секторды салыстырып тексеру',
              title_en: 'Sector reconciliation',
            }]);
          break;
          case 'inf':
            this.set_edited_inf(data);
            await this.set_zone(data.new_data.zone_id);
            this.set_edited_zone(this.zones[0]);
            this.set_infrastructures_list();
            this.set_objects_list();
            this.set_infrastructures();
            this.set_objects();
            this.editinf_state = true;
            this.set_crumbs_admin([this.crumbs_admin[0],{
              level: 2,
              title_ru: 'Согласование инфраструктуры',
              title_kz: 'Инфрақұрылымды салыстырып тексеру',
              title_en: 'Infrastructure reconciliation',
            }]);
          break;
        }
      },

      is_rejected() {
        if (!this.edited_zone) {
          this.editzone_state = false;
        }
        if (!this.edited_sector) {
           this.editsector_state = false;
        }
        if (!this.edited_inf) {
          this.editinf_state = false;
        }
      },

    },

    watch: {
      edited_zone: 'is_rejected',
      edited_sector: 'is_rejected',
      edited_inf: 'is_rejected',
      selected_tab: 'select_tab',
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
            v-text="lang == 'ru' ? 'Новые заявки' : lang == 'en' ? 'New requests': 'Жана мәлімдемелер'"
          ></span>
        </span>
      </span>
      
      <span slot="tab_title_1">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="lang == 'ru' ? 'Принятые заявки' : lang == 'en' ? 'Accepted requests': 'Қабылданған мәлімдемелер'"
          ></span>
        </span>        
      </span>

      <span slot="tab_title_2">
        <span class="sidebar-tab">
          <span class="sidebar-tab_icon"></span>
          <span class="sidebar-tab_title"
            v-text="{
              'title_ru': 'Отклоненные заявки',
              'title_kz': 'Қабылданбаған мәлімдемелер',
              'title_en': 'Rejected requests',
            }['title_' + lang]"
          ></span>
        </span>        
      </span>

      <div class="editpanel_reconciliation-container" slot="tab_0">

        <editpanel_editzone_reconciliation 
          v-if="editzone_state"
        />
        <editpanel_editsector_reconciliation 
          v-if="editsector_state"
        />
        <editpanel_editinf_reconciliation v-if="editinf_state" />

        <div v-if="!editzone_state && !editsector_state && !editinf_state" class="editpanel_reconciliation-list">
          <div v-for="data in new_data" class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="data['origin_title_' + lang]"></h2>
            <span class="editpanel_reconciliation-date" v-text="data.member_firstname + ' ' 
            + data.member_lastname + 
            ' (' + data.member_id + ') ' + data.timestamp.replace('T', ' ').slice(0, 19)"></span>
            <button class="editpanel_reconciliation-edit" 
              v-on:click="edit_state(data)"
            ></button>
          </div>
        </div>

      </div>

      <div class="editpanel_reconciliation-container" slot="tab_1">

        <editpanel_editzone_reconciliation 
          v-if="editzone_state"
        />
        <editpanel_editsector_reconciliation 
          v-if="editsector_state"
        />
        <editpanel_editinf_reconciliation v-if="editinf_state" />

        <div v-if="!editzone_state && !editsector_state && !editinf_state" class="editpanel_reconciliation-list">
          <div v-for="data in new_data" class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="data['origin_title_' + lang]"></h2>
            <span class="editpanel_reconciliation-date" v-text="data.member_firstname + ' ' 
            + data.member_lastname + 
            ' (' + data.member_id + ') ' + data.timestamp.replace('T', ' ').slice(0, 19)"></span>
            <button class="editpanel_reconciliation-edit" 
              v-on:click="edit_state(data)"
            ></button>
          </div>
        </div>

      </div>

      <div class="editpanel_reconciliation-container" slot="tab_2">

        <editpanel_editzone_reconciliation 
          v-if="editzone_state"
        />
        <editpanel_editsector_reconciliation 
          v-if="editsector_state"
        />
        <editpanel_editinf_reconciliation v-if="editinf_state" />

        <div v-if="!editzone_state && !editsector_state && !editinf_state" class="editpanel_reconciliation-list">
          <div v-for="data in new_data" class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="data['origin_title_' + lang]"></h2>
            <span class="editpanel_reconciliation-date" v-text="data.member_firstname + ' ' 
            + data.member_lastname + 
            ' (' + data.member_id + ') ' + data.timestamp.replace('T', ' ').slice(0, 19)"></span>
            <button class="editpanel_reconciliation-edit" 
              v-on:click="edit_state(data)"
            ></button>
          </div>
        </div>

      </div>

    </tabs>
    
  </div>
</template>

<style>
  .editpanel_reconciliation-container {
    padding: 0;
    border-top: 1px solid #eee;
    overflow-y: auto;
    height: calc(100vh - 165px);
  }
  /* .editpanel_reconciliation-list {
    background: #fff;
    border-radius: 3px;
    overflow-y: auto;
    top: 60px;
    right: 30px;
    bottom: 30px;
    position: absolute;
    left: 30px;
    z-index: 10;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
  } */
  .editpanel_reconciliation {
    background: #fff;
    border-radius: 3px;
    overflow-y: auto;
  }
  .editpanel_reconciliation-item {
    height: 70px;
    border-top: 1px solid #eee;
    position: relative;
  }
  .editpanel_reconciliation-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding: 0 50px 0 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editpanel_reconciliation-edit {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 20px;
    background-color: #fff;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    background-image: url("../../assets/images/pencil.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  .editpanel_reconciliation-edit:hover {
    background-color: #f1f1f1;
  }
  .editpanel_reconciliation-sector_item_title--leftpd {
    padding-left: 45px;
  }
  .editpanel_reconciliation-date {
    position: absolute;
    top: 41px;
    left: 20px;
    color: #bbb;
    font-size: 12px;
  }
</style>
