<script>
  import { mapGetters } from 'vuex';

  export default {
    props: [
      'list',
      'selected',
      'styles',
      'placeholder',
    ],
    
    data () {
      return {
        filtered_list: null,
        selected_item: null,
        list_is_shown: false,
      };
    },

    mounted () {
      this.filtered_list = this.list;
    },

    computed: mapGetters([
      'lang',
    ]),

    watch: {
      list() {
        this.filtered_list = this.list;
      },
    },

    methods: {
      select (item) {
        this.selected_item = item['title_' + this.lang];
        this.$emit('select', item);
        this.$el.ownerDocument.removeEventListener('click', this.close, true);
      },
      search (match) {
        this.filtered_list = this.list.filter(it => {
          if (it['title_' + this.lang].toLowerCase().indexOf(match.toLowerCase()) > -1) {
            return it;
          }
        });
      },
      open () {
        this.list_is_shown = true;
      },
      close () {
        this.list_is_shown = false;
      },
      focus () {
        this.open ();
        this.$el.ownerDocument.addEventListener('click', this.close, true);
      },
    },
  };

</script>

<template>

  <div class="selector">
    <input class="selector-selected"
      :style="styles"
      :placeholder="placeholder"
      v-model="selected_item"
      v-on:input="search($event.target.value)"
      v-on:click="focus"
    />
    <span class="selector-carret"></span>
    <div class="selector-items"
      v-if="list_is_shown">
      <div class="selector-item"
        v-for="item in filtered_list"
        v-text="item['title_' + lang]"
        v-on:click="select(item)">
      </div>
    </div>
  </div>

</template>

<style>

  .selector {
    position: relative;
  }

  .selector-selected {
    font-family: inherit;
    border: none;
    width: 100%;
    outline: none;
    background: #fff;
  }

  .selector-carret {
    width: 20px;
    height: 12px;
    pointer-events: none;
    position: absolute;
    right: 14px;
    top: 50%;
    opacity: .5;
    transform: translateY(-50%);
    background-size: contain;
    background-image: url('../../assets/images/carret.svg');
  }

  .selector-items {
    box-shadow: 0 .5em 1em 0 rgba(0, 0, 0, .3);
    position: absolute;
    background: #fff;
    box-sizing: border-box;
    width: 100%;
    z-index: 10;
    max-height: 12em;
    overflow-y: auto;
    border-radius: 2px;
  }

  .selector-item {
    color: #333;
    cursor: pointer;
    font-size: 14px;
    padding: .2em .5em;
    font-family: inherit;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .selector-item--active {
    background: #ccc;
  }

  .selector-item:last-child {
    border: none;
  }
  .selector-item:hover {
    background: #f1f1f1;
  }

</style>