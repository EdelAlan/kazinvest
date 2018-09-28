<script>
  import lang from './lang';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: { 
      lang,
    },
    // ошибка дизайна, тоглить сайдбар лучше в sidebar_header
    computed: mapGetters([
      'sidebar',
    ]),

    methods: mapActions([
      'toggle_sidebar',
    ])
  }
</script>

<template>
  <div class="sidebar_filter">

    <div class="sidebar_filter-container">
      <input type="text" class="sidebar_filter-input sidebar_filter-input--search" placeholder="Область, название СЭЗ / ИЗ, объект">
      
      <select class="sidebar_filter-input category">
        <option value="">СЭЗ, ИЗ</option>
      </select>
      <select class="sidebar_filter-input industry">
        <option value="">Отрасли</option>
      </select>

      <!-- ошибка дизайна, тоглить сайдбар лучше в sidebar_header -->
      <div class="sidebar_filter-collapse" 
        v-on:click="toggle_sidebar">Свернуть</div>

      <button class="sidebar_filter-find">Найти</button>
    </div>

  </div>
</template>


<style>

  .category,
  .industry {
    width: calc(50% - 5px);
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
    line-height: 13px;
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
