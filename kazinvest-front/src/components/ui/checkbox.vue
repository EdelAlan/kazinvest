<script>
  export default {
    props: ['color', 'selected', 'text'],

    data () {
      return {
        is_selected: this.selected,
      }
    },

    methods: {
      toggle () {
        this.is_selected = !this.is_selected;
      }
    }
  };
</script>


<template>
  <div class="checkbox"
    @click="toggle"
  >
    <div class="checkbox-window"
      :style="{
        'background': is_selected ? color : '#aaa',
      }"
      :class="{ 
        'checkbox-window--selected': is_selected 
      }">
    </div>
    <span v-text="text"></span>
  </div>
</template>


<style>
  .checkbox {
    position: relative;
  }

  .checkbox-window {
    width: 17px;
    height: 17px;
    float: left;
    position: absolute;
    border-radius: 2px;
    left: -25px;
    top: 1px;
  }

  .checkbox-window--selected::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 3px;
    background: url('../../assets/images/check.svg');
    width: 11px;
    height: 9px;
  }
</style>