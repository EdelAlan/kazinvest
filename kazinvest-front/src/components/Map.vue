<template>
    <div id='map'>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import positron from "../assets/js/positron";
import "../assets/css/mapbox-gl.css";
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

    this.map.once("style.load", _ => {
      // this._addObjects();
    });

    this.map.on("mousemove", e => {
      var features = this.map.queryRenderedFeatures(e.point);
      if (features[0]) {
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
