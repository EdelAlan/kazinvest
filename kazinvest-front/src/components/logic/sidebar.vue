<script>
  import piechart from '../ui/piechart';
  import sidebar_header from './sidebar_header';
  import tabs from '../ui/tabs';
  import { mapGetters } from 'vuex';  

  export default {
    components: { 
      piechart,
      tabs,
      sidebar_header,
    },

    computed: mapGetters([
      'sidebar_expanded',
    ]),
  }
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">
    
    <sidebar_header></sidebar_header>

    <div class="sidebar-container">

      <tabs
        :titles_style="{
          'font-size': '14px',
          'padding': '10px',
        }">
        
        <span slot="tab_title_0">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title">Cписок</span>
          </span>
        </span>
        
        <span slot="tab_title_1">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title">Справка</span>
          </span>        
        </span>
        
        <span slot="tab_title_2">
          <span class="sidebar-tab">
            <span class="sidebar-tab_icon"></span>
            <span class="sidebar-tab_title">Показатели</span>
          </span>        
        </span>

        
        <div slot="tab_0">
          <piechart
            :sectors="[
              { key: 'Потребность', val: 43543543 },
              { key: 'Выделено', val: 32321321 },
            ]"
          ></piechart>
        </div>

        <div slot="tab_1">
          <piechart
            :sectors="[
              { key: 'Потребность', val: 3203333 },
              { key: 'Выделено', val: 2321321 },
            ]"
          ></piechart>
        </div>

        <div slot="tab_2">
          <piechart
            :sectors="[
              { key: 'Потребность', val: 3333 },
              { key: 'Выделено', val: 21321 },
            ]"
          ></piechart>
        </div>
        
      </tabs>
         
    </div>
  </div>
</template>


<style scoped>
  .sidebar {
    width: 0;
    position: relative;
    z-index: 99;
    display: inline-flex;
    flex-direction: column;
    height: 100%;
    align-items: flex-end;
    transition: width .5s ease-in-out;
    overflow: hidden;
  }

  .sidebar--expanded {
    width: 330px;
  }

  .sidebar-container {
    width: 320px;
    margin: 5px;
    background: white;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    overflow: auto;
    flex-grow: 1;
  }

</style>
