export default () => ({
  'version': 8,
  'name': 'Blank',
  'metadata': {
    'mapbox:autocomposite': true,
    'mapbox:type': 'template',
    'mapbox:sdk-support': {
      'js': '0.46.0',
      'android': '6.0.0',
      'ios': '4.0.0'
    }
  },
  'center': [70.57477983415595, 52.86828778880209],
  'zoom': 4.055863227793626,
  'bearing': 0,
  'pitch': 0,
  'sources': {
    'bing': {
      'type': 'raster',
      'tileSize': 256,
      'tiles': ['//ecn.t2.tiles.virtualearth.net/tiles/a{quadkey}.jpeg?g=414'],
    },
    'symbols': {
      type: 'geojson',
      data: {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [69.159995, 54.472108]
            },
            properties: {
              title: 'СКО'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [76.484217, 52.469523]
            },
            properties: {
              title: 'Павлодарская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [82.217746, 48.970037]
            },
            properties: {
              title: 'ВКО'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [77.851468, 45.140789]
            },
            properties: {
              title: 'Алматинская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [72.144071, 44.66465]
            },
            properties: {
              title: 'Жамбылская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [68.680888, 42.416407]
            },
            properties: {
              title: 'ЮКО'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [63.418783, 45.236046]
            },
            properties: {
              title: 'Кызылординская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [58.810698, 48.619783]
            },
            properties: {
              title: 'Актюбинская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [53.776071, 44.05414]
            },
            properties: {
              title: 'Мангыстауская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [52.176394, 47.822386]
            },
            properties: {
              title: 'Атырауская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [63.496522, 52.509224]
            },
            properties: {
              title: 'Костанайская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [70.298717, 52.006681]
            },
            properties: {
              title: 'Акмолинская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [71.518106, 48.516465]
            },
            properties: {
              title: 'Карагандинская'
            }
          },
          {
            type: 'Feature',
            geometry: {
              type: 'Point',
              coordinates: [50.905113, 50.19334]
            },
            properties: {
              title: 'ЗКО'
            }
          }
        ]
      }
    },
    'openmaptiles': {
      'type': 'vector',
      'url': 'https://free.tilehosting.com/data/v3.json?key=hWWfWrAiWGtv68r8wA6D'
    },
    'composite': {
      'url': 'mapbox://mapbox.mapbox-streets-v7',
      'type': 'vector'
    }
  },
  'sprite': 'mapbox://sprites/alanedel/cjm8zxhak2s1i2sn29k3p7b8n',
  'glyphs': 'https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=hWWfWrAiWGtv68r8wA6D',
  'layers': [
      {
        "id": "background",
        "type": "background",
        "layout": {},
        "paint": {"background-color": "hsl(199, 35%, 76%)"}
    },
    {
        "id": "national_park",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse_overlay",
        "filter": ["==", "class", "national_park"],
        "layout": {},
        "paint": {
            "fill-color": "hsl(78, 51%, 73%)",
            "fill-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                0,
                6,
                0.5
            ]
        }
    },
    {
        "id": "landuse",
        "type": "fill",
        "source": "composite",
        "source-layer": "landuse",
        "filter": ["in", "class", "hospital", "park", "pitch", "school"],
        "layout": {},
        "paint": {
            "fill-color": [
                "match",
                ["get", "class"],
                "park",
                "hsl(78, 51%, 73%)",
                "pitch",
                "hsl(78, 51%, 73%)",
                "hospital",
                "hsl(0, 56%, 89%)",
                "school",
                "hsl(25, 45%, 85%)",
                "hsla(0, 0%, 0%, 0)"
            ],
            "fill-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                0,
                6,
                1
            ]
        }
    },
    {
      "id": "waterway",
      "type": "line",
      "source": "composite",
      "source-layer": "waterway",
      "minzoom": 8,
      "filter": [
          "all",
          ["==", "$type", "LineString"],
          ["in", "class", "canal", "river"]
      ],
      "layout": {"line-join": "round", "line-cap": "round"},
      "paint": {
          "line-color": "hsl(205, 76%, 70%)",
          "line-width": [
              "interpolate",
              ["exponential", 1.3],
              ["zoom"],
              8.5,
              0.1,
              20,
              8
          ],
          "line-opacity": [
              "interpolate",
              ["linear"],
              ["zoom"],
              8,
              0,
              8.5,
              1
          ]
      }
    },
    {
        "id": "water",
        "type": "fill",
        "source": "composite",
        "source-layer": "water",
        "layout": {},
        "paint": {
            "fill-color": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                "#6bb6eb",
                7,
                "hsl(205, 76%, 70%)"
            ]
        }
    },
    {
      'id': 'bing',
      'type': 'raster',
      'source': 'bing',
      'paint': {},
      'layout': {
        'visibility': 'none'
      }
    },
    {
        "id": "aeroway-polygon",
        "type": "fill",
        "source": "composite",
        "source-layer": "aeroway",
        "filter": [
            "all",
            ["==", "$type", "Polygon"],
            ["in", "type", "helipad", "runway", "taxiway"]
        ],
        "layout": {},
        "paint": {"fill-color": "hsl(0, 0%, 77%)"}
    },
    {
        "id": "aeroway-line",
        "type": "line",
        "source": "composite",
        "source-layer": "aeroway",
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            ["in", "type", "runway", "taxiway"]
        ],
        "layout": {},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                10,
                0.5,
                18,
                20
            ],
            "line-color": "hsl(0, 0%, 77%)"
        }
    },
    {
        "id": "building",
        "type": "fill",
        "source": "composite",
        "source-layer": "building",
        "minzoom": 15,
        "filter": [
            "all",
            ["!=", "type", "building:part"],
            ["==", "underground", "false"]
        ],
        "layout": {},
        "paint": {
            "fill-color": "hsl(38, 28%, 77%)",
            "fill-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                15.5,
                0,
                16,
                1
            ]
        }
    },
    {
        "id": "pedestrian-path",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "minzoom": 14,
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            [
                "all",
                ["!=", "type", "platform"],
                ["in", "class", "path", "pedestrian"]
            ]
        ],
        "layout": {"line-join": "round", "line-cap": "round"},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                14,
                [
                    "match",
                    ["get", "class"],
                    "pedestrian",
                    1,
                    "path",
                    0.75,
                    0.75
                ],
                20,
                ["match", ["get", "class"], "pedestrian", 8, "path", 5, 5]
            ],
            "line-color": [
                "match",
                ["get", "type"],
                "sidewalk",
                "hsl(38, 35%, 80%)",
                "crossing",
                "hsl(38, 35%, 80%)",
                "hsl(38, 28%, 70%)"
            ]
        }
    },
    {
        "id": "tunnel",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            [
                "all",
                ["!=", "type", "service:parking_aisle"],
                ["==", "structure", "tunnel"],
                [
                    "in",
                    "class",
                    "link",
                    "motorway",
                    "motorway_link",
                    "primary",
                    "secondary",
                    "service",
                    "street",
                    "street_limited",
                    "tertiary",
                    "track",
                    "trunk"
                ]
            ]
        ],
        "layout": {"line-join": "round"},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                5,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    0.5,
                    "trunk",
                    0.5,
                    "primary",
                    0.5,
                    "secondary",
                    0.01,
                    "tertiary",
                    0.01,
                    "street",
                    0,
                    "street_limited",
                    0,
                    "motorway_link",
                    0,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                12,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    3,
                    "trunk",
                    3,
                    "primary",
                    3,
                    "secondary",
                    2,
                    "tertiary",
                    2,
                    "street",
                    0.5,
                    "street_limited",
                    0.5,
                    "motorway_link",
                    0.5,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                18,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    30,
                    "trunk",
                    30,
                    "primary",
                    30,
                    "secondary",
                    24,
                    "tertiary",
                    24,
                    "street",
                    12,
                    "street_limited",
                    12,
                    "motorway_link",
                    12,
                    "service",
                    10,
                    "track",
                    10,
                    "link",
                    10,
                    10
                ]
            ],
            "line-color": [
                "match",
                ["get", "class"],
                "street",
                "hsl(38, 100%, 98%)",
                "street_limited",
                "hsl(38, 100%, 98%)",
                "service",
                "hsl(38, 100%, 98%)",
                "track",
                "hsl(38, 100%, 98%)",
                "link",
                "hsl(38, 100%, 98%)",
                "hsl(0, 0%, 100%)"
            ],
            "line-dasharray": [0.2, 0.2]
        }
    },
    {
        "id": "road",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            [
                "all",
                ["!=", "type", "service:parking_aisle"],
                ["!in", "structure", "bridge", "tunnel"],
                [
                    "in",
                    "class",
                    "link",
                    "motorway",
                    "motorway_link",
                    "primary",
                    "secondary",
                    "service",
                    "street",
                    "street_limited",
                    "tertiary",
                    "track",
                    "trunk"
                ]
            ]
        ],
        "layout": {"line-join": "round", "line-cap": "round"},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                5,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    0.5,
                    "trunk",
                    0.5,
                    "primary",
                    0.5,
                    "secondary",
                    0.01,
                    "tertiary",
                    0.01,
                    "street",
                    0,
                    "street_limited",
                    0,
                    "motorway_link",
                    0,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                12,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    3,
                    "trunk",
                    3,
                    "primary",
                    3,
                    "secondary",
                    2,
                    "tertiary",
                    2,
                    "street",
                    0.5,
                    "street_limited",
                    0.5,
                    "motorway_link",
                    0.5,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                18,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    30,
                    "trunk",
                    30,
                    "primary",
                    30,
                    "secondary",
                    24,
                    "tertiary",
                    24,
                    "street",
                    12,
                    "street_limited",
                    12,
                    "motorway_link",
                    12,
                    "service",
                    10,
                    "track",
                    10,
                    "link",
                    10,
                    10
                ]
            ],
            "line-color": [
                "match",
                ["get", "class"],
                "street",
                "hsl(38, 100%, 98%)",
                "street_limited",
                "hsl(38, 100%, 98%)",
                "service",
                "hsl(38, 100%, 98%)",
                "track",
                "hsl(38, 100%, 98%)",
                "link",
                "hsl(38, 100%, 98%)",
                "hsl(0, 0%, 100%)"
            ]
        }
    },
    {
        "id": "bridge-case",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            [
                "all",
                ["!=", "type", "service:parking_aisle"],
                ["==", "structure", "bridge"],
                [
                    "in",
                    "class",
                    "link",
                    "motorway",
                    "motorway_link",
                    "primary",
                    "secondary",
                    "service",
                    "street",
                    "street_limited",
                    "tertiary",
                    "track",
                    "trunk"
                ]
            ]
        ],
        "layout": {"line-join": "round"},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                10,
                1,
                16,
                2
            ],
            "line-color": "hsl(38, 48%, 86%)",
            "line-gap-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                5,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    0.5,
                    "trunk",
                    0.5,
                    "primary",
                    0.5,
                    "secondary",
                    0.01,
                    "tertiary",
                    0.01,
                    "street",
                    0,
                    "street_limited",
                    0,
                    "motorway_link",
                    0,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                12,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    3,
                    "trunk",
                    3,
                    "primary",
                    3,
                    "secondary",
                    2,
                    "tertiary",
                    2,
                    "street",
                    0.5,
                    "street_limited",
                    0.5,
                    "motorway_link",
                    0.5,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                18,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    30,
                    "trunk",
                    30,
                    "primary",
                    30,
                    "secondary",
                    24,
                    "tertiary",
                    24,
                    "street",
                    12,
                    "street_limited",
                    12,
                    "motorway_link",
                    12,
                    "service",
                    10,
                    "track",
                    10,
                    "link",
                    10,
                    10
                ]
            ]
        }
    },
    {
        "id": "bridge",
        "type": "line",
        "source": "composite",
        "source-layer": "road",
        "filter": [
            "all",
            ["==", "$type", "LineString"],
            [
                "all",
                ["!=", "type", "service:parking_aisle"],
                ["==", "structure", "bridge"],
                [
                    "in",
                    "class",
                    "link",
                    "motorway",
                    "motorway_link",
                    "primary",
                    "secondary",
                    "service",
                    "street",
                    "street_limited",
                    "tertiary",
                    "track",
                    "trunk"
                ]
            ]
        ],
        "layout": {"line-join": "round", "line-cap": "round"},
        "paint": {
            "line-width": [
                "interpolate",
                ["exponential", 1.5],
                ["zoom"],
                5,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    0.5,
                    "trunk",
                    0.5,
                    "primary",
                    0.5,
                    "secondary",
                    0.01,
                    "tertiary",
                    0.01,
                    "street",
                    0,
                    "street_limited",
                    0,
                    "motorway_link",
                    0,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                12,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    3,
                    "trunk",
                    3,
                    "primary",
                    3,
                    "secondary",
                    2,
                    "tertiary",
                    2,
                    "street",
                    0.5,
                    "street_limited",
                    0.5,
                    "motorway_link",
                    0.5,
                    "service",
                    0,
                    "track",
                    0,
                    "link",
                    0,
                    0
                ],
                18,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    30,
                    "trunk",
                    30,
                    "primary",
                    30,
                    "secondary",
                    24,
                    "tertiary",
                    24,
                    "street",
                    12,
                    "street_limited",
                    12,
                    "motorway_link",
                    12,
                    "service",
                    10,
                    "track",
                    10,
                    "link",
                    10,
                    10
                ]
            ],
            "line-color": [
                "match",
                ["get", "class"],
                "street",
                "hsl(38, 100%, 98%)",
                "street_limited",
                "hsl(38, 100%, 98%)",
                "service",
                "hsl(38, 100%, 98%)",
                "track",
                "hsl(38, 100%, 98%)",
                "link",
                "hsl(38, 100%, 98%)",
                "hsl(0, 0%, 100%)"
            ]
        }
    },
    {
        "id": "admin-state-province",
        "type": "line",
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 2,
        "filter": ["all", ["==", "maritime", 0], [">=", "admin_level", 3]],
        "layout": {"line-join": "round", "line-cap": "round"},
        "paint": {
            "line-dasharray": [
                "step",
                ["zoom"],
                ["literal", [2, 0]],
                7,
                ["literal", [2, 2, 6, 2]]
            ],
            "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                7,
                0.75,
                12,
                1.5
            ],
            "line-opacity": [
                "interpolate",
                ["linear"],
                ["zoom"],
                2,
                0,
                3,
                1
            ],
            "line-color": [
                "step",
                ["zoom"],
                "hsl(0, 0%, 80%)",
                4,
                "hsl(0, 0%, 65%)"
            ]
        }
    },
    {
        "id": "admin-country",
        "type": "line",
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 1,
        "filter": [
            "all",
            ["<=", "admin_level", 2],
            ["==", "disputed", 0],
            ["==", "maritime", 0]
        ],
        "layout": {"line-join": "round", "line-cap": "round"},
        "paint": {
            "line-color": "hsl(0, 0%, 50%)",
            "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                3,
                0.5,
                10,
                2
            ]
        }
    },
    {
        "id": "admin-country-disputed",
        "type": "line",
        "source": "composite",
        "source-layer": "admin",
        "minzoom": 1,
        "filter": [
            "all",
            ["<=", "admin_level", 2],
            ["==", "disputed", 1],
            ["==", "maritime", 0]
        ],
        "layout": {"line-join": "round"},
        "paint": {
            "line-color": "hsl(0, 0%, 50%)",
            "line-width": [
                "interpolate",
                ["linear"],
                ["zoom"],
                3,
                0.5,
                10,
                2
            ],
            "line-dasharray": [1.5, 1.5]
        }
    },
    {
        "id": "road-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "road_label",
        "minzoom": 12,
        "filter": [
            "in",
            "class",
            "link",
            "motorway",
            "pedestrian",
            "primary",
            "secondary",
            "street",
            "street_limited",
            "tertiary",
            "trunk"
        ],
        "layout": {
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                9,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    10,
                    "trunk",
                    10,
                    "primary",
                    10,
                    "secondary",
                    10,
                    "tertiary",
                    10,
                    9
                ],
                20,
                [
                    "match",
                    ["get", "class"],
                    "motorway",
                    15,
                    "trunk",
                    15,
                    "primary",
                    15,
                    "secondary",
                    15,
                    "tertiary",
                    15,
                    14
                ]
            ],
            "text-max-angle": 30,
            "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
            "symbol-placement": "line",
            "text-padding": 1,
            "text-rotation-alignment": "map",
            "text-pitch-alignment": "viewport",
            "text-field": ["get", "name_en"]
        },
        "paint": {
            "text-color": "hsl(0, 0%, 0%)",
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1
        }
    },
    {
        "id": "airport-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "airport_label",
        "filter": ["<=", "scalerank", 2],
        "layout": {
            "text-line-height": 1.1,
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                10,
                12,
                18,
                18
            ],
            "icon-image": [
                "step",
                ["zoom"],
                ["concat", ["get", "maki"], "-11"],
                13,
                ["concat", ["get", "maki"], "-15"]
            ],
            "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
            "text-padding": 2,
            "text-offset": [0, 0.75],
            "text-anchor": "top",
            "text-field": [
                "step",
                ["zoom"],
                ["get", "ref"],
                14,
                ["get", "name_en"]
            ],
            "text-max-width": 9
        },
        "paint": {
            "text-color": "hsl(38, 19%, 29%)",
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1
        }
    },
    {
        "id": "place-neighborhood-suburb-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 12,
        "maxzoom": 15,
        "filter": ["in", "type", "neighbourhood", "suburb"],
        "layout": {
            "text-field": ["get", "name_en"],
            "text-transform": "uppercase",
            "text-letter-spacing": 0.15,
            "text-max-width": 8,
            "text-font": ["Roboto Regular", "Arial Unicode MS Regular"],
            "text-padding": 3,
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                12,
                11,
                16,
                16
            ]
        },
        "paint": {
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1,
            "text-color": "hsl(38, 62%, 21%)"
        }
    },
    {
        "id": "place-town-village-hamlet-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 6,
        "maxzoom": 14,
        "filter": ["in", "type", "hamlet", "town", "village"],
        "layout": {
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                ["match", ["get", "type"], "town", 9.5, 8],
                16,
                ["match", ["get", "type"], "town", 20, 16]
            ],
            "text-font": [
                "step",
                ["zoom"],
                ["literal", ["Roboto Regular", "Arial Unicode MS Regular"]],
                12,
                [
                    "match",
                    ["get", "type"],
                    "town",
                    [
                        "literal",
                        ["Roboto Medium", "Arial Unicode MS Regular"]
                    ],
                    [
                        "literal",
                        ["Roboto Regular", "Arial Unicode MS Regular"]
                    ]
                ]
            ],
            "text-max-width": 7,
            "text-field": ["get", "name_en"]
        },
        "paint": {
            "text-color": "hsl(0, 0%, 0%)",
            "text-halo-blur": 0.5,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1
        }
    },
    {
        "id": "place-city-label-minor",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 1,
        "maxzoom": 14,
        "filter": ["all", ["!has", "scalerank"], ["==", "type", "city"]],
        "layout": {
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                12,
                16,
                22
            ],
            "text-font": [
                "literal",
                ["Roboto Medium", "Arial Unicode MS Regular"]
            ],
            "text-max-width": 10,
            "text-field": ["get", "name_en"]
        },
        "paint": {
            "text-color": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                "hsl(0, 0%, 33%)",
                6,
                "hsl(0, 0%, 0%)"
            ],
            "text-halo-blur": 0.5,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1.25
        }
    },
    {
        "id": "place-city-label-major",
        "type": "symbol",
        "source": "composite",
        "source-layer": "place_label",
        "minzoom": 1,
        "maxzoom": 14,
        "filter": ["all", ["==", "type", "city"], ["has", "scalerank"]],
        "layout": {
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                ["step", ["get", "scalerank"], 14, 4, 12],
                16,
                ["step", ["get", "scalerank"], 30, 4, 22]
            ],
            "text-font": [
                "step",
                ["zoom"],
                ["literal", ["Roboto Medium", "Arial Unicode MS Regular"]],
                10,
                [
                    "step",
                    ["get", "scalerank"],
                    ["literal", ["Roboto Bold", "Arial Unicode MS Bold"]],
                    5,
                    [
                        "literal",
                        ["Roboto Medium", "Arial Unicode MS Regular"]
                    ]
                ]
            ],
            "text-max-width": 10,
            "text-field": ["get", "name_en"]
        },
        "paint": {
            "text-color": [
                "interpolate",
                ["linear"],
                ["zoom"],
                5,
                "hsl(0, 0%, 33%)",
                6,
                "hsl(0, 0%, 0%)"
            ],
            "text-halo-blur": 0.5,
            "text-halo-color": "hsl(0, 0%, 100%)",
            "text-halo-width": 1.25
        }
    },
    {
        "id": "state-label",
        "type": "symbol",
        "source": "composite",
        "source-layer": "state_label",
        "minzoom": 4,
        "maxzoom": 8,
        "layout": {
            "text-line-height": 1.2,
            "text-size": [
                "interpolate",
                ["linear"],
                ["zoom"],
                4,
                ["step", ["get", "area"], 8, 20000, 9, 80000, 10],
                9,
                ["step", ["get", "area"], 14, 20000, 18, 80000, 23]
            ],
            "text-transform": "uppercase",
            "text-font": ["Roboto Black", "Arial Unicode MS Bold"],
            "text-padding": 1,
            "text-field": [
                "step",
                ["zoom"],
                [
                    "step",
                    ["get", "area"],
                    ["get", "abbr"],
                    80000,
                    ["get", "name_en"]
                ],
                5,
                ["get", "name_en"]
            ],
            "text-letter-spacing": 0.2,
            "text-max-width": 6
        },
        "paint": {
            "text-color": "hsl(38, 7%, 64%)",
            "text-halo-width": 1,
            "text-halo-color": "hsl(0, 0%, 100%)"
        }
    }
  ],
  'created': '2018-09-19T10:20:07.260Z',
  'id': 'cjm8zxhak2s1i2sn29k3p7b8n',
  'modified': '2018-09-19T12:45:34.956Z',
  'owner': 'alanedel',
  'visibility': 'public',
  'draft': false
});