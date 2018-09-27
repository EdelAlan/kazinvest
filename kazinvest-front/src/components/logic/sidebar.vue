<script>
  import piechart from '../ui/piechart';
  import lang from './lang';
  import tabs from '../ui/tabs';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: { 
      piechart,
      lang,
      tabs,
    },

    computed: mapGetters([
      'sidebar',
    ]),

    methods: mapActions([
      'toggle_sidebar',
    ])
  }
</script>


<template>
  <div class="sidebar" :class="{'sidebar--expanded': sidebar}">
    
    
    <div class="filter">
      <div class="filter_header">
        <div class="logo"></div>
        <lang></lang>
      </div>
      <div class="filter_body">
        <input type="text" class="search" placeholder="Область, название СЭЗ / ИЗ, объект">
        <select class="category">
          <option value="">СЭЗ, ИЗ</option>
        </select>
        <select class="industry">
          <option value="">Отрасли</option>
        </select>
        <input type="text" class="territory">
        <div class="collapse" v-on:click="toggle_sidebar">Свернуть</div>
        <button class="find">Найти</button>
      </div>
    </div>




    <div class="container">

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

  .sidebar > * {
    flex-shrink: 0;
  }

  .filter,
  .container,
  .legend {
    width: 320px;
    margin: 5px;
  }

  .filter {
    background: #03A0E3;
    border-radius: 3px;
    overflow: hidden;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }

  .filter_header {
    padding: 5px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }

  .logo {
    height: 50px;
    width: 90px;
    margin: 5px;
    background: url(../../assets/images/logo.svg) no-repeat center;
    background-size: cover;
  }

  .filter_body {
    padding: 10px 5px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
  }

  .filter_body > * {
    margin-bottom: 5px;
  }

  input, select {
    background: white;
    border: 1px solid #fff;
    display: inline-block;
    line-height: 13px;
    font-size: 14px;
    font-weight: normal;
    border-radius: 3px;
    padding: 10px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
  }

  input:focus,
  input:active,
  select:focus,
  select:active {
    outline: none;
  }

  .search,
  .territory {
    width: 100%;
  }

  .territory {
    display: none;
  }

  .category,
  .industry {
    width: calc(50% - 5px);
  }

  .collapse,
  .find {
    font-size: 14px;
    color: #fff;
    margin-bottom: 0;
    cursor: pointer;
  }

  .find {
    padding: 5px 20px;
    background: #F7B06F;
    border-radius: 3px;
    border: none;
  }

  .legend_wrapper {
    max-height: 1000px;
    overflow: hidden;
  }

  .legend,
  .container {
    background: white;
    border-radius: 3px;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
  }

  .container {
    overflow: auto;
    flex-grow: 1;
  }

</style>
