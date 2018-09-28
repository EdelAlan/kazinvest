<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  export default {
    name: 'app',
  }
</script>

<style>
  @font-face {
    font-family: "ProximaNovaRegular";
    src: url("./assets/fonts/ProximaNova-Regular.ttf") format("truetype");
    font-style: normal;
    font-weight: normal;
  }

  @font-face {
    font-family: "ProximaNovaSemibold";
    src: url("./assets/fonts/ProximaNova-Semibold.ttf") format("truetype");
    font-style: normal;
    font-weight: 600;
  }

  * {
    font-family: 'ProximaNovaRegular', sans-serif;
    box-sizing: border-box;
  }

  html,
  body {
    margin: 0;
    padding: 0;
    height: 100%;
  }

  html {
    /* @beknur мешает дочерним элементам */
    background: url('./assets/images/background.svg') repeat, url('./assets/images/background.svg') repeat -69px -68px;
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center; @beknur мешает дочерним элементам */ 
    height: 100%;
    overflow: auto;
  }

  ::-webkit-scrollbar {
    width: .3rem;
    height: .3rem;
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: .3em;
}
</style>
