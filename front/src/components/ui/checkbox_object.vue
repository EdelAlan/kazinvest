<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    props: ['model'],

    methods: {
      ...mapActions([
        'set_new_objects',
        'set_objects',
      ]),

      async change () {
        await this.set_new_objects(this.objects_list
          .map(it => this.model.type == it.type 
          ? ({ ...it, selected: it.selected == true ? false : true}) 
          : it)
        );
        this.set_objects();
      },
    },

    computed: mapGetters([
      'lang',
      'objects_list',
    ]),
  };
</script>


<template>
  <div class="checkbox_object"
    @click="change"
  >
    <div class="checkbox_object-window"
      :class="{ 
        'checkbox_object-window--selected': model.selected 
      }">
    </div>
    <span class="checkbox_object-title"
      :title="model['title_' + lang]"
      v-text="model['title_' + lang]"></span>
    <span class="checkbox_object-badge"
      :style="{
        'border': '4px solid ' + model.color
      }"
    ></span>
  </div>
</template>


<style>
  .checkbox_object {
    position: relative;
  }
  .checkbox_object-title {
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    padding-right: 40px;
  }
  .checkbox_object-window {
    width: 17px;
    background: #03A0E3;
    height: 17px;
    float: left;
    position: absolute;
    border-radius: 2px;
    left: -25px;
    top: 1px;
  }

  .checkbox_object-badge {
    box-sizing: border-box;
    display: block;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 0;
    width: 15px;
    height: 15px;
    border-radius: 100%;
    background: #fff;
  }


  .checkbox_object-window--selected::after {
    content: '';
    position: absolute;
    top: 4px;
    left: 3px;
    background: url('../../assets/images/check.svg');
    width: 11px;
    height: 9px;
  }
</style>