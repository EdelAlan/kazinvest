<script>
  import modal from '../ui/modal.vue';
  import tabs from '../ui/tabs.vue';
  import selector from '../ui/selector.vue';
  import filter_checker from '../logic/filter_checker.vue';

  import signup from '../logic/signup.vue';
  import signin from '../logic/signin.vue';

  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      modal,
      tabs,
      signup,
      selector,
      filter_checker,
      signin,
    },

    data() {
      return {
        menu: false
      }
    },

    computed: mapGetters([
      'signup_signin_modal',
      'industries_filter',
      'zone_filter',
      'provinces_filter',
      'search_query',
      'search_string',
      'lang',
      'levels',
    ]),

		methods: {
      ...mapActions([
        'change_ui_visibility',
        'set_republics',
        'set_industries',
        'set_provinces',
        'set_level',
        'set_republics_filter',
        'set_zone_filter',
        'set_industries_filter',
        'set_provinces_filter',
        'set_search_string',
      ]),
      async find() {
        this.$router.push('/map?' + this.search_query);
      },
			toggleMenu() {
				this.menu = !this.menu;
			},
		},

    async mounted () {
      await this.set_provinces(this.$route.query);
      await this.set_republics(this.$route.query);
      await this.set_industries(this.$route.query);
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
          }">
          
          <span slot="tab_title_0">Войти</span>
          <span slot="tab_title_1">Регистрация</span>
          
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

    <div class="lang_container">
      <div id="kk" class="lang"></div>
      <div id="ru" class="lang"></div>
      <div id="en" class="lang"></div>
    </div>

        <div class="content">

            <a href="#"
              id="sign_in"
              class="btn"
              v-on:click="change_ui_visibility({
                ui_component: 'signup_signin_modal',
                ui_component_state: true,
              })"
              >Войти</a>

            <div class="filter_line">

                <filter_checker
                  style="margin: 5px; width: 20%"
                  :list="zone_filter"                  
                  :title="{
                    'title_ru': zone_filter.filter(it => it.checked).length ? zone_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'Не выбрано', 
                    'title_kz': zone_filter.filter(it => it.checked).length ? zone_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'Не выбрано', 
                    'title_en': zone_filter.filter(it => it.checked).length ? zone_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'Не выбрано',
                  }"
                  v-on:select="set_zone_filter"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'padding': '5px 40px 5px 10px',
                    'line-height': '23px'
                  }"
                />

                <filter_checker
                  style="margin: 5px; width: 25%"
                  :list="provinces_filter"
                  :title="{
                    'title_ru': provinces_filter.filter(it => it.checked).length ? provinces_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'Не выбрано', 
                    'title_kz': provinces_filter.filter(it => it.checked).length ? provinces_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'Не выбрано', 
                    'title_en': provinces_filter.filter(it => it.checked).length ? provinces_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'Не выбрано',
                  }"
                  v-on:select="set_provinces_filter"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'padding': '5px 30px 5px 10px',
                    'line-height': '23px'
                  }"
                />

                <filter_checker
                  style="margin: 5px; width: 25%"
                  :list="industries_filter"
                  :title="{
                    'title_ru': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_ru).join(', ') : 'Не выбрано', 
                    'title_kz': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_kz).join(', ') : 'Не выбрано', 
                    'title_en': industries_filter.filter(it => it.checked).length ? industries_filter.filter(it => it.checked).map(it => it.title_en).join(', ') : 'Не выбрано',
                  }"
                  v-on:select="set_industries_filter"
                  :styles="{
                    'border': '1px solid #fff',
                    'border-radius': '3px',
                    'height': '35px',
                    'font-size': '16px',
                    'padding': '5px 30px 5px 10px',
                    'line-height': '23px'
                  }"
                />

                <input type="text" 
                  style="width: 20%; margin-top: 5px; height: 35px; line-height: 14px; padding: 0 10px 2px 10px"
                  class="field"
                  :value="search_string"
                  @input="set_search_string" 
                  :placeholder="{
                    'title_ru': 'Поиск по названию...', 
                    'title_kz': 'Іздеу...',
                    'title_en': 'Search...', 
                  }['title_' + lang]"
                />
                <a href="#" id="find" class="btn category field btn" 
                  v-on:click="find"
                >
                  Найти
                </a>
            </div>

            <router-link to="/map">
              <div class="home-main_btn_layer">
                <div class="home-main_btn">
                  <div class="home-main_btn_logo"></div>
                  <span class="home-main_btn_title">Интерактивная карта Специальных экономических и Индустриальных зон Республики Казахстан</span>
                </div>
              </div>
            </router-link>

            <div class="btn_group">
                <router-link class="btn category" to="/map?zone_filter=[2]">
                  <div class="count">11</div>
                  <p class="title">Специальные экономические зоны (СЭЗ)</p>
                </router-link>

                <router-link class="btn category" to="/map?zone_filter=[1]">
                  <div class="count">24</div>
                  <p class="title">Индустриальные зоны (ИЗ)</p>
                </router-link>

                <a href="/invest_opportunities.pdf" target="_blank" class="btn category">
                    <p class="title" style="text-align: center">Инвестиционные возможности</p>
                </a>
            </div>
        </div>
        <div class="assistant" :class="{'assistant--menu': menu}" @click="toggleMenu">
            <div class="welcome">
                <div class="title">Добро пожаловать!</div>
                <div class="helper"></div>
            </div>
            <div class="menu" @click.stop>
                <div class="close_btn" @click="toggleMenu"></div>
                <div class="menu_body">
                    <a href="#" class="btn">Хочу стать участником</a>
                    <a href="#" class="btn">Я участник СЭЗ / ИЗ</a>
                    <a href="#" class="btn">Задать вопрос</a>
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

  .lang {
    height: 22px;
    width: 37px;
    margin: 0 8px;
  }

  #kk.lang {
    background: url('../../assets/images/lang-kk.svg') no-repeat center;
  }

  #ru.lang {
    background: url('../../assets/images/lang-ru.svg') no-repeat center;
  }

  #en.lang {
    background: url('../../assets/images/lang-en.svg') no-repeat center;
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
    width: 150px;
    text-align: center;
    display: block;
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
    font-family: 'ProximaNovaSemibold', sans-serif;
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
