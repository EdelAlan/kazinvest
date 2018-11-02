<script>
  import { mapGetters } from 'vuex';
  import piechart_popup from './piechart_popup';

  export default {

    data() {
      return {
        type_ru: null,
        type_en: null,
        type_kz: null,
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
            this.type_ru = 'Химия';
            this.type_en = 'Chemistry';
            this.type_kz = 'Химия';
            break;
          case 2:
            this.type_ru = 'Нефтехимия';
            this.type_en = 'Petrochemistry';
            this.type_kz = 'Мұнай-химия';
            break;
          case 3:
            this.type_ru = 'Металлургия'
            this.type_en = 'Metallurgy';
            this.type_kz = 'Металлургия';
            break;
          case 4:
            this.type_ru = 'Машиностроение';
            this.type_en = 'Engineering';
            this.type_kz = 'Машина жасау';
            break;
          case 5:
            this.type_ru = 'Логистика';
            this.type_en = 'Logistics';
            this.type_kz = 'Логистика';
            break;
          case 6:
            this.type_ru = 'Нефтесервис'
            this.type_en = 'Нефтесервис';
            this.type_kz = 'Petroservice';
            break;
          case 7:
            this.type_ru = 'Текстиль';
            this.type_en = 'Textile';
            this.type_kz = 'Тоқыма';
            break;
          case 8:
            this.type_ru = 'ИКТ и НИОКР';
            this.type_en = 'ICT & R&D';
            this.type_kz = 'АКТ';
            break;
          case 9:
            this.type_ru = 'Продукты питания';
            this.type_en = 'Food';
            this.type_kz = 'Тамақ өнімдері';
            break;
          case 10:
            this.type_ru = 'Туризм';
            this.type_en = 'Tourism';
            this.type_kz = 'Туризм';
            break;
          case 11:
            this.type_ru = 'Смешанная';
            this.type_en = 'Mixed';
            this.type_kz = 'Аралас';
            break;
          case 12:
            this.type_ru = 'Торговля';
            this.type_en = 'Trade';
            this.type_kz = 'Сауда';
            break;
        }
      } else {
        switch(this.model.feature.properties.type) {
          case 1:
            this.type_ru = 'Действующий';
            this.type_en = 'Ongoing project';
            this.type_kz = 'Ағымдағы жоба';
            break;
          case 2:
            this.type_ru = 'На стадии реализации';
            this.type_en = 'The project is underway';
            this.type_kz = 'Жоба іске асырылуда';
            break;
        }
      }    
    },

    computed: mapGetters([
      'lang',
    ]),

  };

</script>

<template>

  <div class="popup" :style="{ left: model.pageX + 'px', top: model.pageY-80 + 'px' }"
    :class="{ 'popup-area' : !model.is_piechart }">
    <div class="popup-zone"
      :class="{ 'popup-sector' : !model.is_piechart }"
    >{{ model.feature.properties['title_' + this.lang] }}</div>
    <div
      :class="{ 'popup-zone-type' : model.is_piechart , 'popup-sector' : !model.is_piechart, 'popup-sector-type' : !model.is_piechart }"
    >{{ this['type_' + this.lang] }}</div>
    <div class="popup-zone-area"
      v-if="!model.is_piechart"
      v-text="model.feature.properties.area + (this.lang == 'en' ? ' ha' : ' Га')">
    </div>
    <div class="popup-zone-divisible"
      v-if="model.feature.properties.type == 3"
      v-text="model.feature.properties.divisible == 1 ? (lang == 'ru' ? 'Делимый' : lang == 'kz' ? 'Бөліседі' : 'Divisible') : (lang == 'ru' ? 'Неделимый' : lang == 'kz' ? 'Бөлінбейді' : 'Indivisible')">
    </div>
    <div class="popup-zone-zone_time"
      v-if="model.is_piechart"
      v-text="model.feature.properties.zone_time != '' ? (lang == 'ru' ? 'До '+ model.feature.properties.zone_time : lang == 'kz' ? model.feature.properties.zone_time+' дейін' : 'Until '+model.feature.properties.zone_time) : ''">
    </div>
    <piechart_popup
      v-if="is_piechart"
      :sectors="[
        {val: model.feature.properties.diagram_level == 0 ? 0.1 : model.feature.properties.diagram_level},
        {val: 100 - model.feature.properties.diagram_level },
      ]"
    ></piechart_popup>
  </div>

</template>

<style>

  .popup {
    position: absolute;
    width: 223px;
    height: 80px;
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

  .popup-sector-type {
    position: absolute;
    max-width: 160px;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
    margin: 0 0 27px 10px;
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
    margin: 0 0 27px 10px;
  }

  .popup-zone-area {
    position: absolute;
    max-width: 160px;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
    margin: 0 0 5px 10px;
  }

  .popup-zone-divisible {
    position: absolute;
    max-width: 160px;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
    margin: 0 0 27px 10px;
  }

  .popup-zone-zone_time {
    position: absolute;
    max-width: 160px;
    bottom: 0;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    text-overflow: ellipsis;
    font-size: 14px;
    color: #878DA1;
    margin: 0 0 5px 10px;
  }

  .popup-area {
    height: 80px;
  }

</style>