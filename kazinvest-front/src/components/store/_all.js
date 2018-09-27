import Vue from 'vue';
import Vuex from 'vuex';

import signup from './signup';
import ui_visibility from './ui_visibility';
<<<<<<< HEAD
import map from './map';
=======
import sidebar from './sidebar';
>>>>>>> 1f3876ea3f99017a2e8128d39d4d474deba12be5

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		signup,
		ui_visibility,
<<<<<<< HEAD
		map,
=======
		sidebar
>>>>>>> 1f3876ea3f99017a2e8128d39d4d474deba12be5
	},
});