<script>
  import modal from '../ui/modal.vue';
  import tabs from '../ui/tabs.vue';

  import signup from '../logic/signup.vue';
  import signin from '../logic/signin.vue';

  import { mapGetters, mapActions } from 'vuex';

  export default {
    components: {
      modal,
      tabs,
      signup,
      signin,
    },

    data() {
      return {
        menu: false
      }
    },

    computed: mapGetters([
      'signup_signin_modal',
    ]),

		methods: {
      ...mapActions([
        'change_ui_visibility',
      ]),
			toggleMenu() {
				this.menu = !this.menu;
			},
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
                <select id="type" class="field">
                    <option value="сэз">СЭЗ</option>
                    <option value="из">ИЗ</option>
                </select>
                <input type="text" id="territory" class="field" placeholder="Регионы">
                <input type="text" id="search" class="field" placeholder="Отрасль">
                <button id="find" class="field btn">Найти</button>
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
                <a href="#" class="btn category">
                    <div class="count">11</div>
                    <p class="title">Специальные экономические зоны (СЭЗ)</p>
                </a>
                <a href="#" class="btn category">
                    <div class="count">28</div>
                    <p class="title">Индустриальные зоны (ИЗ)</p>
                </a>
                <a href="#" class="btn category">
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
    padding:15px;
    background: #52cbff;
    background: #fff;
    box-shadow: 0 0 5px rgba(0,0,0,.2);
    border-radius: 3px;
    margin: 5px;
    text-align: center;
  }

  .home-main_btn_logo {
    height: 78px;
    background: url('../../assets/images/logo-blue-black.svg') no-repeat center;
    background-size: contain;
    margin-bottom: 10px;
  }

  .home-main_btn_title {
    font-size: 24px;
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
    padding: 5px 10px;
    background: #52cbff;
    overflow: hidden;
  }

  .count {
    font-size: 73px;
    color: #fff;
    line-height: 75px;
    font-weight: bold;
    margin-right: 10px;
  }

  .category .title,
  .welcome .title {
    font-size: 17px;
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
