<template>
	<div class="status-badge" :class="getStatusClass($props.status)">
		<span>
			<i v-if="$props.status == 'Finished'" class="fas fa-check"></i>
			{{ $props.text }}
		</span>
	</div>
</template>

<script>

	export default {
		name: 'StatusBadge',

		props: {
			text: { type: String, required: false },
			status: { type: String, required: false }
		},
		methods: {
			getStatusClass(string){
				switch(string) {
				case 'Finished':
					return 'status-badge--finished';
				case 'Ongoing':
					return 'status-badge--ongoing';
				default:
					return null;
				}
			},
		}
	}
</script>

<style lang="scss">

.status-badge {
	text-transform: uppercase;
	font-size: 10px;

	&--finished {
		color: #5cb85c;
	}

	&--ongoing {
		color: #d9534f
	}
}

</style>
