<template>
    <div id='editmap'>
    </div>
</template>

<script>
import mapboxgl from "mapbox-gl";
import MapboxDraw from "@mapbox/mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";
import osm from "../../assets/js/osm";
import "../../assets/css/mapbox-gl.css";
import { mapGetters, mapActions } from "vuex";
import * as turf from "@turf/turf";
import { geometry } from "@turf/turf";

export default {
  data() {
    return {
      draw: null
    };
  },

  props: ["is_sector"],

  computed: mapGetters([
    "lang",
    "profile",
    "edited_zone",
    "edited_zone_geom",
    "edited_sector",
    "edited_sector_geom",
    "edited_inf",
    "is_reset_sector",
    "basemap",
    "show_on_map_geom",
    "infrastructures",
    "objects",
    "geom",
    'selected_sector',
    'zones',
    'infrastructures',
    'objects',
  ]),

  methods: {
    ...mapActions([
      "set_edited_zone_geom",
      "set_reset_zone",
      "set_edited_sector_geom",
      "set_reset_sector",
      "save_geom",
      "set_active",
      "set_zone",
    ]),

    reset_sector() {
      if (this.is_reset_sector) {
        let geom = {
          type: "Feature",
          geometry: JSON.parse(this.edited_sector.st_asgeojson),
          properties: {}
        };
        this.set_edited_sector_geom(geom);
        this.draw.deleteAll();
        turf.flatten(geom).features.forEach(sector => {
          this.draw.add(sector);
        });
        this.set_reset_sector();
      }
    },

    change_basemap() {
      this._mapboxgl_map.setLayoutProperty(
        "bing",
        "visibility",
        this.basemap ? "visible" : "none"
      );
    },

    async set_geom() {
      let geom = {
        type: "Feature",
        geometry: JSON.parse(this.show_on_map_geom.st_asgeojson),
        properties: {}
      };
      this.set_active(false);
      if (this.show_on_map_geom.type > 12) {
        this._mapboxgl_map.removeControl(this.draw);
        this.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            point: true,
            trash: true
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
            trash: true
          }
        });
        this._mapboxgl_map.addControl(this.draw);
        geom.geometry.coordinates.forEach(coord => {
          this.draw.add(turf.lineString(coord));
        });
      }

      if (this.show_on_map_geom) {
        this.save_geom({
          geom: turf.combine(this.draw.getAll()).features[0],
          id: this.show_on_map_geom.id,
          type: this.show_on_map_geom.type,
          title_ru: this.show_on_map_geom.title_ru,
          title_en: this.show_on_map_geom.title_en,
          title_kz: this.show_on_map_geom.title_kz,
          zone_title_ru: this.edited_zone.title_ru,
          zone_title_en: this.edited_zone.title_en,
          zone_title_kz: this.edited_zone.title_kz,
          zone_id: this.show_on_map_geom.zone_id,
        });
      }
    },

    add_infrastructures(show_on_map_geom) {
      var source_infrastructures = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      };

      source_infrastructures.data.features.push({
        type: "Feature",
        geometry: JSON.parse(show_on_map_geom.st_asgeojson),
        properties: {
          capacity:
            show_on_map_geom.capacity && show_on_map_geom.unit
              ? "<br>" + show_on_map_geom.capacity + " " + show_on_map_geom.unit
              : "",
          color: show_on_map_geom.color,
          title_ru: show_on_map_geom.title_ru,
          title_en: show_on_map_geom.title_en,
          title_kz: show_on_map_geom.title_kz,
          geom: show_on_map_geom.st_asgeojson
        }
      });

      if (!this._mapboxgl_map.getSource("infrastructures")) {
        this._mapboxgl_map.addSource("infrastructures", source_infrastructures);
        this._mapboxgl_map.addLayer({
          id: "infrastructures",
          type: "line",
          source: "infrastructures",
          layout: {
            "line-join": "round",
            "line-cap": "round"
          },
          paint: {
            "line-color": ["get", "color"],
            "line-width": 3
          }
        });
      }
      this._mapboxgl_map
        .getSource("infrastructures")
        .setData(source_infrastructures.data);
    },

    add_objects(show_on_map_geom) {
      var source_points = {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: []
        }
      };

      switch (JSON.parse(show_on_map_geom.st_asgeojson).type) {
        case "Point":
          source_points.data.features.push({
            type: "Feature",
            geometry: JSON.parse(show_on_map_geom.st_asgeojson),
            properties: {
              capacity:
                show_on_map_geom.capacity && show_on_map_geom.unit
                  ? "<br>" +
                    show_on_map_geom.capacity +
                    " " +
                    show_on_map_geom.unit
                  : "",
              color: show_on_map_geom.color,
              title_ru: show_on_map_geom.title_ru,
              title_en: show_on_map_geom.title_en,
              title_kz: show_on_map_geom.title_kz,
              geom: show_on_map_geom.st_asgeojson
            }
          });
          break;
        case "LineString":
          turf
            .explode(JSON.parse(show_on_map_geom.st_asgeojson))
            .features.forEach(obj => {
              source_points.data.features.push({
                type: "Feature",
                geometry: obj.geometry,
                properties: {
                  capacity:
                    show_on_map_geom.capacity && show_on_map_geom.unit
                      ? "<br>" +
                        show_on_map_geom.capacity +
                        " " +
                        show_on_map_geom.unit
                      : "",
                  color: show_on_map_geom.color,
                  title_ru: show_on_map_geom.title_ru,
                  title_en: show_on_map_geom.title_en,
                  title_kz: show_on_map_geom.title_kz,
                  geom: show_on_map_geom.st_asgeojson
                }
              });
            });
          break;
      }

      if (!this._mapboxgl_map.getSource("object-points")) {
        this._mapboxgl_map.addSource("object-points", source_points);
        this._mapboxgl_map.addLayer({
          id: "object-points",
          type: "circle",
          source: "object-points",
          paint: {
            "circle-color": "#fff",
            "circle-radius": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13,
              2,
              14,
              6
            ],
            "circle-stroke-width": [
              "interpolate",
              ["linear"],
              ["zoom"],
              13,
              2,
              14,
              5
            ],
            "circle-stroke-color": ["get", "color"]
          }
        });
      }
      this._mapboxgl_map.getSource("object-points").setData(source_points.data);
    },

    add_sector() {
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

        var sector_multi = {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: []
            }
        };
        var sector_line_multi = {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: []
            }
        };

        if (
          JSON.parse(this.selected_sector.st_asgeojson).type == "Polygon"
        ) {
            sector.data.features.push({
                type: "Feature",
                geometry: JSON.parse(this.selected_sector.st_asgeojson),
                properties: {
                  title_ru: this.selected_sector.title_ru,
                  title_kz: this.selected_sector.title_kz,
                  title_en: this.selected_sector.title_en,
                  type: this.selected_sector.project_type,
                  id: this.selected_sector.id,
                  area: this.selected_sector.area
                    ? this.selected_sector.area
                    : "-",
                  divisible: this.selected_sector.divisible
                }
            });
            sector_line.data.features.push({
                type: "Feature",
                geometry: turf.polygonToLine(
                  JSON.parse(this.selected_sector.st_asgeojson)
                ).geometry,
                properties: {
                  title_ru: this.selected_sector.title_ru,
                  title_kz: this.selected_sector.title_kz,
                  title_en: this.selected_sector.title_en,
                  type: this.selected_sector.project_type,
                  id: this.selected_sector.id,
                  divisible: this.selected_sector.divisible
                }
            });
        }
        if (
            JSON.parse(this.selected_sector.st_asgeojson).type == "LineString"
        ) {
              sector.data.features.push({
                type: "Feature",
                geometry: turf.lineToPolygon(
                  JSON.parse(this.selected_sector.st_asgeojson)
                ).geometry,
                properties: {
                  title_ru: this.selected_sector.title_ru,
                  title_kz: this.selected_sector.title_kz,
                  title_en: this.selected_sector.title_en,
                  type: this.selected_sector.project_type,
                  id: this.selected_sector.id,
                  area: this.selected_sector.area
                    ? this.selected_sector.area
                    : "-",
                  divisible: this.selected_sector.divisible
                }
              });
              sector_line.data.features.push({
                type: "Feature",
                geometry: JSON.parse(this.selected_sector.st_asgeojson),
                properties: {
                  title_ru: this.selected_sector.title_ru,
                  title_kz: this.selected_sector.title_kz,
                  title_en: this.selected_sector.title_en,
                  type: this.selected_sector.project_type,
                  id: this.selected_sector.id,
                  area: this.selected_sector.area
                    ? this.selected_sector.area
                    : "-",
                  divisible: this.selected_sector.divisible
                }
              });
        }
        if (
            JSON.parse(this.selected_sector.st_asgeojson).type ==
            "MultiPolygon"
        ) {
              sector_multi.data.features.push({
                type: "Feature",
                geometry: JSON.parse(this.selected_sector.st_asgeojson),
                properties: {
                  title_ru: this.selected_sector.title_ru,
                  title_kz: this.selected_sector.title_kz,
                  title_en: this.selected_sector.title_en,
                  type: this.selected_sector.project_type,
                  id: this.selected_sector.id,
                  area: this.selected_sector.area
                    ? this.selected_sector.area
                    : 0,
                  divisible: this.selected_sector.divisible
                }
              });

              if (
                turf.polygonToLine(
                  JSON.parse(this.selected_sector.st_asgeojson)
                ).features.length > 1
              ) {
                turf
                  .polygonToLine(JSON.parse(this.selected_sector.st_asgeojson))
                  .features.forEach(line => {
                    sector_line_multi.data.features.push({
                      type: "Feature",
                      geometry: line.geometry,
                      properties: {
                        title_ru: this.selected_sector.title_ru,
                        title_kz: this.selected_sector.title_kz,
                        title_en: this.selected_sector.title_en,
                        type: this.selected_sector.project_type,
                        id: this.selected_sector.id,
                        area: this.selected_sector.area
                          ? this.selected_sector.area
                          : 0,
                        divisible: this.selected_sector.divisible
                      }
                    });
                  });
              } else {
                sector_line_multi.data.features.push({
                  type: "Feature",
                  geometry: turf.polygonToLine(
                    JSON.parse(this.selected_sector.st_asgeojson)
                  ).features[0].geometry,
                  properties: {
                    title_ru: this.selected_sector.title_ru,
                    title_kz: this.selected_sector.title_kz,
                    title_en: this.selected_sector.title_en,
                    type: this.selected_sector.project_type,
                    id: this.selected_sector.id,
                    area: this.selected_sector.area
                      ? this.selected_sector.area
                      : 0,
                    divisible: this.selected_sector.divisible
                  }
                });
              }
        }

        this._mapboxgl_map.addSource("sector", sector);
        this._mapboxgl_map.addSource("sector-line", sector_line);

        this._mapboxgl_map.addLayer({
            id: "current-sector",
            type: "fill",
            source: "sector",
            paint: {
              "fill-color": "#00ACFF",
              "fill-opacity": 0.6
            },
            filter: ["==", "type", 1]
        });
        this._mapboxgl_map.addLayer({
            id: "current-sector-stroke",
            type: "line",
            source: "sector-line",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#00ACFF",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 1]
        });

        this._mapboxgl_map.addLayer({
            id: "processing-sector",
            type: "fill",
            source: "sector",
            paint: {
              "fill-color": "#FFE500",
              "fill-opacity": 0.6
            },
            filter: ["==", "type", 2]
        });
        this._mapboxgl_map.addLayer({
            id: "processing-sector-stroke",
            type: "line",
            source: "sector-line",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#FFE500",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 2]
        });

        this._mapboxgl_map.addLayer({
            id: "free-sector",
            type: "fill",
            source: "sector",
            paint: {
              "fill-color": "#03C717",
              "fill-opacity": 0.6
            },
            filter: ["==", "type", 3]
        });
        this._mapboxgl_map.addLayer({
            id: "free-sector-stroke",
            type: "line",
            source: "sector-line",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#03C717",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 3]
        });

        this._mapboxgl_map.addSource("sector-multi", sector_multi);
        this._mapboxgl_map.addSource("sector-line-multi", sector_line_multi);

        this._mapboxgl_map.addLayer({
            id: "current-sector-multi",
            type: "fill",
            source: "sector-multi",
            paint: {
              "fill-color": "#00ACFF",
              "fill-opacity": 0.8
            },
            filter: ["==", "type", 1]
        });
        this._mapboxgl_map.addLayer({
            id: "current-sector-stroke-multi",
            type: "line",
            source: "sector-line-multi",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#00ACFF",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 1]
        });

        this._mapboxgl_map.addLayer({
            id: "processing-sector-multi",
            type: "fill",
            source: "sector-multi",
            paint: {
              "fill-color": "#FFE500",
              "fill-opacity": 0.8
            },
            filter: ["==", "type", 2]
        });
        this._mapboxgl_map.addLayer({
            id: "processing-sector-stroke-multi",
            type: "line",
            source: "sector-line-multi",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#FFE500",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 2]
        });

        this._mapboxgl_map.addLayer({
            id: "free-sector-multi",
            type: "fill",
            source: "sector-multi",
            paint: {
              "fill-color": "#03C717",
              "fill-opacity": 0.8
            },
            filter: ["==", "type", 3]
        });
        this._mapboxgl_map.addLayer({
            id: "free-sector-stroke-multi",
            type: "line",
            source: "sector-line-multi",
            layout: {
              "line-join": "round",
              "line-cap": "round"
            },
            paint: {
              "line-color": "#03C717",
              "line-width": 3,
              "line-dasharray": [2.5, 2.5]
            },
            filter: ["==", "type", 3]
        });

        this._mapboxgl_map.addLayer({
            'id': 'maine',
            'type': 'fill',
            'source': {
                'type': 'geojson',
                'data': {
                    'type': 'Feature',
                    'geometry': JSON.parse(JSON.parse(this.edited_sector.model).st_asgeojson),
                }
            },
            'layout': {},
            'paint': {
                'fill-color': '#088',
                'fill-opacity': 0.8
            }
        });
    },

  },

  watch: {
    show_on_map_geom: "set_geom",
    basemap: "change_basemap",
    is_reset_sector: "reset_sector"
  },

  async mounted() {
    // ИНИЦИАЛИЗАЦИЯ КАРТЫ

    mapboxgl.accessToken =
      "pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ";

    this._mapboxgl_map = new mapboxgl.Map({
      container: "editmap",
      style: osm()
    });

    this.popupm = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: { bottom: [0, -13] }
    });

    this._mapboxgl_map.addControl(new mapboxgl.FullscreenControl());
    this._mapboxgl_map.addControl(new mapboxgl.NavigationControl());

    switch (this.is_sector) {
      case "sector":
        this.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            polygon: true,
            trash: true
          }
        });
        this._mapboxgl_map.addControl(this.draw);

        this._mapboxgl_map.on("style.load", () => {
          this._mapboxgl_map.jumpTo(
            {
              center: turf.centerOfMass(
                JSON.parse(this.edited_sector.st_asgeojson)
              ).geometry.coordinates,
              zoom: 13,
              around: turf.centerOfMass(
                JSON.parse(this.edited_sector.st_asgeojson)
              ).geometry.coordinates
            },
            {
              padding: 50
            }
          );

          let geom = {
            type: "Feature",
            geometry: JSON.parse(this.edited_sector.st_asgeojson),
            properties: {}
          };
          this.set_edited_sector_geom(geom);
          turf.flatten(geom).features.forEach(sector => {
            this.draw.add(sector);
          });
        });

        this._mapboxgl_map.on("draw.update", () => {
          this.set_edited_sector_geom(
            turf.combine(this.draw.getAll()).features[0]
          );
        });
        this._mapboxgl_map.on("draw.create", () => {
          this.set_edited_sector_geom(
            turf.combine(this.draw.getAll()).features[0]
          );
        });
        this._mapboxgl_map.on("draw.delete", () => {
          this.set_edited_sector_geom(
            turf.combine(this.draw.getAll()).features[0]
          );
        });
        break;
      case "zone":
        this.draw = new MapboxDraw({
          displayControlsDefault: false,
          controls: {
            line_string: true,
            trash: true
          }
        });
        this._mapboxgl_map.addControl(this.draw);

        this._mapboxgl_map.on("style.load", async () => {
          this._mapboxgl_map.jumpTo(
            {
              center: turf.centerOfMass(
                JSON.parse(this.edited_zone.st_asgeojson)
              ).geometry.coordinates,
              zoom: 13,
              around: turf.centerOfMass(
                JSON.parse(this.edited_zone.st_asgeojson)
              ).geometry.coordinates
            },
            {
              padding: 50
            }
          );

          this._mapboxgl_map.on("draw.create", () => {
            this.save_geom({
              geom: turf.combine(this.draw.getAll()).features[0],
              id: this.show_on_map_geom.id,
              type: this.show_on_map_geom.type,
              title_ru: this.show_on_map_geom.title_ru,
              title_en: this.show_on_map_geom.title_en,
              title_kz: this.show_on_map_geom.title_kz,
              zone_title_ru: this.edited_zone.title_ru,
              zone_title_en: this.edited_zone.title_en,
              zone_title_kz: this.edited_zone.title_kz,
              zone_id: this.show_on_map_geom.zone_id,
            });
            this.set_active(true);
          });
          this._mapboxgl_map.on("draw.update", () => {
            this.save_geom({
              geom: turf.combine(this.draw.getAll()).features[0],
              id: this.show_on_map_geom.id,
              type: this.show_on_map_geom.type,
              title_ru: this.show_on_map_geom.title_ru,
              title_en: this.show_on_map_geom.title_en,
              title_kz: this.show_on_map_geom.title_kz,
              zone_title_ru: this.edited_zone.title_ru,
              zone_title_en: this.edited_zone.title_en,
              zone_title_kz: this.edited_zone.title_kz,
              zone_id: this.show_on_map_geom.zone_id,
            });
            this.set_active(true);
          });
          this._mapboxgl_map.on("draw.delete", () => {
            this.save_geom({
              geom: turf.combine(this.draw.getAll()).features[0],
              id: this.show_on_map_geom.id,
              type: this.show_on_map_geom.type,
              title_ru: this.show_on_map_geom.title_ru,
              title_en: this.show_on_map_geom.title_en,
              title_kz: this.show_on_map_geom.title_kz,
              zone_title_ru: this.edited_zone.title_ru,
              zone_title_en: this.edited_zone.title_en,
              zone_title_kz: this.edited_zone.title_kz,
              zone_id: this.show_on_map_geom.zone_id,
            });
            this.set_active(true);
          });
        });
        break;
      case "admin":
        this._mapboxgl_map.on("style.load", () => {
          this._mapboxgl_map.jumpTo(
            {
              center: turf.centerOfMass(
                JSON.parse(JSON.parse(this.edited_sector.model).st_asgeojson)
              ).geometry.coordinates,
              zoom: 13,
              around: turf.centerOfMass(
                JSON.parse(JSON.parse(this.edited_sector.model).st_asgeojson)
              ).geometry.coordinates
            },
            {
              padding: 50
            }
          );
          this.add_sector();
        });
        break;
      case "infrastructure":
        this._mapboxgl_map.on("load", async () => {
          this._mapboxgl_map.jumpTo(
            {
              center: turf.centerOfMass(
                JSON.parse(this.zones[0].st_asgeojson)
              ).geometry.coordinates,
              zoom: 13,
              around: turf.centerOfMass(
                JSON.parse(this.zones[0].st_asgeojson)
              ).geometry.coordinates
            },
            {
              padding: 50
            }
          );
          this._mapboxgl_map.addLayer({
            id: 'zone',
            type: 'line',
            source: {
              type: 'geojson',
              data: turf.polygonToLine(JSON.parse(this.zones[0].st_asgeojson))
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

          if (JSON.parse(this.edited_inf.model).type <= 12) {
            this.infrastructures.forEach(el => {
              if (JSON.parse(this.edited_inf.model).id == el.id) {
                var source_infrastructures = {
                    "type": 'geojson',
                    'data': {
                      'type': 'FeatureCollection',
                      'features': []
                    }
                };

                source_infrastructures.data.features.push({
                    'type': 'Feature',
                    'geometry': JSON.parse(el.st_asgeojson),
                    'properties': {
                      'capacity': el.capacity && el.unit ? '<br>' + el.capacity + ' ' + el.unit : '',
                      'color': el.color,
                      'title_ru': el.title_ru,
                      'title_en': el.title_en,
                      'title_kz': el.title_kz,
                    }
                });

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
            });
            

            var source_infrastructures_new = {
                "type": 'geojson',
                'data': {
                  'type': 'FeatureCollection',
                  'features': []
                }
            };

            source_infrastructures_new.data.features.push({
                'type': 'Feature',
                'geometry': JSON.parse(this.edited_inf.model).geom.geometry,
                'properties': {
                  'title_ru': 'Новый объект',
                  'title_en': 'New object',
                  'title_kz': 'Жана объект',
                }
            });

            this._mapboxgl_map.addSource('infrastructures-new', source_infrastructures_new);
            this._mapboxgl_map.addLayer({
                "id": "infrastructures-new",
                "type": "line",
                "source": "infrastructures-new",
                "layout": {
                  "line-join": "round",
                  "line-cap": "round"
                },
                "paint": {
                  "line-width": 1
                }
            });
          } else {
            this.objects.forEach(el => {
              if (JSON.parse(this.edited_inf.model).id == el.id) {

                var source_points = {
                  "type": 'geojson',
                  'data': {
                    'type': 'FeatureCollection',
                    'features': []
                  }
                };

                switch (JSON.parse(el.st_asgeojson).type) {
                  case 'Point':
                    source_points.data.features.push({
                      'type': 'Feature',
                      'geometry': JSON.parse(el.st_asgeojson),
                      'properties': {
                        'capacity': el.capacity && el.unit ? '<br>' + el.capacity + ' ' + el.unit : '',
                        'color': el.color,
                        'title_ru': el.title_ru,
                        'title_en': el.title_en,
                        'title_kz': el.title_kz,
                      }
                    });
                  break;
                  case 'LineString':
                    turf.explode(JSON.parse(el.st_asgeojson)).features.forEach( obj => {
                      source_points.data.features.push({
                        'type': 'Feature',
                        'geometry': obj.geometry,
                        'properties': {
                          'capacity': el.capacity && el.unit ? '<br>' + el.capacity + ' ' + el.unit : '',
                          'color': el.color,
                          'title_ru': el.title_ru,
                          'title_en': el.title_en,
                          'title_kz': el.title_kz,
                        }
                      });
                    });
                  break;
                  case 'MultiPoint':
                    turf.explode(JSON.parse(el.st_asgeojson)).features.forEach( obj => {
                      source_points.data.features.push({
                        'type': 'Feature',
                        'geometry': obj.geometry,
                        'properties': {
                          'capacity': el.capacity && el.unit ? '<br>' + el.capacity + ' ' + el.unit : '',
                          'color': el.color,
                          'title_ru': el.title_ru,
                          'title_en': el.title_en,
                          'title_kz': el.title_kz,
                        }
                      });
                    });
                  break;
                }

                this._mapboxgl_map.addSource('object-points', source_points);
                this._mapboxgl_map.addLayer({
                    "id": "object-points",
                    "type": "circle",
                    "source": "object-points",
                    "paint": {
                      'circle-color': '#fff',
                      'circle-radius': 5,
                      'circle-stroke-width': 4,
                      'circle-stroke-color': ["get", "color"],
                    }
                });

              }
            });

            var source_points_new = {
              "type": 'geojson',
              'data': {
                'type': 'FeatureCollection',
                'features': []
              }
            };
            switch (JSON.parse(this.edited_inf.model).geom.geometry.type) {
                  case 'Point':
                    source_points_new.data.features.push({
                      'type': 'Feature',
                      'geometry': JSON.parse(this.edited_inf.model).geom.geometry,
                      'properties': {
                        'title_ru': 'Новый объект',
                        'title_en': 'New object',
                        'title_kz': 'Жана объект',
                      }
                    });
                    break;
                  case 'LineString':
                    turf.explode(JSON.parse(this.edited_inf.model).geom.geometry).features.forEach( obj => {
                      source_points_new.data.features.push({
                        'type': 'Feature',
                        'geometry': obj.geometry,
                        'properties': {
                          'title_ru': 'Новый объект',
                          'title_en': 'New object',
                          'title_kz': 'Жана объект',
                        }
                      });
                    });
                    break;
                  case 'MultiPoint':
                    turf.explode(JSON.parse(this.edited_inf.model).geom.geometry).features.forEach( obj => {
                      source_points_new.data.features.push({
                        'type': 'Feature',
                        'geometry': obj.geometry,
                        'properties': {
                          'title_ru': 'Новый объект',
                          'title_en': 'New object',
                          'title_kz': 'Жана объект',
                        }
                      });
                    });
                  break;
            }
            this._mapboxgl_map.addSource('object-points-new', source_points_new);
            this._mapboxgl_map.addLayer({
                "id": "object-points-new",
                "type": "circle",
                "source": "object-points-new",
                "paint": {
                  'circle-color': '#fff',
                  'circle-radius': 3,
                  'circle-stroke-width': 2,
                }
            });
          }
        });
      break;
    }

    this._mapboxgl_map.on("mousemove", "object-points", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["object-points"]
      });

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";

      this.popupm
        .setLngLat(features[0].geometry.coordinates.slice())
        .setHTML(
          features[0].properties["title_" + this.lang] +
            features[0].properties.capacity
        )
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on(
      "mouseleave",
      "object-points",
      e => {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this.popupm.remove();
      }
    );

    this._mapboxgl_map.on("mousemove", "infrastructures", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["infrastructures"]
      });

      this._mapboxgl_map.getCanvas().style.cursor = "pointer";
      this.popupm
        .setLngLat([e.lngLat.lng, e.lngLat.lat])
        .setHTML(
          features[0].properties["title_" + this.lang] +
            features[0].properties.capacity
        )
        .addTo(this._mapboxgl_map);
    });

    this._mapboxgl_map.on(
      "mouseleave",
      "infrastructures",
      e => {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this.popupm.remove();
      }
    );

    this._mapboxgl_map.on("mousemove", "object-points-new", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["object-points-new", "object-points"]
      });
      if (features.length == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = "pointer";

        this.popupm
          .setLngLat(features[0].geometry.coordinates.slice())
          .setHTML(features[0].properties["title_" + this.lang])
          .addTo(this._mapboxgl_map);
      }
    });

    this._mapboxgl_map.on(
      "mouseleave",
      "object-points-new",
      e => {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this.popupm.remove();
      }
    );

    this._mapboxgl_map.on("mousemove", "infrastructures-new", e => {
      var features = this._mapboxgl_map.queryRenderedFeatures(e.point, {
        layers: ["infrastructures-new", "infrastructures"]
      });

      if (features.length == 1) {
        this._mapboxgl_map.getCanvas().style.cursor = "pointer";
        this.popupm
          .setLngLat([e.lngLat.lng, e.lngLat.lat])
          .setHTML(features[0].properties["title_" + this.lang])
          .addTo(this._mapboxgl_map);
      }
    });

    this._mapboxgl_map.on(
      "mouseleave",
      "infrastructures-new",
      e => {
        this._mapboxgl_map.getCanvas().style.cursor = "";
        this.popupm.remove();
      }
    );
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
