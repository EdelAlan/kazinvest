<template>
	<div class="modal">
		<div class="modal-shadow"
			v-on:click="$emit('close')"></div>
		<div class="modal-container">
			<slot></slot>
			<button class="modal-close"
				v-on:click="$emit('close')"
				></button>
		</div>
	</div>
</template>


<style>

	.modal {
		position: fixed;
		z-index: 100; 
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow-y: auto;
	}

	.modal-shadow {
		background: rgba(14, 69, 86, 0.8);
		width: 100%;
		height: 100%;
	}

	.modal-container {
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		background: #fff;
		max-width: 800px;
		max-height: 800px;
		min-width: 200px;
		min-height: 100px;
	}

	.modal-close {
		cursor: pointer;
		outline: none;
		height: 25px;
		width: 25px;
		background-color: transparent;
		background-image: url('../../assets/images/cross.svg');
		background-size: contain;
		border: none;
		position: absolute;
		top: -30px;
		right: -30px;
	}

</style>
