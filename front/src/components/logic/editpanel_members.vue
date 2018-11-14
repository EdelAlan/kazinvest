<script>
  import { mapGetters, mapActions } from 'vuex';  
  import selector from '../ui/selector';

  export default {
    components: {
      selector,
    },

    computed: mapGetters([
      'lang',
      'members',
    ]),

    methods: {
      select_role (member) {
        this.update_member({
          member_id: member.member_id,
          member_verification: member.member_verification,
          member_role: member.member_role,
        });
      },
      ...mapActions([
        'set_members',
        'update_member',
      ])
    },

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
        <div v-text="'ФИО'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Зона'" class="editpanel_members-table_header_item"></div>
        <div v-text="'Роль'" class="editpanel_members-table_header_item"></div>
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
          <input type="checkbox" 
            v-on:click="update_member({
              member_id: member.member_id,
              member_verification: !member.member_verification,
              member_role: member.member_role,
            })"
            :checked="member.member_verification"
          />
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_timestamp"
            v-text="member.member_timestamp"></span>
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="`${member.member_firstname} ${member.member_lastname}`"
            v-text="`${member.member_firstname} ${member.member_lastname}`"></span>
        </div>
        <div class="editpanel_members-member_item">
          <span class="editpanel_members-member_item_title" 
            :title="member.member_zone['title_' + lang]"
            v-text="member.member_zone['title_' + lang]"></span>
        </div>
        <div class="editpanel_members-member_item editpanel_members-member_item--visible">
   
          <selector
            :list="[{
              title_ru: 'Пониженный',
              title_ru: 'Downgrade',
              title_ru: 'Пониженный',
              member_role: 'member_min',
              member_id: member.member_id,
              member_verification: member.member_verification,
            }, {
              title_ru: 'Стандартный',
              title_ru: 'Standart',
              title_ru: 'Стандартный',
              member_role: 'member',
              member_id: member.member_id,
              member_verification: member.member_verification,
            }]"
            :styles="{
              'font-size': '14px',
            }"
            v-on:select="select_role"
            :selected="
              member.member_role == 'member' ? {
                title_ru: 'Стандартный',
                title_ru: 'Standart',
                title_ru: 'Стандартный',
                member_role: 'member',
              }
              : 
              member.member_role == 'member_min' ? {
                title_ru: 'Пониженный',
                title_ru: 'Downgrade',
                title_ru: 'Пониженный',
                member_role: 'member_min',
              } : ''
            "
          />
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
    font-size: 14px;
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
  .editpanel_members-member_item--visible {
    overflow: visible;
  }
</style>
