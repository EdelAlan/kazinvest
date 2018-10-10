<script>
  import { mapActions } from 'vuex';

	export default {
		props: ['title'],

		methods: mapActions([
			'change_ui_visibility'
		]),
	}
</script>

<template>
	<div class="passport">
		<div class="passport-header">
			<span class="passport-header_title"></span>
			<span class="passport-close"
				@click="change_ui_visibility({
					ui_component: 'passport',
					ui_component_state: false,
			})"></span>
		</div>
		<slot name="body"></slot>
	</div>
</template>


<style>
	.passport {
		width: 300px;
		background: #fff;
		border-radius: 3px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.passport-header {
		position: relative;
		border-bottom: 1px solid #eee;
	}
	.passport-header_title {
		margin: 0;
		padding: 15px 10px;
		font-size: 16px;
	}
	/*
	.passport-body {
		padding: 10px;
		max-height: calc(100vh - 130px);
		overflow: scroll;
	}
	.passport-body_item {
		margin-bottom: 25px;
	}
	.passport-body_item p { 
		margin: 0;
	}
	.passport-body_item_key {
		font-size: 16px;
		color: #999;
		display: block;
	}
	.passport-body_item_val {
		font-size: 14px;
	}
*/
	.passport-close {
		cursor: pointer;
		outline: none;
		height: 13px;
		width: 13px;
		background-color: transparent;
		background-image: url('../../assets/images/сross-black.svg');
		background-size: contain;
		border: none;
		position: absolute;
		top: 5px;
		right: 5px;
	}

</style>
