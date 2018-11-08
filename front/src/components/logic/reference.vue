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
        await this.set_passport_title({ title_ru: item.title_ru, title_kz: item.title_kz, title_en: item.title_en });
        if (item.passport_content == '9999') {
          this.change_ui_visibility({
            ui_component: 'passport',
            ui_component_state: false,
          });
        } else {
          this.change_ui_visibility({
            ui_component: 'passport',
            ui_component_state: true,
          });
        }
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
      :class="{ 'reference-item--active': !passport_content ? false : passport_content == item.passport_content }"
      v-for="item in menu"
      @click="select(item),
      change_ui_visibility({
        ui_component: 'passport_anal_bar',
        ui_component_state: false,
      }),
      change_ui_visibility({
        ui_component: 'passport_anal',
        ui_component_state: false,
      })"
      v-text="item['title_' + lang]"></div>
  </div>
</template>


<style>
  .reference-item {
    white-space: pre-line;
    border-bottom: 1px solid #eee;
    padding: 15px;
    transition: all 200ms;
    cursor: pointer;
    color: #03A0E3;
    transition: all 200ms;
  }

  .reference-item-sum {
    white-space: pre-line;
    font-size: 18px;
    color: #03A0E3;
  }

  .reference-item-title {
    white-space: pre-line;
    font-size: 14px;
    color: #949494;
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
