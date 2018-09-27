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
        'composite': {
            'url': 'mapbox://alanedel.cjm90ybsq0jsz2qps9bus0l61-7bc8n,alanedel.ark1w3xd,alanedel.dx9wk4j2,alanedel.cjm90zdb907gq2wmp3wsdp3m6-9iaf8,alanedel.cc7b6dd2,alanedel.cjm90wsdu2c0v32o7un0y4zh1-11pop,alanedel.cjm90whgh0xn02vnu9ni5nmre-09wbg,alanedel.cjm90ylwj2m9x32nxnwymzdih-0fgd2,alanedel.cjm90xhsi0y3s2vtn8jhfn5fb-59tpr,alanedel.cjm90x7qs2c1l2qo7twhzxid9-1fbbx,alanedel.cjm90z1se1ywa2vqvr1hzrdla-4wr07,alanedel.0yjs07oo,alanedel.cz505b5o,alanedel.2bdo6zvq',
            'type': 'vector'
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
        }
    },
    'sprite': 'mapbox://sprites/alanedel/cjm8zxhak2s1i2sn29k3p7b8n',
    'glyphs': 'https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=hWWfWrAiWGtv68r8wA6D',
    'layers': [{
            'id': 'background',
            'type': 'background',
            'paint': {
                'background-color': '#AECBD8'
            }
        },
        {
            'id': 'landuse-residential',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                '==',
                'class',
                'residential'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': {
                    'base': 1,
                    'stops': [
                        [
                            12,
                            'hsla(30, 19%, 90%, 0.4)'
                        ],
                        [
                            16,
                            'hsla(30, 19%, 90%, 0.2)'
                        ]
                    ]
                }
            }
        },
        {
            'id': 'landuse-commercial',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'Polygon'
                ],
                [
                    '==',
                    'class',
                    'commercial'
                ]
            ],
            'paint': {
                'fill-color': 'hsla(0, 60%, 87%, 0.23)'
            }
        },
        {
            'id': 'landuse-industrial',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'Polygon'
                ],
                [
                    '==',
                    'class',
                    'industrial'
                ]
            ],
            'paint': {
                'fill-color': 'hsla(49, 100%, 88%, 0.34)'
            }
        },
        {
            'id': 'park',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'park',
            'filter': [
                '==',
                '$type',
                'Polygon'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': '#d8e8c8',
                'fill-opacity': {
                    'base': 1.8,
                    'stops': [
                        [
                            9,
                            0.5
                        ],
                        [
                            12,
                            0.2
                        ]
                    ]
                }
            }
        },
        {
            'id': 'park-outline',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'park',
            'filter': [
                '==',
                '$type',
                'Polygon'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': {
                    'base': 1,
                    'stops': [
                        [
                            6,
                            'hsla(96, 40%, 49%, 0.36)'
                        ],
                        [
                            8,
                            'hsla(96, 40%, 49%, 0.66)'
                        ]
                    ]
                },
                'line-dasharray': [
                    3,
                    3
                ]
            }
        },
        {
            'id': 'landuse-cemetery',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                '==',
                'class',
                'cemetery'
            ],
            'paint': {
                'fill-color': '#e0e4dd'
            }
        },
        {
            'id': 'landuse-hospital',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                '==',
                'class',
                'hospital'
            ],
            'paint': {
                'fill-color': '#fde'
            }
        },
        {
            'id': 'landuse-school',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                '==',
                'class',
                'school'
            ],
            'paint': {
                'fill-color': '#f0e8f8'
            }
        },
        {
            'id': 'landuse-railway',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'landuse',
            'filter': [
                '==',
                'class',
                'railway'
            ],
            'paint': {
                'fill-color': 'hsla(30, 19%, 90%, 0.4)'
            }
        },
        {
            'id': 'landcover-grass-park',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849388993.3071'
            },
            'source': 'openmaptiles',
            'source-layer': 'park',
            'filter': [
                '==',
                'class',
                'public_park'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': '#d8e8c8',
                'fill-opacity': 0.8
            }
        },
        {
            'id': 'waterway_tunnel',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'waterway',
            'minzoom': 14,
            'filter': [
                'all',
                [
                    'in',
                    'class',
                    'river',
                    'stream',
                    'canal'
                ],
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#4586e8',
                'line-width': {
                    'base': 1.3,
                    'stops': [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                },
                'line-dasharray': [
                    2,
                    4
                ]
            }
        },
        {
            'id': 'waterway-other',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'waterway',
            'filter': [
                '!in',
                'class',
                'canal',
                'river',
                'stream'
            ],
            'layout': {
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#4586e8',
                'line-width': {
                    'base': 1.3,
                    'stops': [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            'id': 'waterway-stream-canal',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'waterway',
            'filter': [
                'all',
                [
                    'in',
                    'class',
                    'canal',
                    'stream'
                ],
                [
                    '!=',
                    'brunnel',
                    'tunnel'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#4586e8',
                'line-width': {
                    'base': 1.3,
                    'stops': [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            'id': 'waterway-river',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'waterway',
            'filter': [
                'all',
                [
                    '==',
                    'class',
                    'river'
                ],
                [
                    '!=',
                    'brunnel',
                    'tunnel'
                ]
            ],
            'layout': {
                'line-cap': 'round'
            },
            'paint': {
                'line-color': '#4586e8',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            10,
                            0.8
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            'id': 'water-offset',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'water',
            'maxzoom': 8,
            'filter': [
                '==',
                '$type',
                'Polygon'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-opacity': 1,
                'fill-color': '#4586e8',
                'fill-translate': {
                    'base': 1,
                    'stops': [
                        [
                            6,
                            [
                                2,
                                0
                            ]
                        ],
                        [
                            8,
                            [
                                0,
                                0
                            ]
                        ]
                    ]
                }
            }
        },
        {
            'id': 'water',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'water',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': '#4586e8'
            }
        },
        {
            'id': 'water-pattern',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849382550.77'
            },
            'source': 'openmaptiles',
            'source-layer': 'water',
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-translate': [
                    0,
                    2.5
                ],
                'fill-pattern': 'wave'
            }
        },
        {
            'id': 'building',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849364238.8171'
            },
            'source': 'openmaptiles',
            'source-layer': 'building',
            'paint': {
                'fill-color': '#fff',
                // 'fill-antialias': true
            }
        },
        {
            'id': 'tunnel-service-track-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'service',
                    'track'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#cfcdca',
                'line-dasharray': [
                    0.5,
                    0.25
                ],
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            15,
                            1
                        ],
                        [
                            16,
                            4
                        ],
                        [
                            20,
                            11
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-minor-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'minor'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#cfcdca',
                'line-opacity': {
                    'stops': [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                },
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-secondary-tertiary-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'secondary',
                    'tertiary'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            8,
                            1.5
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-trunk-primary-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'primary',
                    'trunk'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-motorway-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'motorway'
                ]
            ],
            'layout': {
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-dasharray': [
                    0.5,
                    0.25
                ],
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-path',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '==',
                        'brunnel',
                        'tunnel'
                    ],
                    [
                        '==',
                        'class',
                        'path'
                    ]
                ]
            ],
            'paint': {
                'line-color': '#cba',
                'line-dasharray': [
                    1.5,
                    0.75
                ],
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            15,
                            1.2
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-service-track',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'service',
                    'track'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fff',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-minor',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'minor_road'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fff',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-secondary-tertiary',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'secondary',
                    'tertiary'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fff4c6',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-trunk-primary',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'primary',
                    'trunk'
                ]
            ],
            'layout': {
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fff4c6',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-motorway',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'motorway'
                ]
            ],
            'layout': {
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#ffdaa6',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            'id': 'tunnel-railway',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849354174.1904'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    'brunnel',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'rail'
                ]
            ],
            'paint': {
                'line-color': '#bbb',
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                },
                'line-dasharray': [
                    2,
                    2
                ]
            }
        },
        {
            'id': 'ferry',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    'in',
                    'class',
                    'ferry'
                ]
            ],
            'layout': {
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': 'rgba(108, 159, 182, 1)',
                'line-width': 1.1,
                'line-dasharray': [
                    2,
                    2
                ]
            }
        },
        {
            'id': 'aeroway-area',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'aeroway',
            'minzoom': 4,
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'Polygon'
                ],
                [
                    'in',
                    'class',
                    'runway',
                    'taxiway'
                ]
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-opacity': {
                    'base': 1,
                    'stops': [
                        [
                            13,
                            0
                        ],
                        [
                            14,
                            1
                        ]
                    ]
                },
                'fill-color': 'rgba(255, 255, 255, 1)'
            }
        },
        {
            'id': 'highway-area',
            'type': 'fill',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                '==',
                '$type',
                'Polygon'
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'fill-color': 'hsla(0, 0%, 89%, 0.56)',
                'fill-outline-color': '#cfcdca',
                'fill-opacity': 0.9,
                'fill-antialias': false
            }
        },
        {
            'id': 'highway-motorway-link-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 12,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'motorway_link'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-link-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 13,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'primary_link',
                    'secondary_link',
                    'tertiary_link',
                    'trunk_link'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12,
                            1
                        ],
                        [
                            13,
                            3
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-minor-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!=',
                        'brunnel',
                        'tunnel'
                    ],
                    [
                        'in',
                        'class',
                        'minor',
                        'service',
                        'track'
                    ]
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#cfcdca',
                'line-opacity': {
                    'stops': [
                        [
                            12,
                            0
                        ],
                        [
                            12.5,
                            1
                        ]
                    ]
                },
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12,
                            0.5
                        ],
                        [
                            13,
                            1
                        ],
                        [
                            14,
                            4
                        ],
                        [
                            20,
                            15
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-secondary-tertiary-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'secondary',
                    'tertiary'
                ]
            ],
            'layout': {
                'line-cap': 'butt',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            8,
                            1.5
                        ],
                        [
                            20,
                            17
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-primary-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 5,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'primary'
                ]
            ],
            'layout': {
                'line-cap': 'butt',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': {
                    'stops': [
                        [
                            7,
                            0
                        ],
                        [
                            8,
                            1
                        ]
                    ]
                },
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            7,
                            0
                        ],
                        [
                            8,
                            0.6
                        ],
                        [
                            9,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-trunk-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 5,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'trunk'
                ]
            ],
            'layout': {
                'line-cap': 'butt',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-opacity': {
                    'stops': [
                        [
                            5,
                            0
                        ],
                        [
                            6,
                            1
                        ]
                    ]
                },
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            5,
                            0
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-motorway-casing',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 4,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'motorway'
                ]
            ],
            'layout': {
                'line-cap': 'butt',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#e9ac77',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            4,
                            0
                        ],
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                },
                'line-opacity': {
                    'stops': [
                        [
                            4,
                            0
                        ],
                        [
                            5,
                            1
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-path',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        '==',
                        'class',
                        'path'
                    ]
                ]
            ],
            'paint': {
                'line-color': '#fff',
                'line-dasharray': [
                    1.5,
                    0.75
                ],
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            15,
                            1.2
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-motorway-link',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 12,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    '==',
                    'class',
                    'motorway_link'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fc8',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-link',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 13,
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'primary_link',
                    'secondary_link',
                    'tertiary_link',
                    'trunk_link'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#fea',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            12.5,
                            0
                        ],
                        [
                            13,
                            1.5
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-minor',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!=',
                        'brunnel',
                        'tunnel'
                    ],
                    [
                        'in',
                        'class',
                        'minor',
                        'service',
                        'track'
                    ]
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': '#fff',
                'line-opacity': 1,
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-secondary-tertiary',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '!in',
                    'brunnel',
                    'bridge',
                    'tunnel'
                ],
                [
                    'in',
                    'class',
                    'secondary',
                    'tertiary'
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#fea',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            8,
                            0.5
                        ],
                        [
                            20,
                            13
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-primary',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        'in',
                        'class',
                        'primary'
                    ]
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#fea',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            8.5,
                            0
                        ],
                        [
                            9,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-trunk',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        'in',
                        'class',
                        'trunk'
                    ]
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#fea',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            'id': 'highway-motorway',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 5,
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        '==',
                        'class',
                        'motorway'
                    ]
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round',
                'visibility': 'visible'
            },
            'paint': {
                'line-color': '#fc8',
                'line-width': {
                    'base': 1.2,
                    'stops': [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway-transit',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '==',
                        'class',
                        'transit'
                    ],
                    [
                        '!in',
                        'brunnel',
                        'tunnel'
                    ]
                ]
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': 'hsla(0, 0%, 73%, 0.77)',
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14,
                            0.4
                        ],
                        [
                            20,
                            1
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway-transit-hatching',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '==',
                        'class',
                        'transit'
                    ],
                    [
                        '!in',
                        'brunnel',
                        'tunnel'
                    ]
                ]
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': 'hsla(0, 0%, 73%, 0.68)',
                'line-dasharray': [
                    0.2,
                    8
                ],
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            2
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway-service',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '==',
                        'class',
                        'rail'
                    ],
                    [
                        'has',
                        'service'
                    ]
                ]
            ],
            'paint': {
                'line-color': 'hsla(0, 0%, 73%, 0.77)',
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14,
                            0.4
                        ],
                        [
                            20,
                            1
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway-service-hatching',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '==',
                        'class',
                        'rail'
                    ],
                    [
                        'has',
                        'service'
                    ]
                ]
            ],
            'layout': {
                'visibility': 'visible'
            },
            'paint': {
                'line-color': 'hsla(0, 0%, 73%, 0.68)',
                'line-dasharray': [
                    0.2,
                    8
                ],
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            2
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!has',
                        'service'
                    ],
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        '==',
                        'class',
                        'rail'
                    ]
                ]
            ],
            'paint': {
                'line-color': '#bbb',
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            'id': 'railway-hatching',
            'type': 'line',
            'metadata': {
                'mapbox:group': '1444849345966.4436'
            },
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'filter': [
                'all',
                [
                    '==',
                    '$type',
                    'LineString'
                ],
                [
                    'all',
                    [
                        '!has',
                        'service'
                    ],
                    [
                        '!in',
                        'brunnel',
                        'bridge',
                        'tunnel'
                    ],
                    [
                        '==',
                        'class',
                        'rail'
                    ]
                ]
            ],
            'paint': {
                'line-color': '#bbb',
                'line-dasharray': [
                    0.2,
                    8
                ],
                'line-width': {
                    'base': 1.4,
                    'stops': [
                        [
                            14.5,
                            0
                        ],
                        [
                            15,
                            3
                        ],
                        [
                            20,
                            8
                        ]
                    ]
                }
            }
        },
        {
            'id': 'cablecar-dash',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'transportation',
            'minzoom': 13,
            'filter': [
                '==',
                'class',
                'cable_car'
            ],
            'layout': {
                'visibility': 'visible',
                'line-cap': 'round'
            },
            'paint': {
                'line-color': 'hsl(0, 0%, 70%)',
                'line-width': {
                    'base': 1,
                    'stops': [
                        [
                            11,
                            3
                        ],
                        [
                            19,
                            5.5
                        ]
                    ]
                },
                'line-dasharray': [
                    2,
                    3
                ]
            }
        },
        {
            'id': 'boundary-land-level-2',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'boundary',
            'filter': [
                'all',
                [
                    '==',
                    'admin_level',
                    2
                ],
                [
                    '!=',
                    'maritime',
                    1
                ],
                [
                    '!=',
                    'disputed',
                    1
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': 'hsl(248, 7%, 66%)',
                'line-width': {
                    'base': 1,
                    'stops': [
                        [
                            0,
                            0.6
                        ],
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                }
            }
        },
        {
            'id': 'boundary-land-disputed',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'boundary',
            'filter': [
                'all',
                [
                    '!=',
                    'maritime',
                    1
                ],
                [
                    '==',
                    'disputed',
                    1
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': 'hsl(248, 7%, 70%)',
                'line-dasharray': [
                    1,
                    3
                ],
                'line-width': {
                    'base': 1,
                    'stops': [
                        [
                            0,
                            0.6
                        ],
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                }
            }
        },
        {
            'id': 'boundary-water',
            'type': 'line',
            'source': 'openmaptiles',
            'source-layer': 'boundary',
            'filter': [
                'all',
                [
                    'in',
                    'admin_level',
                    2,
                    4
                ],
                [
                    '==',
                    'maritime',
                    1
                ]
            ],
            'layout': {
                'line-cap': 'round',
                'line-join': 'round'
            },
            'paint': {
                'line-color': 'rgba(154, 189, 214, 1)',
                'line-width': {
                    'base': 1,
                    'stops': [
                        [
                            0,
                            0.6
                        ],
                        [
                            4,
                            1.4
                        ],
                        [
                            5,
                            2
                        ],
                        [
                            12,
                            8
                        ]
                    ]
                },
                'line-opacity': {
                    'stops': [
                        [
                            6,
                            0.6
                        ],
                        [
                            10,
                            1
                        ]
                    ]
                }
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