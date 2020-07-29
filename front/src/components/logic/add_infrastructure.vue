<template>
	<div class="add_infrastructure">
    <button class="add_infrastructure-toggler"
        v-on:click="add_new_infrastructure"
    >
      <span
        v-text="{
          'title_ru': 'Добавить объект', 
          'title_kz': 'Объект қосу', 
          'title_en': 'Add object'
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
  ]),

  methods: mapActions([
    'add_new_infrastructure',
  ]),
}
</script>


<style>
.add_infrastructure {
  width: 130px;
  height: 37px;
  position: relative;
}

.add_infrastructure:hover .basemap-thumb {
  transform: scale(1.1);
}

.add_infrastructure-toggler {
  width: 130px;
  height: 30px;
  border-radius: 0.2em;
  box-sizing: border-box;
  cursor: pointer;
  background-color: #878DA1;
  color: #fff;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  outline: none;
  transition: 200ms;
}

.add_infrastructure-toggler:hover {
  box-shadow: 0 0 0.5em #888;
}

</style>
