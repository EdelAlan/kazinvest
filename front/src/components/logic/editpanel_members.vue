<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {

    computed: mapGetters([
      'lang',
      'members',
    ]),

    methods: mapActions([
      'set_members',
    ]),

    async mounted () {
      await this.set_members();
    },

  }
</script>


<template>
  <div class="editpanel_members">
    <div class="editpanel_members-header">
      <h2 class="editpanel_members-header_title" v-text="'Пользователи'"></h2>
    </div>
    <div class="editpanel_members-table">
      <div class="editpanel_members-table_header">
        <div v-text="'Логин'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Одобрен'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Время регистрации'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Имя'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Фамилия'" class="editpanel_members-table_header_item"></div>
      </div>
    </div>
    <div class="editpanel_members-sectors">
      <div class="editpanel_members-sector"
        v-for="member in members">
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_id"
            v-text="member.member_id"></span>
        </div>
        <div class="editpanel_members-member_item">
          <input type="checkbox" :checked="member.member_verification" />
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_timestamp"
            v-text="member.member_timestamp"></span>
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_firstname"
            v-text="member.member_firstname"></span>
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_lastname"
            v-text="member.member_lastname"></span>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
  .editpanel_members {
    position: absolute;
    z-index: 10;

    background: #fff;
    margin: 30px;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
  }
  .editpanel_members-sectors {
    overflow-y: auto;
    padding: 0;
    height: calc(100vh - 150px);
  }
  .editpanel_members-table_header {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .editpanel_members-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding-left: 20px;
  }
  .editpanel_members-table_header_item {
    flex: 1;
    padding: 13px 20px;
    color: #aaa;
    font-size: 12px;
  }
  .editpanel_members-sector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .editpanel_members-member_item {
    position: relative;
    flex: 1;
    padding: 15px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editpanel_members-member_item_edit {
    text-overflow: ellipsis;
    position: absolute;
    width: 25px;
    top: 14px;
    height: 25px;
    background-color: #fff;
    border-radius: 4px;
    border: none;
    outline: none;
    cursor: pointer;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    background-image: url("../../assets/images/pencil.svg");
    background-repeat: no-repeat;
    background-position: 50% 50%; 
  }
  .editpanel_members-member_item_title--leftpd {
    padding-left: 45px;
  }
</style>
