<template>
    <div id="map">
    </div>
</template>

<script>
    import mapboxgl from 'mapbox-gl'
    import positron from '../assets/js/positron'
    import '../assets/css/mapbox-gl.css'
    import {mapGetters} from 'vuex'

    export default {
        name: "mapgl",
        mounted() {
            mapboxgl.accessToken = 'pk.eyJ1IjoiYWxhbmVkZWwiLCJhIjoiY2pnZXhxN2h4NGZjdzJ3a2w5bHQxcDcxcyJ9.74qnkPsP7PUJ4Fu3Jv5LuQ';
            this.map = new mapboxgl.Map({
                container: 'map',
                style: positron(),
                // style: 'mapbox://styles/alanedel/cjm8zxhak2s1i2sn29k3p7b8n',
                zoom: 5,
                // maxBounds: [[46.5857415370,37.6890455714], [86.1365227870,60.2212701884]],
                center: [66.6751886295297, 48.0219296299588],
                // attributionControl: false,
                interactive: false,
            });

            this.map.once('style.load', _ => {
                // this._addObjects();
            });

        },
        computed: {
            // ...mapGetters({
            //     geometries: 'getGeometries',
            // }),
        },
        methods: {
            
        }
    }
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
