<script>
import sidebar from '../logic/sidebar';
import breadcrumb from '../ui/breadcrumb';
import xmap from '../logic/map';
import { mapGetters, mapActions } from 'vuex';  

export default {
  components: {
    sidebar,
    xmap,
    breadcrumb,
  },

  computed: mapGetters([
    'sidebar_expanded',
    'levels',
    'active_level',
  ]),

  methods: mapActions([
    'toggle_sidebar',
  ]),

}
</script>


<template>
  <div class="mapview">
    <div class="mapview-side">
      <div class="mapview-logo"></div>
      <button class="mapview-expand" v-on:click="toggle_sidebar"></button>
      <sidebar :class="{'sidebar--expanded': sidebar_expanded }" />
    </div>
    <breadcrumb class="mapview-breadcrumb"
      :class="{ 'mapview-breadcrumb--expanded': sidebar_expanded }"
      :crumbs="levels"
      :active_crumb="active_level"
    ></breadcrumb>
    <xmap></xmap>
  </div>  
</template>


<style scoped>
  .mapview-logo {
    height: 60px;
    width: 110px;
    background: url('../../assets/images/logo-blue.svg') no-repeat center;
    background-size: cover;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .mapview-expand {
    width: 30px;
    height: 30px;
    background: #03A0E3 url('../../assets/images/search.svg') no-repeat center;
    background-size: 60%;
    border-radius: 3px;
    position: absolute;
    left: 10px;
    top: 100px;
    border: none;
  }

  .mapview-expand:hover {
    background-color: #0380A3;
  }

  .mapview-expand:active,
  .mapview-expand:focus {
    outline: none;
  }

  .mapview {
    height: 100%;
  }

  .mapview-breadcrumb {
    position: absolute;
    z-index: 20;
    top: 0;
    left: 0;
    opacity: 0;
    transition: all .5s ease-in-out;
  }

  .mapview-breadcrumb--expanded {
    left: 340px;
    opacity: 1;
  }

  .mapview-side {
    position: relative;
    display: inline-block;
    height: 100%;
    z-index: 10;
  }
</style>
