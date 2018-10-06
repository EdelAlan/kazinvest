<script>
  import { mapActions, mapGetters } from 'vuex';
  import treenode from '../ui/treenode';

  export default {
    components: {
      treenode,
    },

    computed: mapGetters([
      'lang',
    ]),
  };
</script>


<template>
  <div class="legends">
    <treenode
      :model="{
        name: 'Земельные участки',
        children: [{
          name: 'Объекты',
          selected: true,
          color: '#aaa',
        }],
      }"
    ></treenode>
    <div class="legends-treenode_separator"></div>
    <treenode
      :model="{
        name: 'Инфрастрктура',
        children: [{
          name: 'Инфрастрктура',
          children: [{ 
            name: 'Объект 1',
            selected: true,
            color: '#aaa',
          },{ 
            name: 'Объект 2',
            selected: true,
            color: '#aaa',
          }],
        }, {
          name: 'Объекты',
          children: [{ 
            name: 'Объект 1',
            selected: true,
            color: '#aaa',
          },{ 
            name: 'Объект 2',
            selected: true,
            color: '#aaa',
          }],
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