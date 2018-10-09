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
        children: [{
          title_ru: 'Действующий проект',
          title_en: 'Действующий проект',
          title_kz: 'Действующий проект',
          objects_type: 'polygon',
          color: '#10C6FF',
        }, {
          title_ru: 'На стадии реализации',
          title_en: 'На стадии реализации',
          title_kz: 'На стадии реализации',
          objects_type: 'polygon',
          color: '#FFE03B',
        }, {
          title_ru: 'Свободный участок',
          title_en: 'Свободный участок',
          title_kz: 'Свободный участок',
          objects_type: 'polygon',
          color: '#03E334',
        }],
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