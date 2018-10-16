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

    console.log(32423)
    await this.set_republics(this.$route);
    await this.set_zones();

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
            if (provinces[0] && !zones[0] && !clusters[0]) {
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
      // this.popupm.remove();
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'processing-sector', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      // this.popupm.remove();
      this.show_popup();
    });
    this._mapboxgl_map.on('mouseleave', 'free-sector', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      // this.popupm.remove();
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
              zoom: zoom
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
      // this.popupm.remove();

      this.show_popup();
    });

    // 
    //
    //

    this._mapboxgl_map.on('mouseenter', 'object-points', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ['object-points']
      });

      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
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
  },

  methods: {
    ...mapActions([
      'set_zones', 
      'set_sectors', 
      'set_republics', 
      'set_level',
      'set_infrastructures',
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
              title_kz: "Astana",
              title_en: "Астана",
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
        clusterRadius: 20,
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
