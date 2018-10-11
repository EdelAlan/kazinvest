<script>
  import { mapActions, mapGetters } from 'vuex';
  import piechart from '../ui/piechart';

	export default {
		components: {
			piechart,
		},

		methods: mapActions([
			'change_ui_visibility'
		]),

		computed: mapGetters([
			'lang',
		]),
	}
</script>

<template>
	<div class="passport_anal">
		<div class="passport_anal-header">
			<span class="passport_anal-close"
				@click="change_ui_visibility({
					ui_component: 'passport_anal',
					ui_component_state: false,
			})"></span>
		</div>
		<div class="passport_anal-body">
			<piechart
				:sectors="[
					{ key: 'Потребность', val: 3203333 },
					{ key: 'Выделено', val: 2321321 },
				]"
			></piechart>
		</div>
	</div>
</template>


<style>
	.passport_anal {
		width: 300px;
		background: #fff;
		border-radius: 3px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.passport_anal-header {
		position: relative;
	}
	.passport_anal-header_title {
		margin: 0;
		display: block;
		padding: 15px 10px;
		font-size: 16px;
	}
	.passport_anal-body {
		max-height: calc(100vh - 130px);
		overflow-y: auto;
	}
	.passport_anal-close {
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
		z-index: 100;
	}

</style>
