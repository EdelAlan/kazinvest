<script>
  import Vue from 'vue';
  import sidebar from '../logic/sidebar';
  import breadcrumb from '../logic/breadcrumb';
  import basemaps from '../logic/basemaps'
  import xmap from '../logic/map';
  import maptip from '../ui/maptip';
  import popup from '../ui/popup';
  import { mapGetters, mapActions } from 'vuex';  

  export default {

    data () {
      return {
        is_maptip: false,
        is_popup: false,
      };
    },

    components: {
      sidebar,
      xmap,
      breadcrumb,
      basemaps,
      maptip,
      popup,
    },

    computed: mapGetters([
      'sidebar_expanded',
      'levels',
      'basemap',
      'active_level',
      'tip',
      'popup',
    ]),

    watch: {
      tip: 'show_maptip',
      popup: 'show_popup',
      active_level: 'hide_maptip'
    },

    methods: {
      ...mapActions([
        'toggle_sidebar',
        'set_basemap',
        'show_tip',
      ]),

      show_maptip() {
        this.is_maptip = !this.is_maptip;
      }, 

      show_popup() {
        this.is_popup = !this.is_popup;
      }, 

      hide_maptip() {
        if (this.active_level != 1) {
          this.show_tip();
        }
      }, 
    },
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
    <maptip v-if="tip"
      :model="{
        pageX: this.tip.pageX,
        pageY: this.tip.pageY,
        selected: this.tip.layer
      }"
    ></maptip>
    <popup v-if="popup"
      :model="{
        pageX: this.popup.pageX,
        pageY: this.popup.pageY,
        feature: this.popup.feature
      }"
    ></popup>
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
    left: 150px;
    transition: all .5s ease-in-out;
    top: 0;
  }
  .mapview-breadcrumb--expanded {
    left: 327px;
  }
</style>
