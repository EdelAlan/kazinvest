<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {
    computed: mapGetters([
      'lang',
    ]),

    methods: mapActions([
      'select_lang',
    ]),
  }
</script>


<template>
  <div class="lang">
    <div class="lang-container">
      <span class="lang-item"
        :class="{'lang-item--active': lang == 'kz' }"
        @click="select_lang('kz')">KAZ</span>
      <span class="lang-item"
        :class="{'lang-item--active': lang == 'ru' }"
        @click="select_lang('ru')">RUS</span>
      <span class="lang-item"
        :class="{'lang-item--active': lang == 'en' }"
        @click="select_lang('en')">ENG</span>
    </div>
  </div>
</template>


<style>
  .lang-container {
    display: flex;
    flex-direction: column;
  }

  .lang-item {
    color: white;
    text-decoration: none;
    cursor: pointer;
  }

  .lang-item--active {
    text-decoration: underline;
  }

  .lang-item:hover {
    text-decoration: underline;
  }
</style>
