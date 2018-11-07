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
      v-bind:class="{ 'maptip-zone--active': show_sez }"
      v-on:click="dropdown_menu(1)"
      v-text="{
        'title_ru': 'СЭЗ', 
        'title_kz': 'АЭА', 
        'title_en': 'SEZ'
      }['title_' + lang]"
    >
    </button>
    <button class="maptip-zone"
      v-bind:class="{ 'maptip-zone--active': show_iz }"
      v-on:click="dropdown_menu(2)"
      v-text="{
        'title_ru': 'ИЗ', 
        'title_kz': 'ИА', 
        'title_en': 'IZ'
      }['title_' + lang]"
    >
    </button>
    <ul class="maptip-dropdown"
      :style="{ right: '75px' }"
      v-if="show_sez"
      >
        <li v-for="zone in sez_zones">
            <a v-on:click="set_level({
                    id: 2,
                    title_ru: zone.title_ru,
                    title_en: zone.title_en,
                    title_kz: zone.title_kz,
                    properties: zone,
                  })"
                  :title="zone['title_' + lang]"
                  v-text="zone['title_' + lang]"
                  >
            </a>
        </li>
    </ul>
    <ul class="maptip-dropdown" 
      :style="{ left: '75px' }"
      v-if="show_iz">
        <li v-for="zone in iz_zones">
            <a v-on:click="set_level({
                    id: 2,
                    title_ru: zone.title_ru,
                    title_en: zone.title_en,
                    title_kz: zone.title_kz,
                    properties: zone,
                  })"
                  :title="zone['title_' + lang]"
                  v-text="zone['title_' + lang]"
                  >
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
    width: 60px;
    height: 30px;
    margin: 5px;
    background: #fff;
    border: 0.5px solid #EAEAEA;
    box-sizing: border-box;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
    outline: none;
    font-size: 16px;
  }

  .maptip-zone:hover {
    background: #EE933F;
    cursor: pointer;
    color: #FFFFFF;
  }

  .maptip-dropdown {
    position: absolute;
    top: 100%;
    max-width: 400px;
    padding: 0 0;
    font-size: 12px;
    background-color: #fff;
    border-radius: 2px;
    margin: 0;
    overflow-y: auto;
    max-height: 120px;
  }

  .maptip-dropdown > li > a {
    padding: 5px 15px;
    display: block;
    font-size: 16px;
    line-height: 30px;
    color: #03A0E3;
    white-space: nowrap;
    border-radius: 2px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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

  .maptip-zone--active {
    background: #EE933F;
    color: #FFFFFF;
  }

</style>