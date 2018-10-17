<script>
  import lang from './lang';
  import sidebar_filter from './sidebar_filter';
  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: { 
      lang,
      sidebar_filter,
    },
    computed: mapGetters([
      'levels',
    ]),
    methods: {
      async back () {
        await this.set_level_b(this.levels[0])
        this.$router.push('/')
      },
      ...mapActions([
        'set_level_b',
      ])
    },
  }
</script>


<template>
  <div class="sidebar_header">
    <div class="sidebar_header-container">

      <div class="sidebar_header-header">
        <div class="sidebar_header-logo"
          @click="back"
        ></div>

        <lang class="sidebar_header-lang"></lang>
      </div>

      <sidebar_filter></sidebar_filter>

    </div>
  </div>
</template>


<style>

  .sidebar_header-container {
    background: #03A0E3;
    border-radius: 3px;
  }

  .sidebar_header-header {
    padding: 5px;
    height: 70px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 0 5px rgba(0, 0, 0, .2);
  }

  .sidebar_header-lang {
    margin-right: 5px;
  }

  .sidebar_header-logo {
    height: 50px;
    width: 90px;
    margin: 5px;
    background: url('../../assets/images/logo.svg') no-repeat center;
    background-size: cover;
  }

</style>
