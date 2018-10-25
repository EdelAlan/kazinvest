<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: {
    },

    computed: mapGetters([
      'sectors',
      'lang',
      'republics',
      'profile',
      'selected_zone',
    ]),

    methods: mapActions([
    ]),

  }
</script>


<template>
  <div class="editpanel_sectorstable">
    <div class="editpanel_sectorstable-header">
      <h2 class="editpanel_sectorstable-header_title" v-text="selected_zone ? selected_zone['title_' + lang] : 'Все зоны'"></h2>
    </div>
    <div class="editpanel_sectorstable-table">
      <div class="editpanel_sectorstable-table_header">
        <div v-text="'Название'" class="editpanel_sectorstable-table_header_item"></div>
        <div v-text="'Статус'" class="editpanel_sectorstable-table_header_item"></div>
        <div v-text="'Срок реализации'" class="editpanel_sectorstable-table_header_item"></div>
      </div>
    </div>
    <div class="editpanel_sectorstable-sectors">
      <div class="editpanel_sectorstable-sector"
        v-for="sector in sectors">
        <div class="editpanel_sectorstable-sector_item">
          <button class="editpanel_sectorstable-sector_item_edit"></button>
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
  </div>
</template>

<style>
  .editpanel_sectorstable {
    position: absolute;
    z-index: 10;
    width: 100%;
    background: #fff;
    margin: 30px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
  }
  .editpanel_sectorstable-sectors {
    overflow-y: auto;
    padding: 0;
    height: calc(100vh - 150px);
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
  .editpanel_sectorstable-sector_item_title--leftpd {
    padding-left: 45px;
  }
</style>
