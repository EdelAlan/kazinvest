<script>
	import { mapActions } from 'vuex';  

	export default {

		props: ['titles_style', 'active_page'],

		data () {
			return {
				active_page_num: 0,
			};
		},

		mounted() {
			this.active_page_num = this.active_page;
		},

		methods: {
			...mapActions([
				'set_new_data',
				'set_selected_tab',
			]),

			async page_activate (num) {
				this.active_page_num = num;
				await this.set_new_data(num+1);
				await this.set_selected_tab(num+1);
			},
		},

		computed: {
			tabs_titles () {
				let half = Object.keys(this.$slots).length / 2;
				const result = [];
				for (let i = 0; i < half; i++) {
					if (i == half) return;
					result.push(Object.keys(this.$slots)[i]);
				}
				return result;
			},

			tabs () {
				let half = Object.keys(this.$slots).length / 2;
				const result = [];
				for (let i = half; i < Object.keys(this.$slots).length; i++) {
					if (i == Object.keys(this.$slots).length) return;
					result.push(Object.keys(this.$slots)[i]);
				}
				return result;
			},
		},

	}
</script>

<template>
	<div class="tabs">

		<div class="tabs-btns">
			<button class="tabs-btn"
				:style="titles_style"
				v-for="tab_title, key in tabs_titles"
				v-on:click=page_activate(key)
				:key="key">
				<slot
					:name="tab_title"
				></slot>
				<span class="tabs-btn_active"
					v-if="active_page_num == key"></span>	
			</button>
		</div> 

		<div class="tabs-tab"
			v-for="tab_title, key in tabs"
			:key="key">
			<slot 
				:name="tab_title"
				v-if="active_page_num == key">
			</slot>
		</div>

	</div>
</template>


<style>

	.tabs-btns {
		display: flex;
		flex-wrap: wrap;
	}
	
	.tabs-btn {
		background-color: #fff;
		box-shadow: inset 0px 0px 1px #aaa;
		border: none;
		flex-grow: 99; /* many tabs */
		color: #878DA1;
		position: relative;
		outline: none;
		cursor: pointer;
	}

	.tabs-btn_active {
		position: absolute;
		bottom: 0;
		left: 0;
		height: 3px;
		width: 100%;
		background: #FF9C40;
	}
	
</style>
