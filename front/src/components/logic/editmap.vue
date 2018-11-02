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

export default {

    data() {
        return {
            draw: null,
        };
    },

    computed: mapGetters([
      'lang',
      'profile',
      'edited_sector',
      'edited_sector_geom',
      'is_reset_sector',
      'basemap',
    ]),

    watch: {
        is_reset_sector: 'reset_sector',
        basemap: 'change_basemap',
    },

    methods: {
      ...mapActions([
        'set_edited_sector_geom',
        'set_reset_sector',
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

      reset_infrustructure() {
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

    },

    async mounted() {
        // ИНИЦИАЛИЗАЦИЯ КАРТЫ

        mapboxgl.accessToken =
            'pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ';

        this._mapboxgl_map = new mapboxgl.Map({
            container: 'editmap',
            style: osm(),
        });

        this._mapboxgl_map.addControl(new mapboxgl.FullscreenControl());
        this._mapboxgl_map.addControl(new mapboxgl.NavigationControl());

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
            this.set_edited_sector_geom(this.draw.getAll());
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
