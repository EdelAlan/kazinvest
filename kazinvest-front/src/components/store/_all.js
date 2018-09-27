import Vue from 'vue';
import Vuex from 'vuex';

import signup from './signup';
import ui_visibility from './ui_visibility';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		signup,
		ui_visibility,
	},
});