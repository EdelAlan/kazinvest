<script>
  import { mapActions, mapGetters } from 'vuex';
  import piechart from '../ui/piechart';

	export default {

		data() {
			return {
				diagram_data: [],
			};
		},

		components: {
			piechart,
		},

		mounted() {
			this.change_data();
		},

		methods: {
			...mapActions([
				'change_ui_visibility',
				'set_sectors',
			]),

			async change_data() {
				console.log(this.passport_anal_data);
				switch(this.active_level.id) {
					case 1:
						switch(this.passport_anal_data) {
							case 'sez_bie':
								this.diagram_data = [
									{ key: 'Потребность', val: parseInt(this.republics[0].demand, 10) },
									{ key: 'Выделено', val: parseInt(this.republics[0].allocated, 10) },
								];
								break;
							case 'iz_bie':
								this.diagram_data = [
									{ key: 'Потребность', val: parseInt(this.republics[1].demand,10) },
									{ key: 'Выделено', val: parseInt(this.republics[1].allocated,10) },
								];
								break;
							case 'sez_sqi':
								await this.set_sectors();
								var ongoing=0, 
									underway=0;
								await this.sectors.forEach(sector => {
									this.zones.forEach(zone => {
										if ( (zone.zone_type == 1) && (zone.id == sector.zone_id)) {
											switch(sector.project_type) {
												case 1:
													ongoing++;
													break;
												case 2:
													underway++;
													break;
												default:
													break;
											}
										}
									});
								});
								this.diagram_data = [
									{ key: 'Действующие проекты', val: ongoing },
									{ key: 'Проекты на стадии реализации', val: underway },
								];
								break;
							case 'iz_sqi':
								await this.set_sectors();
								var ongoing=0, 
									underway=0;
								await this.sectors.forEach(sector => {
									this.zones.forEach(zone => {
										if ( (zone.zone_type == 2) && (zone.id == sector.zone_id)) {
											switch(sector.project_type) {
												case 1:
													ongoing++;
													break;
												case 2:
													underway++;
													break;
												default:
													break;
											}
										}
									});
								});
								this.diagram_data = [
									{ key: 'Действующие проекты', val: ongoing },
									{ key: 'Проекты на стадии реализации', val: underway },
								];
								break;
						}
						break;
					case 2:
						switch(this.passport_anal_data) {
							case 'sez_bie':
								console.log(this.active_level);
								if (parseInt(this.active_level.properties.budget_need, 10) == 0 && parseInt(this.active_level.properties.budget_allocated, 10) == 0) {
									this.diagram_data = [
										{ key: 'Потребность', val: 0 },
										{ key: 'Выделено', val: 0 },
									];
								} else if (parseInt(this.active_level.properties.budget_need, 10) == 0) {
									this.diagram_data = [
										{ key: 'Потребность', val: 0 },
										{ key: 'Выделено', val: parseInt(this.active_level.properties.budget_allocated, 10) },
									];
								} else {
									this.diagram_data = [
										{ key: 'Потребность', val: parseInt(this.active_level.properties.budget_need, 10) },
										{ key: 'Выделено', val: 0 },
									];
								}
								break;
							case 'iz_bie':
								break;
							case 'sez_sqi':
								break;
							case 'iz_sqi':
								break;
						}
						break;
					default:
						break;
				}
			},
		},

		computed: mapGetters([
			'lang',
			'passport_anal_data',
			'active_level',
			'republics',
			'sectors',
			'zones',
		]),

		watch: {
			passport_anal_data: 'change_data',
		}
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
				:sectors="this.diagram_data"
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
