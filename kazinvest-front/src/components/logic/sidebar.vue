<script>
  import piechart from '../ui/piechart';
  import sidebar_header from './sidebar_header';
  import treenode from '../ui/treenode';
  import tabs from '../ui/tabs';
  import { mapGetters } from 'vuex';  

  export default {
    components: { 
      piechart,
      tabs,
      sidebar_header,
      treenode,
    },

    computed: mapGetters([
      'sidebar_expanded',
    ]),
  }
</script>


<template>
  <div class="sidebar" 
    :class="{'sidebar--expanded': sidebar_expanded}">
    
    <div class="sidebar-section">
      <sidebar_header></sidebar_header>
    </div>

    <div class="sidebar-section">
      <treenode
        :model="{
          name: 'Земельные участки',
          children: [{
            name: 'Объекты',
            children: [{ 
              name: 'hello' 
            },{ 
              name: 'wat',
            }],
          }],
        }"
      ></treenode>
    </div>


    <div class="sidebar-section">

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


<style>
  .sidebar {
    position: absolute;
    left: -320px;
    z-index: 10;
    height: 100vh;
    overflow: scroll;
    transition: all .5s ease-in-out;
    width: 320px;
  }

  .sidebar--expanded {
    left: 0;
  }

  .sidebar-section {
    background: #fff;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    margin: 0 5px 5px 5px;
  }

  .sidebar-section:first-child {
    margin-top: 5px;
  }

</style>
