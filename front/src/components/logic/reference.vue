<script>
  import { mapGetters } from 'vuex';

  export default {
    props: ['menu'],

    computed: mapGetters([
      'lang'
    ]),
  }
</script>

<template>
	<div class="reference">
    <div class="reference-item"
      v-for="item in menu"
      v-text="item['title_' + lang]"></div>
  </div>
</template>


<style>
  .reference-item {
    border-bottom: 1px solid #eee;
    padding: 15px;
    transition: all 200ms;
    cursor: pointer;
    color: #03A0E3;
    transition: all 200ms;
  }
  .reference-item:hover {
    background: #f5f5f5;
  }
</style>
