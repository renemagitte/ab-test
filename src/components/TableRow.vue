<template>
<tr>
	<td class="project-cell project-cell--fav">
		<favorite-indicator 
			:projectId="$props.project.project_id">
		</favorite-indicator>
	</td>

	<td class="project-cell">
		<status-badge 
			:text="getProjectStatus($props.project.project_status)"
			:status="$props.project.project_status">
		</status-badge>
	</td>

	<td class="project-cell">
		{{getProjectType($props.project.project_type)  }}
	</td>

	<td class="project-cell">
		{{ getProjectName($props.project.project_name) }}
	</td>

	<td class="project-cell">
		{{ $props.project.respondent_count }} st
	</td>

	<td class="project-cell">
		{{ $props.project.date_start }}
	</td>

	<td class="project-cell">
		{{ $props.project.date_end }}
	</td>

	<td class="project-cell">
		{{ getIntegration($props.project.integration) }}
	</td>
	
	<td class="project-cell">
		{{ $props.project.answer_rate_latest }}%
	</td>
</tr>
</template>

<script>
import FavoriteIndicator from './FavoriteIndicator';
import StatusBadge from './StatusBadge';

	export default {
		name: 'TableRow',
		components: {
			FavoriteIndicator,
			StatusBadge
		},
		props: {
			project: { type: Object, required: false }
		},
		methods: {
			getProjectStatus(string){
				switch(string) {
				case 'Finished':
					return 'Klar';
				case 'Ongoing':
					return 'Pågående';
				default:
					return null;
				}
			},
			getProjectType(string){
				switch(string) {
				case 'Standard project':
					return 'Standardprojekt'
				case 'Continuous project':
					return 'Kontinuerligt projekt'
				default:
					return null;
				}
			},
			getProjectName(string){
				switch(string) {
				case 'Commercial properties (Demo)':
					return 'Affärsfastigheter (Demo)'
				case 'Residents (Demo)':
					return 'Boende (Demo)'
				case 'Moving in (Demo)':
					return 'Inflyttning (Demo)'
				case 'Moving out (Demo)':
					return 'Utflyttning (Demo)'
				case 'Error report (Demo)':
					return 'Felrapporter (Demo)'
				default:
					return null;
				}
			},
			getIntegration(string){
				switch(string) {
				case 'YES':
					return 'Ja'
				case 'NO':
					return 'Nej'
				default:
					return null;
				}
			},
		}
	}
</script>


<style lang="scss" scoped>

.project-cell {
	height: 25px;
	color: #15467a;
	border-bottom: 0.5px solid lightgrey;
	font-size: 12px;
	@media screen and (max-width: 768px) {
		height: 20px;	
	}

	&--fav {
		max-width: 18px;
		box-sizing: border-box;
		@media screen and (max-width: 768px) {
			text-align: right;
			border: none;
			font-size: 16px;
			max-width: none;
		}

	}
}

</style>
