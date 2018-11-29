<script>
  import { mapGetters, mapActions } from 'vuex'; 
  import modal from '../ui/modal';

  export default {

    data () {
      return {
        selected_feedback: {
          created_date: '',
          email: '',
          file: '',
          id: '',
          member_id: '',
          message: '',
          answer: '',
        },
      };
    },

    components: {
      modal,
    },

    computed: mapGetters([
      'lang',
      'feedback',
      'image_modal',
    ]),

    methods: {
      ...mapActions([
        'set_feedback',
        'update_feedback',
        'change_ui_visibility',
        'send_feedback_answer',
      ]),

      select_feedback(feedback) {
        Object.keys(feedback).forEach(it => {
          this.selected_feedback[it] = feedback[it];
        });
      },

      open_img(file) {
        let img_window = window.open("")
        img_window.document.write("<iframe width='100%' height='100%' src='"+encodeURI(file)+"'></iframe>")
      },

    },

    async mounted () {
      await this.set_feedback();
    },

  }
</script>


<template>
  <div class="editpanel_feedback"
  >
    <modal
      v-if="image_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'image_modal',
        ui_component_state: false,
      })">
      <div class="editpanel_feedback-modal">
        <div class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="{
                title_ru: 'Номер участника', 
                title_kz: 'Қатысушы нөмірі', 
                title_en: 'Member ID'
              }['title_' + lang]">
            </h2>
            <span 
              class="editpanel_reconciliation-date" 
              v-text="selected_feedback.member_id">
            </span>
        </div>
        <div class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="'E-mail'">
            </h2>
            <span 
              class="editpanel_reconciliation-date" 
              v-text="selected_feedback.email">
            </span>
        </div>
        <div class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="{
                title_ru: 'Сообщение',
                title_kz: 'Хабар',
                title_en: 'Message'
              }['title_' + lang]">
            </h2>
            <span 
              class="editpanel_reconciliation-date" 
              v-text="selected_feedback.message">
            </span>
        </div>
        <div class="editpanel_reconciliation-item">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="{
                title_ru: 'Дата',
                title_kz: 'Берілген күні',
                title_en: 'Date'
              }['title_' + lang]">
            </h2>
            <span 
              class="editpanel_reconciliation-date" 
              v-text="selected_feedback.created_date">
            </span>
        </div>
        <div class="editpanel_reconciliation-item"
          v-if="selected_feedback.file"
          :style="{ height: '120px' }">
            <h2 class="editpanel_reconciliation-header_title" 
              v-text="{
                title_ru: 'Изображение',
                title_kz: 'Бейне',
                title_en: 'Image'
              }['title_' + lang]">
            </h2>
            <div class="editpanel_feedback-modal_img">
              <img 
                style="object-fit: cover;" 
                :src="selected_feedback.file"
                v-on:click="open_img(selected_feedback.file)"
              />
            </div>
        </div>
        <div class="editpanel_reconciliation-item"
          :style="{ height: '150px' }">
          <h2 class="editpanel_reconciliation-header_title"
            :style="{ 'font-size': '20px' }" 
            v-text="{
              title_ru: 'Ответ',
              title_kz: 'Жауап',
              title_en: 'Answer'
            }['title_' + lang]">
          </h2>
          <textarea
            :style="{ margin: '0 0 0 20px', height: '70px', width: '540px' }"
            v-model="selected_feedback.answer"
          />
        </div>
        <div class="editpanel_reconciliation-item">
        <div class="feedback-controls">
					<button class="feedback-control feedback-control--primary"
						@click="send_feedback_answer(selected_feedback)"
						v-text="{
							title_ru: 'Отправить', 
							title_kz: 'Жіберу', 
							title_en: 'Send'
						}['title_' + lang]">
					</button>
				</div>
        </div>
      </div>
    </modal>

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
        v-for="it in feedback"
        v-on:click="change_ui_visibility({
                    ui_component: 'image_modal',
                    ui_component_state: true,
                  }),
                  select_feedback(it)">
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
    cursor: pointer;
  }
  .editpanel_feedback-sector:hover {
    background: #50C7F9;
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

  .editpanel_feedback-modal {
    width: 600px;
    padding: 10px;
  }
  .editpanel_feedback-modal_img {
    width: 92px;
    height: 53px;
    background: #aaa;
    float: left;
    overflow: hidden;
    border-radius: 2px;
    border: 1px solid #333;
    cursor: pointer;
    position: relative;
    margin: 0 20px 20px;
  }
  .editpanel_feedback-modal_img img {
    height: 100%;
    width: 100%;
  }
</style>
