import Vue from 'vue';
import Vuex from 'vuex';

import signup from './signup';
import ui_visibility from './ui_visibility';
import map from './map';
import sidebar from './sidebar';
import lang from './lang';
import levels from './levels';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		signup,
		ui_visibility,
		map,
		sidebar,
		lang,
		levels,
	},
});