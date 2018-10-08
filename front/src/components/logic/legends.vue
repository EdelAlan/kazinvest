<script>
  import { mapActions, mapGetters } from 'vuex';
  import treenode from '../ui/treenode';

  export default {
    components: {
      treenode,
    },
    
    computed: mapGetters([
      'lang',
      'objects_handbook_type_1',
      'objects_handbook_type_2',
    ]),

    methods: {
      ...mapActions([
        'set_objects_handbook',
      ]),
    },

    mounted () {
      this.set_objects_handbook({
        type: 1,
      });
      this.set_objects_handbook({
        type: 2,
      });
      console.log(this.objects_handbook_type_1);
      console.log(this.objects_handbook_type_2);
    },
  };
</script>


<template>
  <div class="legends">
    <treenode
      :model="{
        title_ru: 'Земельные участки',
        children: [{
          title_ru: 'Объекты',
          selected: true,
        }],
      }"
    ></treenode>
    <div class="legends-treenode_separator"></div>
    <treenode
      :model="{
        title_ru: 'Инфраструктура',
        children: [{
          title_ru: 'Инфраструктура',
          children: objects_handbook_type_1,
        }, {
          title_ru: 'Объекты',
          children: objects_handbook_type_2,
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