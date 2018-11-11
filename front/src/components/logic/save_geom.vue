<template>
	<div class="save_geom">
        <button class="save_geom-toggler"
          :class="{ 'save_geom-toggler--active' : is_geom_update }"
            v-on:click="send_geom"
        >
          <span
            v-text="{
              'title_ru': 'Сохранить', 
              'title_kz': 'Сақтау', 
              'title_en': 'Save'
            }['title_' + lang]"
          ></span>
        </button>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';

export default {
  computed: mapGetters([
    'lang',
    'geom',
    'is_geom_update',
  ]),

  methods: mapActions([
    'send_geom',
  ]),
}
</script>


<style>
.save_geom {
  width: 100px;
  height: 30px;
  position: absolute;
  top: 167px;
  right: 85px;
}

.save_geom:hover {
  box-shadow: 0 0 0.5em #888;
}

.save_geom:hover .basemap-thumb {
  transform: scale(1.1);
}

.save_geom-toggler {
  width: 100px;
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

.save_geom-toggler:hover::after {
  opacity: 0.1;
}

.save_geom-toggler--active {
  background-color: orange;
}

</style>
