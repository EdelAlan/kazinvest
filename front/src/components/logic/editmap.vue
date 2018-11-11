<template>
    <div id='editmap'>
    </div>
</template>

<script>
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import osm from '../../assets/js/osm';
import '../../assets/css/mapbox-gl.css';
import { mapGetters, mapActions } from 'vuex';
import * as turf from '@turf/turf';
import { geometry } from '@turf/turf';

export default {

    data() {
        return {
            draw: null,
        };
    },

    props: ['is_sector'],

    computed: mapGetters([
      'lang',
      'profile',
      'edited_zone',
      'edited_zone_geom',
      'edited_sector',
      'edited_sector_geom',
      'is_reset_sector',
      'basemap',
      'show_on_map_geom',
      'infrastructures',
      'objects',
      'geom',
    ]),

    methods: {
      ...mapActions([
        'set_edited_zone_geom',
        'set_reset_zone',
        'set_edited_sector_geom',
        'set_reset_sector',
        'save_geom',
        'set_active',
      ]),

      reset_sector() {
          if (this.is_reset_sector) {
            this.set_edited_sector_geom({
                'type': 'Feature',
                'geometry': JSON.parse(this.edited_sector.st_asgeojson),
                'properties': {}
            });
            this.draw.deleteAll();
            this.draw.add({
                'type': 'Feature',
                'geometry': JSON.parse(this.edited_sector.st_asgeojson),
                'properties': {}
            });
            this.set_reset_sector();
          }
      },

      change_basemap() {
        this._mapboxgl_map.setLayoutProperty(
          'bing',
          'visibility',
          this.basemap ? 'visible' : 'none'
        );
      },

      async set_geom() {
        let geom = {
            'type': 'Feature',
            'geometry': JSON.parse(this.show_on_map_geom.st_asgeojson),
            'properties': {}
        };
        this.set_active(false);
        if (this.show_on_map_geom.type > 12) {
            this._mapboxgl_map.removeControl(this.draw);
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    point: true,
                    trash: true,
                }
            });
            this._mapboxgl_map.addControl(this.draw);
            this.draw.add(turf.explode(geom));
        } else {
            this._mapboxgl_map.removeControl(this.draw);
            this.draw = new MapboxDraw({
                displayControlsDefault: false,
                controls: {
                    line_string: true,
                    trash: true,
                }
            });
            this._mapboxgl_map.addControl(this.draw);
            this.draw.add(geom);
        }

        if (this.show_on_map_geom) {
            this.save_geom({
                geom: geom,
                id: this.show_on_map_geom.id,
                type: this.show_on_map_geom.type,
            });
        }
      },

      add_infrastructures(show_on_map_geom) {
        var source_infrastructures = {
            "type": 'geojson',
            'data': {
                'type': 'FeatureCollection',
                'features': []
            }
        };
        
        source_infrastructures.data.features.push({
            'type': 'Feature',
            'geometry': JSON.parse(show_on_map_geom.st_asgeojson),
            'properties': {
                'capacity': show_on_map_geom.capacity && show_on_map_geom.unit ? '<br>' + show_on_map_geom.capacity + ' ' + show_on_map_geom.unit : '',
                'color': show_on_map_geom.color,
                'title_ru': show_on_map_geom.title_ru,
                'title_en': show_on_map_geom.title_en,
                'title_kz': show_on_map_geom.title_kz,
                'geom': show_on_map_geom.st_asgeojson,
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

      add_objects(show_on_map_geom) {
        var source_points = {
                "type": 'geojson',
                'data': {
                'type': 'FeatureCollection',
                'features': []
                }
        };
        
        switch (JSON.parse(show_on_map_geom.st_asgeojson).type) {
            case 'Point':
                source_points.data.features.push({
                    'type': 'Feature',
                    'geometry': JSON.parse(show_on_map_geom.st_asgeojson),
                    'properties': {
                    'capacity': show_on_map_geom.capacity && show_on_map_geom.unit ? '<br>' + show_on_map_geom.capacity + ' ' + show_on_map_geom.unit : '',
                    'color': show_on_map_geom.color,
                    'title_ru': show_on_map_geom.title_ru,
                    'title_en': show_on_map_geom.title_en,
                    'title_kz': show_on_map_geom.title_kz,
                    'geom': show_on_map_geom.st_asgeojson,
                    }
                });
            break;
            case 'LineString':
                turf.explode(JSON.parse(show_on_map_geom.st_asgeojson)).features.forEach( obj => {
                    source_points.data.features.push({
                    'type': 'Feature',
                    'geometry': obj.geometry,
                    'properties': {
                        'capacity': show_on_map_geom.capacity && show_on_map_geom.unit ? '<br>' + show_on_map_geom.capacity + ' ' + show_on_map_geom.unit : '',
                        'color': show_on_map_geom.color,
                        'title_ru': show_on_map_geom.title_ru,
                        'title_en': show_on_map_geom.title_en,
                        'title_kz': show_on_map_geom.title_kz,
                        'geom': show_on_map_geom.st_asgeojson,
                    }
                    });
                });
            break;
        }
     
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

    },

    watch: {
        show_on_map_geom: 'set_geom',
        basemap: 'change_basemap',
        is_reset_sector: 'reset_sector',
    },

    async mounted() {
        // ИНИЦИАЛИЗАЦИЯ КАРТЫ

        mapboxgl.accessToken =
            'pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ';

        this._mapboxgl_map = new mapboxgl.Map({
            container: 'editmap',
            style: osm(),
        });

        this.popupm = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
            offset: { bottom: [0, -13] }
        });

        this._mapboxgl_map.addControl(new mapboxgl.FullscreenControl());
        this._mapboxgl_map.addControl(new mapboxgl.NavigationControl());

        switch(this.is_sector) {
            case true:
                this.draw = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        polygon: true,
                        trash: true,
                    }
                });
                this._mapboxgl_map.addControl(this.draw);

                this._mapboxgl_map.on('style.load', () => {
                    this._mapboxgl_map.jumpTo( {
                        center: turf.centerOfMass(JSON.parse(this.edited_sector.st_asgeojson)).geometry.coordinates,
                        zoom: 13,
                        around: turf.centerOfMass(JSON.parse(this.edited_sector.st_asgeojson)).geometry.coordinates
                    }, { 
                        padding: 50 
                    });
                    this.set_edited_sector_geom({
                        'type': 'Feature',
                        'geometry': JSON.parse(this.edited_sector.st_asgeojson),
                        'properties': {}
                    });

                    this.draw.add({
                        'type': 'Feature',
                        'geometry': JSON.parse(this.edited_sector.st_asgeojson),
                        'properties': {}
                    });

                });

                this._mapboxgl_map.on('draw.update', () => {
                    this.set_edited_sector_geom(turf.combine(this.draw.getAll()).features[0]);
                });
                this._mapboxgl_map.on('draw.create', () => {
                    this.set_edited_sector_geom(turf.combine(this.draw.getAll()).features[0]);
                });
                this._mapboxgl_map.on('draw.delete', () => {
                    this.set_edited_sector_geom(turf.combine(this.draw.getAll()).features[0]);
                });
            break;
            case false:
                this.draw = new MapboxDraw({
                    displayControlsDefault: false,
                    controls: {
                        line_string: true,
                        trash: true,
                    }
                });
                this._mapboxgl_map.addControl(this.draw);

                this._mapboxgl_map.on('style.load', async () => {
                    this._mapboxgl_map.jumpTo( {
                        center: turf.centerOfMass(JSON.parse(this.edited_zone.st_asgeojson)).geometry.coordinates,
                        zoom: 13,
                        around: turf.centerOfMass(JSON.parse(this.edited_zone.st_asgeojson)).geometry.coordinates
                    }, { 
                        padding: 50 
                    });

                    this._mapboxgl_map.on('draw.create', () => {
                        this.save_geom({
                            geom: turf.combine(this.draw.getAll()).features[0],
                            id: this.show_on_map_geom.id,
                            type: this.show_on_map_geom.type,
                        });
                        this.set_active(true);
                    });
                    this._mapboxgl_map.on('draw.update', () => {
                        this.save_geom({
                            geom: turf.combine(this.draw.getAll()).features[0],
                            id: this.show_on_map_geom.id,
                            type: this.show_on_map_geom.type,
                        });
                        this.set_active(true);
                    });
                    this._mapboxgl_map.on('draw.delete', () => {
                        this.save_geom({
                            geom: turf.combine(this.draw.getAll()).features[0],
                            id: this.show_on_map_geom.id,
                            type: this.show_on_map_geom.type,
                        });
                        this.set_active(true);
                    });
                });
            break;
        }

        this._mapboxgl_map.on('mousemove', 'object-points', e => {
            var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
                layers: ['object-points']
            });

            this._mapboxgl_map.getCanvas().style.cursor = 'pointer';

            this.popupm
                .setLngLat(features[0].geometry.coordinates.slice())
                .setHTML(features[0].properties['title_' + this.lang] + features[0].properties.capacity)
                .addTo(this._mapboxgl_map);
            
        });

        this._mapboxgl_map.on('mouseleave', 'object-points', e => {
            this._mapboxgl_map.getCanvas().style.cursor = '';
            this.popupm.remove();
        });

        this._mapboxgl_map.on('mousemove', 'infrastructures', e => {
            var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
                layers: ['infrastructures']
            });

            this._mapboxgl_map.getCanvas().style.cursor = 'pointer';
            this.popupm
                .setLngLat([e.lngLat.lng, e.lngLat.lat])
                .setHTML(features[0].properties['title_' + this.lang] + features[0].properties.capacity)
                .addTo(this._mapboxgl_map);
        });

        this._mapboxgl_map.on('mouseleave', 'infrastructures', e => {
            this._mapboxgl_map.getCanvas().style.cursor = '';
            this.popupm.remove();
        });

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
