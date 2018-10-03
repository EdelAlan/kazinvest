<script>
  import sidebar from '../logic/sidebar';
  import breadcrumb from '../ui/breadcrumb';
  import basemaps from '../ui/basemaps'
  import xmap from '../logic/map';
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    components: {
      sidebar,
      xmap,
      breadcrumb,
      basemaps,
    },

    computed: mapGetters([
      'sidebar_expanded',
      'levels',
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
  <div class="mapview">
    <router-link to="/">
      <div class="mapview-logo"></div>
    </router-link>
    <button class="mapview-expand" v-on:click="toggle_sidebar"></button>
    <sidebar class="mapview-sidebar"
      :class="{
        'mapview-sidebar--expanded': sidebar_expanded 
      }" 
    />
    <breadcrumb class="mapview-breadcrumb"
      :class="{ 'mapview-breadcrumb--expanded': sidebar_expanded }"
      :crumbs="levels"
      :active_crumb="active_level"
    />
    <xmap />
    <basemaps v-on:click="set_basemap"
      v-if="active_level.id != 1"
    />
  </div>  
</template>


<style scoped>
  .mapview-logo {
    height: 62px;
    width: 110px;
    background: url('../../assets/images/logo-blue-black.svg') no-repeat center;
    background-size: cover;
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 10;
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
    cursor: pointer;
    z-index: 10;
  }
  .mapview-expand:hover {
    background-color: #0380A3;
  }
  .mapview-expand:active,
  .mapview-expand:focus {
    outline: none;
  }
  .mapview-sidebar {
    left: -320px;
    z-index: 10;
    transition: all .5s ease-in-out;
  }
  .mapview-sidebar--expanded {
    left: 0;
    transition: all .5s ease-in-out;
  }
  .mapview-breadcrumb {
    position: absolute;
    z-index: 20;
    left: 327px;
    transition: all .5s ease-in-out;
    top: -60px;
  }
  .mapview-breadcrumb--expanded {
    left: 327px;
    top: 0;
  }

</style>
