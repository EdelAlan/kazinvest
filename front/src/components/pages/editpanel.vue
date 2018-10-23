<script>
  import { mapGetters, mapActions } from 'vuex';
  import editpanel_sidebar from '../logic/editpanel_sidebar';
  import editpanel_sectorstable from '../logic/editpanel_sectorstable';

  export default {
    components: {
      editpanel_sidebar,
      editpanel_sectorstable,
    },

    data() {
      return {
      }
    },

    computed: mapGetters([
      'profile',
    ]),

		methods: {
      ...mapActions([
        'set_selected_zone',
        'set_sectors',
      ]),
     
		},

    async mounted () {
      await this.set_selected_zone(this.profile.member_zone);
      this.set_sectors(this.profile.member_zone.id);
    },

	}
</script>


<template>
  <div class="editpanel">
    <editpanel_sidebar class="editpanel_sidebar-sidebar"></editpanel_sidebar>
    <div class="editpanel-content">
      <div class="editpanel-content_item">
        <editpanel_sectorstable />
      </div>
    </div>
  </div>
</template>



<style>
  .editpanel_sidebar-sidebar {
    left: 0;
    top: 0;
    width: 250px;
    background: #fff;
  }
  .editpanel-content {
    position: absolute;
    left: 250px;
    top: 0;
    bottom: 0;
    right: 0;
  }

</style>
