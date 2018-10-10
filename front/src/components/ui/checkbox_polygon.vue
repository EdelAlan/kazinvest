<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['model'],

    methods: {
      ...mapActions([
        'set_new_earth_list',
        'set_sectors',
      ]),

      async change () {
        await this.set_new_earth_list(this.earth_list
          .map(it => this.model.project_type == it.project_type 
          ? ({ ...it, selected: it.selected == true ? false : true}) 
          : it)
        );
        this.set_sectors();
      }
    },

    computed: mapGetters([
      'lang',
      'earth_list',
    ]),
  };
</script>


<template>
  <div class="checkbox_polygon"
    @click="change"
  >
  
    <div class="checkbox_polygon-window"
      :class="{ 
        'checkbox_polygon-window--selected': model.selected 
      }">
    </div>
    <span class="checkbox_polygon-title"
      :title="model['title_' + lang]"
      v-text="model['title_' + lang]"></span>
    <span class="checkbox_polygon-badge"
      :style="{
        'border': '2px dashed ' + model.color,
        'background': model.color + '50'
      }"
    ></span>
  </div>
</template>


<style>
  .checkbox_polygon {
    position: relative;
  }
  .checkbox_polygon-title {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    padding-right: 40px;
  }
  .checkbox_polygon-window {
    width: 17px;
    background: #03A0E3;
    height: 17px;
    float: left;
    position: absolute;
    border-radius: 2px;
    left: -25px;
    top: 1px;
  }
  .checkbox_polygon-badge {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 30px;
    height: 10px;
    background: #fff;
  }
  .checkbox_polygon-window--selected::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 3px;
    background: url('../../assets/images/check.svg');
    width: 11px;
    height: 9px;
  }
</style>