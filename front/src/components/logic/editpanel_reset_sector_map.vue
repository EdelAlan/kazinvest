<template>
	<div class="reset_sector_map">
        <button class="reset_sector_map-toggler"
            v-on:click="$emit('click')"
        ></button>
    </div>
</template>

<style>
.reset_sector_map {
  top: 375px; 
  right: 45px; 
  position: fixed;
  width: 30px;
  height: 30px;
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
