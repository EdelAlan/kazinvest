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
					role: 'member',
					firstname: '',
					lastname: '',
					userid: '',
					zone: {},
					password: '',
				},
				password_confirmation: '',
				
				select_password_state: false,
				password_visibility: false,

				validation: {
					empty_fields: false,
				}
			};
		},

		computed: mapGetters([
			'lang',
			'zones',
			'signup_success',
		]),

		async mounted () {
			await this.set_zones({
				filter: false,
			});
		},

		methods: {
			...mapActions([
				'change_ui_visibility',
				'set_zones',
				'signup',
				'set_success',
			]),
			select_zone (zone) {
				this.user_model.zone = zone;
			},
			toggle_password_visibility () {
				this.password_visibility = !this.password_visibility;
			},

			valid_empty_fields (obj) {
				for (let i = 0; i < Object.keys(obj).length; i++) {
					const field = Object.keys(obj)[i];
					if (obj[field] == '' || obj[field] == null) {
						return this.validation.empty_fields = true;
					} else {
						this.validation.empty_fields = false;
					}
				}
			},

			save_user_model () {
				this.valid_empty_fields(JSON.parse(JSON.stringify({
					...this.user_model,
					password: undefined,
				})));
				if (this.validation.empty_fields == true) {
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
		<div v-if="!signup_success" class="signup-container">
			
			<template
				v-if="!select_password_state">


				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="{
							'title_ru': 'Имя', 
							'title_kz': 'Есім', 
							'title_en': 'Name'
						}['title_' + lang]">
					</div>
					<input class="signup-input"
						v-model="user_model.firstname" />
				</div>

				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="{
							'title_ru': 'Фамилия', 
							'title_kz': 'Тегі', 
							'title_en': 'Surname'
						}['title_' + lang]">
					</div>
					<input class="signup-input"
						v-model="user_model.lastname" />
				</div>

				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="'E-mail'">
					</div>
					<input class="signup-input"
						v-model="user_model.userid" />
				</div>

				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="{
							'title_ru': 'СЭЗ / ИЗ', 
							'title_kz': 'АЭА / ИА', 
							'title_en': 'SEZ / IZ'
						}['title_' + lang]">
					</div>

					<selector
						:list="zones"
						v-on:select="select_zone"
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
					<button class="signup-control signup-control--primary"
						v-on:click="save_user_model"
						v-text="{
							'title_ru': 'Сохранить', 
							'title_kz': 'Cақтау', 
							'title_en': 'Save'
						}['title_' + lang]">
					</button>
				</div>

			</template>


			<template
				v-if="select_password_state">
				
				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="{
								'title_ru': 'Придумайте пароль', 
								'title_kz': 'Құпия сөз жасаңыз', 
								'title_en': 'Create a password'
							}['title_' + lang]">
					</div>
					<input class="signup-input"
						:type="password_visibility ? 'text' : 'password'"
						v-model="user_model.password" />
					<span class="signin-password_eye"
						v-on:click="toggle_password_visibility"></span>
				</div>

				<div class="signup-input_container">
					<div class="signup-input_title"
						v-text="{
							'title_ru': 'Повторите пароль', 
							'title_kz': 'Құпия сөзді қайталаңыз', 
							'title_en': 'Confirm password'
						}['title_' + lang]">
					</div>
					<input class="signup-input"
						:type="password_visibility ? 'text' : 'password'"
						v-model="password_confirmation">
					<span class="signin-password_eye"
						v-on:click="toggle_password_visibility"></span>
				</div>

				{{!user_model.password.length && !password_confirmation.length ? 
					'' : password_confirmation == user_model.password ? 'Пароли совпадают' : 'Пароли не совпадают'}}
				<div class="signup-controls">
					<button class="signup-control signup-control--primary"
						v-on:click="
							signup(user_model)
						"
						v-text="{
							'title_ru': 'Сохранить', 
							'title_kz': 'Cақтау', 
							'title_en': 'Save'
						}['title_' + lang]">
					</button>
		
				</div>

			</template>

		</div>

		<div class="signup-success" v-else>Вы зарегистрированы. Дождидесь одобрения администрации.</div>

	</div>
</template>


<style>

	.signup-container {
		width: 360px;
		margin: 30px auto;
	}

	.signup-success {
		padding: 30px;
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
		width: 130px;
		margin: 40px auto;
	}

	.signup-control {
		width: 100%;
		cursor: pointer;
		padding: 10px;
		color: #777;
		font-size: 16px;
		border: none;
		background: none;
		transition: 200ms;
		border-radius: 2px;
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

	.signup-control--notactive {
		background: #eee;
	}

	.signup-control.signup-control--notactive:hover {
		background: #eee;
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
