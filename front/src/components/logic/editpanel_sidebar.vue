<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {

    
    methods: mapActions([
      'set_view',
    ]),

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
      <router-link to="/">
        <div class="editpanel_sidebar-logo"></div>
      </router-link>
    </div>
    <div class="editpanel_sidebar-items">
      <div v-for="(view, idx) in views" 
        class="editpanel_sidebar-item"
        :class="{ 'editpanel_sidebar-item--active': view.active }"
        v-text="view['title_' + lang]"
        v-on:click="set_view(idx)"
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
  }
  .editpanel_sidebar-item--active {
    background: #50C7F9;
    color: #fff;
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
