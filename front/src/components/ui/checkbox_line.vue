<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['model'],

    methods: {
      ...mapActions([
        'set_new_infrastructures',
        'set_infrastructures',
      ]),

      async change () {
        await this.set_new_infrastructures(this.infrastructures_list
          .map(it => this.model.type == it.type 
          ? ({ ...it, selected: it.selected == true ? false : true}) 
          : it)
        );
        this.set_infrastructures();
      }
    },

    computed: mapGetters([
      'lang',
      'infrastructures_list',
    ]),
  };
</script>


<template>
  <div class="checkbox_line"
    @click="change"
  >
    <div class="checkbox_line-window"
      :class="{ 
        'checkbox_line-window--selected': model.selected 
      }">
    </div>
    <span class="checkbox_line-title"
      :title="model['title_' + lang]"
      v-text="model['title_' + lang]"></span>
    <span class="checkbox_line-badge"
      :style="{
        'border': '2px solid ' + model.color
      }"
    ></span>
  </div>
</template>


<style>
  .checkbox_line {
    position: relative;
  }
  .checkbox_line-title {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    padding-right: 40px;
  }
  .checkbox_line-window {
    width: 17px;
    background: #03A0E3;
    height: 17px;
    float: left;
    position: absolute;
    border-radius: 2px;
    left: -25px;
    top: 1px;
  }
  .checkbox_line-badge {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 30px;
    background: #fff;
  }
  .checkbox_line-window--selected::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 3px;
    background: url('../../assets/images/check.svg');
    width: 11px;
    height: 9px;
  }
</style>