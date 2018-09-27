<script>
  import { mapGetters, mapActions } from 'vuex';
  import selector from '../ui/selector';

	export default {

		components: {
			selector,
		},

		data () {
			return {
				user_model: {
					role: 'member', // member || employee
					firstname: '',
					lastname: '',
					email: '',
					department: '',
				},
				active_page_num: 0,
			};
		},

		methods: {
			...mapActions([
				
			]),
			select_role (role) {
				this.user_model.role = role;
			},
			select_department (department) {
				this.user_model.department = department;
			},
		},
	}
</script>

<template>
	<div class="signup">

		<div class="signup-container">

			<div class="signup-role_select">
				<button class="signup-role"
					:class="{ 'signup-role--selected': user_model.role == 'member' }"
					v-on:click="select_role('member')">Я участник</button>
				<button class="signup-role"
					:class="{ 'signup-role--selected': user_model.role == 'employee' }"
					v-on:click="select_role('employee')">Я сотрудник</button>
			</div>
		
			<div class="signup-input_container">
				<div class="signup-input_title"
					v-text="'Имя'">
				</div>
				<input class="signup-input"
					v-model="user_model.firstname" />
			</div>

			<div class="signup-input_container">
				<div class="signup-input_title"
					v-text="'Фамилия'">
				</div>
				<input class="signup-input"
					v-model="user_model.lastname" />
			</div>

			<div class="signup-input_container">
				<div class="signup-input_title"
					v-text="'E-mail'">
				</div>
				<input class="signup-input"
					v-model="user_model.email" />
			</div>

			<div class="signup-input_container">
				<div class="signup-input_title"
					v-text="'СЭЗ / ИЗ'">
				</div>

				<selector
					:list="[
						{ name: { ru: 'СЭЗ', kk: 'СЭЗ' } },
						{ name: { ru: 'ИЗ', kk: 'ИЗ' } },
					]"
					v-on:select="select_department"
      		:styles="{
						'border': '1px solid #aaa',
						'border-radius': '2px',
						'height': '40px',
						'font-size': '16px',
						'padding': '14px',
					}">
				</selector>

			</div>

			<div class="signup-controls">
				<button class="signup-control">Отмена</button>
				<button class="signup-control signup-control--primary">Сохранить</button>
			</div>

		</div>

	</div>
</template>


<style>

	.signup-container {
		width: 360px;
		margin: 30px auto;
	}

	.signup-role_select {
		display: flex;
		flex-wrap: wrap;
	}

	.signup-role {
		flex-grow: 99; /* many cols */
		padding: 18px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		background: none;
		outline: none;
	}

	.signup-role.signup-role--selected {
		background: #E2F6FF;
	}

	.signup-input_container {
		margin: 20px 0;
	}

	.signup-input_title {
		color: #999;
		padding-bottom: 5px;
	}

	.signup-controls {
		width: 260px;
		margin: 40px auto;
	}

	.signup-control {
		width: 130px;
		cursor: pointer;
		padding: 10px;
		color: #777;
		font-size: 16px;
		border: none;
		background: none;
		transition: 200ms;
	}

	.signup-control.signup-control--primary {
		background: #03A0E3;
		color: #fff;
	}
	
	.signup-control:hover {
		background: #eee;
	}

	.signup-control.signup-control--primary:hover {
		background: #0280E3;
	}

	.signup-input {
		width: 100%;
		border: 1px solid #aaa;
		border-radius: 2px;
		height: 40px;
		font-size: 16px;
		padding: 0 14px;
	}

</style>
