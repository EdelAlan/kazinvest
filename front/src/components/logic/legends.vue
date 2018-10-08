<script>
  import { mapActions, mapGetters } from 'vuex';
  import treenode from '../ui/treenode';

  export default {
    components: {
      treenode,
    },
    
    computed: mapGetters([
      'lang',
      'infrastructures_list',
      'objects_list',
    ]),
    
    methods: mapActions([
      'set_new_infrastructures',
    ]),
  };
</script>


<template>
  <div class="legends">

    <treenode
      :model="{
        title_ru: 'Земельные участки',
        children: [],
      }"
    ></treenode>
    <div class="legends-treenode_separator"></div>

    <treenode
      :model="{
        title_ru: 'Инфраструктура',
        children: [{
          title_ru: 'Инфраструктура',
          children: infrastructures_list,
        }, {
          title_ru: 'Объекты',
          children: objects_list,
        }],
      }"
    ></treenode>
  </div>
</template>


<style>
  .legends-treenode_separator {
    height: 1px;
    background: #eee;
    width: 100%;
  }
</style>