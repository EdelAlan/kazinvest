<template>
	<div class="basemaps">
        <button class="basemaps-toggler"
            v-on:click="$emit('click')"
            :class="{
              'basemaps-toggler--map': basemap == true,
              'basemaps-toggler--sputnic': basemap == false
            }"
        ></button>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: mapGetters([
    'basemap',
  ]),
}
</script>


<style>
.basemaps {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  bottom: 10px;
}

.basemaps:hover {
  box-shadow: 0 0 0.5em #888;
}

.basemaps:hover .basemap-thumb {
  transform: scale(1.1);
}

.basemaps-toggler {
  width: 30px;
  height: 30px;
  border: 1px solid #333;
  border-radius: 0.2em;
  box-sizing: border-box;
  cursor: pointer;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  outline: none;
  transition: 200ms;
}

.basemaps-toggler:hover::after {
  opacity: 0.1;
}

.basemaps-toggler--map {
  background-image: url("../../assets/images/map.jpg");
}

.basemaps-toggler--sputnic {
  background-image: url("../../assets/images/sputnic.jpg");
}
</style>
