<script>
  import { mapActions, mapGetters } from 'vuex';
  import barchart from '../ui/barchart';

	export default {

		data() {
			return {
				bar_data: [
					{ key: 2015, val: 0, percent_val: 0 },
					{ key: 2016, val: 0, percent_val: 0 },
					{ key: 2017, val: 0, percent_val: 0 },
					{ key: 2018, val: 0, percent_val: 0 },
				],
				bar2015: 0,
				bar2016: 0,
				bar2017: 0,
				bar2018: 0,
			};
		},

		mounted() {
			this.change_data();
		},

		components: {
			barchart,
		},

		computed: {
			...mapGetters([
				'lang',
				'passport_content',
				'passport_anal_bar_data',
				'active_level',
				'foreign_investments',
				'investments',
				'number_jobs',
				'production',
				'taxes',
				'exports_volume',
				'spent_foreign_investments',
				'zones',
				'sectors',
				'selected_sector',
				'zones',
				'zone_sector',
			]),
		},

		watch: {
			passport_anal_bar_data: 'change_data',
		},

		methods: {
			...mapActions([
				'change_ui_visibility',
				'set_foreign_investments',
				'set_investments',
				'set_number_jobs',
				'set_production',
				'set_taxes',
				'set_exports_volume',
				'set_spent_foreign_investments',
				'set_sectors',
			]),

			put_data(el) {
				switch(el.year) {
					case 2015:
						this.bar2015 += parseInt(el.val, 10);
						break;
					case 2016:
						this.bar2016 += parseInt(el.val, 10);
						break;
					case 2017:
						this.bar2017 += parseInt(el.val, 10);
						break;
					case 2018:
						this.bar2018 += parseInt(el.val, 10);
						break;
				}
				this.bar_data = [
					{ key: 2015, val: this.bar2015 },
					{ key: 2016, val: this.bar2016 },
					{ key: 2017, val: this.bar2017 },
					{ key: 2018, val: this.bar2018 },
				];
			},

			async change_data() {
				this.bar_data = [
					{ key: 2015, val: 0, percent_val: 0 },
					{ key: 2016, val: 0, percent_val: 0 },
					{ key: 2017, val: 0, percent_val: 0 },
					{ key: 2018, val: 0, percent_val: 0 },
				];
				this.bar2015 = 0;
				this.bar2016 = 0;
				this.bar2017 = 0;
				this.bar2018 = 0;
				switch(this.active_level.id) {
					case 1:
						switch(this.passport_anal_bar_data) {
							case 'sez_iv':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.investments ? sector.investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_pv':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.production ? sector.production.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_fdi':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.foreign_investments ? sector.foreign_investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_njc':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.number_jobs ? sector.number_jobs.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_tv':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.taxes ? sector.taxes.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_ev':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.exports_volume ? sector.exports_volume.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'sez_sfi':
								this.zone_sector.filter(zone => zone.zone_type == 1).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.spent_foreign_investments ? sector.spent_foreign_investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_iv':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.investments ? sector.investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_pv':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.production ? sector.production.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_fdi':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.foreign_investments ? sector.foreign_investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_njc':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.number_jobs ? sector.number_jobs.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_tv':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.taxes ? sector.taxes.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_ev':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.exports_volume ? sector.exports_volume.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
							case 'iz_sfi':
								this.zone_sector.filter(zone => zone.zone_type == 2).forEach( zone => {
									zone.sectors.forEach(sector => {
										sector.spent_foreign_investments ? sector.spent_foreign_investments.forEach(el => {
											this.put_data(el);
										}) : '';
									});
								});
								break;
						}
						break;
					case 2:
						switch(this.passport_anal_bar_data) {
							case 'iv':
								await this.set_investments();
								this.investments.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'pv':
								await this.set_production();
								this.production.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'fdi':
								await this.set_foreign_investments();
								this.foreign_investments.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'njc':
								await this.set_number_jobs();
								this.number_jobs.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'tv':
								await this.set_taxes();
								this.taxes.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'ev':
								await this.set_exports_volume();
								this.exports_volume.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
							case 'sfi':
								await this.set_spent_foreign_investments();
								this.spent_foreign_investments.forEach(el => {
									this.sectors.forEach(sector => {
										if (sector.id == el.parent_id) {
											this.put_data(el);
										}
									});
								});
								break;
						}
						break;
					case 3:
						switch(this.passport_anal_bar_data) {
							case 'iv':
								await this.set_investments();
								this.investments.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'pv':
								await this.set_production();
								this.production.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'fdi':
								await this.set_foreign_investments();
								this.foreign_investments.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'njc':
								await this.set_number_jobs();
								this.number_jobs.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'tv':
								await this.set_taxes();
								this.taxes.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'ev':
								await this.set_exports_volume();
								this.exports_volume.forEach(el => {
									this.put_data(el);
								});
								break;
							case 'sfi':
								await this.set_spent_foreign_investments();
								this.spent_foreign_investments.forEach(el => {
									this.put_data(el);
								});
								break;
						}
						break;
				}
				this.bar_data = this.bar_data.map(({ val, key }, idx) => ({
					percent_val: val == 0 ? 0 : ((val / Math.max.apply(null, this.bar_data.map(o => o.val))) * 55),
					val: val,
					key,
				}));
			}
		},

	}
</script>

<template>
	<div class="passport_anal_bar">
		<div class="passport_anal_bar-header">
			<span class="passport_anal_bar-close"
				@click="change_ui_visibility({
					ui_component: 'passport_anal_bar',
					ui_component_state: false,
			})"></span>
		</div>
		<div class="passport_anal_bar-body">
			<barchart
				:bars="this.bar_data"
			></barchart>
		</div>
	</div>
</template>


<style>
	.passport_anal_bar {
		width: 550px;
		background: #fff;
		border-radius: 3px;
		box-shadow: 0 0 10px rgba(0, 0, 0, .2);
	}
	
	.passport_anal_bar-header {
		position: relative;
	}
	.passport_anal_bar-header_title {
		margin: 0;
		display: block;
		padding: 15px 10px;
		font-size: 16px;
	}
	.passport_anal_bar-body {
		max-height: calc(100vh - 130px);
		overflow-y: auto;
	}
	.passport_anal_bar-close {
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
