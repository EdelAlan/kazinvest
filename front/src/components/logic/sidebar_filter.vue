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
      'provinces_filter',
      'search_string',
      'lang',
    ]),

    methods: mapActions([
      'toggle_sidebar',

      'set_zone_filter',
      'set_industries_filter',
      'set_provinces_filter',
      
      'set_industries',
      'set_republics',
      'set_search_string',
      
      'set_level_b',
      'set_zones',
    ]),

    async mounted () {
      await this.set_industries({
        query: this.$route.query
      });
    },

  }
</script>

<template>
  <div class="sidebar_filter">

    <div class="sidebar_filter-container">
      <input type="text" 
        class="sidebar_filter-input sidebar_filter-input--search"
        @input="set_search_string" 
        :value="search_string"
        :placeholder="{
          'title_ru': 'Поиск...', 
          'title_kz': 'Іздеу...',
          'title_en': 'Search...', 
        }['title_' + lang]"
      />

      <filter_checker
        style="width: 100%; margin-bottom: 5px"
        :list="provinces_filter"
        :title="{
          'title_ru': provinces_filter.filter(it => it.checked).length == 0 ? 'Регион' : provinces_filter.filter(it => it.checked).length < 10 ? provinces_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'Регион', 
          'title_kz': provinces_filter.filter(it => it.checked).length == 0 ? 'Аймақ' : provinces_filter.filter(it => it.checked).length < 10 ? provinces_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'Аймақ', 
          'title_en': provinces_filter.filter(it => it.checked).length == 0 ? 'District' : provinces_filter.filter(it => it.checked).length < 10 ? provinces_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'District',
        }"
        v-on:select="set_provinces_filter"
        :styles="{
          'border': '1px solid #fff',
          'border-radius': '3px',
          'height': '31px',
          'font-size': '14px',
          'padding': '5px 35px 5px 10px',
          'line-height': '18px'
        }"
      />

      <div class="sidebar_filter-filter">

        <filter_checker
          :list="zone_filter"
          :title="{
            'title_ru': zone_filter.filter(it => it.checked).length < 10 ? zone_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'СЭЗ/ИЗ', 
            'title_kz': zone_filter.filter(it => it.checked).length < 10 ? zone_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'АЭА/ИА', 
            'title_en': zone_filter.filter(it => it.checked).length < 10 ? zone_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'IZ/SEZ',
          }"
          v-on:select="set_zone_filter"
          :styles="{
            'border': '1px solid #fff',
            'border-radius': '3px',
            'height': '31px',
            'font-size': '14px',
            'padding': '5px 35px 5px 10px',
            'line-height': '18px'
          }"
        >
          <div class="sidebar_filter-marker sidebar_filter-marker--green"
            slot="check_img_0"></div>
          <div class="sidebar_filter-marker sidebar_filter-marker--orange"
            slot="check_img_1"></div>
        </filter_checker>
      </div>

      <div class="sidebar_filter-filter">
        <filter_checker
          :list="industries_filter"
          :title="{
            'title_ru': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'Отрасль', 
            'title_kz': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'Салалары', 
            'title_en': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'Industries',
          }"
          v-on:select="set_industries_filter"
          :styles="{
            'border': '1px solid #fff',
            'border-radius': '3px',
            'height': '31px',
            'font-size': '14px',
            'padding': '5px 35px 5px 10px',
            'line-height': '18px'
          }"
        />
      </div>

      <!-- ошибка дизайна, тоглить сайдбар лучше в sidebar_header -->
      <div class="sidebar_filter-collapse" 
        @click="toggle_sidebar"
        v-text="{
          'title_ru': 'Свернуть', 
          'title_kz': 'Жасыру', 
          'title_en': 'Collapse'
        }['title_' + lang]">
      </div>

      <button class="sidebar_filter-find"
        @click="
          set_zones({
            filter: true,
          }),
          set_level_b({ id: 1 })
        "
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
  .sidebar_filter-marker {
    width: 20px;
    height: 27px;
    float: left;
    margin-left: 5px;
    background-size: 80%;
    background-position: 50% 50%;
    background-repeat: no-repeat;
  }
  .sidebar_filter-marker--green {
    background-image: url('../../assets/images/g.svg');
  }
  .sidebar_filter-marker--orange {
    background-image: url('../../assets/images/o.svg');
  }
  .sidebar_filter-input {
    background: white;
    border: 1px solid #fff;
    display: inline-block;
    font-size: 14px;
    font-weight: normal;
    border-radius: 3px;
    padding: 5px 10px;
    margin-bottom: 5px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, .3);
  }
  .sidebar_filter-input--search {
    width: 100%;
  }
  .sidebar_filter-collapse {
    font-size: 12px;
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
