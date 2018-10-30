<template>
	<div class="reset_sector_map">
        <button class="reset_sector_map-toggler"
            v-on:click="set_reset_sector"
        ></button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  methods: mapActions([
      'set_reset_sector',
  ]),
}
</script>


<style>
.reset_sector_map {
  width: 30px;
  height: 30px;
  position: absolute;
  right: 10px;
  top: 345px;
}

.reset_sector_map-toggler:hover {
  background-color: #ddd;
}

.reset_sector_map-toggler {
  width: 30px;
  height: 30px;
  border: none;
  box-shadow: 0 0 0 2px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  cursor: pointer;
  outline: none;
  transition: 200ms;
  background-image: url("../../assets/images/reset.png");
  background-position: center; 
  background-repeat: no-repeat;
  background-size: 70%;
}

</style>
