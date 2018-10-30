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
      'earth_list',
      'active_level',
    ]),
    
    methods: mapActions([
      'set_new_infrastructures_list',
    ]),
  };
</script>


<template>
  <div class="legends">
    <treenode
      v-if="active_level.id != 3"
      :model="{
        title_ru: 'Земельные участки',
        title_kz: 'Жер аумақтары',
        title_en: 'Land areas',
        children: earth_list,
      }"
    ></treenode>
    
    <div class="legends-treenode_separator"></div>

    <treenode
      :model="{
        title_ru: 'Инфраструктура',
        title_kz: 'Инфрақұрылым',
        title_en: 'Infrastructure',
        children: [{
          title_ru: 'Инфраструктура',
          title_kz: 'Инфрақұрылым',
          title_en: 'Infrastructure',
          children: infrastructures_list,
        }, {
          title_ru: 'Объекты',
          title_kz: 'Объектілер',
          title_en: 'Objects',
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