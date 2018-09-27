<template>
    <div id='map'>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import positron from "../../assets/js/positron";
import "../../assets/css/mapbox-gl.css";
import { mapGetters } from "vuex";

export default {
  name: "mapgl",
  data() {
    return {
      hoveredStateId: null,
      hoveredFeature: null
    };
  },
  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ";
    this.map = new mapboxgl.Map({
      container: "map",
      style: positron(),
      zoom: 4,
      center: [62.0672845, 48.3718379],
      interactive: false
    });

    this.map.on("load", _ => {
      // this._addObjects();

      this.map.addLayer({
        "id": "sez",
        "type": "symbol",
        "source": {
          "type": "geojson",
          "data": {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "properties": {},
                  "coordinates": [80.23772478103639, 44.21026476671932]
                },
                "properties": {
                  "title": "Хоргос - Восточные ворота"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [44.238816, 80.350786]
                },
                "properties": {
                  "title": "Международный центр приграничного сотрудничества «Хоргос»"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [77.144503, 43.343108]
                },
                "properties": {
                  "title": "Парк инновационных технологий"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [73.59760522842409, 43.50232444502018]
                },
                "properties": {
                  "title": "Химический парк Тараз"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [69.64606761932374, 42.24278385574829]
                },
                "properties": {
                  "title": "Оңтүстік"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [51.21002197265626, 43.619238579046694]
                },
                "properties": {
                  "title": "Морпорт Актау"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [52.24822998046876, 47.351908008336025]
                },
                "properties": {
                  "title": "Специальная экономическая зона «Национальный индустриальный нефтехимический технопарк»"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [73.24087411165239, 49.912379774883284]
                },
                "properties": {
                  "title": "Сарыарқа"
                }
              },
              {
                "type": "Feature",
                "geometry": {
                  "type": "Point",
                  "coordinates": [76.91554069519044, 52.383353419833725]
                },
                "properties": {
                  "title": "Павлодар"
                }
              },
              {
                "type": "Feature",
                'geometry': {
                  "type": "Point",
                  "coordinates": [71.49438858032228, 51.17256293114924]
                },
                "properties": {
                  "title": "Астана - новый город"
                }
              },
              {
                "type": "Feature",
                'geometry': {
                  "type": "Point",
                  "coordinates": [71.61867141723634, 51.17175571614918]
                },
                "properties": {
                  "title": "Астана-Технополис"
                }
              }
            ]
          }
        },
        "layout": {
            "icon-image": "marker"
        }
      });

    });

    this.map.on("mousemove", e => {
      var features = this.map.queryRenderedFeatures(e.point);
      if (features[0] && features[0].sourceLayer != undefined) {
        if (this.hoveredStateId) {
          this.map.setFeatureState(
            {
              source: "composite",
              id: this.hoveredStateId,
              sourceLayer: features[0].sourceLayer
            },
            { hover: false }
          );
        }
        this.hoveredStateId = features[0].id;
        this.hoveredFeature = features[0];
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: features[0].sourceLayer
          },
          { hover: true }
        );
      }
    });

    this.map.on('click', e => {
        var features = this.map.queryRenderedFeatures(e.point);
        console.log(features[0]);
    });

    var popup = new mapboxgl.Popup({
        closeButton: false,
        closeOnClick: false
    });

    this.map.on('mouseenter', "sez", e => {
        var features = this.map.queryRenderedFeatures(e.point);
        this.map.getCanvas().style.cursor = 'pointer';
        popup.setLngLat(features[0].geometry.coordinates.slice())
            .setHTML(features[0].properties.title)
            .addTo(this.map)
    });

    this.map.on('mouseleave', "sez", e => {
        this.map.getCanvas().style.cursor = '';
        popup.remove();
    });

    this.map.on("mouseleave", "akm-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "akm_obl-b70enu"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "akt-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "akt_obl-0or7p0"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "alm-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "alm_obl-07xgak"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "vko-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "vko"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "tur-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "tur_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "sko-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "sko"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "pavl-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "pavl_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "kyz-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "kyz_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "kost-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "kost_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "kar-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "kar_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "jamb-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "jamb_obl"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "man-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "man_obl-9taiot"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "zko-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "zko_obl-8qi6mt"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
    this.map.on("mouseleave", "atyr-obl", _ => {
      if (this.hoveredStateId) {
        this.map.setFeatureState(
          {
            source: "composite",
            id: this.hoveredStateId,
            sourceLayer: "atyr_obl-3y40uz"
          },
          { hover: false }
        );
      }
      this.hoveredStateId = null;
    });
  },
  computed: {
    // ...mapGetters({
    //     geometries: 'getGeometries',
    // }),
  },
  methods: {}
};
</script>

<style>
.mapboxgl-map {
  height: 100%;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}
</style>
