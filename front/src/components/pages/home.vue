<script>
  import modal from '../ui/modal.vue';
  import tabs from '../ui/tabs.vue';
  import selector from '../ui/selector.vue';
  import filter_checker from '../logic/filter_checker.vue';

  import signup from '../logic/signup.vue';
  import signin from '../logic/signin.vue';
  import lang_home from '../logic/lang_home.vue';

  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      modal,
      tabs,
      signup,
      selector,
      filter_checker,
      signin,
      lang_home,
    },

    data() {
      return {
        menu: false,
        activate_tab: 0,
      }
    },

    computed: mapGetters([
      'signup_signin_modal',
      'industries_filter',
      'provinces_filter',
      'lang',
    ]),

		methods: {
      ...mapActions([
        'change_ui_visibility',
        'set_provinces',
        'set_industries',
        'set_industries_filter',
        'set_provinces_filter',
      ]),
			toggleMenu() {
				this.menu = !this.menu;
      },
      call_signin() {
        this.activate_tab = 0;
        this.change_ui_visibility({
          ui_component: 'signup_signin_modal',
          ui_component_state: true,
        })
      },
      call_signup() {
        this.activate_tab = 1;
        this.change_ui_visibility({
          ui_component: 'signup_signin_modal',
          ui_component_state: true,
        });
      },
		},

    async mounted () {
      await this.set_provinces();
      await this.set_industries();
    },

	}
</script>


<template>
  <div class="home">

    <modal
      v-if="signup_signin_modal"
      v-on:close="change_ui_visibility({
        ui_component: 'signup_signin_modal',
        ui_component_state: false,
      })">

      <div class="home-signup_signin_container">

        <tabs
          :titles_style="{
            'font-size': '20px',
            'padding': '22px',
          }"
          :active_page="activate_tab">
          
          <span slot="tab_title_0"
            v-text="{
              'title_ru': 'Войти', 
              'title_kz': 'Кіру', 
              'title_en': 'Sign in'
            }['title_' + lang]">
          ></span>
          <span slot="tab_title_1"
            v-text="{
              'title_ru': 'Регистрация', 
              'title_kz': 'Тіркелу', 
              'title_en': 'Sign up'
            }['title_' + lang]">
          ></span>
          
          <div slot="tab_0">
            <signin></signin>
          </div>
          <div slot="tab_1">
            <signup></signup>
          </div>
        </tabs>

      </div>

    </modal>

    <div class="background"></div>

    <lang_home class="lang_container">
    </lang_home>

        <div class="content">

            <a href="#"
              id="sign_in"
              class="btn"
              v-on:click="call_signin()"
              v-text="{
                'title_ru': 'Войти', 
                'title_kz': 'Кіру', 
                'title_en': 'Sign in'
              }['title_' + lang]">
              </a>

            <div class="filter_line">

                <selector style="margin: 5px"
                  :list="[{
                    title_ru: 'СЭЗ',
                    title_en: 'SEZ',
                    title_kz: 'АЭА',
                  }, {
                    title_ru: 'ИЗ',
                    title_en: 'IZ',
                    title_kz: 'ИА',
                  }]"
                  :title="{
                    'title_ru': 'СЭЗ/ИЗ', 
                    'title_kz': 'АЭА/ИА', 
                    'title_en': 'SEZ/IZ', 
                  }"
                  :placeholder="{
                    'title_ru': 'СЭЗ/ИЗ', 
                    'title_kz': 'АЭА/ИА', 
                    'title_en': 'SEZ/IZ'
                  }['title_' + lang]"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'padding': '5px 10px',
                    'color': '#777',
                    'line-height': '18px'
                  }"
                />

                <filter_checker
                  style="margin: 5px; width: 100%"
                  :list="provinces_filter"
                  :title="{
                    'title_ru': 'Отрасли', 
                    'title_kz': 'Салалары', 
                    'title_en': 'Industries'
                  }"
                  v-on:select="set_provinces_filter"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'color': '#777',
                    'padding': '5px 10px',
                    'line-height': '23px'
                  }"
                />

                <filter_checker
                  style="margin: 5px; width: 250px"
                  :list="industries_filter"
                  :title="{
                    'title_ru': 'Отрасли', 
                    'title_kz': 'Салалары', 
                    'title_en': 'Industries'
                  }"
                  v-on:select="set_industries_filter"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'color': '#777',
                    'padding': '5px 10px',
                    'line-height': '23px'
                  }"
                />
                <button id="find" class="field btn"
                  v-text="{
                    'title_ru': 'Найти', 
                    'title_kz': 'Іздеу', 
                    'title_en': 'Find'
                  }['title_' + lang]">
                </button>
            </div>

            <router-link class="home-main_btn_layer_link" to="/map">
              <div class="home-main_btn_layer">
                <div class="home-main_btn">
                  <div class="home-main_btn_logo"></div>
                  <span class="home-main_btn_title"
                    v-text="{
                      'title_ru': 'Интерактивная карта Специальных Экономических и Индустриальных Зон Республики Казахстан', 
                      'title_kz': 'Қазақстан Республикасының Арнайы Экономикалық және Индустриалдық Аймақтарының интерактивті картасы', 
                      'title_en': 'Interactive map of Special Economical and Industrial Zones of Republic of Kazakhstan'
                    }['title_' + lang]">
                  </span>
                </div>
              </div>
            </router-link>

            <div class="btn_group">
                <router-link class="btn category" to="/map?zone_filter=[2]">
                  <div class="count">11</div>
                  <p class="title"
                    v-text="{
                      'title_ru': 'Специальные экономические зоны (СЭЗ)', 
                      'title_kz': 'Арнайы экономикалық аймақтар (АЭА)', 
                      'title_en': 'Special economical zones (SEZ)'
                    }['title_' + lang]">
                  </p>
                </router-link>

                <router-link class="btn category" to="/map?zone_filter=[1]">
                  <div class="count">24</div>
                  <p class="title"
                    v-text="{
                      'title_ru': 'Индустриальные зоны (ИЗ)', 
                      'title_kz': 'Индустриалдық аймақтар (ИА)', 
                      'title_en': 'Industrial zones (IZ)'
                    }['title_' + lang]">
                  </p>
                </router-link>

                <a href="/invest_opportunities.pdf" target="_blank" class="btn category">
                    <p class="title" style="text-align: center"
                      v-text="{
                        'title_ru': 'Инвестиционные возможности', 
                        'title_kz': 'Инвестициялық мүмкіндіктер', 
                        'title_en': 'Investment opportunity'
                      }['title_' + lang]">
                      </p>
                </a>
            </div>
        </div>
        <div class="assistant" :class="{'assistant--menu': menu}" @click="toggleMenu">
            <div class="welcome">
                <div class="title"
                  v-text="{
                    'title_ru': 'Добро пожаловать!', 
                    'title_kz': 'Қош келдіңіз!', 
                    'title_en': 'Welcome!'
                  }['title_' + lang]"
                ></div>
                <div class="helper"></div>
            </div>
            <div class="menu" @click.stop>
                <div class="close_btn" @click="toggleMenu"></div>
                <div class="menu_body">
                    <a href="https://invest.gov.kz/cabinet/registration/" class="btn"
                      v-text="{
                        'title_ru': 'Хочу стать участником', 
                        'title_kz': 'Мен қатысушы болғым келеді', 
                        'title_en': 'I want to be a participant'
                      }['title_' + lang]"
                    ></a>
                    <a href="#" class="btn"
                      v-on:click="call_signup()"
                      v-text="{
                        'title_ru': 'Я участник СЭЗ / ИЗ', 
                        'title_kz': 'Мен АЭА / ИА қатысушымын', 
                        'title_en': 'I am a participant of SEZ / IZ'
                      }['title_' + lang]"
                    ></a>
                    <a href="#" class="btn"
                      v-text="{
                        'title_ru': 'Задать вопрос', 
                        'title_kz': 'Сұрақ қою', 
                        'title_en': 'Ask question'
                      }['title_' + lang]"
                    ></a>
                </div>
            </div>
        </div>
    </div>
</template>



<style scoped>
  a {
    text-decoration: none;
  }
  .home {
    position: relative;
    min-height: 100%;
    background: url('../../assets/images/kz-borders.svg') no-repeat top;
    background-size: 98%;
    padding-bottom: 100px;
  }

  .home-signup_signin_container {
    width: 730px;
    margin: 0 auto;
  }

  .lang_container {
      padding: 20px;
      display: flex;
      justify-content: flex-end;
  }

  .home-main_btn_layer_link {
    width: 100%;
  }

  .home-main_btn_layer {
    background: rgba(255,255,255,.5);
    overflow: hidden;
    border-radius: 3px;
  }

  .home-main_btn {
    padding: 40px 30px;
    background: #52cbff;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    border-radius: 3px;
    margin: 5px;
    text-align: center;
  }

  .home-main_btn_logo {
    height: 100px;
    background: url('../../assets/images/logo-blue-black.svg') no-repeat center;
    background-size: contain;
    margin-bottom: 20px;
  }

  .home-main_btn_title {
    font-size: 18px;
    color: #666;
    text-decoration: none;
  }

  .content {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 40px auto 0;
    max-width: 800px;
  }

  .content > * {
    margin: 5px 0;
  }

  .btn {
    padding: 5px 10px;
    border: 1px solid #ccc;
    border-radius: 1px;
    text-decoration: none;
    color: #484D5E;
    display: inline-block;
    cursor: pointer;
    background: #fff;
    font-size: 18px;
    user-select: none;
  }

  .filter_line {
    background: #52cbff;
    display: flex;
    align-items: stretch;
  }

  .filter_line, #map_link {
    margin: 5px 0;
    border-radius: 3px;
    width: 100%;
    border: 1px solid #E3E3E3;
  }

  .field {
    height: 35px;
    font-size: 16px;
    padding: 10px 15px;
    background: #fff;
    border: none;
    border-radius: 3px;
    margin: 5px;
  }

  select.field {
    padding: 0 10px;
  }

  #type {
    flex-grow: 1;
  }

  #territory {
    flex-grow: 2;
  }

  #search {
    flex-grow: 3;
  }

  #find {
    padding: 10px 25px;
    background: #F7B06F;
    border: none;
    box-shadow: 0 3px 5px #0003;
    color: #fff;
    line-height: 17px;
  }

  #map_link {
    overflow: hidden;
    border: 10px solid #fff6;
    text-decoration: none;
  }

  #map_link > div {
    width: 100%;
    background: #52cbff;
    margin: 0;
    display: inline-block;
    padding: 10px 100px;
    color: #fff;
  }



  .btn_group {
    display: flex;
    margin: 5px 0;
    justify-content: space-between;
  }

  .category {
    display: flex;
    width: 32%;
    border: 1px solid #E3E3E3;
    box-shadow: 0 8px 15px #0004;
    align-items: center;
    padding: 10px 20px;
    background: #52cbff;
    overflow: hidden;
  }

  .count {
    font-size: 60px;
    color: #fff;
    line-height: 75px;
    font-weight: bold;
    margin-right: 10px;
  }

  .category .title,
  .welcome .title {
    font-size: 16px;
    margin: 0;
    text-align: left;
  }

  .category .title {
    color: #fff;
  }

  .assistant {
    width: 40px;
    height: 45px;
    position: absolute;
    bottom: 10px;
    right: 10px;
    background: url('../../assets/images/assistant.svg') no-repeat center;
    cursor: pointer;
    user-select: none;
  }

  .menu {
    display: none;
    position: absolute;
    right: calc(100% + 20px);
    bottom: 50%;
    background: #52cbff95;
    border-radius: 3px;
    align-items: flex-end;
  }

  .assistant--menu .menu,
  .menu_body {
      display: flex;
      flex-direction: column;
  }

  .menu_body {
    padding: 10px 20px;
    align-items: stretch;
  }

  .menu .btn {
    white-space: nowrap;
    margin-bottom: 10px;
    border: none;
    padding: 8px 15px;
  }

  .close_btn {
    position: relative;
    width: 20px;
    height: 20px;
    margin: 5px 5px 0 0;
  }

  .close_btn::after,
  .close_btn::before {
    content: '';
    width: 100%;
    height: 2px;
    background: #fff;
    position: absolute;
    top: 50%;
    left: 0;
    transition: all .5s ease-in-out;
  }

  .close_btn::after {
    transform: rotate(45deg);
  }

  .close_btn::before {
    transform: rotate(-45deg);
  }

  .close_btn:hover::after {
    transform: rotate(135deg);
  }

  .close_btn:hover::before {
    transform: rotate(45deg);
  }

  .welcome {
    position: absolute;
    right: calc(100% + 20px);
    bottom: 50%;
    border-radius: 3px;
    box-shadow: 0 0 7px #0005;
  }

  .welcome .title {
    white-space: nowrap;
    background: #fff;
    padding: 15px 20px;
    position: relative;
    z-index: 2;
    border-radius: 3px;
  }

  .helper {
    position: absolute;
    background: #fff;
    width: 20px;
    height: 20px;
    bottom: 0;
    right: -10px;
    box-shadow: 0 0 7px #0005;
    transform: skew(45deg);
  }

  .assistant--menu .welcome {
    display: none;
  }
</style>
