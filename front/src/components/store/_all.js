import Vue from 'vue';
import Vuex from 'vuex';

import signup from './signup';
import ui_visibility from './ui_visibility';
import map from './map';
import sidebar from './sidebar';
import lang from './lang';
import levels from './levels';
import signin from './signin';
import zones from './zones';
import sectors from './sectors';
import industries from './industries';
import filters from './filters';
import republics from './republics';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		signup,
		ui_visibility,
		map,
		sidebar,
		lang,
		levels,
		signin,
		zones,
		sectors,
		industries,
		filters,
		republics,
	},
});