<script>
  import piechart from '../ui/piechart';
  import sidebar_header from './sidebar_header';
  import treenode from '../ui/treenode';
  import tabs from '../ui/tabs';
  import passport from './passport';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: { 
      piechart,
      tabs,
      sidebar_header,
      treenode,
      passport,
    },

    computed: mapGetters([
      'sidebar_expanded',
      'zones',
      'sectors',
      'selected_sector',
      'sector_passport',
    ]),

    methods: mapActions([
      'set_zones',
      'set_sectors',
      'set_selected_sector',
      'set_level_b',
      'change_ui_visibility',
    ]),

    mounted () {
      this.set_zones();
    },
  }
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">
    
    <div class="sidebar-header">
      <sidebar_header></sidebar_header>
    </div>

    <passport class="sidebar-passport"
      v-if="sector_passport"></passport>

    <div class="sidebar-scroll_section">
    <!--
      <div class="sidebar-section">
        <treenode
          :model="{
            name: 'Земельные участки',
            children: [{
              name: 'Объекты',
              children: [{ 
                name: 'hello',
                selected: true,
                color: 'orange',
              },{ 
                name: 'wat',
                selected: false,
                color: 'blue',
              }],
            }],
          }"
        ></treenode>
      </div>
      -->


      <div class="sidebar-section">

        <tabs
          :titles_style="{
            'font-size': '14px',
            'padding': '10px',
          }">
          
          <span slot="tab_title_0">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Справка</span>
            </span>
          </span>
          
          <span slot="tab_title_1">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Cписок</span>
            </span>        
          </span>
          
          <!--

          <span slot="tab_title_2">
            <span class="sidebar-tab">
              <span class="sidebar-tab_icon"></span>
              <span class="sidebar-tab_title">Показатели</span>
            </span>        
          </span>
          -->
   <!-- set_level_b({ 
                  id: 2,
                  name: { ru: zone.title_ru }
                })-->
          <div slot="tab_0">
            <piechart
                :sectors="[
                  { key: 'Потребность', val: 3203333 },
                  { key: 'Выделено', val: 2321321 },
                ]"
              ></piechart>
            </div>

          <div slot="tab_1">
         
            <div class="sidebar-item"
              v-for="zone in zones"
              v-if="sectors.length == 0"
              @click="set_sectors(zone)">
              <span class="sidebar-item_title"v-text="zone.title_ru"></span>
              <span class="sidebar-item_count"v-text="zone.object_count + ' объектов'"></span>
            </div>

            <div class="sidebar-item"
              v-if="sectors.length > 0"
              v-for="sector in sectors"
              :class="{ 'sidebar-item--active': selected_sector && selected_sector.id == sector.id  }"
              @click="
                set_selected_sector(sector),
                change_ui_visibility({
                  ui_component: 'sector_passport',
                  ui_component_state: true,
                })
              ">
              <span class="sidebar-item_title"v-text="sector.title_ru"></span>
              <span class="sidebar-item_count"v-text="sector.title_project_ru"></span>
            </div>
          </div>
          
        </tabs>
      </div>
    </div>
  </div>
</template>


<style>
  .sidebar {
    position: absolute;
    z-index: 10;
    width: 320px;
    height: 100vh;
  }
  .sidebar-scroll_section {
    height: calc(100vh - 210px);
    overflow-y: scroll;
    margin-top: 5px;
  }
  .sidebar-passport {
    position: absolute;
    left: 330px;
    top: 60px;
  }
  .sidebar-header {
    margin: 5px 5px 0 5px;
    border-radius: 3px;
  }
  .sidebar-section {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    margin: 0 5px 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }
  .sidebar-item {
    border-bottom: 1px solid #eee;
    padding: 10px;
    transition: all 200ms;
    cursor: pointer;
  }
  .sidebar-item:hover {
    background: #f5f5f5;
  }
  .sidebar-item_title {
    font-size: 18px;
    color: #03A0E3;
  }
  .sidebar-item_count {
    font-size: 14px;
    margin-top: 5px;
    color: #888;
    display: block;
  }
  .sidebar-item--active {
    background: #50C7F9;
  }
  .sidebar-item--active .sidebar-item_title {
    color: #fff;
  }
  .sidebar-item--active .sidebar-item_count {
    color: #fff;
  }
  .sidebar-item--active:hover {
    background: #50C7F9;
  }
</style>
