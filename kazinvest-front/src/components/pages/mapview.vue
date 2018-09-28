<script>
import sidebar from '../logic/sidebar';
import basemaps from '../ui/basemaps'
import xmap from '../logic/map';
import { mapGetters, mapActions } from 'vuex';  

export default {
  components: {
    sidebar,
    basemaps,
    xmap
  },

  computed: mapGetters([
    'sidebar_expanded',
    'basemap',
    'active_level',
  ]),

  methods: mapActions([
    'toggle_sidebar',
    'set_basemap',
  ]),

}
</script>


<template>
  <div class="wrapper">
    <div class="side">
      <div class="logo"></div>
      <button class="expand" v-on:click="toggle_sidebar"></button>
      <sidebar :class="{'sidebar--expanded': sidebar_expanded}" />
    </div>
    <div class="breadcrumb"></div>
    <xmap></xmap>
    <basemaps v-on:click="set_basemap"
      v-if="active_level.id != 1"
    ></basemaps>
  </div>  
</template>


<style scoped>
  .logo {
    height: 60px;
    width: 110px;
    background: url('../../assets/images/logo-blue.svg') no-repeat center;
    background-size: cover;
    position: absolute;
    top: 10px;
    left: 10px;
  }

  .expand {
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

  .expand:hover {
    background-color: #0380A3;
  }

  .expand:active,
  .expand:focus {
    outline: none;
  }

  .wrapper {
    height: 100%;
  }

  .side {
    position: relative;
    display: inline-block;
    height: 100%;
    z-index: 99;
  }
</style>
