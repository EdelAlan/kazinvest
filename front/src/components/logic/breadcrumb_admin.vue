<script>
  import { mapActions, mapGetters } from 'vuex';

  export default {
    methods: {
      ...mapActions([
        'set_crumb_first',
      ]),
    },

    computed: mapGetters([
      'lang',
      'crumbs_admin',
    ]),
  };
</script>


<template>
  <div class="breadcrumb_admin">
    <div class="breadcrumb_admin-item"
      v-for="item, key in crumbs_admin"
      v-on:click="set_crumb_first(item)"
      >
      <span class="breadcrumb_admin-item_front"></span>
      <span class="breadcrumb_admin-item_back"
        v-if="key != 0" ></span>
      <span v-text="item['title_' + lang]"></span>
    </div>
  </div>
</template>


<style>
  .breadcrumb_admin {
    overflow-x: auto;
    padding: 5px 3px;
    height: 50px;
    width: calc(100vw - 350px);
    white-space: nowrap;
  }
  .breadcrumb_admin-item {
    background: #fff;
    font-size: 16px;
    cursor: pointer;
    height: 34px;
    padding: 6px 5px 6px 8px;
    display: inline-block;
    position: relative;
    color: #03A0E3;
    margin-right: 20px;
    box-shadow: 0 0 5px rgba(0, 0, 0, .25);
  }
  .breadcrumb_admin-item_front {
    top: -3px;
    right: -19px;
    position: absolute;
    width: 19px;
    background-repeat: no-repeat;
    height: 40px;
    background-size: contain;
    background-image: url('../../assets/images/crumb_front.png');
  }
  .breadcrumb_admin-item_back {
    top: -4px;
    left: -19px;
    width: 19px;
    position: absolute;
    background-repeat: no-repeat;
    height: 40px;
    background-size: contain;
    background: url('../../assets/images/crumb_back.png');
  }
</style>