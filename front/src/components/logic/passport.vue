<script>
  import { mapActions, mapGetters } from 'vuex';

	export default {

		data () {
			return {
			};
		},

		methods: {
			...mapActions([
				'change_ui_visibility'
			]),
		},

		computed: mapGetters([
			'selected_sector',
			'lang',
		]),
	}
</script>

<template>
	<div class="passport">
		<div class="passport-header">
			<span class="passport-close"
				@click="change_ui_visibility({
					ui_component: 'sector_passport',
					ui_component_state: false,
				})"></span>
			<h4 class="passport-header_title">Справочная информация</h4>	
		</div>
		<div class="passport-body"
			v-if="selected_sector">
			<!-- v-html временно, пока поля в базе не очистят от тегов -->

			<div class="passport-body_item">
				<span class="passport-body_item_key">Название компании участника</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector['title_' + lang]"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Описание</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector['title_project_' + lang]"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Стоимость проекта</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector.project_price"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Площадь занимаемого участка</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector.area"></span>
			</div>
			
			<div class="passport-body_item">
				<span class="passport-body_item_key">Текущий статус</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector['current_status_' + lang]"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Год</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector.project_date"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Продукция</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector['products_' + lang]"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Сроки реализации</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector['time_realization_' + lang]"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">План работы</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector.plan_jobs"></span>
			</div>

			<div class="passport-body_item">
				<span class="passport-body_item_key">Мощность</span>
				<span class="passport-body_item_val" 
					v-html="selected_sector.power"></span>
			</div>



		</div>
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
	.passport-body {
		padding: 10px;
		max-height: calc(100vh - 130px);
		overflow: scroll;
	}
	.passport-body_item {
		margin-bottom: 25px;
	}
	.passport-body_item p { /* Временно, пока поля не очистят от тегов p*/
		margin: 0;
	}
	.passport-body_item_key {
		font-size: 16px;
		color: #999;
		display: block;
		padding-bottom: 8px;
	}
	.passport-body_item_val {
		font-size: 18px;
	}

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
