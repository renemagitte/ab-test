<template>
	<select class="select-dropdown" v-model="selected" @change="selectOption()">
		<option value="Initial">Filtrera på undersökningstyp</option>
		<option value="Standard project">Standardprojekt</option>
		<option value="Continuous project">Kontinuerligt projekt</option>
	</select>
</template>

<script>
	export default {
		name: 'SelectDropdown',
		props: {
			options: { type: String, required: false }
		},
		data(){
			return {
				selected: 'Initial',
			}
		},
		methods: {
			selectOption() {
				this.$emit('emitFunction', this.selected);
			}
		}
	}
</script>


<style lang="scss" scoped>

.select-dropdown {
	display: inline-block;
	font-size: 12px;
	color: grey;
	cursor: pointer;
	font-weight: normal;
	border: none;
	background-color: transparent;
	margin-top: -2px;
	// margin-left: -5px;
	// margin-left: 5px;
	-webkit-appearance:none;
}
.select-dropdown::-ms-expand {
	display: none;
}
.select-dropdown:focus {
	outline: none;
}

</style>
