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
    <div id="ru" class="lang-item"
      @click="select_lang('ru')"></div>
    <div id="kz" class="lang-item"
      @click="select_lang('kz')"></div>
    <div id="en" class="lang-item"
      @click="select_lang('en')"></div>
  </div>
</template>


<style>
  .lang_container {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
  }

  .lang-item {
    height: 22px;
    width: 37px;
    margin: 0 8px;
  }

  #kz.lang-item {
    background: url('../../assets/images/lang-kk.svg') no-repeat center;
  }

  #ru.lang-item {
    background: url('../../assets/images/lang-ru.svg') no-repeat center;
  }

  #en.lang-item {
    background: url('../../assets/images/lang-en.svg') no-repeat center;
  }

  .lang-item:hover {
    cursor: pointer;
  }

</style>
