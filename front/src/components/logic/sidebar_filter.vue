<script>
  import lang from './lang';
  import filter_checker from './filter_checker';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: { 
      lang,
      filter_checker,
    },
    computed: mapGetters([
      'sidebar',
      'zone_filter',
      'industries_filter',
      'lang',
    ]),

    methods: mapActions([
      'toggle_sidebar',

      'set_zone_filter',
      'set_industries_filter',
      
      'set_industries',
      'set_republics',
      'set_search_string',
      
      'set_level_b',
    ]),

    mounted () {
      this.set_industries();
      this.set_republics();
    },

  }
</script>

<template>
  <div class="sidebar_filter">

    <div class="sidebar_filter-container">
      <input type="text" 
        class="sidebar_filter-input sidebar_filter-input--search"
        @input="set_search_string" 
        :placeholder="{
          'title_ru': 'СЭЗ, ИЗ', 
          'title_kz': 'СЭЗ, ИЗ', 
          'title_en': 'SEZ, IZ'
        }['title_' + lang]"
      />
      

      <div class="sidebar_filter-filter">
        <filter_checker
          :list="zone_filter"
          :title="{
            'title_ru': 'СЭЗ, ИЗ', 
            'title_kz': 'СЭЗ, ИЗ', 
            'title_en': 'SEZ, IZ'
          }"
          v-on:select="set_zone_filter"
          :styles="{
            'border': '1px solid #fff',
            'border-radius': '3px',
            'height': '40px',
            'font-size': '14px',
            'padding': '10px',
            'line-height': '18px'
          }"
        />
      </div>

      <div class="sidebar_filter-filter">
        <filter_checker
          :list="industries_filter"
          :title="{
            'title_ru': 'Отрасли', 
            'title_kz': 'Салалары', 
            'title_en': 'Industries'
          }"
          v-on:select="set_industries_filter"
          :styles="{
            'border': '1px solid #fff',
            'border-radius': '3px',
            'height': '40px',
            'font-size': '14px',
            'padding': '10px',
            'line-height': '18px'
          }"
        />
      </div>
     

      <!-- ошибка дизайна, тоглить сайдбар лучше в sidebar_header -->
      <div class="sidebar_filter-collapse" 
        @click="toggle_sidebar">Свернуть</div>

      <button class="sidebar_filter-find"
        @click="set_level_b({
          id: 1,
          // для первого уровня прописывать тайтлы не обязательно
        })"
        v-text="{
          'title_ru': 'Найти', 
          'title_kz': 'Іздеу', 
          'title_en': 'Find'
        }['title_' + lang]"
      ></button>
      
    </div>

  </div>
</template>


<style>

  .sidebar_filter-filter {
    width: calc(50% - 5px);
    margin-bottom: 5px;
  }

  .sidebar_filter-container {
    padding: 10px 5px 5px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;

  }

  .sidebar_filter-input {
    background: white;
    border: 1px solid #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    border-radius: 3px;
    padding: 10px;
    margin-bottom: 5px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
  }

  .sidebar_filter-input--search {
    width: 100%;
  }

  .sidebar_filter-collapse {
    font-size: 14px;
    color: #fff;
    cursor: pointer;
  }

  .sidebar_filter-find {
    padding: 5px 20px;
    background: #F7B06F;
    border-radius: 3px;
    border: none;
    margin-bottom: 0;
    color: #fff;
  }

</style>
