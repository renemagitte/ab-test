<template>
	<div class="favorite-heart" v-if="loaded" @click="toggleFavorite($props.projectId)">
		<i class="shape" :class="!favorite ? 'far fa-heart' : 'fas fa-heart'"></i>
		<i class="fill fas fa-heart"></i>
	</div>
</template>

<script>
	export default {
		name: 'FavoriteIndicator',
		props: {
			projectId: { type: Number, required: false }
		},
		data() {
			return {
				loaded: false,
				favorite: false,
			}
		},
		created() {
			this.setFavorite();
		},
		methods: {
			setFavorite() {
				// let existingFavorites = JSON.parse(localStorage.getItem("favorites"));
				let existingFavorites = localStorage.getItem("favorites");
				
				if(existingFavorites){

					if(!existingFavorites.includes(this.$props.projectId)){
						this.favorite = false;
					}else{
						this.favorite = true;
					}
					// this.loaded = true;
				}
				this.loaded = true;
			},
			toggleFavorite(projectId) {
				let updatedFavorites = [];
				let existingFavorites = [];

				if(localStorage.getItem("favorites")){
					existingFavorites = JSON.parse(localStorage.getItem("favorites"));
				}
				
				if(existingFavorites){
					updatedFavorites = [...existingFavorites];

					let allreadyFavorite = updatedFavorites.includes(projectId); // Check if favorite allready

					if(!allreadyFavorite){
						updatedFavorites.push(projectId);
						this.favorite = true;
					}else{
						updatedFavorites = updatedFavorites.filter(function (ele) {
							return ele !== projectId;
						});
						this.favorite = false;
					}
					localStorage.setItem("favorites", JSON.stringify(updatedFavorites));

					this.$store.dispatch('updateFavoriteCount', updatedFavorites.length);
				}
			}
		}
	}
</script>


<style lang="scss" scoped>

.favorite-heart:hover .shape,
.favorite-heart .fill {
    display: none;
	cursor: pointer;
}
.favorite-heart:hover .fill {
    display: inline;
	cursor: pointer;
	@media screen and (min-width: 1024px) {
		animation: heartbeat 0.5s forwards;
	}
}

@keyframes heartbeat {
	0% {
		font-size: 1em;
	}
	50% {
		font-size: 1.1em;
	}
	100% {
		font-size: 1em;
	}
}

</style>
