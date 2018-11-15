<script>
  import { mapGetters, mapActions } from 'vuex';  
  import lang from './lang';  

  export default {
    components: {
      lang,
    },
    
    methods: {
      ...mapActions([
        'set_view',
        'set_crumb_first',
        'set_crumbs_admin',
      ]),

      set_crumbs(view) {
        this.set_crumbs_admin([{
          ...view,
          level: 1,
        }]);
        this.set_crumb_first({
          ...view,
          level: 1,
        });
      },
    },

    computed: mapGetters([
      'lang',
      'profile',
      'views',
    ]),

  }
</script>


<template>
  <div class="editpanel_sidebar">
    <div class="editpanel_sidebar-header">
      <a href="/">
        <div class="editpanel_sidebar-logo"></div>
      </a>
      <lang class="editpanel_sidebar-lang"></lang>
    </div>
    <div class="editpanel_sidebar-items">
      <div v-for="(view, idx) in views" 
        class="editpanel_sidebar-item"
        :class="{ 'editpanel_sidebar-item--active': view.active }"
        v-text="view['title_' + lang]"
        v-on:click="
        set_view(view.id),
        set_crumbs(view)"
      ></div>
    </div>
  </div>
</template>


<style>
  .editpanel_sidebar {
    position: absolute;
    z-index: 10;
    width: 320px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
  }
  .editpanel_sidebar-item {
    height: 53px;
    padding: 15px;
    cursor: pointer;
    top: 0;
  }
  .editpanel_sidebar-item--active {
    background: #50C7F9;
    color: #fff;
  }
  .editpanel_sidebar-lang {
    position: absolute;
    right: 10px;
    top: 15px;
  }
  .editpanel_sidebar-header {
    background: #03A0E3;
    height: 90px;
    overflow: hidden;
  }
  .editpanel_sidebar-logo {
    height: 50px;
    width: 90px;
    margin: 15px;
    background: url('../../assets/images/logo.svg') no-repeat center;
    background-size: cover;
  }
</style>
