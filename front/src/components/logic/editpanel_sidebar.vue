<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {

    computed: mapGetters([
      'sectors',
      'lang',
      'republics',
      'profile',
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
      <div class="editpanel_sidebar-item editpanel_sidebar-item--active">Участки</div>
    </div>

  </div>
</template>


<style>
  .editpanel_sidebar {
    position: absolute;
    z-index: 10;
    width: 320px;
    height: 100vh;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
  }
  .editpanel_sidebar-item {
    height: 53px;
    padding: 15px;
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
