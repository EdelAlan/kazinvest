<script>
  import { mapGetters, mapActions } from 'vuex';  
  import editpanel_editzone_reconciliation from './editpanel_editzone_reconciliation';
  import editpanel_editsector_reconciliation from './editpanel_editsector_reconciliation';
  // import editpanel_editinf_reconciliation from './editpanel_editinf_reconciliation';

  export default {
    components: {
      editpanel_editzone_reconciliation,
      editpanel_editsector_reconciliation,
      // editpanel_editinf_reconciliation,
    },

    data () {
      return {
        editzone_state: false,
        editsector_state: false,
        editinf_state: false,
      }
    },

    computed: mapGetters([
      'new_data',
      'edited_sector',
      'edited_zone',
      'lang',
    ]),

    async mounted () {
      await this.set_new_data();
    },

    methods: {
      ...mapActions([
        'set_new_data',
        'collapse_zone_sectors',
        'set_edited_zone',
        'set_edited_sector',
      ]),

      edit_state(data) {
        switch(data.type) {
          case 'zone':
            this.set_edited_zone(data);
            this.editzone_state = true;
          break;
          case 'sector':
            this.set_edited_sector(data);
            this.editsector_state = true;
          break;
          case 'inf':
            this.editinf_state = true;
          break;
        }
      },

      is_rejected() {
        if (!this.edited_zone) {
          this.editzone_state = false;
        }
        if (!this.edited_sector) {
           this.editsector_state = false;
        } else {
        // if (!this.edited_inf) {
          this.editinf_state = false;
        }
      },

    },

    watch: {
      edited_zone: 'is_rejected',
      edited_sector: 'is_rejected',
      // edited_inf: 'is_rejected',
    }

  }
</script>


<template>
  <div class="editpanel_reconciliation">

    <editpanel_editzone_reconciliation v-if="editzone_state" />
    <editpanel_editsector_reconciliation v-if="editsector_state" />
    <!-- <editpanel_editinf_reconciliation v-if="editinf_state" /> -->

    <div v-if="!editzone_state && !editsector_state && !editinf_state" class="editpanel_reconciliation-list">
      <div v-for="data in new_data" class="editpanel_reconciliation-item">
        <h2 class="editpanel_reconciliation-header_title" 
          v-text="JSON.parse(data.model)['title_'+lang] + ' – ' + data.type"></h2>
        <button class="editpanel_reconciliation-edit" 
          v-on:click="edit_state(data)"
        ></button>
      </div>
    </div>
    
  </div>
</template>

<style>
  .editpanel_reconciliation-list {
    position: absolute;
    z-index: 10;
    width: calc(100% - 60px);
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
    overflow-y: auto;
    padding: 0;
    margin: 30px;
    height: calc(100vh - 60px);
  }
  .editpanel_reconciliation-item {
    border-top: 1px solid #eee;
    position: relative;
  }
  .editpanel_reconciliation-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding-left: 20px;
  }
  .editpanel_reconciliation-edit {
    position: absolute;
    width: 30px;
    height: 30px;
    top: 10px;
    right: 20px;
    background-color: #fff;
    border-radius: 50%;
    border: none;
    outline: none;
    cursor: pointer;
    background-image: url("../../assets/images/pencil.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  .editpanel_reconciliation-edit:hover {
    background-color: #f1f1f1;
  }
  .editpanel_reconciliation-sector_item_title--leftpd {
    padding-left: 45px;
  }
</style>
