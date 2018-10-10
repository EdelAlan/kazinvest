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
    <button class="maptip-zone"
      v-bind:class="{ active: show_sez }"
      v-on:click="dropdown_menu(1)" v-text="'СЭЗ'"
    >
    </button>
    <button class="maptip-zone"
      v-bind:class="{ active: show_iz }"
      v-on:click="dropdown_menu(2)" v-text="'ИЗ'"
    >
    </button>
    <ul class="maptip-dropdown"
      :style="{ right: '85px' }"
      v-if="show_sez"
      >
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
    <ul class="maptip-dropdown" 
      :style="{ left: '85px' }"
      v-if="show_iz">
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
    outline: none;
    font-size: 18px;
  }

  .maptip-zone:hover {
    background: #EE933F;
    cursor: pointer;
    color: #FFFFFF;
  }

  .maptip-dropdown {
    position: absolute;
    top: 100%;
    padding: 0 0;
    font-size: 14px;
    background-color: #fff;
    border-radius: 2px;
    margin: 0;
  }

  .maptip-dropdown > li > a {
    padding: 5px 15px;
    display: block;
    font-size: 18px;
    line-height: 40px;
    color: #03A0E3;
    white-space: nowrap;
    border-radius: 2px;
  }

  .maptip-dropdown > li > a:hover {
    background: #E2F6FF;
  }

  .maptip-dropdown > li {
    overflow: hidden;
  }

  .maptip-dropdown:hover {
    cursor: pointer;
  }

  .active {
    background: #EE933F;
    color: #FFFFFF;
  }

</style>