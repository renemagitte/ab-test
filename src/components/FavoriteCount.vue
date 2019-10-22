<template>
	<div class="favorite-count">
		<i v-if="!($props.count == 0)" class="fas fa-heart"></i>
		<i v-if="$props.count == 0" class="far fa-heart"></i>
		Du har {{ $props.count > 0 ? $props.count + ' st' : 'inga' }} favoriter
	</div>
</template>

<script>
	export default {
		name: 'FavoriteCount',
		props: {
			count: { type: Number, required: false }
		},	
	}
</script>

<style lang="scss" scoped>

.favorite-count{
	text-align: right;
	flex-grow: 1;
	font-size: 12px;
	color: #15467a;
	padding-right: 10px;
	@media screen and (max-width: 768px) {
		margin-top: -20px;
		padding-right: 0;
	}
}

</style>
