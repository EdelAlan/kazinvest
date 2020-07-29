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
    'openmaptiles': {
        'type': 'vector',
        'tiles': ['https://tile.kagis.kz/openmaptiles/tiles/v3/{z}/{x}/{y}.pbf?key=egrA25FNSYcFuvl6Lb8Y'],
        'minzoom': 0,
        'maxzoom': 14,
    },  
    'composite': {
      'url': 'mapbox://mapbox.mapbox-streets-v7',
      'type': 'vector'
    }
  },
  'sprite': 'mapbox://sprites/alanedel/cjm8zxhak2s1i2sn29k3p7b8n',
  'glyphs': 'https://tile.kagis.kz/openmaptiles/fonts/{fontstack}/{range}.pbf?key=egrA25FNSYcFuvl6Lb8Y',
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
        'id': 'bing',
        'type': 'raster',
        'source': 'bing',
        'paint': {},
        'layout': {
          'visibility': 'none'
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
        'id': 'waterway-name',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'waterway',
        'minzoom': 13,
        'filter': [
          'all',
          [
            '==',
            '$type',
            'LineString'
          ],
          [
            'has',
            'name'
          ]
        ],
        'layout': {
          'text-font': [
            'Noto Sans Italic'
          ],
          'text-size': 14,
          'text-field': '{name:latin} {name:nonlatin}',
          'text-max-width': 5,
          'text-rotation-alignment': 'map',
          'symbol-placement': 'line',
          'text-letter-spacing': 0.2,
          'symbol-spacing': 350
        },
        'paint': {
          'text-color': '#74aee9',
          'text-halo-width': 1.5,
          'text-halo-color': 'rgba(255,255,255,0.7)'
        }
      },
      {
        'id': 'water-name-lakeline',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'water_name',
        'filter': [
          '==',
          '$type',
          'LineString'
        ],
        'layout': {
          'text-font': [
            'Noto Sans Italic'
          ],
          'text-size': 14,
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 5,
          'text-rotation-alignment': 'map',
          'symbol-placement': 'line',
          'symbol-spacing': 350,
          'text-letter-spacing': 0.2
        },
        'paint': {
          'text-color': '#74aee9',
          'text-halo-width': 1.5,
          'text-halo-color': 'rgba(255,255,255,0.7)'
        }
      },
      {
        'id': 'water-name-other',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'water_name',
        'filter': [
          'all',
          [
            '==',
            '$type',
            'Point'
          ],
          [
            '!in',
            'class',
            'ocean'
          ]
        ],
        'layout': {
          'text-font': [
            'Noto Sans Italic'
          ],
          'text-size': {
            'stops': [
              [
                0,
                10
              ],
              [
                6,
                14
              ]
            ]
          },
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 5,
          'text-rotation-alignment': 'map',
          'symbol-placement': 'point',
          'symbol-spacing': 350,
          'text-letter-spacing': 0.2,
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#74aee9',
          'text-halo-width': 1.5,
          'text-halo-color': 'rgba(255,255,255,0.7)'
        }
      },
      {
        'id': 'road_oneway',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation',
        'minzoom': 15,
        'filter': [
          'all',
          [
            '==',
            'oneway',
            1
          ],
          [
            'in',
            'class',
            'motorway',
            'trunk',
            'primary',
            'secondary',
            'tertiary',
            'minor',
            'service'
          ]
        ],
        'layout': {
          'symbol-placement': 'line',
          'icon-image': 'oneway',
          'symbol-spacing': 75,
          'icon-padding': 2,
          'icon-rotation-alignment': 'map',
          'icon-rotate': 90,
          'icon-size': {
            'stops': [
              [
                15,
                0.5
              ],
              [
                19,
                1
              ]
            ]
          }
        },
        'paint': {
          'icon-opacity': 0.5
        }
      },
      {
        'id': 'road_oneway_opposite',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation',
        'minzoom': 15,
        'filter': [
          'all',
          [
            '==',
            'oneway',
            -1
          ],
          [
            'in',
            'class',
            'motorway',
            'trunk',
            'primary',
            'secondary',
            'tertiary',
            'minor',
            'service'
          ]
        ],
        'layout': {
          'symbol-placement': 'line',
          'icon-image': 'oneway',
          'symbol-spacing': 75,
          'icon-padding': 2,
          'icon-rotation-alignment': 'map',
          'icon-rotate': -90,
          'icon-size': {
            'stops': [
              [
                15,
                0.5
              ],
              [
                19,
                1
              ]
            ]
          }
        },
        'paint': {
          'icon-opacity': 0.5
        }
      },
      {
        'id': 'highway-name-path',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 15.5,
        'filter': [
          '==',
          'class',
          'path'
        ],
        'layout': {
          'text-size': {
            'base': 1,
            'stops': [
              [
                13,
                12
              ],
              [
                14,
                13
              ]
            ]
          },
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-field': '{name:latin} {name:nonlatin}',
          'symbol-placement': 'line',
          'text-rotation-alignment': 'map'
        },
        'paint': {
          'text-halo-color': '#f8f4f0',
          'text-color': 'hsl(30, 23%, 62%)',
          'text-halo-width': 0.5
        }
      },
      {
        'id': 'highway-name-minor',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 15,
        'filter': [
          'all',
          [
            '==',
            '$type',
            'LineString'
          ],
          [
            'in',
            'class',
            'minor',
            'service',
            'track'
          ]
        ],
        'layout': {
          'text-size': {
            'base': 1,
            'stops': [
              [
                13,
                12
              ],
              [
                14,
                13
              ]
            ]
          },
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-field': '{name:latin} {name:nonlatin}',
          'symbol-placement': 'line',
          'text-rotation-alignment': 'map'
        },
        'paint': {
          'text-halo-blur': 0.5,
          'text-color': '#765',
          'text-halo-width': 1
        }
      },
      {
        'id': 'highway-name-major',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 12.2,
        'filter': [
          'in',
          'class',
          'primary',
          'secondary',
          'tertiary',
          'trunk'
        ],
        'layout': {
          'text-size': {
            'base': 1,
            'stops': [
              [
                13,
                12
              ],
              [
                14,
                13
              ]
            ]
          },
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-field': '{name:latin} {name:nonlatin}',
          'symbol-placement': 'line',
          'text-rotation-alignment': 'map'
        },
        'paint': {
          'text-halo-blur': 0.5,
          'text-color': '#765',
          'text-halo-width': 1
        }
      },
      {
        'id': 'highway-shield',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 8,
        'filter': [
          'all',
          [
            '<=',
            'ref_length',
            6
          ],
          [
            '==',
            '$type',
            'LineString'
          ],
          [
            '!in',
            'network',
            'us-interstate',
            'us-highway',
            'us-state'
          ]
        ],
        'layout': {
          'text-size': 10,
          'icon-image': 'road_{ref_length}',
          'icon-rotation-alignment': 'viewport',
          'symbol-spacing': 200,
          'text-font': [
            'Noto Sans Regular'
          ],
          'symbol-placement': {
            'base': 1,
            'stops': [
              [
                10,
                'point'
              ],
              [
                11,
                'line'
              ]
            ]
          },
          'text-rotation-alignment': 'viewport',
          'icon-size': 1,
          'text-field': '{ref}'
        },
        'paint': {}
      },
      {
        'id': 'highway-shield-us-interstate',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 7,
        'filter': [
          'all',
          [
            '<=',
            'ref_length',
            6
          ],
          [
            '==',
            '$type',
            'LineString'
          ],
          [
            'in',
            'network',
            'us-interstate'
          ]
        ],
        'layout': {
          'text-size': 10,
          'icon-image': '{network}_{ref_length}',
          'icon-rotation-alignment': 'viewport',
          'symbol-spacing': 200,
          'text-font': [
            'Noto Sans Regular'
          ],
          'symbol-placement': {
            'base': 1,
            'stops': [
              [
                7,
                'point'
              ],
              [
                7,
                'line'
              ],
              [
                8,
                'line'
              ]
            ]
          },
          'text-rotation-alignment': 'viewport',
          'icon-size': 1,
          'text-field': '{ref}'
        },
        'paint': {
          'text-color': 'rgba(0, 0, 0, 1)'
        }
      },
      {
        'id': 'highway-shield-us-other',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'transportation_name',
        'minzoom': 9,
        'filter': [
          'all',
          [
            '<=',
            'ref_length',
            6
          ],
          [
            '==',
            '$type',
            'LineString'
          ],
          [
            'in',
            'network',
            'us-highway',
            'us-state'
          ]
        ],
        'layout': {
          'text-size': 10,
          'icon-image': '{network}_{ref_length}',
          'icon-rotation-alignment': 'viewport',
          'symbol-spacing': 200,
          'text-font': [
            'Noto Sans Regular'
          ],
          'symbol-placement': {
            'base': 1,
            'stops': [
              [
                10,
                'point'
              ],
              [
                11,
                'line'
              ]
            ]
          },
          'text-rotation-alignment': 'viewport',
          'icon-size': 1,
          'text-field': '{ref}'
        },
        'paint': {
          'text-color': 'rgba(0, 0, 0, 1)'
        }
      },
      {
        'id': 'airport-label-major',
        'type': 'symbol',
        'source': 'openmaptiles',
        'source-layer': 'aerodrome_label',
        'minzoom': 10,
        'filter': [
          'all',
          [
            'has',
            'iata'
          ]
        ],
        'layout': {
          'text-padding': 2,
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-anchor': 'top',
          'icon-image': 'airport_11',
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-offset': [
            0,
            0.6
          ],
          'text-size': 12,
          'text-max-width': 9,
          'visibility': 'visible',
          'icon-size': 1,
          'text-optional': true
        },
        'paint': {
          'text-halo-blur': 0.5,
          'text-color': '#666',
          'text-halo-width': 1,
          'text-halo-color': '#ffffff'
        }
      },
      {
        'id': 'place-other',
        'type': 'symbol',
        'metadata': {
          'mapbox:group': '1444849242106.713'
        },
        'source': 'openmaptiles',
        'source-layer': 'place',
        'filter': [
          '!in',
          'class',
          'city',
          'town',
          'village',
          'country',
          'continent'
        ],
        'layout': {
          'text-letter-spacing': 0.1,
          'text-size': {
            'base': 1.2,
            'stops': [
              [
                12,
                10
              ],
              [
                15,
                14
              ]
            ]
          },
          'text-font': [
            'Noto Sans Bold'
          ],
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-transform': 'uppercase',
          'text-max-width': 9,
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#633',
          'text-halo-width': 1.2,
          'text-halo-color': 'rgba(255,255,255,0.8)'
        }
      },
      {
        'id': 'place-village',
        'type': 'symbol',
        'metadata': {
          'mapbox:group': '1444849242106.713'
        },
        'source': 'openmaptiles',
        'source-layer': 'place',
        'filter': [
          '==',
          'class',
          'village'
        ],
        'layout': {
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-size': {
            'base': 1.2,
            'stops': [
              [
                10,
                12
              ],
              [
                15,
                22
              ]
            ]
          },
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 8,
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#333',
          'text-halo-width': 1.2,
          'text-halo-color': 'rgba(255,255,255,0.8)'
        }
      },
      {
        'id': 'place-town',
        'type': 'symbol',
        'metadata': {
          'mapbox:group': '1444849242106.713'
        },
        'source': 'openmaptiles',
        'source-layer': 'place',
        'filter': [
          '==',
          'class',
          'town'
        ],
        'layout': {
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-size': {
            'base': 1.2,
            'stops': [
              [
                10,
                14
              ],
              [
                15,
                24
              ]
            ]
          },
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 8,
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#333',
          'text-halo-width': 1.2,
          'text-halo-color': 'rgba(255,255,255,0.8)'
        }
      },
      {
        'id': 'place-city',
        'type': 'symbol',
        'metadata': {
          'mapbox:group': '1444849242106.713'
        },
        'source': 'openmaptiles',
        'source-layer': 'place',
        'filter': [
          'all',
          [
            '!=',
            'capital',
            2
          ],
          [
            '==',
            'class',
            'city'
          ]
        ],
        'layout': {
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-size': {
            'base': 1.2,
            'stops': [
              [
                7,
                14
              ],
              [
                11,
                24
              ]
            ]
          },
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 8,
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#333',
          'text-halo-width': 1.2,
          'text-halo-color': 'rgba(255,255,255,0.8)'
        }
      },
      {
        'id': 'place-city-capital',
        'type': 'symbol',
        'metadata': {
          'mapbox:group': '1444849242106.713'
        },
        'source': 'openmaptiles',
        'source-layer': 'place',
        'filter': [
          'all',
          [
            '==',
            'capital',
            2
          ],
          [
            '==',
            'class',
            'city'
          ]
        ],
        'layout': {
          'text-font': [
            'Noto Sans Regular'
          ],
          'text-size': {
            'base': 1.2,
            'stops': [
              [
                7,
                14
              ],
              [
                11,
                24
              ]
            ]
          },
          'text-field': '{name:latin}\n{name:nonlatin}',
          'text-max-width': 8,
          'icon-image': 'star_11',
          'text-offset': [
            0.4,
            0
          ],
          'icon-size': 0.8,
          'text-anchor': 'left',
          'visibility': 'visible'
        },
        'paint': {
          'text-color': '#333',
          'text-halo-width': 1.2,
          'text-halo-color': 'rgba(255,255,255,0.8)'
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