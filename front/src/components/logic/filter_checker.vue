<script>
  import { mapGetters } from 'vuex';

  export default {
    props: [
      'list',
      'styles',
      'title',
      'filter_name'
    ],

    data () {
      return {
        list_is_shown: false,
      }
    },

    methods: {
      select (id) {
        this.$emit('select', this.list.map(it => ({
          ...it,
          checked: it.id == id ? !it.checked || false : it.checked,
        })));
      },

      select_all () {
        this.$emit('select', this.list.map(it => ({
          ...it,
          checked: true,
        })));
      },

      unselect_all () {
        this.$emit('select', this.list.map(it => ({
          ...it,
          checked: false,
        })));
      },

      toggle () {
        this.list_is_shown = !this.list_is_shown;
      },
    },

    computed: {
      ...mapGetters([
        'lang',
      ]),
    },
    
  };

</script>

<template>

  <div class="filter">
    <div class="filter-title"
      :style="styles"
      v-text="title['title_' + lang]"
      v-on:click="toggle"
    ></div>

    <span class="filter-carret"></span>

    <div class="filter-items"
      v-if="list_is_shown">
      
      <button class="filters-btn"
        v-on:click="select_all"
      >Выбрать все</button>
      <button class="filters-btn"
        v-on:click="unselect_all"
      >Убрать все</button>

      <div class="filter-item"
        v-for="item, key in list">
        <label 
          :title="item['title_' + lang]"
          class="filter-item_label"
          :for="item['title_' + lang] + key"
          v-text="item['title_' + lang]"></label>
        <input type="checkbox" 
          :id="item['title_' + lang] + key"
          class="filter-item_check"
          :checked="item.checked" 
          @click="select(item.id)" />
         
      </div>
    </div>
  </div>

</template>

<style>
  .filter {
    position: relative;
  }
  .filter-title {
    font-family: inherit;
    border: none;
    width: 100%;
    outline: none;
    background: #fff;
    cursor: pointer;
  }
  .filter-item_label {
    display: block;
    padding: 0 2em 0 .5em;
    cursor: pointer;
    line-height: 30px;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .filters-btn {
    width: 100%;
    background: #f1f1f1;
    border: none;
    border-bottom: 1px solid #ddd;
    padding: 5px;
    cursor: pointer;
    color: #555;
  }
  .filters-btn:hover {
    background: #ccc;
  }
  .filter-item_check {
    float: right;
    position: absolute;
    right: 10px;
    top: 10px;
    margin: 0;
    cursor: pointer;
  }
  .filter-carret {
    width: 20px;
    height: 12px;
    pointer-events: none;
    position: absolute;
    right: 14px;
    top: 50%;
    opacity: .5;
    transform: translateY(-50%);
    background-size: contain;
    background-image: url('../../assets/images/carret.svg');
  }
  .filter-items {
    box-shadow: 0 .5em 1em 0 rgba(0, 0, 0, .3);
    position: absolute;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    z-index: 10;
    max-height: 12em;
    overflow-y: auto;
    border-radius: 2px;
  }
  .filter-item {
    color: #333;
    font-size: 14px;
    font-family: inherit;
    position: relative;
  }
  .filter-item--active {
    background: #ccc;
  }
  .filter-item:last-child {
    border: none;
  }
  .filter-item:hover {
    background: #f1f1f1;
  }
</style>