<script>

	export default {

		props: ['tabs_titles'],

		data () {
			return {
				active_page_num: 0,
			};
		},

		methods: {
			page_activate (num) {
				this.active_page_num = num;
			},
		},

	}
</script>

<template>
	<div class="tabs">

		<div class="tabs-btns">
			<button class="tabs-btn"
				v-for="tab_title, key in tabs_titles"
				v-on:click=page_activate(key)
				:key="key">
				<span v-text="tab_title"></span>
				<span class="tabs-btn_active"
					v-if="active_page_num == key"></span>	
			</button>
		</div>

		<div class="tabs-tab"
			v-for="tab_title, key in Object.keys(this.$slots)"
			:key="key">
			<slot 
				:name="tab_title"
				v-if="active_page_num == key">
			</slot>
		</div>

	</div>
</template>tabs-btn


<style>

	.tabs-btns {
		display: flex;
		flex-wrap: wrap;
	}
	
	.tabs-btn {
		background-color: #fff;
		box-shadow: inset 0px 0px 1px #aaa;
		font-size: 20px;
		border: none;
		padding: 20px;
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
		height: 6px;
		width: 100%;
		background: #FF9C40;
	}
	
</style>
