<template>
    <div id='map'>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import positron from "../../assets/js/positron";
import osm from "../../assets/js/osm";
import "../../assets/css/mapbox-gl.css";
import { mapGetters, mapMutations } from "vuex";
import * as turf from "@turf/turf";

export default {
  name: "mapgl",

  data() {
    return {
      map_style: positron(),
      hoveredStateId: null,
      hoveredFeature: null,
    };
  },

  mounted() {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ";

    this._mapboxgl_map = new mapboxgl.Map({
      container: "map",
      style: positron(),
      zoom: 4.7,
      center: [67.04020349, 47.898657],
      interactive: false
    });

    var popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: { bottom: [0, -13] }
    });

    this._mapboxgl_map.fitBounds(
      turf.bbox(
        turf.lineString([[86.357452, 39.389153], [47.722955, 56.408161]])
      )
    );

    this._mapboxgl_map.on("style.load", () => {
      this._addObjects();
    });

    this._mapboxgl_map.on("mousemove", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      if (this.active_level.id == 1) {
        if (features[0] && features[0].sourceLayer != undefined) {
          this.mouseover = features[0].layer.id;
          if (this.hoveredStateId) {
            this._mapboxgl_map.setPaintProperty(
              this.hoveredStateId,
              "fill-color",
              "#03A0E3"
            );
          }
          this.hoveredStateId = features[0].layer.id;
          this.hoveredFeature = features[0];
          this._mapboxgl_map.setPaintProperty(
            this.hoveredStateId,
            "fill-color",
            "#03A0E3"
          );
        }
      }
      if (this.active_level.id == 2) {
        if (features[0]) {
          if (features[0].layer.id.startsWith('sector')) {
            this.mouseover = features[0].layer.id;
            this._mapboxgl_map.getCanvas().style.cursor = "pointer";
            popup
              .setLngLat(turf.centerOfMass(
                        turf.polygon(this._mapboxgl_map.getSource(features[0].layer.id)._data.geometry.coordinates)
                      ).geometry.coordinates )
              .setHTML(this._mapboxgl_map.getSource(features[0].layer.id)._data.geometry.properties.title)
              .addTo(this._mapboxgl_map);
          }
        }
      }
    });

    this._mapboxgl_map.on("mouseleave", "akm-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("akm-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "akt-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("akt-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "alm-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("alm-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "vko-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("vko-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "tur-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("tur-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "sko-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("sko-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "pavl-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          "pavl-obl",
          "fill-color",
          "#accad7"
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "kyz-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("kyz-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "kost-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          "kost-obl",
          "fill-color",
          "#accad7"
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "kar-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("kar-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "jamb-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          "jamb-obl",
          "fill-color",
          "#accad7"
        );
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "man-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("man-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "zko-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty("zko-obl", "fill-color", "#accad7");
        this.hoveredStateId = null;
      }
    });
    this._mapboxgl_map.on("mouseleave", "atyr-obl", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setPaintProperty(
          "atyr-obl",
          "fill-color",
          "#accad7"
        );
        this.hoveredStateId = null;
      }
    });

    this._mapboxgl_map.on("click", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);

      if (this.active_level.id == 1) {
        if (features[0].layer.id == "sez" || features[0].layer.id == "iz") {
          this._mapboxgl_map.setStyle(osm());
          this.set_level({
            id: 2,
            name: {
              ru: features[0].properties.title
            },
            features: features[0]
          });

          fetch('http://localhost:5000/api/zones/' + features[0].properties.zone_id)
            .then(res => {
              return res.json();
            })
            .then(res => {
              this._mapboxgl_map.addLayer({
                id: "zone",
                type: "line",
                source: {
                  type: "geojson",
                  data: turf.polygonToLine(
                    turf.polygon([JSON.parse([res[0].polygonfield])])
                  )
                },
                layout: {
                  "line-join": "round",
                  "line-cap": "round"
                },
                paint: {
                  "line-color": "#888",
                  "line-width": 3,
                  "line-dasharray": [5, 10]
                }
              });
              this._mapboxgl_map.fitBounds(
                turf.bbox(turf.lineString(JSON.parse(res[0].polygonfield))),
                {
                  padding: this.sidebar_expanded
                    ? { top: 75, bottom: 75, left: 200, right: 75 }
                    : 75
                }
              );
            })
            .catch(e => {
              console.error(e);
            });

          fetch(
            "http://localhost:5000/api/sectors/" +
              features[0].properties.zone_id
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              res.forEach(el => {
                if (el.sector_polygon.length > 2) {

                  if (el.project_type == 1) {
                    this._mapboxgl_map.addLayer({
                      id: "sector" + el.id,
                      type: "fill",
                      source: {
                        type: "geojson",
                        data: {
                          type: "Feature",
                          geometry: {
                            type: "Polygon",
                            coordinates: [JSON.parse(el.sector_polygon)],
                            properties: {
                              title: el.title_ru
                            }
                          }
                        }
                      },
                      layout: {},
                      paint: {
                        "fill-color": "#3498DB",
                        "fill-outline-color": "#fff",
                        "fill-opacity": 0.8
                      }
                    });
                  } else if (el.project_type == 2) {
                    this._mapboxgl_map.addLayer({
                      id: "sector" + el.id,
                      type: "fill",
                      source: {
                        type: "geojson",
                        data: {
                          type: "Feature",
                          geometry: {
                            type: "Polygon",
                            coordinates: [JSON.parse(el.sector_polygon)],
                            properties: {
                              title: el.title_ru
                            }
                          }
                        }
                      },
                      layout: {},
                      paint: {
                        "fill-color": "#F4D03F",
                        "fill-outline-color": "#fff",
                        "fill-opacity": 0.8
                      }
                    });
                  } else if (el.project_type == 3) {
                    this._mapboxgl_map.addLayer({
                      id: "sector" + el.id,
                      type: "fill",
                      source: {
                        type: "geojson",
                        data: {
                          type: "Feature",
                          geometry: {
                            type: "Polygon",
                            coordinates: [JSON.parse(el.sector_polygon)],
                            properties: {
                              title: el.title_ru
                            }
                          }
                        }
                      },
                      layout: {},
                      paint: {
                        "fill-color": "#2ECC71",
                        "fill-outline-color": "#fff",
                        "fill-opacity": 0.8
                      }
                    });
                  }
                  
                }
              });
            })
            .catch(e => {
              console.error(e);
            });
        }
      } else if (this.active_level.id == 2) {
        console.log(this._mapboxgl_map.getSource(features[0].source))
        if (features[0].layer.id.startsWith('sector')) {
          this.set_level({
            id: 3,
            name: {
              ru: this._mapboxgl_map.getSource(features[0].source)._data.geometry.properties.title
            },
            features: features[0]
          });
          this._mapboxgl_map.fitBounds(
            turf.bbox(this._mapboxgl_map.getSource(features[0].source)._data.geometry),
            {
              padding: this.sidebar_expanded
                ? { top: 75, bottom: 75, left: 200, right: 75 }
                : 75
            }
          );
        }
      }
    });

    this._mapboxgl_map.on("mouseenter", "sez", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, { layers: ['sez'] });

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
      popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on("mouseenter", "sez-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, { layers: ['sez-clusters'] });

      this._mapboxgl_map
        .getSource("sez")
        .getClusterChildren(features[0].properties.cluster_id, (err, cl_features) => {
          if (err) return;

          
      });

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
    });

    this._mapboxgl_map.on("click", "sez-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, { layers: ['sez-clusters'] });

      this._mapboxgl_map
        .getSource("sez")
        .getClusterExpansionZoom(features[0].properties.cluster_id, (err, zoom) => {
          if (err) return;

          this._mapboxgl_map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom
          });
      });
    });

    this._mapboxgl_map.on("mouseleave", "sez-clusters", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      popup.remove();
    });

    this._mapboxgl_map.on("mouseleave", "sez", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      popup.remove();
    });

    this._mapboxgl_map.on("mouseenter", "iz", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
      popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on("mouseleave", "iz", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      popup.remove();
    });
  },

  computed: mapGetters([
    "basemap", 
    "active_level", 
    "sidebar_expanded"
  ]),

  watch: {
    basemap: "change_basemap",
    sidebar_expanded: "move_map",
    active_level: "follow_level",
  },

  methods: {
    ...mapMutations(["set_level"]),

    _addObjects() {
        fetch('http://localhost:5000/api/zones/')
          .then(res => {
            return res.json();
          })
          .then(res => {
            var sez_source = {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              },
              cluster: true,
              clusterRadius: 20,
              clusterMaxZoom: 9
            };
            var iz_source = {
              type: "geojson",
              data: {
                type: "FeatureCollection",
                features: []
              },
              cluster: true,
              clusterRadius: 10,
              clusterMaxZoom: 9
            };

            res.forEach(el => {
              if (el.zone_type == 1) {
                sez_source.data.features.push({
                  type: "Feature",
                  geometry: {
                    type: "Point",
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
                  type: "Feature",
                  geometry: {
                    type: "Point",
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

            this._mapboxgl_map.addSource("sez", sez_source);
            this._mapboxgl_map.addSource("iz", iz_source);

            this._mapboxgl_map.addLayer({
              id: "iz",
              type: "symbol",
              source: "iz",
              filter: ["!", ["has", "point_count"]],
              layout: {
                "icon-image": "marker2",
                "icon-allow-overlap": true
              }
            });
            this._mapboxgl_map.addLayer({
              id: "sez",
              type: "symbol",
              source: "sez",
              filter: ["!", ["has", "point_count"]],
              layout: {
                "icon-image": "marker",
                "icon-allow-overlap": true
              }
            });

            this._mapboxgl_map.addLayer({
              id: "sez-clusters",
              type: "circle",
              source: "sez",
              filter: ["has", "point_count"],
              paint: {
                  "circle-color": "#2ECC71",
                  "circle-radius": 8,
                  "circle-stroke-color": "#fff",
                  "circle-stroke-width": 3
              }
            });
            this._mapboxgl_map.addLayer({
              id: "sez-cluster-count",
              type: "symbol",
              source: "sez",
              filter: ["has", "point_count"],
              layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12
              }
            });
            this._mapboxgl_map.addLayer({
              id: "iz-clusters",
              type: "circle",
              source: "iz",
              filter: ["has", "point_count"],
              paint: {
                  "circle-color": "#F39C12",
                  "circle-radius": 10,
                  "circle-stroke-color": "#fff"
              }
            });
            this._mapboxgl_map.addLayer({
              id: "iz-cluster-count",
              type: "symbol",
              source: "iz",
              filter: ["has", "point_count"],
              layout: {
                "text-field": "{point_count_abbreviated}",
                "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
                "text-size": 12
              }
            });
          })
          .catch(e => {
            console.error(e);
          });
    },

    change_basemap() {
      this._mapboxgl_map.setLayoutProperty(
        "bing",
        "visibility",
        this.basemap ? "visible" : "none"
      );
    },

    move_map() {
      if (this.active_level.id == 1) {
        if (this.sidebar_expanded) {
          this._mapboxgl_map.fitBounds(
            turf.bbox(
              turf.lineString([[34.309517, 52.990292], [86.383498, 41.286791]])
            ),
            {
              padding: 70
            }
          );
        } else {
          this._mapboxgl_map.fitBounds(
            turf.bbox(
              turf.lineString([[86.357452, 39.389153], [47.722955, 56.408161]])
            )
          );
        }
      }
    },

    follow_level() {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.setStyle(positron());
        this._addObjects();
        this._mapboxgl_map.fitBounds(
            turf.bbox(
              turf.lineString([[34.309517, 52.990292], [86.383498, 41.286791]])
            ),
            {
              padding: 70
            }
        );
      } else if (this.active_level.id == 2) {

      }
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
