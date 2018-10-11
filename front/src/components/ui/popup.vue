<script>
  import { mapGetters, mapActions } from 'vuex';
  import piechart_popup from './piechart_popup';

  export default {

    data() {
      return {
        type: null,
        is_piechart: false,
      };
    },

    props: ['model'],

    components: {
      piechart_popup,
    },

    mounted () {
      this.is_piechart = this.model.is_piechart;
      if (this.model.is_piechart) {
        switch(this.model.feature.properties.industry) {
          case 1:
            this.type = 'Химия';
            break;
          case 2:
            this.type = 'Нефтехимия';
            break;
          case 3:
            this.type = 'Металлургия'
            break;
          case 4:
            this.type = 'Машиностроение';
            break;
          case 5:
            this.type = 'Логистика';
            break;
          case 6:
            this.type = 'Нефтесервис'
            break;
          case 7:
            this.type = 'Текстиль';
            break;
          case 8:
            this.type = 'ИКТ и НИОКР';
            break;
          case 9:
            this.type = 'Продукты питания'
            break;
          case 10:
            this.type = 'Туризм';
            break;
          case 11:
            this.type = 'Смешанная';
            break;
          case 12:
            this.type = 'Торговля'
            break;
        }
      } else {
        switch(this.model.feature.properties.type) {
          case 1:
            this.type = 'Действующий';
            break;
          case 2:
            this.type = 'На стадии реализации';
            break;
        }
      }
      
    },

    computed: mapGetters([
      'lang',
    ]),

    watch: {
      
    },

    methods: {

    },
  };

</script>

<template>

  <div class="popup" :style="{ left: model.pageX + 'px', top: model.pageY-80 + 'px' }">
    <div class="popup-zone"
      :class="{ 'popup-sector' : !model.is_piechart }"
    >{{ model.feature.properties.title_ru }}</div>
    <div class="popup-zone-type"
      :class="{ 'popup-sector' : !model.is_piechart }"
    >{{ this.type }}</div>
    <piechart_popup
      v-if="is_piechart"
      :sectors="[
                { key: 'Потребность', val: 3203333 },
                { key: 'Выделено', val: 2321321 },
              ]"
    ></piechart_popup>
  </div>

</template>

<style>

  .popup {
    position: absolute;
    width: 223px;
    height: 67px;
    background: #FFFFFF;
    box-shadow: 0px 3px 5px rgba(0, 0, 0, 0.25);
    border-radius: 2px;
  }

  .popup-zone {
    position: absolute;
    max-width: 160px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 18px;
    color: #03A0E3;
    margin: 10px 0 0 10px;
  }

  .popup-sector {
    max-width: 200px;
  }

  .popup-zone-type {
    position: absolute;
    max-width: 160px;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
    margin: 0 0 10px 10px;
  }

</style>