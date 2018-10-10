<script>
  import { mapGetters, mapActions } from 'vuex';

  export default {
    props: ['menu'],

    methods: {
      ...mapActions([
        'change_ui_visibility',
        'set_passport_content',
        'set_passport_title',
      ]),
      async select (item) {
        await this.set_passport_content(item.passport_content);
        await this.set_passport_title(item['title_' + this.lang]);
        this.change_ui_visibility({
          ui_component: 'passport',
          ui_component_state: true,
        });
        console.log(item.passport_content);
      }
    },
    
    computed: mapGetters([
      'lang',
      'passport_content',
    ]),
  }
</script>

<template>
	<div class="reference">
    <div class="reference-item"
      :class="{ 'reference-item--active': passport_content == item.passport_content }"
      v-for="item in menu"
      @click="select(item)"
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
  .reference-item--active {
    background: #50C7F9;
    color: #fff;
  }
  .reference-item:hover {
    background: #f5f5f5;
  }
  .reference-item.reference-item--active:hover {
    background: #50C7F9;
  }
</style>
