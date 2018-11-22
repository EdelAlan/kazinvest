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

    mounted () {
       this.set_members();
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
        <div v-text="{
                title_ru: 'Логин', 
                title_kz: 'Логин', 
                title_en: 'Login'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
        <div v-text="{
                title_ru: 'Одобрен', 
                title_kz: 'Бекітілді', 
                title_en: 'Approved'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
        <div v-text="{
                title_ru: 'Время регистрации', 
                title_kz: 'Тіркеу уақыты', 
                title_en: 'Registration time'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
        <div v-text="{
                title_ru: 'ФИО', 
                title_kz: 'ТАЖ', 
                title_en: 'Full name'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
        <div v-text="{
                title_ru: 'Зона', 
                title_kz: 'Аймақ', 
                title_en: 'Zone'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
        <div v-text="{
                title_ru: 'Роль', 
                title_kz: 'Рөл', 
                title_en: 'Role'
              }['title_' + lang]" class="editpanel_members-table_header_item"></div>
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
              title_ru: 'Стандартный',
              title_en: 'Standart',
              title_kz: 'Стандартты',
              member_role: 'member_min',
              member_id: member.member_id,
              member_verification: member.member_verification,
            }, {
              title_ru: 'Администратор',
              title_en: 'Administrator',
              title_kz: 'Әкімші',
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
                title_ru: 'Администратор',
                title_en: 'Administrator',
                title_kz: 'Әкімші',
                member_role: 'member',
              }
              : 
              member.member_role == 'member_min' ? {
                title_ru: 'Стандартный',
                title_en: 'Standart',
                title_kz: 'Стандартты',
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
    left: 30px;
    top: 60px;
    right: 30px;
    bottom: 30px;
    overflow: hidden;
    background: #fff;
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
