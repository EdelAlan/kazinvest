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
        'openmaptiles': {
            'type': 'vector',
            'url': 'https://free.tilehosting.com/data/v3.json?key=hWWfWrAiWGtv68r8wA6D'
        },
        'composite': {
            'url': 'mapbox://alanedel.cjm90ybsq0jsz2qps9bus0l61-7bc8n,alanedel.ark1w3xd,alanedel.dx9wk4j2,alanedel.cjm90zdb907gq2wmp3wsdp3m6-9iaf8,alanedel.cc7b6dd2,alanedel.cjm90wsdu2c0v32o7un0y4zh1-11pop,alanedel.cjm90whgh0xn02vnu9ni5nmre-09wbg,alanedel.cjm90ylwj2m9x32nxnwymzdih-0fgd2,alanedel.cjm90xhsi0y3s2vtn8jhfn5fb-59tpr,alanedel.cjm90x7qs2c1l2qo7twhzxid9-1fbbx,alanedel.cjm90z1se1ywa2vqvr1hzrdla-4wr07,alanedel.0yjs07oo,alanedel.cz505b5o,alanedel.2bdo6zvq',
            'type': 'vector'
        }
    },
    'sprite': 'mapbox://sprites/alanedel/cjm8zxhak2s1i2sn29k3p7b8n',
    'glyphs': 'https://free.tilehosting.com/fonts/{fontstack}/{range}.pbf?key=hWWfWrAiWGtv68r8wA6D',
    'layers': [{
            'id': 'background',
            'type': 'background',
            'layout': {},
            'paint': {
                'background-color': 'hsl(0, 0%, 52%)',
                'background-opacity': 0.03
            }
        },
        {
            'id': 'background-pattern',
            'type': 'background',
            'layout': {},
            'paint': {
                'background-color': 'hsl(0, 0%, 52%)',
                'background-opacity': 1,
                'background-pattern': 'Vector'
            }
        },
        {
            'id': 'akm-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'akm_obl-b70enu',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'akt-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'akt_obl-0or7p0',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'alm-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'alm_obl-07xgak',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'vko-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'vko',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'tur-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'tur_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'sko-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'sko',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'pavl-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'pavl_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'kyz-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'kyz_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'kost-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'kost_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'kar-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'kar_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'jamb-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'jamb_obl',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'man-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'man_obl-9taiot',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'zko-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'zko_obl-8qi6mt',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
        {
            'id': 'atyr-obl',
            'type': 'fill',
            'source': 'composite',
            'source-layer': 'atyr_obl-3y40uz',
            'layout': {},
            'paint': {
                'fill-outline-color': '#ffffff',
                'fill-color': ['case',
                    ['boolean', ['feature-state', 'hover'], false],
                    '#03A0E3',
                    '#accad7',
                ],
            }
        },
    ],
    'created': '2018-09-19T10:20:07.260Z',
    'id': 'cjm8zxhak2s1i2sn29k3p7b8n',
    'modified': '2018-09-19T12:45:34.956Z',
    'owner': 'alanedel',
    'visibility': 'public',
    'draft': false
});