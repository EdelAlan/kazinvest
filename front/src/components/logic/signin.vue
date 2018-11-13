<script>
  import { mapActions, mapGetters } from 'vuex';

	export default {

		data () {
			return {
				user_model: {
					userid: '',
					password: '',
				},
				password_visibility: false,
			};
		},

		computed: mapGetters([
			'lang',
		]),

		methods: {
			...mapActions([
				'sign_in',
				'set_profile',
			]),

			signin () {
				this.sign_in({
					userid: this.user_model.userid,
					password: this.user_model.password,
				}).then(msg => {
					// if (msg == 'user entered') {
					//   this.$router.push('/map');
					// }
					return console.log(msg);
				});
			},

			toggle_password_visibility () {
				this.password_visibility = !this.password_visibility;
			},
		},
	}
</script>

<template>
	<div class="signin">

		<div class="signin-container">

			<div class="signin-input_container">
				<div class="signin-input_title"
					v-text="'E-mail'">
				</div>
				<input class="signin-input"
					v-model="user_model.userid" />
			</div>

			<div class="signin-input_container">
				<div class="signin-input_title"
					v-text="{
						'title_ru': 'Пароль', 
						'title_kz': 'Құпия сөз', 
						'title_en': 'Password'
					}['title_' + lang]">
				</div>
				<input class="signin-input"
					:type="password_visibility ? 'text' : 'password'"
					v-model="user_model.password" />
				<span class="signin-password_eye"
					@click="toggle_password_visibility"></span>
			</div>

			<div class="signin-controls">
				<button class="signin-control signin-control--primary"
					@click="signin"
					v-text="{
						'title_ru': 'Войти', 
						'title_kz': 'Кіру', 
						'title_en': 'Sign in'
					}['title_' + lang]">
				</button>
			</div>

		</div>

	</div>
</template>


<style>

	/* 
		FIXME: 
			некоторые стили из регистрации могут не пригодиться 
	*/

	.signin-container {
		width: 360px;
		margin: 30px auto;
	}

	.signin-role_select {
		display: flex;
		flex-wrap: wrap;
	}

	.signin-role {
		flex-grow: 99; /* many cols */
		padding: 18px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		background: none;
		outline: none;
	}

	.signin-role.signin-role--selected {
		background: #E2F6FF;
	}

	.signin-input_container {
		margin: 20px 0;
		position: relative;
	}

	.signin-password_forgot {
		margin: 10px 0 0 0;
		overflow: hidden;
	}

	.signin-password_forgot_link {
		float: right;
		color: #03A0E3;
		text-decoration: underline;
		cursor: pointer;
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

	.signin-input_title {
		color: #999;
		padding-bottom: 5px;
	}

	.signin-controls {
		width: 130px;
		margin: 20px auto;
	}

	#sign_in {
		font-size: 16px;
	}

	.signin-control {
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

	.signin-control.signin-control--primary {
		background: #03A0E3;
		font-size: 14px;
		color: #fff;
	}
	
	.signin-control:hover {
		background: #eee;
	}

	.signin-control.signin-control--primary:hover {
		background: #0280E3;
	}

	.signin-input {
		width: 100%;
		border: 1px solid #aaa;
		border-radius: 2px;
		height: 40px;
		font-size: 16px;
		padding: 0 14px;
	}

</style>
