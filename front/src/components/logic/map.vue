<template>
    <div id='map'>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import positron from '../../assets/js/positron';
import osm from '../../assets/js/osm';
import '../../assets/css/mapbox-gl.css';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import * as turf from '@turf/turf';

export default {
  name: 'mapgl',

  data() {
    return {
      hoveredStateId: null,
      hoveredFeature: null,
      clicked_province: null,
      popupm: null
    };
  },

  async mounted() {
    // ИНИЦИАЛИЗАЦИЯ КАРТЫ

    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ';

    this._mapboxgl_map = new mapboxgl.Map({
      container: 'map',
      style: positron(),
      zoom: 4.82,
      center: [67.5, 48.51],
      interactive: false
    });

    this.popupm = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: { bottom: [0, -13] }
    });

    await this.set_republics({
      query: this.$route.query, 
    });
    await this.set_provinces({
      query: this.$route.query, 
    });
    await this.set_zones({
      filter: true,
    });

    // ИВЭНТЫ НА КАРТЕ

    this._mapboxgl_map.on('move', e => {
      this.show_tip();
      this.show_popup();
    });

    this._mapboxgl_map.on('click', e => {
      if (this._mapboxgl_map.isStyleLoaded()) {
        switch (this.active_level.id) {
          case 1:
            var zones = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['zones']
            });
            var clusters = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['zone-clusters']
            });
            var provinces = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: [
                'akm-obl', 
                'akt-obl',
                'alm-obl',
                'vko-obl',
                'tur-obl',
                'sko-obl',
                'pavl-obl',
                'kyz-obl',
                'kost-obl',
                'kar-obl',
                'jamb-obl',
                'man-obl',
                'zko-obl',
                'atyr-obl']
            });
            var cities = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['astana', 'almaty', 'shymkent']
            });

            if (cities[0]) {
              if (this.tip) {
                this.show_tip();  
              } else {
                this.show_tip({ 
                  pageX: e.originalEvent.pageX,
                  pageY: e.originalEvent.pageY,
                  layer: cities[0].layer.id
                });
              }
            }
            if (zones[0]) {
              this.zones.forEach(el => {
                if (zones[0].properties.zone_id == el.id) {
                  this.set_level({
                    id: 2,
                    title_ru: el.title_ru,
                    title_en: el.title_en,
                    title_kz: el.title_kz,
                    properties: el,
                  });
                }
              });
            }
            if (this.tip) {
                this.show_tip();  
            } else if (provinces[0] && !zones[0] && !clusters[0] && !cities[0]) {
              if (this.tip) {
                this.show_tip();  
              } else {
                this.show_tip({ 
                  pageX: e.originalEvent.pageX,
                  pageY: e.originalEvent.pageY,
                  layer: provinces[0].layer.id
                });
              }
            }
            break;
          case 2:
            var sectors = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['current-sector', 'processing-sector', 'free-sector', 'current-sector-multi', 'processing-sector-multi', 'free-sector-multi']
            });
            if (sectors[0]) {
              this.sectors.forEach(el => {
                if (sectors[0].properties.id == el.id) {
                  this.set_level({
                    id: 3,
                    title_ru: el.title_ru,
                    title_en: el.title_en,
                    title_kz: el.title_kz,
                    properties: el,
                  });
                }
              });
            }
            break;
        }
      }
    });

    this._mapboxgl_map.on('mousemove', e => {
      if (this._mapboxgl_map.isStyleLoaded()) {
        switch (this.active_level.id) {
          case 1:
            var cities = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['astana', 'shymkent', 'almaty']
            });
            var provinces = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: [
                'akm-obl',
                'akt-obl',
                'alm-obl',
                'atyr-obl',
                'vko-obl',
                'tur-obl',
                'sko-obl',
                'pavl-obl',
                'kyz-obl',
                'kost-obl',
                'kar-obl',
                'jamb-obl',
                'man-obl',
                'zko-obl'
              ]
            });

            var zones = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['zones']
            });

            if (provinces[0]) {
              if (this.hoveredStateId) {
                this._mapboxgl_map.setPaintProperty(
                  this.hoveredStateId,
                  'fill-color',
                  '#03A0E3'
                );
              }
              this.hoveredStateId = provinces[0].layer.id;
              this.hoveredFeature = provinces[0];
              this._mapboxgl_map.setPaintProperty(
                this.hoveredStateId,
                'fill-color',
                '#03A0E3'
              );
            }
            if (cities[0]) {
              if (cities[0].layer.id)
                switch (cities[0].layer.id) {
                  case 'astana':
                    this._mapboxgl_map.setPaintProperty(
                      'akm-obl',
                      'fill-color',
                      '#accad7'
                    );
                    this.hoveredStateId = null;
                    break;
                  case 'almaty':
                    this._mapboxgl_map.setPaintProperty(
                      'alm-obl',
                      'fill-color',
                      '#accad7'
                    );
                    this.hoveredStateId = null;
                    break;
                  case 'shymkent':
                    this._mapboxgl_map.setPaintProperty(
                      'tur-obl',
                      'fill-color',
                      '#accad7'
                    );
                    this.hoveredStateId = null;
                    break;
                }

              this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
              this._mapboxgl_map.setPaintProperty(
                cities[0].layer.id,
                'circle-color',
                '#fff'
              );
              this._mapboxgl_map.setPaintProperty(
                cities[0].layer.id,
                'circle-stroke-color',
                '#C30D0D'
              );
            }
            if (zones[0]) {
              this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
              this.show_popup({
                is_piechart: true,
                pageX: e.originalEvent.pageX,
                pageY: e.originalEvent.pageY,
                feature: zones[0]
              });
            }
            
            break;
          case 2:
            var sectors = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ['current-sector', 'processing-sector', 'free-sector', 'current-sector-multi', 'processing-sector-multi', 'free-sector-multi']
            });
            if (sectors[0]) {
              this._mapboxgl_map.getCanvas().style.cursor = 'pointer';

              this.show_popup({
                is_piechart: false,
                pageX: e.originalEvent.pageX,
                pageY: e.originalEvent.pageY,
                feature: sectors[0]
              });
            }
            break;
        }
      }
    });

    this._mapboxgl_map.on('mouseleave', 'current-sector', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'processing-sector', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'free-sector', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });

    this._mapboxgl_map.on('mouseleave', 'current-sector-multi', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'processing-sector-multi', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'free-sector-multi', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });

    // mouseleave ПЕРВЫЙ УРОВЕНЬ ГОРОДА

    this._mapboxgl_map.on('mouseleave', 'astana', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = '';
        this._mapboxgl_map.setPaintProperty(
          'astana',
          'circle-color',
          '#C30D0D'
        );
        this._mapboxgl_map.setPaintProperty(
          'astana',
          'circle-stroke-color',
          '#fff'
        );
      }
    });
    this._mapboxgl_map.on('mouseleave', 'almaty', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = '';
        this._mapboxgl_map.setPaintProperty(
          'almaty',
          'circle-color',
          '#C30D0D'
        );
        this._mapboxgl_map.setPaintProperty(
          'almaty',
          'circle-stroke-color',
          '#fff'
        );
      }
    });
    this._mapboxgl_map.on('mouseleave', 'shymkent', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = '';
        this._mapboxgl_map.setPaintProperty(
          'shymkent',
          'circle-color',
          '#C30D0D'
        );
        this._mapboxgl_map.setPaintProperty(
          'shymkent',
          'circle-stroke-color',
          '#fff'
        );
      }
    });

    // mouseleave ПЕРВЫЙ УРОВЕНЬ ДЛЯ ОБЛАСТЕЙ (ЗАРЕФАКТОРИТЬ)

    this._mapboxgl_map.on('mouseleave', 'akm-obl', _ => { 
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('akm-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'akt-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('akt-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'alm-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('alm-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'vko-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('vko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'tur-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('tur-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'sko-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('sko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'pavl-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          'pavl-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kyz-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('kyz-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kost-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          'kost-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kar-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('kar-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'jamb-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          'jamb-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'man-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('man-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'zko-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty('zko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'atyr-obl', _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          'atyr-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });

    // ИВЭНТЫ ПЕРВОГО УРОВНЯ – КЛАСТЕРЫ, МАРКЕРЫ

    this._mapboxgl_map.on('click', 'zone-clusters', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);

      this._mapboxgl_map
        .getSource('zones')
        .getClusterExpansionZoom(
          features[0].properties.cluster_id,
          (err, zoom) => {
            if (err) return;

            this._mapboxgl_map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom+2
            });
          }
        );
    });

    this._mapboxgl_map.on('mouseenter', 'zone-clusters', e => {
      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
    });

    this._mapboxgl_map.on('mouseleave', 'zone-clusters', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
    });

    this._mapboxgl_map.on('mouseleave', 'zones', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.show_popup();
    });

    ////

    this._mapboxgl_map.on('mouseenter', 'object-points', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ['object-points']
      });

      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
      switch(this.lang) {
        case 'ru':
          this.popupm
          .setLngLat(features[0].geometry.coordinates.slice())
          .setHTML(features[0].properties.type == 13 ? 'Пожарное депо' :
                  features[0].properties.type == 14 ? 'Готовые производственные помещения для дальнейшего предоставленя участникам в аренду' :
                  features[0].properties.type == 16 ? 'Склады' :
                  features[0].properties.type == 17 ? 'Жилищный комплекс для временного размещения' :
                  features[0].properties.type == 18 ? 'Социальный объект' :
                  features[0].properties.type == 19 ? 'Административное здание' :
                  features[0].properties.type == 20 ? 'Контрольно-пропускной пункт' :
                  features[0].properties.type == 22 ? 'Полигон тбо' :
                  features[0].properties.type == 23 ? 'КПП для таможенного контроля 2шт' :
                  features[0].properties.type == 24 ? 'Автовесовая' :
                  features[0].properties.type == 25 ? 'Ренгеноустановка' :
                  features[0].properties.type == 26 ? 'Пруд-испаритель' :
                  features[0].properties.type == 27 ? 'Интегририрующий сервис технологический центр' :
                  features[0].properties.type == 28 ? 'Очистное сооружение' :
                  features[0].properties.type == 29 ? 'Воздушные линии элеткропередачи' :
                  features[0].properties.type == 30 ? 'Распределительный пункт' :
                  features[0].properties.type == 31 ? 'Канализационная насосная станция' :
                  features[0].properties.type == 32 ? 'Подстанция' :
                  features[0].properties.type == 33 ? 'Газораспределительный пункт' :
                  features[0].properties.type == 35 ? 'Железно-дорожная станция' :
                  features[0].properties.type == 36 ? 'Водопроводный узел' :
                  features[0].properties.type == 37 ? 'Подстанция "ИПМ"' :
                  features[0].properties.type == 38 ? 'Станция очистки хозяйственно-бытовых стоков' :
                  features[0].properties.type == 39 ? 'Водопроводное сооружение' :
                  features[0].properties.type == 40 ? 'Водоподготовительная  станция' :
                  features[0].properties.type == 41 ? 'Автостоянка' :
                  features[0].properties.type == 42 ? 'Гараж' :
                  features[0].properties.type == 43 ? 'Хозяйственно-бытовые стоки' :
                  features[0].properties.type == 45 ? 'Пруд-накопитель' :
                  features[0].properties.type == 46 ? 'Промышленные стоки' : '')
          .addTo(this._mapboxgl_map);
          break;
        case 'en':
          this.popupm
          .setLngLat(features[0].geometry.coordinates.slice())
          .setHTML(features[0].properties.type == 13 ? 'Fire station' :
                  features[0].properties.type == 14 ? 'Industrial premises for participants rental' :
                  features[0].properties.type == 16 ? 'Storehouse' :
                  features[0].properties.type == 17 ? 'Temporary accommodation' :
                  features[0].properties.type == 18 ? 'Social object' :
                  features[0].properties.type == 19 ? 'Administrative building' :
                  features[0].properties.type == 20 ? 'Checkpoint' :
                  features[0].properties.type == 22 ? 'Polygon TBO' :
                  features[0].properties.type == 23 ? 'Customs control' :
                  features[0].properties.type == 24 ? 'Automobile scales' :
                  features[0].properties.type == 25 ? 'X-ray machine' :
                  features[0].properties.type == 26 ? 'Evaporation pond' :
                  features[0].properties.type == 27 ? 'Integration service, Technological center' :
                  features[0].properties.type == 28 ? 'Cleaning facility' :
                  features[0].properties.type == 29 ? 'Power Transmission Lines' :
                  features[0].properties.type == 30 ? 'Distribution point' :
                  features[0].properties.type == 31 ? 'Sewage pumping station' :
                  features[0].properties.type == 32 ? 'Substation' :
                  features[0].properties.type == 33 ? 'Gas distribution point' :
                  features[0].properties.type == 35 ? 'Railroad station' :
                  features[0].properties.type == 36 ? 'Water pipe' :
                  features[0].properties.type == 37 ? '"IPM" Substation' :
                  features[0].properties.type == 38 ? 'Domestic Waste Treatment Plant' :
                  features[0].properties.type == 39 ? 'Plumbing facility' :
                  features[0].properties.type == 40 ? 'Water Treatment Station' :
                  features[0].properties.type == 41 ? 'Parking' :
                  features[0].properties.type == 42 ? 'Garage' :
                  features[0].properties.type == 43 ? 'Domestic wastewater' :
                  features[0].properties.type == 45 ? 'Storage pond' :
                  features[0].properties.type == 46 ? 'Industrial effluent' : '')
          .addTo(this._mapboxgl_map);
          break;
        case 'kz':
          this.popupm
          .setLngLat(features[0].geometry.coordinates.slice())
          .setHTML(features[0].properties.type == 13 ? 'Өрт сөндіру станциясы' :
                  features[0].properties.type == 14 ? 'Қатысушыларды жалға беру үшін қосымша дайындық бөлмелері' :
                  features[0].properties.type == 16 ? 'Қоймалар' :
                  features[0].properties.type == 17 ? 'Тұрғын үй кешені уақытша орналастыру' :
                  features[0].properties.type == 18 ? 'Әлеуметтік нысан' :
                  features[0].properties.type == 19 ? 'Әкімшілік ғимарат' :
                  features[0].properties.type == 20 ? 'Бақылау-өткізу пункті' :
                  features[0].properties.type == 22 ? 'тбо полигоны' :
                  features[0].properties.type == 23 ? 'бақылау-өткізу пункті, кедендік бақылау' :
                  features[0].properties.type == 24 ? 'Автовесовая' :
                  features[0].properties.type == 25 ? 'Рентгендік қондырғы' :
                  features[0].properties.type == 26 ? 'Бу тоған' :
                  features[0].properties.type == 27 ? 'Қызмет көрсету технологиясының орталық' :
                  features[0].properties.type == 28 ? 'Тазарту құрылыстары' :
                  features[0].properties.type == 29 ? 'Электр желісі' :
                  features[0].properties.type == 30 ? 'Бөлу пункті' :
                  features[0].properties.type == 31 ? 'Кәріздік сорғы станциясы' :
                  features[0].properties.type == 32 ? 'Қосалқы станция' :
                  features[0].properties.type == 33 ? 'Газ тарату пункті' :
                  features[0].properties.type == 34 ? 'Белгісіз' :
                  features[0].properties.type == 35 ? 'Темір жол станциясы' :
                  features[0].properties.type == 36 ? 'Су құбыры' :
                  features[0].properties.type == 37 ? '"ИПМ" қосалқы станция' :
                  features[0].properties.type == 38 ? 'Тұрмыстық қалдықтарды тазарту қондырғысы' :
                  features[0].properties.type == 39 ? 'Су құрылыс' :
                  features[0].properties.type == 40 ? 'Су тазарту станциясы' :
                  features[0].properties.type == 41 ? 'Автотұрақ' :
                  features[0].properties.type == 42 ? 'Гараж' :
                  features[0].properties.type == 43 ? 'Тұрмыстық сарқынды сулар' :
                  features[0].properties.type == 44 ? 'Белгісіз тип' :
                  features[0].properties.type == 45 ? 'Сақтау тоғаны' :
                  features[0].properties.type == 46 ? 'Өнеркәсіптік сарқынды сулар' : '')
          .addTo(this._mapboxgl_map);
          break;
      }
      
    });

    this._mapboxgl_map.on('mouseleave', 'object-points', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.popupm.remove();
    });

    this._mapboxgl_map.on('mouseenter', 'infrastructures', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ['infrastructures']
      });

      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
      switch(this.lang) {
        case 'ru':
          this.popupm
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(features[0].properties.type == 1 ? 'Водоснабжение' :
                  features[0].properties.type == 2 ? 'Канализация' :
                  features[0].properties.type == 3 ? 'Электроснабжение' :
                  features[0].properties.type == 4 ? 'Теплоснабжение' :
                  features[0].properties.type == 5 ? 'Газоснабжение' :
                  features[0].properties.type == 6 ? 'Пароснабжение' :
                  features[0].properties.type == 7 ? 'Телефонная связь' :
                  features[0].properties.type == 8 ? 'Интернет' :
                  features[0].properties.type == 9 ? 'Утилизация твердых отходов' :
                  features[0].properties.type == 10 ? 'Утилизация жидких отходов' :
                  features[0].properties.type == 11 ? 'Подъездной ж/д путь' :
                  features[0].properties.type == 12 ? 'Автодороги' : '')
          .addTo(this._mapboxgl_map);
          break;
        case 'en':
          this.popupm
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(features[0].properties.type == 1 ? 'Water' :
                  features[0].properties.type == 2 ? 'Sewage' :
                  features[0].properties.type == 3 ? 'Electricity' :
                  features[0].properties.type == 4 ? 'Heat' :
                  features[0].properties.type == 5 ? 'Gas' :
                  features[0].properties.type == 6 ? 'Steam' :
                  features[0].properties.type == 7 ? 'Landline' :
                  features[0].properties.type == 8 ? 'Internet' :
                  features[0].properties.type == 9 ? 'Solid Waste Disposal' :
                  features[0].properties.type == 10 ? 'Liquid Waste Disposal' :
                  features[0].properties.type == 11 ? 'Railway' :
                  features[0].properties.type == 12 ? 'Road' : '')
          .addTo(this._mapboxgl_map);
          break;
        case 'kz':
          this.popupm
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(features[0].properties.type == 1 ? 'Су' :
                  features[0].properties.type == 2 ? 'Кәріз' :
                  features[0].properties.type == 3 ? 'Электр' :
                  features[0].properties.type == 4 ? 'Жылу' :
                  features[0].properties.type == 5 ? 'Газ' :
                  features[0].properties.type == 6 ? 'Бу' :
                  features[0].properties.type == 7 ? 'Телефон байланысы' :
                  features[0].properties.type == 8 ? 'Интернет' :
                  features[0].properties.type == 9 ? 'Қатты қалдықтарды кәдеге жарату' :
                  features[0].properties.type == 10 ? 'Сұйық қалдықтарды жою' :
                  features[0].properties.type == 11 ? 'Темір жол' :
                  features[0].properties.type == 12 ? 'Автожол' : '')
          .addTo(this._mapboxgl_map);
          break;
      }
    });

    this._mapboxgl_map.on('mouseleave', 'infrastructures', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      this.popupm.remove();
    });


  },

  computed: mapGetters([
    "basemap",
    "active_level",
    "sidebar_expanded",
    "zones",
    "sectors",
    "lang",
    "api_path",
    "infrastructures",
    "objects",
    "tip",
    "popup",
  ]),

  watch: {
    basemap: 'change_basemap',
    sidebar_expanded: 'move_map',
    active_level: 'follow_level',
    zones: 'update_map',
    sectors: 'add_sectors',
    objects: 'add_objects',
    infrastructures: 'add_infrastructures',
    lang: 'translate',
  },

  methods: {
    ...mapActions([
      'set_zones', 
      'set_sectors', 
      'set_republics', 
      'set_level',
      'set_infrastructures',
      'set_provinces',
      'set_objects',
      'show_tip',
      'show_popup',
    ]),

    update_map() {
      this.first_level();
    },

    async init_map() {
      this._mapboxgl_map.addLayer({
        id: 'astana',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [71.463959, 51.154918]
            },
            properties: {
              title_ru: "Астана",
              title_kz: "Астана",
              title_en: "Astana",
            }
          }
        },
        paint: {
          'circle-radius': 6,
          'circle-color': '#C30D0D',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });
      this._mapboxgl_map.addLayer({
        id: 'almaty',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [76.904369, 43.23711]
            },
            properties: {
              title_ru: "Алматы",
              title_kz: "Алматы",
              title_en: "Almaty",
            }
          }
        },
        paint: {
          'circle-radius': 6,
          'circle-color': '#C30D0D',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });
      this._mapboxgl_map.addLayer({
        id: 'shymkent',
        type: 'circle',
        source: {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [69.591172, 42.335432]
            },
            properties: {
              title_ru: "Шымкент",
              title_en: "Shymkent",
              title_kz: "Шымкент",
            }
          }
        },
        paint: {
          'circle-radius': 6,
          'circle-color': '#C30D0D',
          'circle-stroke-width': 2,
          'circle-stroke-color': '#fff'
        }
      });

      var source = {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: []
        },
        cluster: true,
        clusterRadius: 10,
        clusterMaxZoom: 14
      };

      this.zones.forEach(el => {
        if (el.st_asgeojson) {
          if (JSON.parse(el.st_asgeojson).type == 'Polygon' || JSON.parse(el.st_asgeojson).type == 'MultiPolygon') {
            source.data.features.push({
              type: 'Feature',
              geometry: {
                type: 'Point',
                properties: {},
                coordinates: turf.centerOfMass(JSON.parse(el.st_asgeojson))
                  .geometry.coordinates
              },
              properties: {
                title_ru: el.title_ru,
                title_en: el.title_en,
                title_kz: el.title_kz,
                zone_id: el.id,
                type: el.zone_type,
                industry: el.industries_id,
                rnd_num: Math.floor(Math.random() * 100),
              }
            });
          }
        }
      });

      this._mapboxgl_map.addSource('zones', source);

      this._mapboxgl_map.addLayer({
        id: 'zones',
        type: 'symbol',
        source: 'zones',
        filter: ['!', ['has', 'point_count']],
        layout: {
          'icon-image': 
            ['case', 
              ["==", ['get', 'type'], 1 ], 'marker',
              ["==", ['get', 'type'], 2 ], 'marker2',
              ''
            ],
          'icon-allow-overlap': true
        }
      });
      this._mapboxgl_map.addLayer({
        id: 'zone-clusters',
        type: 'circle',
        source: 'zones',
        filter: ['has', 'point_count'],
        paint: {
          'circle-color': '#03A0E3',
          'circle-radius': 11,
          'circle-stroke-color': '#fff',
          'circle-stroke-width': 3
        }
      });
      this._mapboxgl_map.addLayer({
        id: 'clusters-count',
        type: 'symbol',
        source: 'zones',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12
        }
      });

      this.translate();
    },

    change_basemap() {
      this._mapboxgl_map.setLayoutProperty(
        'bing',
        'visibility',
        this.basemap ? 'visible' : 'none'
      );
    },

    move_map() {
      switch (this.active_level.id) {
        case 1:
          if (this.sidebar_expanded) {
            this._mapboxgl_map.fitBounds(
              turf.bbox(
                turf.lineString([
                  [35.347314, 56.822160],
                  [87.318661, 38.872502]
                ])
              ),
              {
                padding: 50
              }
            );
          } else {
            this._mapboxgl_map.fitBounds(
              turf.bbox(
                turf.lineString([
                  [86.357452, 39.389153],
                  [47.722955, 56.408161]
                ])
              )
            );
          }
          break;
      }
    },

    async follow_level() {
      this.popupm.remove();
      switch (this.active_level.id) {
        case 1:
          this.first_level();
          break;
        case 2:
          this._mapboxgl_map.setStyle(osm());
          this.change_basemap();
          this.translate();
          await this.set_sectors(this.active_level.properties.id);
          this._mapboxgl_map.setMaxBounds(
            turf.bbox(
              turf.lineString([[86.357452, 39.389153], [47.722955, 56.408161]])
            )
          );
          this._mapboxgl_map.scrollZoom.enable();
          this._mapboxgl_map.dragPan.enable();

          this.zones.forEach(el => {
            if (el.id == this.active_level.properties.id) {
              if (!this._mapboxgl_map.getLayer('zone')) {
                this._mapboxgl_map.addLayer({
                  id: 'zone',
                  type: 'line',
                  source: {
                    type: 'geojson',
                    data: turf.polygonToLine(JSON.parse(el.st_asgeojson))
                  },
                  layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                  },
                  paint: {
                    'line-color': '#888',
                    'line-width': 3,
                    'line-dasharray': [5, 10]
                  }
                });
              }
              this._mapboxgl_map.jumpTo(
                {
                  center: turf.centerOfMass(JSON.parse(el.st_asgeojson))
                    .geometry.coordinates,
                  zoom: 13,
                  around: turf.centerOfMass(JSON.parse(el.st_asgeojson))
                    .geometry.coordinates
                },
                {
                  padding: this.sidebar_expanded
                    ? { top: 75, bottom: 75, left: 200, right: 75 }
                    : 75
                }
              );
            }
          });

          this.set_infrastructures();
          this.set_objects();

          this.hoveredStateId = '';
          break;
        case 3:
          this.change_basemap();
          this._mapboxgl_map.fitBounds(
            turf.bbox(JSON.parse(this.active_level.properties.st_asgeojson)),
            {
              padding: this.sidebar_expanded
                ? { top: 150, bottom: 150, left: 200, right: 150 }
                : 150
            }
          );
          if (JSON.parse(this.active_level.properties.st_asgeojson).type == 'Polygon') {
            this._mapboxgl_map.getSource('sector').setData({
              type: "Feature",
              geometry: JSON.parse(this.active_level.properties.st_asgeojson),
              properties: {
                title_ru: this.active_level.properties.title_ru,
                title_en: this.active_level.properties.title_en,
                title_kz: this.active_level.properties.title_kz,
                type: this.active_level.properties.project_type
              }
            });
            this._mapboxgl_map.getSource('sector-line').setData({
              type: 'Feature',
              geometry: turf.polygonToLine(
                JSON.parse(this.active_level.properties.st_asgeojson)
              ).geometry,
              properties: {
                  title_ru: this.active_level.properties.title_ru,
                  title_kz: this.active_level.properties.title_kz,
                  title_en: this.active_level.properties.title_en,
                  type: this.active_level.properties.project_type
              }
            });

            this._mapboxgl_map.getSource('sector-multi').setData({
              type: "Feature",
              geometry: {
                  type: "Point",
                  coordinates: [ 0, 0 ]
              },
            });
            this._mapboxgl_map.getSource('sector-line-multi').setData({
              type: "Feature",
              geometry: {
                  type: "Point",
                  coordinates: [ 0, 0 ]
              },
            });
          } else {
            this._mapboxgl_map.getSource('sector-multi').setData({
              type: "Feature",
              geometry: JSON.parse(this.active_level.properties.st_asgeojson),
              properties: {
                title_ru: this.active_level.properties.title_ru,
                title_en: this.active_level.properties.title_en,
                title_kz: this.active_level.properties.title_kz,
                type: this.active_level.properties.project_type
              }
            });

            if (turf.polygonToLine(JSON.parse(this.active_level.properties.st_asgeojson)).features.length > 1) {
              var temp_source = {
                    type: 'geojson',
                    data: {
                      type: 'FeatureCollection',
                      features: []
                    }
              };
              turf.polygonToLine(JSON.parse(this.active_level.properties.st_asgeojson)).features.forEach( line => {
                temp_source.data.features.push({
                  type: 'Feature',
                  geometry: line.geometry,
                  properties: {
                    title_ru: this.active_level.properties.title_ru,
                    title_kz: this.active_level.properties.title_kz,
                    title_en: this.active_level.properties.title_en,
                    type: this.active_level.properties.project_type
                  }
                });
              });
              this._mapboxgl_map.getSource('sector-line-multi').setData(temp_source.data);
            } else {
              this._mapboxgl_map.getSource('sector-line-multi').setData({
                type: 'Feature',
                geometry: turf.polygonToLine(
                  JSON.parse(this.active_level.properties.st_asgeojson)
                ).features[0].geometry,
                properties: {
                    title_ru: this.active_level.properties.title_ru,
                    title_kz: this.active_level.properties.title_kz,
                    title_en: this.active_level.properties.title_en,
                    type: this.active_level.properties.project_type
                }
              });
            }

            this._mapboxgl_map.getSource('sector').setData({
              type: "Feature",
              geometry: {
                  type: "Point",
                  coordinates: [ 0, 0 ]
              },
            });
            this._mapboxgl_map.getSource('sector-line').setData({
              type: "Feature",
              geometry: {
                  type: "Point",
                  coordinates: [ 0, 0 ]
              },
            });
          }    
          break;
      }
    },

    first_level() {
      this._mapboxgl_map.jumpTo({
          zoom: 4,
          center: [67.5, 48.51],
        }
      );
      this._mapboxgl_map.setMaxBounds(null);
      this._mapboxgl_map.scrollZoom.disable();
      this._mapboxgl_map.dragPan.disable();
      this._mapboxgl_map.setStyle(positron());
      this.init_map();
      this.move_map();
    },

    add_sectors() {
      if (this.sectors) {
        var sector = {
          type: 'geojson',
          data: {
            type: 'FeatureCollection',
            features: []
          }
        };
        var sector_line = {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
        };

        var sector_multi = {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
        };
        var sector_line_multi = {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
        };

        this.sectors.forEach(el => {
          if (el.st_asgeojson) {
            if (JSON.parse(el.st_asgeojson).type == 'Polygon') {
                  sector.data.features.push({
                    type: 'Feature',
                    geometry: JSON.parse(el.st_asgeojson),
                    properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,
                      type: el.project_type,
                      id: el.id
                    }
                  });
                  sector_line.data.features.push({
                    type: 'Feature',
                    geometry: turf.polygonToLine(JSON.parse(el.st_asgeojson))
                      .geometry,
                    properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,                    
                      type: el.project_type,
                      id: el.id
                    }
                  });
            }
            if (JSON.parse(el.st_asgeojson).type == 'LineString') {
                  sector.data.features.push({
                    type: 'Feature',
                    geometry: turf.lineToPolygon(JSON.parse(el.st_asgeojson))
                      .geometry,
                    properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,                    
                      type: el.project_type,
                      id: el.id
                    }
                  });
                  sector_line.data.features.push({
                    type: 'Feature',
                    geometry: JSON.parse(el.st_asgeojson),
                    properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,                    
                      type: el.project_type,
                      id: el.id
                    }
                  });
            }
            if (JSON.parse(el.st_asgeojson).type == 'MultiPolygon') {
              sector_multi.data.features.push({
                type: 'Feature',
                geometry: JSON.parse(el.st_asgeojson),
                properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,
                      type: el.project_type,
                      id: el.id
                }
              });

              if (turf.polygonToLine(JSON.parse(el.st_asgeojson)).features.length > 1) {
                turf.polygonToLine(JSON.parse(el.st_asgeojson)).features.forEach( line => {
                  sector_line_multi.data.features.push({
                    type: 'Feature',
                    geometry: line.geometry,
                    properties: {
                      title_ru: el.title_ru,
                      title_kz: el.title_kz,
                      title_en: el.title_en,
                      type: el.project_type,
                      id: el.id
                    }
                  });
                });
              } else {
                sector_line_multi.data.features.push({
                  type: 'Feature',
                  geometry: turf.polygonToLine(JSON.parse(el.st_asgeojson)).features[0].geometry,
                  properties: {
                    title_ru: el.title_ru,
                    title_kz: el.title_kz,
                    title_en: el.title_en,
                    type: el.project_type,
                    id: el.id
                  }
                });
              }
            }
          }
        });

        if (!this._mapboxgl_map.getSource('sector')) {
          this._mapboxgl_map.addSource('sector', sector);
          this._mapboxgl_map.addSource('sector-line', sector_line); 

          this._mapboxgl_map.addLayer({
              id: 'current-sector',
              type: 'fill',
              source: 'sector',
              paint: {
                'fill-color': 'rgba(19, 150, 214, 0.5)',
                'fill-opacity': 0.8
              },
              filter: ['==', 'type', 1]
          });
          this._mapboxgl_map.addLayer({
                id: 'current-sector-stroke',
                type: 'line',
                source: 'sector-line',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#3585AD',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 1]
          });

          this._mapboxgl_map.addLayer({
                id: 'processing-sector',
                type: 'fill',
                source: 'sector',
                paint: {
                  'fill-color': 'rgba(229, 208, 12, 0.4)',
                  'fill-opacity': 0.8
                },
                filter: ['==', 'type', 2]
          });
          this._mapboxgl_map.addLayer({
                id: 'processing-sector-stroke',
                type: 'line',
                source: 'sector-line',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#A48C10',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 2]
          });

          this._mapboxgl_map.addLayer({
                id: 'free-sector',
                type: 'fill',
                source: 'sector',
                paint: {
                  'fill-color': 'rgba(6, 178, 23, 0.4)',
                  'fill-opacity': 0.8
                },
                filter: ['==', 'type', 3]
          });
          this._mapboxgl_map.addLayer({
                id: 'free-sector-stroke',
                type: 'line',
                source: 'sector-line',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#149541',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 3]
          });
        }

        if (!this._mapboxgl_map.getSource('sector-multi')) {
          this._mapboxgl_map.addSource('sector-multi', sector_multi);
          this._mapboxgl_map.addSource('sector-line-multi', sector_line_multi); 

          this._mapboxgl_map.addLayer({
              id: 'current-sector-multi',
              type: 'fill',
              source: 'sector-multi',
              paint: {
                'fill-color': 'rgba(19, 150, 214, 0.5)',
                'fill-opacity': 0.8
              },
              filter: ['==', 'type', 1]
          });
          this._mapboxgl_map.addLayer({
                id: 'current-sector-stroke-multi',
                type: 'line',
                source: 'sector-line-multi',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#3585AD',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 1]
          });

          this._mapboxgl_map.addLayer({
                id: 'processing-sector-multi',
                type: 'fill',
                source: 'sector-multi',
                paint: {
                  'fill-color': 'rgba(229, 208, 12, 0.4)',
                  'fill-opacity': 0.8
                },
                filter: ['==', 'type', 2]
          });
          this._mapboxgl_map.addLayer({
                id: 'processing-sector-stroke-multi',
                type: 'line',
                source: 'sector-line-multi',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#A48C10',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 2]
          });

          this._mapboxgl_map.addLayer({
                id: 'free-sector-multi',
                type: 'fill',
                source: 'sector-multi',
                paint: {
                  'fill-color': 'rgba(6, 178, 23, 0.4)',
                  'fill-opacity': 0.8
                },
                filter: ['==', 'type', 3]
          });
          this._mapboxgl_map.addLayer({
                id: 'free-sector-stroke-multi',
                type: 'line',
                source: 'sector-line-multi',
                layout: {
                  'line-join': 'round',
                  'line-cap': 'round'
                },
                paint: {
                  'line-color': '#149541',
                  'line-width': 3,
                  'line-dasharray': [2.5, 2.5]
                },
                filter: ['==', 'type', 3]
          });
        }

        this._mapboxgl_map.getSource('sector-multi').setData(sector_multi.data);
        this._mapboxgl_map.getSource('sector-line-multi').setData(sector_line_multi.data);

        this._mapboxgl_map.getSource('sector').setData(sector.data);
        this._mapboxgl_map.getSource('sector-line').setData(sector_line.data);
      }
    },

    add_objects() {
      var source_points = {
            "type": 'geojson',
            'data': {
              'type': 'FeatureCollection',
              'features': []
            }
      };
      this.objects.forEach(el => {
        if (el.st_asgeojson) {
          switch (JSON.parse(el.st_asgeojson).type) {
            case 'Point':
              source_points.data.features.push({
                'type': 'Feature',
                'geometry': JSON.parse(el.st_asgeojson),
                'properties': {
                  'type': el.type,
                  'color': el.color,
                }
              });
              break;
            case 'LineString':
              turf.explode(JSON.parse(el.st_asgeojson)).features.forEach( obj => {
                source_points.data.features.push({
                  'type': 'Feature',
                  'geometry': obj.geometry,
                  'properties': {
                    'type': el.type,
                    'color': el.color,
                  }
                });
              });
              break;
          }
        }
      });
      if (!this._mapboxgl_map.getSource('object-points')) {
        this._mapboxgl_map.addSource('object-points', source_points);
        this._mapboxgl_map.addLayer({
            "id": "object-points",
            "type": "circle",
            "source": "object-points",
            "paint": {
              'circle-color': '#fff',
              'circle-radius': [
                "interpolate", ["linear"], ["zoom"],
                13, 2,
                14, 6
              ],
              'circle-stroke-width': [
                "interpolate", ["linear"], ["zoom"],
                13, 2,
                14, 5
              ],
              'circle-stroke-color': ["get", "color"],
            }
        });
      }
      this._mapboxgl_map.getSource('object-points').setData(source_points.data);
    },

    add_infrastructures() {
      var source_infrastructures = {
          "type": 'geojson',
          'data': {
            'type': 'FeatureCollection',
            'features': []
          }
      };
      this.infrastructures.forEach(el => {
        if (el.st_asgeojson) {
          source_infrastructures.data.features.push({
            'type': 'Feature',
            'geometry': JSON.parse(el.st_asgeojson),
            'properties': {
              'type': el.type,
              'color': el.color
            }
          });
        }
      });
      if (!this._mapboxgl_map.getSource('infrastructures')) {
        this._mapboxgl_map.addSource('infrastructures', source_infrastructures);
        this._mapboxgl_map.addLayer({
          "id": "infrastructures",
          "type": "line",
          "source": "infrastructures",
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": ['get', 'color'],
            "line-width": 3
          }
        });
      }
      this._mapboxgl_map.getSource('infrastructures').setData(source_infrastructures.data);
    },

    translate() {
      switch(this.lang) {
        case 'en':
          if (this.active_level.id == 1) {
            this._mapboxgl_map.setLayoutProperty('symbols', 'text-field', '{title_en}');
            this._mapboxgl_map.setLayoutProperty('cities-name', 'text-field', '{title_en}');
          } else {
            this._mapboxgl_map.setLayoutProperty('waterway-name', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('water-name-lakeline', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('water-name-other', 'text-field', '{name:latin}');

            this._mapboxgl_map.setLayoutProperty('highway-name-path', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('highway-name-minor', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('highway-name-major', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('airport-label-major', 'text-field', '{name:latin}');

            this._mapboxgl_map.setLayoutProperty('place-other', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('place-village', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('place-town', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('place-city', 'text-field', '{name:latin}');
            this._mapboxgl_map.setLayoutProperty('place-city-capital', 'text-field', '{name:latin}');
          }
          break;
        case 'ru':
          if (this.active_level.id == 1) {
            this._mapboxgl_map.setLayoutProperty('symbols', 'text-field', '{title_ru}');
            this._mapboxgl_map.setLayoutProperty('cities-name', 'text-field', '{title}');
          } else {
            this.nonlatinLang();
          }
          break;
        case 'kz':
          if (this.active_level.id == 1) {
            this._mapboxgl_map.setLayoutProperty('symbols', 'text-field', '{title_kz}');
            this._mapboxgl_map.setLayoutProperty('cities-name', 'text-field', '{title}');
          } else {
            this.nonlatinLang();
          }
          break;
      }
    },

    nonlatinLang() {
      this._mapboxgl_map.setLayoutProperty('waterway-name', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('water-name-lakeline', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('water-name-other', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('highway-name-path', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('highway-name-minor', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('highway-name-major', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('airport-label-major', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('place-other', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('place-village', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('place-town', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('place-city', 'text-field', '{name:nonlatin}');
      this._mapboxgl_map.setLayoutProperty('place-city-capital', 'text-field', '{name:nonlatin}');
    }
  }
};
</script>

<style>
.mapboxgl-map {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
}
</style>
