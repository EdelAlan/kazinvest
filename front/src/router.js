import Vue from 'vue'
import Router from 'vue-router'

import home from './components/pages/home.vue'
import mapview from './components/pages/mapview.vue'
import store from './components/store/_all';

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
			beforeEnter: sessionverify,
			component: home
		},
		{
			path: '/map',
			name: 'map',
			beforeEnter: sessionverify,
			component: mapview
		}
	]
});

async function sessionverify (to, from, next) {
	await store.dispatch('set_profile');
	next();
}