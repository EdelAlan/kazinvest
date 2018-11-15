<script>
  import { mapGetters, mapActions } from 'vuex';  

  export default {

    data() {
      return {
        image: null,
      }
    },

    computed: mapGetters([
      'lang',
      'feedback',
    ]),

    methods: mapActions([
      'set_feedback',
      'update_feedback',
    ]),

    async mounted () {
      await this.set_feedback();

      function decodeBase64Image(dataString) {
        var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
          response = {};

        if (matches.length !== 3) {
          return new Error('Invalid input string');
        }

        response.type = matches[1];
        response.data = new Buffer(matches[2], 'base64');

        return response;
      }

      console.log(decodeBase64Image(this.feedback[1].file))

      this.image = decodeBase64Image(this.feedback[1].file);
    },

  }
</script>


<template>
  <div class="editpanel_feedback"
  >
    <div class="editpanel_feedback-header">
      <h2 class="editpanel_feedback-header_title" 
        v-text="{
					title_ru: 'Обратная свзяь', 
					title_kz: 'Кері байланыс', 
					title_en: 'Feedback'
				}['title_' + lang]"></h2>
    </div>
    <div class="editpanel_feedback-table">
      <div class="editpanel_feedback-table_header">
        <div class="editpanel_feedback-table_header_item"
          v-text="{
            title_ru: 'Номер участника', 
            title_kz: 'Қатысушы нөмірі', 
            title_en: 'Member ID'
          }['title_' + lang]"
        ></div>
        <div class="editpanel_feedback-table_header_item"
          v-text="'E-mail'"
        ></div>
        <div class="editpanel_feedback-table_header_item"
          v-text="{
            title_ru: 'Сообщение',
            title_kz: 'Хабар',
            title_en: 'Message'
          }['title_' + lang]"
        ></div>
        <div class="editpanel_feedback-table_header_item"
          v-text="{
            title_ru: 'Дата',
            title_kz: 'Берілген күні',
            title_en: 'Date'
          }['title_' + lang]"
        ></div>
      </div>
    </div>
    <div class="editpanel_feedback-sectors">
      <div class="editpanel_feedback-sector"
        v-for="it in feedback">
        <div class="editpanel_feedback-member_item">
          <span class="editpanel_feedback-member_item_title" 
            :title="it.member_id"
            v-text="it.member_id"></span>
        </div>
        <div class="editpanel_feedback-member_item">
          <span class="editpanel_feedback-member_item_title" 
            :title="it.email"
            v-text="it.email"></span>
        </div>
        <div class="editpanel_feedback-member_item">
          <span class="editpanel_feedback-member_item_title" 
            :title="it.message"
            v-text="it.message"></span>
        </div>
        <div class="editpanel_feedback-member_item">
          <span class="editpanel_feedback-member_item_title" 
            :title="it.created_date"
            v-text="it.created_date"></span>
        </div>
        <!-- <div class="editpanel_feedback-member_item">
          <img 
            :src="image"
          />
        </div> -->
      </div>
    </div>
  </div>
</template>

<style>
  .editpanel_feedback {
    position: absolute;
    z-index: 10;
    top: 60px;
    bottom: 30px;
    left: 30px;
    right: 30px;
    background: #fff;
    box-shadow: 0 0 5px 0 rgba(0,0,0,.2);
    border-radius: 3px;
  }
  .editpanel_feedback-sectors {
    overflow-y: auto;
    padding: 0;
    height: calc(100vh - 150px);
  }
  .editpanel_feedback-table_header {
    display: flex;
    flex-direction: row;
    align-items: stretch;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  .editpanel_feedback-header_title {
    color: #03A0E3;
    font-size: 16px;
    font-weight: lighter;
    padding-left: 20px;
  }
  .editpanel_feedback-table_header_item {
    flex: 1;
    padding: 13px 20px;
    color: #aaa;
    font-size: 12px;
  }
  .editpanel_feedback-sector {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .editpanel_feedback-member_item {
    position: relative;
    flex: 1;
    padding: 15px 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .editpanel_feedback-member_item_edit {
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
  .editpanel_feedback-member_item_title--leftpd {
    padding-left: 45px;
  }
</style>
