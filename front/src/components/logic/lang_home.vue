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
  <div>
    <div id="ru"
      class="lang_container-item" 
      :class="{ 'lang_container-item--active': lang == 'ru' }"
      @click="select_lang('ru')"></div>
    <div id="kz"
      class="lang_container-item" 
      :class="{ 'lang_container-item--active': lang == 'kz' }"
      @click="select_lang('kz')"></div>
    <div id="en"
      class="lang_container-item" 
      :class="{ 'lang_container-item--active': lang == 'en' }"
      @click="select_lang('en')"></div>
  </div>
</template>


<style>
  .lang_container {
    padding: 20px;
    display: flex;
    justify-content: flex-end;
  }

  .lang_container-item {
    height: 22px;
    width: 37px;
    margin: 0 8px;
  }

  .lang_container-item--active {
    box-shadow: inset 0 0 0 2px #52cbff;
  }

  #kz.lang_container-item {
    background: url('../../assets/images/lang-kk.svg') no-repeat center;
  }

  #ru.lang_container-item {
    background: url('../../assets/images/lang-ru.svg') no-repeat center;
  }

  #en.lang_container-item {
    background: url('../../assets/images/lang-en.svg') no-repeat center;
  }

  .lang_container-item:hover {
    cursor: pointer;
  }

</style>
