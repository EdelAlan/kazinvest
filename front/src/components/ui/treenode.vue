<script>
  import checkbox_line from './checkbox_line';
  import checkbox_object from './checkbox_object';
  import { mapGetters } from 'vuex';

  export default {
    name: 'treenode',
    
    props: ['model'],
    
    components: {
      checkbox_line,
      checkbox_object,
    },

    data () {
      return {
        open: false
      }
    },

    methods: {
      toggle () {
        if (this.is_directory) {
          this.open = !this.open;
        }
      },
    },

    computed: {
      ...mapGetters([
        'lang',
      ]),
      is_directory () {
        return this.model.children;
      }
    },
  };

</script>


<template>
  <div class="treenode">
    <div class="treenode-item"
      :class="{ 
        'treenode-item--folder': is_directory,
        'treenode-item--folder_active': is_directory && open
      }"
      @click="toggle">
      <span v-if="is_directory" 
        class="treenode-title"
        v-text="model['title_' + lang]"></span>
        
      <checkbox_line
        v-if="!is_directory && model.objects_type == 'line'"
        :model="model"
      />
      
      <checkbox_object
        v-if="!is_directory && model.objects_type == 'circle'"
        :model="model"
      />
      
    </div>
    <div class="treenode-child"
      v-show="open" v-if="is_directory">
      <treenode
        class="item"
        v-for="(model, index) in model.children"
        :key="index"
        :model="model">
      </treenode>
    </div>
  </div>
</template>


<style>
  .treenode {
    background: #fff;
    -webkit-user-select: none;        
    -moz-user-select: none;
    -ms-user-select: none;
  }
  .treenode-child {
    padding-left: 15px;
  }
  .treenode-title {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .treenode-item {
    font-size: 14px;
    padding: 8px 15px 8px 25px;
    position: relative;
    cursor: pointer;
    color: #777;
    box-sizing: border-box;
  }
  .treenode-item--folder::before {
    content: '';
    position: absolute;
    left: 8px;
    width: 0;
    height: 0;
    top: 50%;
    transform: translateY(-50%) rotate(-90deg);
		border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #bbb;
  }
  .treenode-item--folder_active::before {
    transform: translateY(-50%) rotate(0deg);
  }
</style>