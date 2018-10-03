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
      hoveredStateId: null,
      hoveredFeature: null,
      popup: null
    };
  },

  mounted() {
    // ИНИЦИАЛИЗАЦИЯ КАРТЫ

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ";

    this._mapboxgl_map = new mapboxgl.Map({
      container: "map",
      style: positron(),
      zoom: 4.7,
      center: [67.04020349, 47.898657],
      interactive: false
    });

    this.popup = new mapboxgl.Popup({
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

    // ИВЭНТЫ НА КАРТЕ

    this._mapboxgl_map.on("click", e => {
      if (this._mapboxgl_map.isStyleLoaded()) {
        switch (this.active_level.id) {
          case 1:
            var zones = this._mapboxgl_map.queryRenderedFeatures(e.point, { layers: ["sez","iz"] });
            if (zones[0]) {
              this._mapboxgl_map.setStyle(osm());
              this.set_level({
                id: 2,
                name: {
                  ru: zones[0].properties.title
                },
                features: zones[0]
              });
            }
            break;
          case 2:
            var sectors = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ["current-sector", "processing-sector", "free-sector"]
            });
            if (sectors[0]) {
              this._mapboxgl_map.getCanvas().style.cursor = "";
              this.set_level({
                id: 3,
                name: {
                  ru: sectors[0].properties.title
                },
                features: sectors[0]
              });
              this._mapboxgl_map.fitBounds(turf.bbox(sectors[0].geometry), {
                padding: this.sidebar_expanded
                  ? { top: 150, bottom: 150, left: 200, right: 150 }
                  : 150
              });
              this._mapboxgl_map.setStyle(osm());
              this._mapboxgl_map.addLayer({
                id: "sector",
                type: "fill",
                source: {
                  type: "geojson",
                  data: {
                    type: "Feature",
                    geometry: {
                      type: "Polygon",
                      coordinates: sectors[0]._geometry.coordinates,
                      properties: sectors[0].properties
                    }
                  }
                },
                layout: {},
                paint: sectors[0].layer.paint
              });
              this._mapboxgl_map.addLayer({
                "id": "sector-stroke",
                "type": "line",
                "source": {
                  "type": "geojson",
                  "data": {
                    "type": "Feature",
                    "geometry": {
                      "type": "LineString",
                      "coordinates": turf.polygonToLine(turf.polygon(sectors[0]._geometry.coordinates)).geometry.coordinates,
                      "properties": sectors[0].properties
                    }
                  }
                },
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": sectors[0].properties.type == 1 ? "#3585AD" :
                                  sectors[0].properties.type == 2 ? "#A48C10" : '#149541',
                  "line-width": 3,
                  "line-dasharray": [2.5, 2.5]
                }
              });
            }
            break;
        }
      }
    });

    this._mapboxgl_map.on("mousemove", e => {
      if (this._mapboxgl_map.isStyleLoaded()) {
        switch (this.active_level.id) {
          case 1:
            var cities = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ["astana", "shymkent", "almaty"]
            });
            var provinces = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: [
                "akm-obl",
                "akt-obl",
                "alm-obl",
                "atyr-obl",
                "vko-obl",
                "tur-obl",
                "sko-obl",
                "pavl-obl",
                "kyz-obl",
                "kost-obl",
                "kar-obl",
                "jamb-obl",
                "man-obl",
                "zko-obl"
              ]
            });

            if (provinces[0]) {
              this.mouseover = provinces[0].layer.id;
              if (this.hoveredStateId) {
                this._mapboxgl_map.setPaintProperty(
                  this.hoveredStateId,
                  "fill-color",
                  "#03A0E3"
                );
              }
              this.hoveredStateId = provinces[0].layer.id;
              this.hoveredFeature = provinces[0];
              this._mapboxgl_map.setPaintProperty(
                this.hoveredStateId,
                "fill-color",
                "#03A0E3"
              );
            }
            if (cities[0]) {
              this._mapboxgl_map.getCanvas().style.cursor = "pointer";
              this._mapboxgl_map.setPaintProperty(
                cities[0].layer.id,
                "circle-color",
                "#fff"
              );
              this._mapboxgl_map.setPaintProperty(
                cities[0].layer.id,
                "circle-stroke-color",
                "#C30D0D"
              );
            }
            break;
          case 2:
            var sectors = this._mapboxgl_map.queryRenderedFeatures(e.point, {
              layers: ["current-sector", "processing-sector", "free-sector"]
            });
            if (sectors[0]) {
              this._mapboxgl_map.getCanvas().style.cursor = "pointer";
              this.popup
                .setLngLat(
                  turf.centerOfMass(turf.polygon(sectors[0].geometry.coordinates))
                    .geometry.coordinates
                )
                .setHTML(sectors[0].properties.title)
                .addTo(this._mapboxgl_map);
            }
            break;
        }
      }
    });

    // mouseleave ПЕРВЫЙ УРОВЕНЬ ГОРОДА

    this._mapboxgl_map.on("mouseleave", "astana", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this._mapboxgl_map.setPaintProperty(
          "astana",
          "circle-color",
          "#C30D0D"
        );
        this._mapboxgl_map.setPaintProperty(
          "astana",
          "circle-stroke-color",
          "#fff"
        );
      }
    });
    this._mapboxgl_map.on("mouseleave", "almaty", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this._mapboxgl_map.setPaintProperty(
          "almaty",
          "circle-color",
          "#C30D0D"
        );
        this._mapboxgl_map.setPaintProperty(
          "almaty",
          "circle-stroke-color",
          "#fff"
        );
      }
    });
    this._mapboxgl_map.on("mouseleave", "shymkent", _ => {
      if (this.active_level.id == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this._mapboxgl_map.setPaintProperty(
          "shymkent",
          "circle-color",
          "#C30D0D"
        );
        this._mapboxgl_map.setPaintProperty(
          "shymkent",
          "circle-stroke-color",
          "#fff"
        );
      }
    });

    // mouseleave ПЕРВЫЙ УРОВЕНЬ ДЛЯ ОБЛАСТЕЙ (ЗАРЕФАКТОРИТЬ)

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

    // ИВЭНТЫ ПЕРВОГО УРОВНЯ (СЭЗ) – КЛАСТЕРЫ, МАРКЕРЫ

    this._mapboxgl_map.on("click", "sez-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["sez-clusters"]
      });

      this._mapboxgl_map
        .getSource("sez")
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

    this._mapboxgl_map.on("mouseenter", "sez-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["sez-clusters"]
      });

      this._mapboxgl_map
        .getSource("sez")
        .getClusterChildren(
          features[0].properties.cluster_id,
          (err, cl_features) => {
            if (err) return;
          }
        );

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
    });

    this._mapboxgl_map.on("mouseleave", "sez-clusters", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      this.popup.remove();
    });

    this._mapboxgl_map.on("mouseenter", "sez", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["sez"]
      });

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
      this.popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on("mouseleave", "sez", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      this.popup.remove();
    });

    // ИВЭНТЫ ПЕРВОГО УРОВНЯ (ИЗ) – КЛАСТЕРЫ, МАРКЕРЫ

    this._mapboxgl_map.on("click", "iz-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["iz-clusters"]
      });

      this._mapboxgl_map
        .getSource("iz")
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

    this._mapboxgl_map.on("mouseenter", "iz-clusters", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["iz-clusters"]
      });

      this._mapboxgl_map
        .getSource("iz")
        .getClusterChildren(
          features[0].properties.cluster_id,
          (err, cl_features) => {
            if (err) return;
          }
        );

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
    });

    this._mapboxgl_map.on("mouseleave", "iz-clusters", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      this.popup.remove();
    });

    this._mapboxgl_map.on("mouseenter", "iz", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point);
      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
      this.popup
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(features[0].properties.title)
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on("mouseleave", "iz", e => {
      this._mapboxgl_map.getCanvas().style.cursor = "";
      this.popup.remove();
    });
  },

  computed: mapGetters(["basemap", "active_level", "sidebar_expanded"]),

  watch: {
    basemap: "change_basemap",
    sidebar_expanded: "move_map",
    active_level: "follow_level"
  },

  methods: {
    ...mapMutations(["set_level"]),

    _addObjects() {
      this._mapboxgl_map.addLayer({
        id: "astana",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [71.463959, 51.154918]
            },
            properties: {
              title: "Астана"
            }
          }
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#C30D0D",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });

      this._mapboxgl_map.addLayer({
        id: "almaty",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [76.904369, 43.23711]
            },
            properties: {
              title: "Алматы"
            }
          }
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#C30D0D",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });

      this._mapboxgl_map.addLayer({
        id: "shymkent",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [69.591172, 42.335432]
            },
            properties: {
              title: "Шымкент"
            }
          }
        },
        paint: {
          "circle-radius": 6,
          "circle-color": "#C30D0D",
          "circle-stroke-width": 2,
          "circle-stroke-color": "#fff"
        }
      });

      fetch("http://localhost:5000/back/api/zones/")
        .then(res => {
          return res.json();
        })
        .then(res => {
          var zone = {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: []
            },
            cluster: true,
            clusterRadius: 20,
            clusterMaxZoom: 9
          };

          res.forEach(el => {
            // geom
            if (el.polygonfield) {
              zone.data.features.push({
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
                  zone_id: el.id,
                  type: el.zone_type
                }
              });
            }
          });

          this._mapboxgl_map.addSource("zone", zone);

          this._mapboxgl_map.addLayer({
            id: "sez",
            type: "symbol",
            source: "zone",
            filter: ["all", ["!has", "point_count"], ["==", "type", 1]],
            layout: {
              "icon-image": "marker",
              "icon-allow-overlap": true
            }
          });
          this._mapboxgl_map.addLayer({
            id: "sez-clusters",
            type: "circle",
            source: "zone",
            filter: ["all", ["has", "point_count"], ["==", "type", 1]],
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
            source: "zone",
            filter: ["all", ["has", "point_count"], ["==", "type", 1]],
            layout: {
              "text-field": "{point_count_abbreviated}",
              "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
              "text-size": 12
            }
          });

          this._mapboxgl_map.addLayer({
            id: "iz",
            type: "symbol",
            source: "zone",
            filter: ["all", ["!has", "point_count"], ["==", "type", 2]],
            layout: {
              "icon-image": "marker2",
              "icon-allow-overlap": true
            }
          });
          this._mapboxgl_map.addLayer({
            id: "iz-clusters",
            type: "circle",
            source: "zone",
            filter: ["all", ["has", "point_count"], ["==", "type", 2]],
            paint: {
              "circle-color": "#F39C12",
              "circle-radius": 10,
              "circle-stroke-color": "#fff",
              "circle-stroke-width": 3
            }
          });
          this._mapboxgl_map.addLayer({
            id: "iz-cluster-count",
            type: "symbol",
            source: "zone",
            filter: ["all", ["has", "point_count"], ["==", "type", 2]],
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
      switch (this.active_level.id) {
        case 1:
          if (this.sidebar_expanded) {
            this._mapboxgl_map.fitBounds(
              turf.bbox(
                turf.lineString([
                  [34.309517, 52.990292],
                  [86.383498, 41.286791]
                ])
              ),
              {
                padding: 70
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

    follow_level() {
      this.popup.remove();
      switch (this.active_level.id) {
        case 1:
          this._mapboxgl_map.scrollZoom.disable();
          this._mapboxgl_map.dragPan.disable();
          this._mapboxgl_map.setStyle(positron());
          this._addObjects();
          this._mapboxgl_map.flyTo({
            center: [60.131017, 49.205201],
            zoom: 4,
            speed: 5
          });
          break;
        case 2:
          this._mapboxgl_map.setMaxBounds(turf.bbox( turf.lineString([[86.357452, 39.389153], [47.722955, 56.408161]]) ));
          this._mapboxgl_map.scrollZoom.enable();
          this._mapboxgl_map.dragPan.enable();
          this._mapboxgl_map.setStyle(osm());
          if (this.basemap) {
            this._mapboxgl_map.setLayoutProperty('bing', 'visibility', 'visible');
          }

          fetch(
            "http://localhost:5000/back/api/zones/" +
              this.active_level.features.properties.zone_id
          )
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
              this._mapboxgl_map.jumpTo(
                {
                  center: turf.centerOfMass(
                    turf.polygon([JSON.parse([res[0].polygonfield])])
                  ).geometry.coordinates,
                  zoom: 13,
                  around: turf.centerOfMass(
                    turf.polygon([JSON.parse([res[0].polygonfield])])
                  ).geometry.coordinates
                },
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
            "http://localhost:5000/back/api/sectors/geom/" +
              this.active_level.features.properties.zone_id
          )
            .then(res => {
              return res.json();
            })
            .then(res => {
              var sector = {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: []
                }
              };

              var sector_line = {
                type: "geojson",
                data: {
                  type: "FeatureCollection",
                  features: []
                }
              };

              res.forEach(el => {
                if (el.st_asgeojson) {
                  if (JSON.parse(el.st_asgeojson).type == "Polygon") {
                    sector.data.features.push({
                      type: "Feature",
                      geometry: JSON.parse(el.st_asgeojson),
                      properties: {
                        title: el.title_ru,
                        type: el.project_type
                      }
                    });

                    sector_line.data.features.push({
                      type: "Feature",
                      geometry: turf.polygonToLine(JSON.parse(el.st_asgeojson)).geometry,
                      properties: {
                        title: el.title_ru,
                        type: el.project_type
                      }
                    });
                  }
                }
              });

              this._mapboxgl_map.addSource("sector", sector);
              this._mapboxgl_map.addSource("sector-line", sector_line);

              this._mapboxgl_map.addLayer({
                id: "current-sector",
                type: "fill",
                source: "sector",
                paint: {
                  "fill-color": "rgba(19, 150, 214, 0.5)",
                  "fill-opacity": 0.8
                },
                filter: ["==", "type", 1]
              });
              this._mapboxgl_map.addLayer({
                "id": "current-sector-stroke",
                "type": "line",
                "source": "sector-line",
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": "#3585AD",
                  "line-width": 3,
                  "line-dasharray": [2.5, 2.5]
                },
                "filter": ["==", "type", 1]
              });

              this._mapboxgl_map.addLayer({
                id: "processing-sector",
                type: "fill",
                source: "sector",
                paint: {
                  "fill-color": "rgba(229, 208, 12, 0.4)",
                  "fill-opacity": 0.8
                },
                filter: ["==", "type", 2]
              });
              this._mapboxgl_map.addLayer({
                "id": "processing-sector-stroke",
                "type": "line",
                "source": "sector-line",
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": "#A48C10",
                  "line-width": 3,
                  "line-dasharray": [2.5, 2.5]
                },
                "filter": ["==", "type", 2]
              });
              
              this._mapboxgl_map.addLayer({
                id: "free-sector",
                type: "fill",
                source: "sector",
                paint: {
                  "fill-color": "rgba(6, 178, 23, 0.4)",
                  "fill-opacity": 0.8
                },
                filter: ["==", "type", 3]
              });
              this._mapboxgl_map.addLayer({
                "id": "free-sector-stroke",
                "type": "line",
                "source": "sector-line",
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-color": "#149541",
                  "line-width": 3,
                  "line-dasharray": [2.5, 2.5]
                },
                "filter": ["==", "type", 3]
              });
            })
            .catch(e => {
              console.error(e);
            });
          this.hoveredStateId = "";
          break;
        case 3:
          if (this.basemap) {
            this._mapboxgl_map.setLayoutProperty('bing', 'visibility', 'visible');
          }
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
