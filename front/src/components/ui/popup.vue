<script>
  import { mapGetters, mapActions } from 'vuex';
  import piechart_popup from './piechart_popup';

  export default {

    data() {
      return {
        type: null,
      };
    },

    props: ['model'],

    components: {
      piechart_popup,
    },

    mounted () {
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
    <div class="popup-zone">{{ model.feature.properties.title_ru }}</div>
    <div class="popup-zone-type">{{ this.type }}</div>
    <piechart_popup
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
  }

  .popup-zone-type {
    position: absolute;
    max-width: 160px;
    bottom: 20px;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
  }

</style>