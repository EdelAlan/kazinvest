<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    data () {
      return {
        selected_item: this.selected,
        show_sez: false,
        show_iz: false,
        sez_zones: [],
        iz_zones: [],
      };
    },

    props: ['model'],

    mounted () {
      this.zones.forEach(el => {
        if (el.provincename == this.model.selected) {
          switch(el.zone_type) {
            case 1:
              this.sez_zones.push(el);
              break;
            case 2:
              this.iz_zones.push(el);
              break;
          }
        }
      });
    },

    computed: mapGetters([
      'zones',
      'lang',
    ]),

    watch: {
      
    },

    methods: {

      ...mapActions([
        'set_level',
      ]),

      dropdown_menu(type) {
        switch(type) {
          case 1:
            if (this.show_iz) this.show_iz = false;
            this.show_sez = !this.show_sez;
            break;
          case 2:
            if (this.show_sez) this.show_sez = false;
            this.show_iz = !this.show_iz;
            break;
        }
      },

    },
  };

</script>

<template>

  <div class="maptip" :style="{ left: model.pageX-80 + 'px', top: model.pageY-45 + 'px' }">
    <div class="maptip-zone" v-on:click="dropdown_menu(1)">
        <span>СЭЗ</span>
    </div>
    <div class="maptip-zone" v-on:click="dropdown_menu(2)">
        <span>ИЗ</span>
    </div>
    <ul class="maptip-dropdown" v-if="show_sez">
        <li v-for="zone in sez_zones">
            <a v-on:click="set_level({
                    id: 2,
                    title_ru: zone.title_ru,
                    title_en: zone.title_en,
                    title_kz: zone.title_kz,
                    properties: zone,
                  })">
                {{ zone['title_' + lang] }}
            </a>
        </li>
    </ul>
    <ul class="maptip-dropdown" v-if="show_iz">
        <li v-for="zone in iz_zones">
            <a v-on:click="set_level({
                    id: 2,
                    title_ru: zone.title_ru,
                    title_en: zone.title_en,
                    title_kz: zone.title_kz,
                    properties: zone,
                  })">
                {{ zone['title_' + lang] }}
            </a>
        </li>
    </ul>
  </div>

</template>

<style>

  .maptip {
    position: absolute;
    display: flex;
  }

  .maptip-zone {
    width: 70px;
    height: 35px;
    margin: 5px;
    background: #fff;
    border: 0.5px solid #EAEAEA;
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
  }

  .maptip-zone:hover {
    background: #EE933F;
    border: 0.5px solid #EE933F;
    cursor: pointer;
  }

  .maptip-dropdown {
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 1000;
    float: left;
    min-width: 160px;
    padding: 5px 0;
    margin: 2px 0 0;
    list-style: none;
    font-size: 14px;
    text-align: left;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.175);
    background-clip: padding-box;
  }

  .maptip-dropdown > li > a {
    padding: 10px 30px;
    display: block;
    clear: both;
    font-weight: normal;
    line-height: 1.6;
    color: #333333;
    white-space: nowrap;
    text-decoration: none;
  }

  .maptip-dropdown > li > a:hover {
    background: #efefef;
    color: #409FCB;
  }

  .maptip-dropdown > li {
    overflow: hidden;
    width: 100%;
    position: relative;
    margin: 0;
  }

  .maptip-dropdown:hover {
    cursor: pointer;
  }

</style>