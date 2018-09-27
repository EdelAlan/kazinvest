<script>
  import piechart from '../ui/piechart';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: { 
      piechart,
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
        <div class="lang_container">
          <a href="#" id="kk" class="lang">KAZ</a>
          <a href="#" id="ru" class="lang">RUS</a>
          <a href="#" id="en" class="lang">ENG</a>
        </div>
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
      <input id="list" name="tab" type="radio" checked>
      <input id="manual" name="tab" type="radio">
      <div class="tab_buttons">
        <label for="list" class="tab_btn">
          <svg class="tab_btn-icon" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16.9993 8.74902H3.67969V10.936H16.9993V8.74902Z" fill="#AEB1BA"/>
            <path d="M16.9993 4.44043H3.67969V6.62741H16.9993V4.44043Z" fill="#AEB1BA"/>
            <path d="M16.9993 0H3.67969V2.18698H16.9993V0Z" fill="#AEB1BA"/>
            <path d="M2.42844 8.81348H0V11.0005H2.42844V8.81348Z" fill="#AEB1BA"/>
            <path d="M2.42844 4.44043H0V6.62741H2.42844V4.44043Z" fill="#AEB1BA"/>
            <path d="M2.42844 0H0V2.18698H2.42844V0Z" fill="#AEB1BA"/>
          </svg>
          <span>Список</span>
        </label>
        <label for="manual" class="tab_btn">
          <svg class="tab_btn-icon" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.50003 0C2.46732 0 0 2.37422 0 5.29253C0 8.84991 4.89908 15.2232 5.1076 15.4928L5.5 16L5.8924 15.4928C6.10095 15.2232 11 8.84991 11 5.2925C11.0001 2.37422 8.53274 0 5.50003 0ZM5.50003 8.44194C3.68676 8.44194 2.21158 7.02238 2.21158 5.27753C2.21158 3.53269 3.68676 2.11313 5.50003 2.11313C7.31331 2.11313 8.78848 3.53266 8.78848 5.27753C8.78848 7.02241 7.31331 8.44194 5.50003 8.44194Z" fill="#AEB1BA"/>
          </svg>
          <span>Справка</span>
        </label>
      </div>
      <div class="tab_wrapper">
        <div class="tab">
          <piechart
            :sectors="[
              { key: 'Потребность', val: 123333 },
              { key: 'Выделено', val: 321321 },
            ]"
          ></piechart>
        </div>
        <div class="tab">

        </div>
      </div>
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

  .lang_container {
    display: flex;
    flex-direction: column;
  }

  .lang {
    color: white;
    text-decoration: none;
  }

  .lang:hover {
    text-decoration: underline;
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

  input[type=radio] {
    display: none;
  }

  .tab_buttons {
    display: flex;
  }

  .tab_btn {
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
    width: 50%;
    height: 50px;
    justify-content: center;
    border-bottom: 1px solid #A3A3A3;
  }

  .tab_btn:first-child {
    border-right: 1px solid #A3A3A3;
  }

  .tab_btn-icon {
    height: 20px;
    width: 20px;
  }

  input[type=radio]:first-of-type:checked ~ .tab_buttons .tab_btn:first-child,
  input[type=radio]:last-of-type:checked ~ .tab_buttons .tab_btn:last-child {
    border-bottom: 3px solid #ff9c40;
  }

  input[type=radio]:first-of-type:checked ~ .tab_buttons .tab_btn:first-child svg path,
  input[type=radio]:last-of-type:checked ~ .tab_buttons .tab_btn:last-child svg path {
    fill: #03A0E3;
  }

  input[type=radio]:first-of-type:checked ~ .tab_wrapper .tab:first-child,
  input[type=radio]:last-of-type:checked ~ .tab_wrapper .tab:last-child {
    display: block;
  }

</style>
