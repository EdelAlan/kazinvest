<script>
  import { mapGetters, mapActions } from 'vuex';  
  import editpanel_editzone from './editpanel_editzone';  
  import editpanel_editsector from './editpanel_editsector';  

  export default {
    components: {
      editpanel_editzone,
      editpanel_editsector,
    },

    data () {
      return {
        editzone_state: false,
        editsector_state: false,
      }
    },

    computed: mapGetters([
      'zone_sectors',
      'lang',
      'republics',
      'profile',
      'selected_zone',
    ]),

    async mounted () {
      if (this.profile && this.profile.member_role == 'superadmin') {
        await this.set_zones({
          filter: false,
        });
        await this.set_sectors();
        await this.set_investments();
        await this.set_foreign_investments();
        await this.set_production();
        await this.set_number_jobs();
        await this.set_taxes();
        return this.set_zone_sectors();
      } else {
        await this.set_selected_zone(this.profile.member_zone);
        return this.set_sectors(this.profile.member_zone.id);
      }
    },

    methods: mapActions([
      'set_zones',
      'set_sectors',
      'set_selected_zone',
      'set_zone_sectors',
      'collapse_zone_sectors',
      'set_edited_zone',
      'set_edited_sector',
      'set_investments',
      'set_foreign_investments',
      'set_production',
      'set_number_jobs',
      'set_taxes',
    ]),

  }
</script>


<template>
  <div class="editpanel_sectorstable">

    <editpanel_editzone v-if="editzone_state" />
    <editpanel_editsector v-if="editsector_state" />

    <div v-if="!editzone_state && !editsector_state" class="editpanel_sectorstable-zones">

      <div v-for="zone in zone_sectors" class="editpanel_sectorstable-item">
        <h2 class="editpanel_sectorstable-header_title" 
          v-text="zone['title_' + lang]"></h2>
        <button class="editpanel_sectorstable-zone_edit" 
          v-on:click="
            set_edited_zone(zone),
            editzone_state = true
          "
        ></button>

        <button class="editpanel_sectorstable-collape"
          v-on:click="collapse_zone_sectors(zone.id)"
        ></button>


        <template
          v-if="!zone.collapsed">
          <div class="editpanel_sectorstable-table_header">
            <div v-text="lang == 'ru' ? 'Название' : lang == 'en' ? 'Title' : 'Атауы'" class="editpanel_sectorstable-table_header_item"></div>
            <div v-text="lang == 'ru' ? 'Статус' : lang == 'en' ? 'Status' : 'Мәртебе'" class="editpanel_sectorstable-table_header_item"></div>
            <div v-text="lang == 'ru' ? 'Срок реализации' : lang == 'en' ? 'Implementation period' : 'Іске асыру мерзімі'" class="editpanel_sectorstable-table_header_item"></div>
          </div>
      
          <div class="editpanel_sectorstable-sectors"
            v-for="sector in zone.sectors">
            <div class="editpanel_sectorstable-sector">
              <div class="editpanel_sectorstable-sector_item">
                <button class="editpanel_sectorstable-sector_item_edit"
                  v-on:click="
                    set_edited_sector(sector),
                    editsector_state = true
                  "
                ></button>
                <span class="editpanel_sectorstable-sector_item_title editpanel_sectorstable-sector_item_title--leftpd" 
                  :title="sector['title_' + lang]"
                  v-text="sector['title_' + lang]"></span>
              </div>
              <div class="editpanel_sectorstable-sector_item">
                <span class="editpanel_sectorstable-sector_item_title" 
                  :title="sector['project_type_title_' + lang]"
                  v-text="sector['project_type_title_' + lang]"></span>
              </div>
              <div class="editpanel_sectorstable-sector_item">
                <span class="editpanel_sectorstable-sector_item_title" 
                  :title="sector.project_date"
                  v-text="sector.project_date"></span>
              </div>
            </div>
          </div>
        </template>

      </div>
    </div>
    
  </div>
</template>

<style>
  .editpanel_sectorstable {}
  .editpanel_sectorstable-zones {
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
  .editpanel_sectorstable-sectors {
  }
  .editpanel_sectorstable-item {
    border-top: 1px solid #eee;
    position: relative;
  }
  .editpanel_sectorstable-table_header {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .editpanel_sectorstable-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding-left: 20px;
  }
  .editpanel_sectorstable-table_header_item {
    flex: 1;
    padding: 13px 20px;
    color: #aaa;
    font-size: 12px;
  }
  .editpanel_sectorstable-sector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    font-size: 14px;
  }
  .editpanel_sectorstable-sector_item {
    position: relative;
    flex: 1;
    padding: 15px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editpanel_sectorstable-sector_item_edit {
    text-overflow: ellipsis;
    position: absolute;
    width: 25px;
    top: 14px;
    height: 25px;
    background-color: #fff;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    background-image: url("../../assets/images/pencil.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  .editpanel_sectorstable-zone_edit {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 60px;
    background-color: #fff;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    background-image: url("../../assets/images/pencil.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  .editpanel_sectorstable-zone_edit:hover {
    background-color: #f1f1f1;
  }
  .editpanel_sectorstable-collape {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 20px;
    top: 10px;
    border-radius: 50%;
    border: none;
    background: none;
    outline: none;
    cursor: pointer;
  }
  .editpanel_sectorstable-collape:hover {
    background: #f1f1f1;
  }
  .editpanel_sectorstable-collape::after {
    content: '';   
    width: 15px;
    height: 10px;
    background-repeat: no-repeat;
    pointer-events: none;
    position: absolute;
    top: 16px;
    transform: translate(-50%, -50%);
    background-size: contain;
    background-image: url('../../assets/images/carret.svg');
  }
  .editpanel_sectorstable-sector_item_title--leftpd {
    padding-left: 45px;
  }
</style>
