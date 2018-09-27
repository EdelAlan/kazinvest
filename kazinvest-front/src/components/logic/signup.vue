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
					department: null,
					//password
				},
				password_confirmation: '',
				
				select_password_state: false,
				password_visibility: false,

				validation: {
					empty_fields: false,
				}
			};
		},

		methods: {
			...mapActions([
				'change_ui_visibility',
				// здесь должен быть экшон отвечающий 
				// за отправку user_model в базу
			]),
			select_role (role) {
				this.user_model.role = role;
			},
			select_department (department) {
				this.user_model.department = department;
			},
			toggle_password_visibility () {
				this.password_visibility = !this.password_visibility;
			},

			valid_empty_fields () {
				for (let i = 0; i < Object.keys(this.user_model).length; i++) {
					const field = Object.keys(this.user_model)[i];
					if (this.user_model[field] == '' || this.user_model[field] == null) {
						return this.validation.empty_fields = true;
					} else {
						this.validation.empty_fields = false;
					}
				}
			},

			save_user_model () {
				this.valid_empty_fields();
				if (this.validation.empty_fields == true) {
					// выдать ошибку
					this.select_password_state = false;
				} else {
					this.select_password_state = true;
				}
			},

			cancel () {
				this.select_password_state = false;
				this.change_ui_visibility({
					ui_component: 'signup_signin_modal',
        	ui_component_state: false,
				});
			},

		},
	}
</script>

<template>
	<div class="signup">
		<div class="signup-container">
			
			<template
				v-if="!select_password_state">

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
					<button class="signup-control"
						@click="cancel">Отмена</button>
					<button class="signup-control signup-control--primary"
						v-on:click="save_user_model">Сохранить</button>
				</div>

			</template>


			<template
				v-if="select_password_state">
				
				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="'Придумайте пароль'">
					</div>
					<input class="signup-input"
						:type="password_visibility ? 'text' : 'password'"
						v-model="user_model.password" />
					<span class="signin-password_eye"
						v-on:click="toggle_password_visibility"></span>
				</div>

				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="'Повторите пароль'">
					</div>
					<input class="signup-input"
						:type="password_visibility ? 'text' : 'password'"
						v-model="password_confirmation">
					<span class="signin-password_eye"
						v-on:click="toggle_password_visibility"></span>
				</div>

				{{password_confirmation == user_model.password}}

				<div class="signup-controls">
					<button class="signup-control"
						@click="cancel">Назад</button>
					<button class="signup-control signup-control--primary">Сохранить</button>
				</div>

			</template>

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
		position: relative;
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

	.signin-password_eye {
    width: 16px;
    height: 9px;
		cursor: pointer;
    position: absolute;
    right: 14px;
    top: 45px;
    transform: translateY(-50%);
    background-size: contain;
		background-repeat: no-repeat;
    background-image: url('../../assets/images/eye.svg');
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
