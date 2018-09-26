<template>
  <div class="wrapper">
    <button v-on:click="modal = true">Modal on</button>

    <modal
      v-if="modal"
      v-on:close="modal = false">
      <div>Auth</div>
    </modal>
				

        <div class="background"></div>
        <div class="lang_container">
            <div id="kk" class="lang"></div>
            <div id="ru" class="lang"></div>
            <div id="en" class="lang"></div>
        </div>
        <div class="content">
            <a href="#" id="sign_in" class="btn">Войти</a>
            <div class="filter_line">
                <select id="type" class="field">
                    <option value="сэз">СЭЗ</option>
                    <option value="из">ИЗ</option>
                </select>
                <input type="text" id="territory" class="field" placeholder="Весь Казахстан">
                <input type="text" id="search" class="field" placeholder="Нефть">
                <button id="find" class="field btn">Найти</button>
            </div>
            <a href="#" id="map_link">
                <div>
                    <div class="logo"></div>
                    <div class="title">Интерактивная карта Специальных экономических и Индустриальных зон Республики Казахстан</div>
                </div>
            </a>
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
                    <p class="title">Инвестиционные возможности</p>
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

<script>
	import modal from '../ui/modal.vue';

	export default {
		components: {
			modal,
		},

		data() {
			return {
				modal: false,
				menu: false
			}
		},

		methods: {
			toggleMenu() {
				this.menu = !this.menu;
			}
		}
	}
</script>

<style>
    .wrapper {
        position: relative;
        min-height: 100%;
        background: url('../../assets/images/kz-borders.svg') no-repeat top;
        background-size: 98%;
        padding-bottom: 100px;
    }

    .lang_container {
        padding: 20px;
        display: flex;
        justify-content: flex-end;
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
        border: 1px solid #878DA1;
        border-radius: 3px;
        text-decoration: none;
        color: #484D5E;
        display: inline-block;
        cursor: pointer;
        background: #fff;
        font-size: 18px;
        user-select: none;
    }

    .filter_line {
        background: #03A0E3;
        display: flex;
        align-items: stretch;
        padding: 5px;
    }
    
    .filter_line, #map_link {
        margin: 5px 0;
        border-radius: 3px;
        width: 100%;
    }

    .field {
        font-size: 18px;
        padding: 10px 15px;
        background: #fff;
        border: none;
        border-radius: 3px;
        margin: 5px;
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
    }

    #map_link {
        overflow: hidden;
        border: 10px solid #fff6;
        text-decoration: none;
    }

    #map_link > div {
        width: 100%;
        background: #03A0E3;
        margin: 0;
        display: inline-block;
        padding: 10px 100px;
        color: #fff;
    }

    .logo {
        height: 78px;
        background: url('../../assets/images/logo.svg') no-repeat center;
        background-size: contain;
        margin-bottom: 10px;
    }

    .title {
        font-size: 24px;
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
        padding: 20px 10px;
        overflow: hidden;
    }

    .count {
        font-size: 55px;
        color: #69686866;
        margin-right: 10px;
    }

    .category .title,
    .welcome .title {
        font-size: 20px;
        margin: 0;
        text-align: left;
    }

    .category .title {
        color: #00ACFF;
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
        background: #03A0E395;
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
