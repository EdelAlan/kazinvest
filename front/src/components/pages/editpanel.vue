<script>
  import { mapGetters, mapActions } from 'vuex';
  import editpanel_sidebar from '../logic/editpanel_sidebar';
  import editpanel_members from '../logic/editpanel_members';
  import editpanel_sectorstable from '../logic/editpanel_sectorstable';
  import editpanel_feedback from '../logic/editpanel_feedback';
  import editpanel_reconciliation from '../logic/editpanel_reconciliation';
  import editpanel_editrepublics from '../logic/editpanel_editrepublics';
  import breadcrumb_admin from '../logic/breadcrumb_admin';
  import popup from '../ui/popup';

  export default {
    components: {
      editpanel_sidebar,
      editpanel_sectorstable,
      editpanel_members,
      editpanel_feedback,
      editpanel_reconciliation,
      editpanel_editrepublics,
      breadcrumb_admin,
      popup,
    },

    computed: mapGetters([
      'profile',
      'views',
      'popup',
      'lang',
    ]),

	}
</script>


<template>
  <div class="editpanel">
    <editpanel_sidebar class="editpanel_sidebar-sidebar"></editpanel_sidebar>
    <div class="editpanel-content">
      <breadcrumb_admin
        class="editpanel-breadcrumb"
      />
      <popup v-if="popup"
        :style="{ 'z-index': 10000 }"
        :model="{
          is_piechart: false,
          pageX: this.popup.pageX,
          pageY: this.popup.pageY,
          feature: this.popup.feature
        }"
      ></popup>
      <div class="editpanel-content_item">
        <editpanel_sectorstable v-if="views[0] && views[0].active" />
        <editpanel_members v-if="views[1] && views[1].active && profile && profile.member_role == 'superadmin'" />
        <editpanel_reconciliation v-if="views[2] && views[2].active && profile && profile.member_role == 'superadmin'"/>
        <div v-if="views[3] && views[3].active && profile && profile.member_role == 'superadmin'">{{views[3]['title_' + lang]}}</div>
        <div v-if="views[4] && views[4].active && profile && profile.member_role == 'superadmin'">{{views[4]['title_' + lang]}}</div>
        <editpanel_feedback v-if="views[5] && views[5].active && profile && profile.member_role == 'superadmin'" />
        <editpanel_editrepublics v-if="views[6] && views[6].active && profile.member_role == 'superadmin'" />
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
  .editpanel-content_item {
    margin-top: 30px;
  }

  .editpanel-breadcrumb {
    position: absolute;
    z-index: 8;
    left: 27px;
    transition: all .5s ease-in-out;
    top: 7px;
  }

</style>
