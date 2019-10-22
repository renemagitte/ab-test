<template>
<div class="container">

	<div class="top">
		<div class="logo">
		</div>

		<div class="title">
			<h2>AktivBo Projekt</h2>
		</div>

		<favorite-count 
			:key="favoriteCount"
			:count="favoriteCount">
		</favorite-count>
	</div>

	<div class="filterbar">
		<div class="option" @click="sortByRespondentCount(!respondentCountAsc)">
			<div class="option-icon-wrapper">
				<i class="fas fa-filter option-icon"></i>
			</div>
			Sortera på antal respondenter
		</div>

		<div class="option">
			<div class="option-icon-wrapper">	
				<i class="fas fa-filter option-icon"></i>
			</div>
			<select-dropdown @emitFunction="filterOnProjectType">
			</select-dropdown>
		</div>

		<div class="option option--right" @click="refreshFilters">
			<div class="option-icon-wrapper">
				<i class="fas fa-trash option-icon"></i>
			</div> 
			Ta bort filtreringsval
		</div>
	</div>

	<table>
		<thead>
			<tr>
				<th></th>
				<th>Projektstatus</th>
				<th>Undersökningstyp</th>
				<th>Projektnamn</th>
				<th>Antal respondenter</th>
				<th>Startdatum</th>
				<th>Avslutsdatum</th>
				<th>Integration</th>
				<th>Svarsprocent</th>
			</tr>
		</thead>
		<tbody v-if="loaded">
			<table-row 
				v-for="(project, idx) in projectsOutput" 
				:key="idx" 
				:project="project">
			</table-row>
		</tbody>
	</table>

	<!-- (While data loads, show loader) -->
	<spinner-dots v-if="!loaded">
	</spinner-dots>

</div>
</template>

<script>
const axios = require('axios');

import TableRow from './components/TableRow';
import SelectDropdown from './components/SelectDropdown';
import FavoriteCount from './components/FavoriteCount';
import SpinnerDots from './components/SpinnerDots';

export default {
	name: 'app',
	data(){
		return {
			loaded: false,
			projects: [],
			projectsOutput: [],
			respondentCountAsc: true,
		}
	},
	components: {
		TableRow,
		SelectDropdown,
		FavoriteCount,
		SpinnerDots
	},
	created(){
		if(localStorage.getItem("favorites")){
			// Get exisiting favorites from local storage and set vuex state:
			let existingFavorites = JSON.parse(localStorage.getItem("favorites"));
			this.$store.dispatch('updateFavoriteCount', existingFavorites.length);
		}else{
			localStorage.setItem("favorites", []);
		}

		let listSurveys = this.fetchListSurveys();

		listSurveys.then(() => {
			this.loaded = true;
		});
	},
	computed: {
		favoriteCount(){
			return this.$store.state.favoriteCount;
		}
	},		
	methods: {
		async fetchListSurveys() {
			try{
				await axios.get('/list-surveys')
				.then(response => {
					this.projects = response.data.data.listSurveys;
					this.projectsOutput = response.data.data.listSurveys;
				})
            }catch(err){
                return err;
			}
		},
		sortByRespondentCount(){
			let projects = [...this.projectsOutput];

			if(this.respondentCountAsc){
				projects.sort((a,b) => (a.respondent_count > b.respondent_count) ? 1 : ((b.respondent_count > a.respondent_count) ? -1 : 0));
				this.respondentCountAsc = false;
			}else{
				projects.sort((a,b) => (a.respondent_count < b.respondent_count) ? 1 : ((b.respondent_count < a.respondent_count) ? -1 : 0));
				this.respondentCountAsc = true;
			}			
			this.projectsOutput = projects;
		},
		filterOnProjectType(type){

			if(!(type == 'Initial')){
				let projects = [...this.projects];

				this.projectsOutput = projects.filter(project => {
					return project.project_type == type;
				})
			}else{
				this.projectsOutput = this.projects;
			}
		},
		refreshFilters() {
			this.projectsOutput = this.projects;
		}

	}
}
</script>

<style lang="scss">

@import url('https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap');

h2 {
	font-family: Roboto Slab,sans-serif;
	font-size: 28px;
	font-weight: 700;
	padding: 0;
	margin: 0;
}

.container {
	width: auto;
	font-family: 'Open Sans', sans-serif;
	padding: 20px;
}

.top {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin-bottom: 30px;
	@media screen and (max-width: 768px) {
		margin-bottom: 20px;
	}
	.logo {
		background-image: url(https://aktivbo.se/wp-content/themes/aktivbo/img/aktivbo_logo.svg);
		width: 10vw;
		max-width: 100px;
		height: 10vw;
		max-height: 100px;
		background-repeat: no-repeat;
	}
	.title {
		color: #15467a;
		padding-left: 20px;
		display: flex;
		flex-direction: column;
		justify-content: flex-end;
	}
}

.filterbar {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	margin: 10px 0;
	@media screen and (max-width: 768px) {
		flex-direction: column;
	}

	.option {
		margin-right: 20px;
		font-size: 12px;
		color: grey;
		cursor: pointer;
		@media screen and (max-width: 768px) {
			margin: 3.5px 5px;
		}

		&-icon {
			color: #2478d1;
		}
		&-icon-wrapper{
			text-align: center;
			display: inline-block;
			width: 20px;
		}
		&--right {
			text-align: right;
			flex-grow: 1;
			@media screen and (max-width: 768px) {
				text-align: left;
			}
		}
	}
}

table { 
  width: 100%; 
  border-collapse: collapse; 
  border: 1px solid #ccc; 
}

tr:nth-of-type(odd) { 
  background: #eee; 
}
th { 
	text-transform: uppercase;
	font-size: 10px;
	color: #ffffff;
	background-color: #1c5fa6;
	font-weight: 600;
	font-style: normal;
}
td, th { 
  padding: 6px; 
  text-align: left; 
}

@media screen and (max-width: 768px) {

	table, thead, tbody, th, td, tr { 
		display: block; 
	}

	thead tr { 
		position: absolute;
		top: -9999px;
		left: -9999px;
	}
	
	tr { border: 1px solid #ccc; }
	
	td { 
		border: none;
		border-bottom: 1px solid #eee; 
		position: relative;
		padding-left: 40%; 
	}
	
	td:before { 
		position: absolute;
		top: 7px;
		left: 8px;
		width: 30%; // 45%
		height: 100%;
		padding-right: 10px; 
		white-space: nowrap;
		color: #1c5fa6;
	}

	td:nth-of-type(1):before { content: ""; }
	td:nth-of-type(2):before { content: "Projektstatus"; }
	td:nth-of-type(3):before { content: "Undersökningstyp"; }
	td:nth-of-type(4):before { content: "Projektnamn"; }
	td:nth-of-type(5):before { content: "Antal respondenter"; }
	td:nth-of-type(6):before { content: "Startdatum"; }
	td:nth-of-type(7):before { content: "Avslutsdatum"; }
	td:nth-of-type(8):before { content: "Integration"; }
	td:nth-of-type(9):before { content: "Svarsprocent"; }
}

</style>
