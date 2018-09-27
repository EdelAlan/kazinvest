<template>
    <div id='map'>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import positron from '../../assets/js/positron';
import osm from '../../assets/js/osm';
import '../../assets/css/mapbox-gl.css';
import { mapGetters } from 'vuex';
import * as turf from '@turf/turf';

export default {
  name: 'mapgl',
  data() {
    return {
      map_style: positron(),
      hoveredStateId: null,
      hoveredFeature: null,
      map_level: 1
    };
  },
  mounted() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ';

    this._mapboxgl_map = new mapboxgl.Map({
      container: 'map',
      style: positron(),
      zoom: 4,
      center: [62.0672845, 48.3718379],
      interactive: false
    });

    this._addObjects();

    this._mapboxgl_map.on('mousemove', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      if (this.map_level == 1) {
        if (features[0] && features[0].sourceLayer != undefined) {
          if (this.hoveredStateId) {
            this._mapboxgl_map.setPaintProperty(
              this.hoveredStateId,
              'fill-color',
              '#03A0E3'
            );
          }
          this.hoveredStateId = features[0].layer.id;
          this.hoveredFeature = features[0];
          this._mapboxgl_map.setPaintProperty(
            this.hoveredStateId,
            'fill-color',
            '#03A0E3'
          );
        }
      }
      if (this.map_level == 2) {
        console.log(features.length);
      }
    });

    this._mapboxgl_map.on('mouseleave', 'akm-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('akm-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'akt-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('akt-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'alm-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('alm-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'vko-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('vko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'tur-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('tur-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'sko-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('sko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'pavl-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty(
          'pavl-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kyz-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('kyz-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kost-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty(
          'kost-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'kar-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('kar-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'jamb-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty(
          'jamb-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'man-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('man-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'zko-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty('zko-obl', 'fill-color', '#accad7');
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on('mouseleave', 'atyr-obl', _ => {
      if (this.map_level == 1) {
        this._mapboxgl_map.setPaintProperty(
          'atyr-obl',
          'fill-color',
          '#accad7'
        );
        this.hoveredStateId = null;
      }
    });

    this._mapboxgl_map.on('click', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);

      if (this.map_level == 1) {
        if (features[0].layer.id == 'sez' || features[0].layer.id == 'iz') {
          this._mapboxgl_map.setStyle(osm());
          this.map_level = 2;

          fetch('http://localhost:5000/zone/' + features[0].properties.zone_id)
            .then(res => {
              return res.json();
            })
            .then(res => {
              this._mapboxgl_map.addLayer({
                id: 'zone',
                type: 'line',
                source: {
                  type: 'geojson',
                  data: turf.polygonToLine(
                    turf.polygon([JSON.parse([res[0].polygonfield])])
                  )
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
              this._mapboxgl_map.fitBounds(
                turf.bbox(turf.lineString(JSON.parse(res[0].polygonfield))),
                {
                  padding: 75
                }
              );
            })
            .catch(e => {
              console.error(e);
            });

          fetch(
            'http://localhost:5000/sector/' + features[0].properties.zone_id
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              res.forEach(el => {
                if (el.sector_polygon.length > 2) {
                  this._mapboxgl_map.addLayer({
                    id: 'sector' + el.id,
                    type: 'fill',
                    source: {
                      type: 'geojson',
                      data: {
                        type: 'Feature',
                        geometry: {
                          type: 'Polygon',
                          coordinates: [JSON.parse(el.sector_polygon)]
                        }
                      }
                    },
                    layout: {},
                    paint: {
                      'fill-color': '#088',
                      'fill-outline-color': '#fff',
                      'fill-opacity': 0.8
                    }
                  });
                }
              });
            })
            .catch(e => {
              console.error(e);
            });
        }
      }
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: { bottom: [0, -13] }
    });

    this._mapboxgl_map.on('mouseenter', 'sez', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
      popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on('mouseleave', 'sez', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      popup.remove();
    });

    this._mapboxgl_map.on('mouseenter', 'iz', e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
      popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on('mouseleave', 'iz', e => {
      this._mapboxgl_map.getCanvas().style.cursor = '';
      popup.remove();
    });
  },
  computed: {
    // ...mapGetters({
    //     geometries: 'getGeometries',
    // }),
  },
  methods: {
    _addObjects() {
      this._mapboxgl_map.on('style.load', () => {
        fetch('http://localhost:5000/zone/')
          .then(res => {
            return res.json();
          })
          .then(res => {
            var sez_source = {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
            };
            var iz_source = {
              type: 'geojson',
              data: {
                type: 'FeatureCollection',
                features: []
              }
            };

            res.forEach(el => {
              if (el.zone_type == 1) {
                sez_source.data.features.push({
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    properties: {},
                    coordinates: turf.centerOfMass(
                      turf.polygon([JSON.parse(el.polygonfield)])
                    ).geometry.coordinates
                  },
                  properties: {
                    title: el.title_ru,
                    name: el.title_en,
                    zone_id: el.id
                  }
                });
              }
              if (el.zone_type == 2) {
                iz_source.data.features.push({
                  type: 'Feature',
                  geometry: {
                    type: 'Point',
                    properties: {},
                    coordinates: turf.centerOfMass(
                      turf.polygon([JSON.parse(el.polygonfield)])
                    ).geometry.coordinates
                  },
                  properties: {
                    title: el.title_ru,
                    name: el.title_en,
                    zone_id: el.id
                  }
                });
              }
            });

            this._mapboxgl_map.addSource('sez', sez_source);
            this._mapboxgl_map.addSource('iz', iz_source);

            this._mapboxgl_map.addLayer({
              id: 'iz',
              type: 'symbol',
              source: 'iz',
              layout: {
                'icon-image': 'marker2',
                'icon-allow-overlap': true
              }
            });
            this._mapboxgl_map.addLayer({
              id: 'sez',
              type: 'symbol',
              source: 'sez',
              layout: {
                'icon-image': 'marker',
                'icon-allow-overlap': true
              }
            });
          })
          .catch(e => {
            console.error(e);
          });
      });
    }
  }
};
</script>

<style>
#map {
  /* width: 100%;
        height: 100%;
        position: absolute;
        margin: 0;
        z-index: 1; */
}

.mapboxgl-map {
  height: 100%;
  width: 100%;
  background-color: #fff;
  position: absolute;
  top: 0;
}
</style>
