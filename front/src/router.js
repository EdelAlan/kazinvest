import Vue from 'vue'
import Router from 'vue-router'

import home from './components/pages/home.vue'
import mapview from './components/pages/mapview.vue'

Vue.use(Router);

export default new Router({
	hashbang: false,
	history: true,
	mode: 'history',
	linkActiveClass: 'active',
	transitionOnLoad: true,
	routes: [
		{
			path: '/',
			name: 'home',
			component: home
		},

		{
			path: '/map',
			name: 'map',
			component: mapview
		}
	]
})
