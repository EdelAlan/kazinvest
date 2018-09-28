<script>
  import lang from './lang';
  import sidebar_filter from './sidebar_filter';

  export default {
    components: { 
      lang,
      sidebar_filter,
    },
  }
</script>


<template>
  <div class="sidebar_header">
    <div class="sidebar_header-container">

      <div class="sidebar_header-header">
        <router-link to="/">
          <div class="sidebar_header-logo"></div>
        </router-link>

        <lang class="sidebar_header-lang"></lang>
      </div>

      <sidebar_filter></sidebar_filter>

    </div>
  </div>
</template>


<style>

  .sidebar_header-container {
    background: #03A0E3;
    margin: 5px;
    width: 320px;
    border-radius: 3px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }

  .sidebar_header-header {
    padding: 5px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }

  .sidebar_header-lang {
    margin-right: 5px;
  }

  .sidebar_header-logo {
    height: 50px;
    width: 90px;
    margin: 5px;
    background: url('../../assets/images/logo.svg') no-repeat center;
    background-size: cover;
  }

</style>
