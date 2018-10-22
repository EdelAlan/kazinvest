import Vue from 'vue';
import Vuex from 'vuex';

import signup from './signup';
import signin from './signin';
import ui_visibility from './ui_visibility';
import map from './map';
import sidebar from './sidebar';
import lang from './lang';
import levels from './levels';
import zones from './zones';
import sectors from './sectors';
import industries from './industries';
import filters from './filters';
import republics from './republics';
import legends from './legends';
import infrastructures from './infrastructures';
import objects from './objects';
import provinces from './provinces';
import profile from './profile';
import investments from './investments';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		api_path: {
			getters: {
				api_path: _ => 'http://localhost:5000',
				// api_path: _ => '',
			},
		},
		signup,
		signin,
		ui_visibility,
		map,
		sidebar,
		lang,
		levels,
		zones,
		sectors,
		industries,
		filters,
		republics,
		legends,
		infrastructures,
		objects,
		provinces,
		profile,
		investments,
	},
});