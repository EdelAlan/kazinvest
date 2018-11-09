<script>
  	import { mapActions, mapGetters } from 'vuex';

	export default {

		data () {
			return {
				feedback_model: {
                    email: '',
                    message: '',
                    file: '',
                    member_id: null,
                },
				file_name: '',
				feedback_sent: false,
			};
		},

		mounted() {
			this.feedback_model.member_id = this.profile.member_id;
		},

		computed: mapGetters([
            'lang',
            'profile',
		]),

		methods: {
			...mapActions([
				'send_feedback',
			]),
			
			getBase64(file, callback) {
				return new Promise( (resolve, reject) => {
					var reader = new FileReader();
					reader.onload = () => { resolve(reader.result); };
					reader.onerror = reject;
					reader.readAsDataURL(file);
				});
			},
            
            set_file(file) {
                this.file_name = file.name;
				this.getBase64(file).then(res => {
					this.feedback_model.file = res;
				});
            },

			feedback() {
				this.send_feedback({
					...this.feedback_model
				}).then(res => {
					if (res.msg === "feedback sent") {
						this.feedback_sent = true;
					}
					return console.log(res);
                });
			},
		},
	}
</script>

<template>
	<div class="feedback">

		<div class="feedback-container">

			<div v-if="!feedback_sent">
				<div class="feedback-input_container">
					<div class="feedback-input_title"
						v-text="'E-mail'">
					</div>
					<input class="feedback-input"
						v-model="feedback_model.email" />
				</div>

				<div class="feedback-input_container">
					<div class="feedback-input_title"
						v-text="{
							title_ru: 'Сообщение', 
							title_kz: 'Хабарлама', 
							title_en: 'Message'
						}['title_' + lang]">
					</div>
					<textarea class="feedback-input"
						v-model="feedback_model.message">
					</textarea>
				</div>

				<div class="feedback-input_container">
					<label class="feedback-file_label"
						for="file"
						v-text="{
							title_ru: 'Выберите файл', 
							title_kz: 'Файлды таңдаңыз', 
							title_en: 'Select a file'
						}['title_' + lang]"
					>
					</label>
					<input class="feedback-file_input"
						v-on:change="set_file($event.target.files[0])"
						:style="{ visibility: 'hidden' }"
						id="file"
						type="file"
						accept="image/*" />
					<span class="feedback-file"
						v-text="file_name"></span>
				</div>

				<div class="feedback-controls">
					<button class="feedback-control feedback-control--primary"
						@click="feedback"
						v-text="{
							title_ru: 'Отправить', 
							title_kz: 'Жіберу', 
							title_en: 'Send'
						}['title_' + lang]">
					</button>
				</div>
			</div>

			<div v-else class="feedback-sent">
				<p
					v-text="{
						'title_ru': 'Сообщение отправлено', 
						'title_kz': 'Хабар жіберілді', 
						'title_en': 'Message is sent'
					}['title_' + lang]"
				></p>
			</div>

		</div>

	</div>
</template>


<style>
	.feedback-container {
		width: 360px;
		margin: 30px auto;
	}

	.feedback-role_select {
		display: flex;
		flex-wrap: wrap;
	}

	.feedback-role {
		flex-grow: 99; /* many cols */
		padding: 18px;
		font-size: 16px;
		cursor: pointer;
		border: none;
		background: none;
		outline: none;
	}

	.feedback-role.feedback-role--selected {
		background: #E2F6FF;
	}

	.feedback-input_container {
		margin: 20px 0;
		position: relative;
	}

	.feedback-input_title {
		color: #999;
		padding-bottom: 5px;
	}

	.feedback-controls {
		width: 130px;
		margin: 20px auto;
	}

	.feedback-control {
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

	.feedback-control.feedback-control--primary {
		background: #03A0E3;
		font-size: 14px;
		color: #fff;
	}
	
	.feedback-control:hover {
		background: #eee;
	}

	.feedback-control.feedback-control--primary:hover {
		background: #0280E3;
	}

	.feedback-input {
		width: 100%;
		border: 1px solid #aaa;
		border-radius: 2px;
		height: 40px;
		font-size: 16px;
		padding: 0 14px;
	}

    .feedback-file_label {
        background-color: #03A0E3;
        border: none;
        color: #fff;
        padding: .5em;
        font-size: 14px;
        cursor: pointer;
    }

    .feedback-file_label:hover {
        background-color: #0280E3;
    }

    .feedback-file_input {
        width: 0;
        opacity: 0;
    }

    .feedback-file {
        padding: 10px;
        font-size: 16px;
    }

	.feedback-sent {
		text-align: center; 
		color: #999;
	}

</style>
