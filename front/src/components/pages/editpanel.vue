<script>
  import { mapGetters, mapActions } from 'vuex';
  import editpanel_sidebar from '../logic/editpanel_sidebar';
  import editpanel_members from '../logic/editpanel_members';
  import editpanel_sectorstable from '../logic/editpanel_sectorstable';
  import editpanel_feedback from '../logic/editpanel_feedback';
  import editpanel_reconciliation from '../logic/editpanel_reconciliation';

  export default {
    components: {
      editpanel_sidebar,
      editpanel_sectorstable,
      editpanel_members,
      editpanel_feedback,
      editpanel_reconciliation,
    },

    computed: mapGetters([
      'profile',
      'views',
    ]),

	}
</script>


<template>
  <div class="editpanel">
    <editpanel_sidebar class="editpanel_sidebar-sidebar"></editpanel_sidebar>
    <div class="editpanel-content">
      <div class="editpanel-content_item">
        <editpanel_sectorstable v-if="views[0] && views[0].active" />
        <editpanel_members v-if="views[1] && views[1].active && profile && profile.member_role == 'superadmin'" />
        <editpanel_reconciliation v-if="views[2] && views[2].active && profile && profile.member_role == 'superadmin'"/>
        <editpanel_feedback v-if="views[3] && views[3].active && profile && profile.member_role == 'superadmin'" />
      </div>
    </div>
  </div>
</template>



<style>
  .editpanel_sidebar-sidebar {
    left: 0;
    top: 0;
    bottom: 0;
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
