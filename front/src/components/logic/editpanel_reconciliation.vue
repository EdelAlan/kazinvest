<script>
  import { mapGetters, mapActions } from 'vuex';  
  import editpanel_editzone_reconciliation from './editpanel_editzone_reconciliation';
  import editpanel_editsector_reconciliation from './editpanel_editsector_reconciliation';
  import editpanel_editinf_reconciliation from './editpanel_editinf_reconciliation';

  export default {
    components: {
      editpanel_editzone_reconciliation,
      editpanel_editsector_reconciliation,
      editpanel_editinf_reconciliation,
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
    ]),

    async mounted () {
      await this.set_new_data();
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
      ]),

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
            await this.set_zone(JSON.parse(data.model).zone_id);
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
    }

  }
</script>


<template>
  <div class="editpanel_reconciliation">

    <editpanel_editzone_reconciliation 
      v-if="editzone_state"
      :style="{ margin: '60px 30px 30px 30px'}"
    />
    <editpanel_editsector_reconciliation 
      v-if="editsector_state"
      :style="{ margin: '60px 30px 30px 30px'}"
    />
    <editpanel_editinf_reconciliation v-if="editinf_state" />

    <div v-if="!editzone_state && !editsector_state && !editinf_state" class="editpanel_reconciliation-list">
      <div v-for="data in new_data" class="editpanel_reconciliation-item">
        <h2 class="editpanel_reconciliation-header_title" 
          v-text="data.type == 'zone' ? (JSON.parse(data.model)['zone_title_'+lang]) : data.type == 'sector' ? (JSON.parse(data.model)['zone_title_'+lang] + ', ' + JSON.parse(data.model)['title_'+lang]) : JSON.parse(data.model)['zone_title_'+lang] + ', ' + JSON.parse(data.model)['title_'+lang]"></h2>
        <span class="editpanel_reconciliation-date" v-text="data.member_firstname + ' ' 
        + data.member_lastname + 
        ' (' + data.member_id + ') ' + data.timestamp.replace('T', ' ').slice(0, 19)"></span>
        <button class="editpanel_reconciliation-edit" 
          v-on:click="edit_state(data)"
        ></button>
      </div>
    </div>
    
  </div>
</template>

<style>
  .editpanel_reconciliation-list {
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
  .editpanel_reconciliation-item {
    height: 70px;
    border-top: 1px solid #eee;
    position: relative;
  }
  .editpanel_reconciliation-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding-left: 20px;
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
